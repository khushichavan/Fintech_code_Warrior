import React, { useState } from 'react';
import { useSmartPay } from '../context/SmartPayContext_new';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import NotificationToast from '../components/common/NotificationToast';
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi';

export default function AuthPage({ onLogin, darkMode }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('student1@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const { login, signup } = useSmartPay();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        if (!name.trim()) {
          setNotification({ msg: 'Please enter your name', type: 'error' });
          setLoading(false);
          return;
        }
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
      setNotification({
        msg: isSignup ? '✓ Account created successfully!' : '✓ Logged in successfully!',
        type: 'success',
      });
      setTimeout(onLogin, 500);
    } catch (err) {
      setNotification({
        msg: err.message || 'Authentication failed',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await login('student1@example.com', 'password123');
      setNotification({
        msg: '✓ Demo login successful!',
        type: 'success',
      });
      setTimeout(onLogin, 500);
    } catch (err) {
      setNotification({
        msg: 'Demo login failed',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        darkMode
          ? 'bg-gradient-to-br from-dark-bg to-dark-card'
          : 'bg-gradient-to-br from-primary via-secondary to-primary'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black mb-2 text-white drop-shadow-lg">💳 SmartPay</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-white text-opacity-90'}`}>
            Intelligent payment + micro-savings
          </p>
        </div>

        {/* Auth Card */}
        <Card darkMode={darkMode} className="shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Mode Toggle */}
            <div className={`flex gap-2 p-1 rounded-lg ${darkMode ? 'bg-dark-bg' : 'bg-gray-100'}`}>
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className={`flex-1 py-2 rounded font-medium transition ${
                  !isSignup
                    ? 'bg-primary text-white'
                    : darkMode
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsSignup(true)}
                className={`flex-1 py-2 rounded font-medium transition ${
                  isSignup
                    ? 'bg-primary text-white'
                    : darkMode
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Name Input (Signup only) */}
            {isSignup && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition ${
                    darkMode
                      ? 'bg-dark-bg border-gray-700 text-white placeholder-gray-600'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20`}
                  required
                />
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <FiMail className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 outline-none transition ${
                    darkMode
                      ? 'bg-dark-bg border-gray-700 text-white placeholder-gray-600'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20`}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <FiLock className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 outline-none transition ${
                    darkMode
                      ? 'bg-dark-bg border-gray-700 text-white placeholder-gray-600'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20`}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-6"
            >
              {loading ? 'Processing...' : isSignup ? 'Create Account' : 'Login'}
              <FiArrowRight className="inline ml-2" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />
            <span
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 ${
                darkMode ? 'bg-dark-card text-gray-400' : 'bg-white text-gray-500'
              } text-sm`}
            >
              or
            </span>
          </div>

          {/* Demo Login */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleDemoLogin}
            loading={loading}
            className="w-full"
          >
            🎯 Try Demo Account
          </Button>

          {/* Demo Credentials */}
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
              darkMode ? 'bg-dark-bg text-gray-400' : 'bg-blue-50 text-blue-700'
            }`}
          >
            <p className="font-medium">Demo Credentials:</p>
            <p>Email: student1@example.com</p>
            <p>Password: password123</p>
          </div>
        </Card>

        {/* Footer */}
        <p className={`text-center mt-6 text-sm ${darkMode ? 'text-gray-400' : 'text-white text-opacity-80'}`}>
          Smart saving starts here 🚀
        </p>
      </div>

      {notification && (
        <NotificationToast
          message={notification.msg}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
