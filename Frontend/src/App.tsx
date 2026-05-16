import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { ToastProvider } from './contexts/ToastContext';
import Navbar from './components/Navbar';
import LandingPage from './components/pages/LandingPage';
import Dashboard from './components/pages/Dashboard';
import DiseaseScanner from './components/pages/DiseaseScanner';
import VoiceAssistant from './components/pages/VoiceAssistant';
import ReportsHistory from './components/pages/ReportsHistory';
import AlertCenter from './components/pages/AlertCenter';
import Settings from './components/pages/Settings';
import FloatingChatbot from './components/FloatingChatbot';
import OfflineIndicator from './components/OfflineIndicator';

export type PageType = 'landing' | 'dashboard' | 'scanner' | 'voice' | 'reports' | 'alerts' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'scanner':
        return <DiseaseScanner />;
      case 'voice':
        return <VoiceAssistant />;
      case 'reports':
        return <ReportsHistory />;
      case 'alerts':
        return <AlertCenter />;
      case 'settings':
        return <Settings />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AppProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
          {currentPage !== 'landing' && <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />}
          <main className={currentPage !== 'landing' ? 'pt-16' : ''}>
            {renderPage()}
          </main>
          <FloatingChatbot />
          <OfflineIndicator />
        </div>
      </ToastProvider>
    </AppProvider>
  );
}