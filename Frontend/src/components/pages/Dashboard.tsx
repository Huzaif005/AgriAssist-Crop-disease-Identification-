import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Mic, FileText, Bell, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Droplets, Sun } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { PageType } from '../../App';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onNavigate: (page: PageType) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { t } = useApp();

  const stats = [
    {
      label: t('healthScore'),
      value: '85%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
    },
    {
      label: t('scansToday'),
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Camera,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      label: t('activeAlerts'),
      value: '3',
      change: '-1',
      trend: 'down',
      icon: Bell,
      color: 'from-orange-500 to-red-600',
    },
    {
      label: 'Total Scans',
      value: '247',
      change: '+23',
      trend: 'up',
      icon: FileText,
      color: 'from-purple-500 to-pink-600',
    },
  ];

  const recentScans = [
    { id: 1, crop: 'Tomato', disease: 'Late Blight', severity: 'high', date: '2 hours ago' },
    { id: 2, crop: 'Wheat', disease: 'Healthy', severity: 'low', date: '5 hours ago' },
    { id: 3, crop: 'Cotton', disease: 'Leaf Curl', severity: 'medium', date: '1 day ago' },
    { id: 4, crop: 'Rice', disease: 'Blast', severity: 'high', date: '2 days ago' },
  ];

  const healthData = [
    { month: 'Jan', health: 75 },
    { month: 'Feb', health: 78 },
    { month: 'Mar', health: 82 },
    { month: 'Apr', health: 79 },
    { month: 'May', health: 85 },
    { month: 'Jun', health: 85 },
  ];

  const cropDistribution = [
    { name: 'Tomato', value: 35, color: '#ef4444' },
    { name: 'Wheat', value: 25, color: '#f59e0b' },
    { name: 'Cotton', value: 20, color: '#10b981' },
    { name: 'Rice', value: 20, color: '#3b82f6' },
  ];

  const diseaseStats = [
    { name: 'Healthy', count: 45 },
    { name: 'Mild', count: 28 },
    { name: 'Moderate', count: 15 },
    { name: 'Severe', count: 12 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'medium':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300';
      case 'low':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t('welcomeBack')}, Farmer! 👨‍🌾
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your farm health overview
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {t('quickActions')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate('scanner')}
              className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Scan Crop
              </span>
            </button>

            <button
              onClick={() => onNavigate('voice')}
              className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Voice Help
              </span>
            </button>

            <button
              onClick={() => onNavigate('reports')}
              className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Reports
              </span>
            </button>

            <button
              onClick={() => onNavigate('alerts')}
              className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Alerts
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Crop Health Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('cropHealth')}
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="health" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Crop Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Crop Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Scans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('recentScans')}
            </h2>
            <div className="space-y-4">
              {recentScans.map((scan, index) => (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {scan.crop}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {scan.disease} • {scan.date}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(scan.severity)}`}>
                    {scan.severity}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Disease Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Disease Stats
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={diseaseStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
