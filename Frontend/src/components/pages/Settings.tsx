import React from 'react';
import { motion } from 'motion/react';
import { User, Globe, Bell, Moon, Sun, Smartphone, Shield, Info } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function Settings() {
  const { t, language, setLanguage, theme, setTheme } = useApp();

  const languages: Array<{ code: 'en' | 'hi' | 'mr'; label: string; native: string }> = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t('settingsTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your AgriAssist experience
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('profile')}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Farmer Name
                </label>
                <input
                  type="text"
                  defaultValue="Ramesh Kumar"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Farm Location
                </label>
                <input
                  type="text"
                  defaultValue="Pune, Maharashtra"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Language Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('languageSettings')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    language === lang.code
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                  }`}
                >
                  <p className="font-bold text-gray-900 dark:text-white mb-1">
                    {lang.native}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lang.label}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Theme Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
                {theme === 'light' ? <Sun className="w-6 h-6 text-white" /> : <Moon className="w-6 h-6 text-white" />}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('themeSettings')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  theme === 'light'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                }`}
              >
                <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <p className="font-bold text-gray-900 dark:text-white">Light Mode</p>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                }`}
              >
                <Moon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <p className="font-bold text-gray-900 dark:text-white">Dark Mode</p>
              </button>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('notifications')}
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Disease Alerts', enabled: true },
                { label: 'Weather Updates', enabled: true },
                { label: 'Irrigation Reminders', enabled: false },
                { label: 'SMS Notifications', enabled: true },
                { label: 'Email Reports', enabled: false },
              ].map((notification, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {notification.label}
                  </span>
                  <button
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      notification.enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        notification.enabled ? 'transform translate-x-7' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* PWA & Offline Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-teal-500 to-green-600 p-3 rounded-xl">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                App Settings
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Install as App</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add to home screen for offline access
                  </p>
                </div>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  Install
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Offline Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Access reports without internet
                  </p>
                </div>
                <button className="relative w-14 h-7 rounded-full bg-green-500">
                  <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transform translate-x-7" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 p-3 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Privacy & Security
              </h2>
            </div>

            <div className="space-y-3">
              <button className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <p className="font-semibold text-gray-900 dark:text-white">Privacy Policy</p>
              </button>
              <button className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <p className="font-semibold text-gray-900 dark:text-white">Terms of Service</p>
              </button>
              <button className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <p className="font-semibold text-gray-900 dark:text-white">Data Management</p>
              </button>
            </div>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 shadow-lg text-center"
          >
            <Info className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              AgriAssist v1.0
            </h2>
            <p className="text-green-50 mb-4">
              AI-Powered Smart Agriculture Assistant
            </p>
            <p className="text-sm text-green-100">
              Made with ❤️ for Farmers
            </p>
          </motion.div>

          {/* Save Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            {t('save')} Settings
          </motion.button>
        </div>
      </div>
    </div>
  );
}
