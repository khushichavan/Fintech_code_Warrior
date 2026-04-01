import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import NotificationToast from '../components/common/NotificationToast';
import { useSmartPay } from '../context/SmartPayContext_new';
import { formatCurrency, calculateRoundUp, getCategoryIcon } from '../utils/helpers';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function ExpensesPage({ darkMode }) {
  const { addExpense, wallet } = useSmartPay();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const categories = ['food', 'transport', 'entertainment', 'shopping', 'utilities', 'health', 'other'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim() || !amount) {
      setNotification({ msg: 'Please fill all fields', type: 'error' });
      return;
    }

    if (parseFloat(amount) <= 0) {
      setNotification({ msg: 'Amount must be greater than 0', type: 'error' });
      return;
    }

    if (Math.ceil(parseFloat(amount)) > wallet.balance) {
      setNotification({ msg: 'Insufficient wallet balance', type: 'error' });
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      const exp = addExpense(description, parseFloat(amount), category);
      const { savings } = calculateRoundUp(exp.amount);

      setNotification({
        msg: `${formatCurrency(exp.amount)} paid successfully! ${formatCurrency(savings)} saved & invested.`,
        type: 'success',
      });

      setDescription('');
      setAmount('');
      setCategory('food');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-4 md:p-8`}>
      {loading && <LoadingSpinner message="Processing payment..." />}

      <div className="max-w-2xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
          Add Expense
        </h1>

        <Card darkMode={darkMode} className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Description Input */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Expense Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Lunch at café"
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-dark-bg border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
            </div>

            {/* Amount Input */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="28.50"
                step="0.01"
                min="0"
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-dark-bg border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
            </div>

            {/* Category Select */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-dark-bg border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {getCategoryIcon(cat)} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Round-up Preview */}
            {amount && (
              <div className={`${darkMode ? 'bg-dark-bg' : 'bg-blue-50'} border border-blue-200 rounded-lg p-4`}>
                <h3 className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-2 flex items-center gap-2`}>
                  <FiCheck size={18} /> Round-up Summary
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Actual amount:</span>
                    <span className="font-medium">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rounded to:</span>
                    <span className="font-medium">{formatCurrency(Math.ceil(parseFloat(amount)))}</span>
                  </div>
                  <div className="flex justify-between text-primary font-bold">
                    <span>Auto-saved:</span>
                    <span>{formatCurrency(Math.ceil(parseFloat(amount)) - parseFloat(amount))}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Wallet Balance */}
            <div className={`${darkMode ? 'bg-dark-bg' : 'bg-gray-100'} rounded-lg p-4`}>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Available Balance
              </p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(wallet.balance)}</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              loading={loading}
              className="w-full"
            >
              💳 Add Expense & Save
            </Button>
          </form>
        </Card>

        {/* Transaction Info */}
        <Card darkMode={darkMode}>
          <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
            How it works
          </h3>
          <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <li>✓ We round up your expense to the nearest rupee</li>
            <li>✓ The difference is automatically saved</li>
            <li>✓ Savings above ₹10 are invested for growth</li>
            <li>✓ Track your financial progress in real-time</li>
          </ul>
        </Card>
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
