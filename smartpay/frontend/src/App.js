import React, { useState, useEffect } from 'react';
import { SmartPayProvider } from './context/SmartPayContext_new';
import Navbar from './components/common/Navbar';
import NotificationToast from './components/common/NotificationToast';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/Dashboard';
import WalletPage from './pages/Wallet';
import ExpensesPage from './pages/Expenses';
import InsightsPage from './pages/Insights';
import LearnPage from './pages/Learn';
import './App.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState(null);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
    setNotification({
      msg: '🎉 Welcome to SmartPay Pro! Start adding expenses to save smartly.',
      type: 'success',
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
    setNotification({
      msg: 'You have been logged out.',
      type: 'info',
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Page component mapping
  const pageComponents = {
    dashboard: <DashboardPage darkMode={darkMode} />,
    wallet: <WalletPage darkMode={darkMode} />,
    expenses: <ExpensesPage darkMode={darkMode} />,
    insights: <InsightsPage darkMode={darkMode} />,
    learn: <LearnPage darkMode={darkMode} />,
  };

  return (
    <SmartPayProvider>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        {!isLoggedIn ? (
          <AuthPage onLogin={handleLogin} darkMode={darkMode} />
        ) : (
          <>
            {/* Navigation */}
            <Navbar
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
              currentPage={currentPage}
              onNavigate={setCurrentPage}
              onLogout={handleLogout}
            />

            {/* Page Content */}
            <main className={`${darkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
              {pageComponents[currentPage]}
            </main>
          </>
        )}

        {/* Global Notifications */}
        {notification && (
          <NotificationToast
            message={notification.msg}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </SmartPayProvider>
  );
}
