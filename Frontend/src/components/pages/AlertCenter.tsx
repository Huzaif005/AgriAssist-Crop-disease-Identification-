import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, AlertTriangle, Cloud, Droplets, Sun, Wind, Bug, TrendingUp, Phone } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface Alert {
  id: number;
  type: 'weather' | 'disease' | 'irrigation' | 'pest';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  time: string;
  action?: string;
}

export default function AlertCenter() {
  const { t } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const alerts: Alert[] = [
    {
      id: 1,
      type: 'weather',
      priority: 'high',
      title: 'Heavy Rainfall Alert',
      description: 'Heavy rainfall expected in the next 48 hours. Secure your crops and ensure proper drainage.',
      time: '2 hours ago',
      action: 'Check drainage systems',
    },
    {
      id: 2,
      type: 'disease',
      priority: 'high',
      title: 'Disease Outbreak Warning',
      description: 'Late blight outbreak reported in nearby farms. Immediate preventive measures recommended.',
      time: '5 hours ago',
      action: 'Apply fungicide',
    },
    {
      id: 3,
      type: 'irrigation',
      priority: 'medium',
      title: 'Irrigation Recommendation',
      description: 'Soil moisture levels are below optimal. Consider irrigation for Field A and Field C.',
      time: '1 day ago',
      action: 'Schedule irrigation',
    },
    {
      id: 4,
      type: 'pest',
      priority: 'medium',
      title: 'Pest Activity Detected',
      description: 'Increased aphid activity detected. Monitor your crops and consider organic pest control.',
      time: '1 day ago',
      action: 'Apply neem oil',
    },
    {
      id: 5,
      type: 'weather',
      priority: 'low',
      title: 'Temperature Rise',
      description: 'Temperature expected to rise above 35°C. Ensure adequate irrigation for sensitive crops.',
      time: '2 days ago',
      action: 'Increase watering',
    },
    {
      id: 6,
      type: 'irrigation',
      priority: 'low',
      title: 'Optimal Soil Moisture',
      description: 'Soil moisture levels are optimal in Field B. No immediate action required.',
      time: '3 days ago',
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return Cloud;
      case 'disease':
        return AlertTriangle;
      case 'irrigation':
        return Droplets;
      case 'pest':
        return Bug;
      default:
        return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'from-red-500 to-orange-600';
      case 'medium':
        return 'from-orange-500 to-yellow-600';
      case 'low':
        return 'from-blue-500 to-cyan-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'medium':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.priority === filter);

  const handleSubscribe = () => {
    if (phoneNumber.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t('alertCenter')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stay informed about critical farm conditions
          </p>
        </motion.div>

        {/* SMS Subscription Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('smsAlerts')}
              </h2>
              <p className="text-green-50">
                Get instant SMS notifications for critical alerts and weather updates
              </p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                placeholder={t('phoneNumber')}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                onClick={handleSubscribe}
                className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors whitespace-nowrap"
              >
                {isSubscribed ? t('subscribed') : t('subscribe')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Alert Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'All Alerts', count: alerts.length, color: 'from-gray-500 to-gray-600', filter: 'all' as const },
            { label: 'High Priority', count: alerts.filter(a => a.priority === 'high').length, color: 'from-red-500 to-orange-600', filter: 'high' as const },
            { label: 'Medium', count: alerts.filter(a => a.priority === 'medium').length, color: 'from-orange-500 to-yellow-600', filter: 'medium' as const },
            { label: 'Low Priority', count: alerts.filter(a => a.priority === 'low').length, color: 'from-blue-500 to-cyan-600', filter: 'low' as const },
          ].map((stat, index) => (
            <button
              key={stat.filter}
              onClick={() => setFilter(stat.filter)}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all ${
                filter === stat.filter ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <div className={`bg-gradient-to-br ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <Bell className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.count}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </button>
          ))}
        </motion.div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert, index) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className={`bg-gradient-to-br ${getPriorityColor(alert.priority)} p-4 rounded-xl h-fit`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {alert.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(alert.priority)}`}>
                            {alert.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {alert.description}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {alert.time}
                      </p>
                    </div>

                    {alert.action && (
                      <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Recommended Action:
                        </span>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm">
                          {alert.action}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg text-center">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No alerts in this category</p>
          </div>
        )}

        {/* Weather Forecast Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-white mb-6">7-Day Weather Forecast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center">
                <p className="text-white font-semibold mb-2">{day}</p>
                <Sun className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">32°</p>
                <p className="text-sm text-blue-100">25°</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
