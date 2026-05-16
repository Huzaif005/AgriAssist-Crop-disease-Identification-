import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, Wifi } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function OfflineIndicator() {
  const { isOnline, t } = useApp();
  const [showNotification, setShowNotification] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowNotification(true);
      setWasOffline(true);
    } else if (wasOffline) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setWasOffline(false);
      }, 3000);
    }
  }, [isOnline, wasOffline]);

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div
            className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-lg ${
              isOnline
                ? 'bg-green-500 text-white'
                : 'bg-orange-500 text-white'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-5 h-5" />
                <span className="font-semibold">{t('online')}</span>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5" />
                <span className="font-semibold">{t('offline')}</span>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Persistent indicator when offline */}
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 left-6 z-40"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full shadow-lg">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-semibold">{t('offline')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
