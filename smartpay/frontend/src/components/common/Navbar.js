import React, { useState } from 'react';
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import Button from './Button';

export default function Navbar({ darkMode, onToggleDarkMode, currentPage, onNavigate, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'wallet', label: 'Wallet', icon: '💳' },
    { id: 'expenses', label: 'Add Expense', icon: '💰' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'learn', label: 'Learn', icon: '📚' },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setMobileMenuOpen(false);
    onLogout();
  };

  return (
    <nav className={`${darkMode ? 'bg-dark-card border-gray-700' : 'bg-white'} border-b shadow-md transition-colors sticky top-0 z-40`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
            onClick={() => handleNavClick('dashboard')}
          >
            <span className="text-2xl">💳</span>
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              SmartPay Pro
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-primary text-white'
                    : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title="Toggle dark mode"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Logout Button (Desktop) */}
            <button
              onClick={handleLogout}
              className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                darkMode
                  ? 'text-gray-300 hover:text-red-400 hover:bg-gray-700'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
              }`}
              title="Logout"
            >
              <FiLogOut size={18} />
              Logout
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              title="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX size={24} className={darkMode ? 'text-white' : 'text-gray-900'} />
              ) : (
                <FiMenu size={24} className={darkMode ? 'text-white' : 'text-gray-900'} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden pb-4 space-y-2 animate-slideInUp ${darkMode ? 'bg-dark-card' : 'bg-gray-50'}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-primary text-white'
                    : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
            {/* Mobile Logout Button */}
            <button
              onClick={handleLogout}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                darkMode
                  ? 'text-red-400 hover:bg-gray-700'
                  : 'text-red-600 hover:bg-gray-200'
              }`}
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
