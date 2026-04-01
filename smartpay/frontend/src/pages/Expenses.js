import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import NotificationToast from '../components/common/NotificationToast';
import { useSmartPay } from '../context/SmartPayContext_new';
import { formatCurrency } from '../utils/helpers';
import { FiCheck } from 'react-icons/fi';

export default function ExpensesPage({ darkMode }) {
  const { addExpense, wallet } = useSmartPay();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const categories = [
    { id: 'food', label: 'Food & Meals', icon: '🍔' },
    { id: 'transport', label: 'Transport', icon: '🚗' },
    { id: 'books', label: 'Books & Study', icon: '📚' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'utilities', label: 'Utilities', icon: '💡' },
  ];

  const roundedAmount = amount ? Math.ceil(parseFloat(amount)) : 0;
  const investmentSavings = amount ? roundedAmount - parseFloat(amount) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || !amount) {
      setNotification({ msg: 'Please enter expense description and amount', type: 'error' });
      return;
    }

    if (parseFloat(amount) <= 0) {
      setNotification({ msg: 'Amount must be greater than 0', type: 'error' });
      return;
    }

    if (roundedAmount > wallet.balance) {
      setNotification({ msg: 'Insufficient wallet balance', type: 'error' });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      addExpense(description, parseFloat(amount), category, investmentSavings);

      const categoryData = categories.find(c => c.id === category);
      setNotification({
        msg: `✓ ${categoryData.icon} ${formatCurrency(roundedAmount)} logged!\n${investmentSavings > 0 ? `₹${investmentSavings.toFixed(2)} automatically invested` : 'No round-up today'}`,
        type: 'success',
      });

      setDescription('');
      setAmount('');
      setCategory('food');
      setLoading(false);
    }, 1500);
  };

  const getCategoryIcon = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.icon : '📌';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-4 md:p-8`}>
      {loading && <LoadingSpinner message="Logging expense..." />}

      <div className="max-w-2xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          📊 Track Expenses
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
          Log your campus purchases. We'll round-up and invest the spare change! 💰
        </p>

        <Card darkMode={darkMode} className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Description */}
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Expense Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Coffee at cafeteria"
                className={`w-full p-3 border rounded ${darkMode ? 'bg-dark-input border-dark-border' : 'bg-white border-gray-300'}`}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full p-3 border rounded ${darkMode ? 'bg-dark-input border-dark-border' : 'bg-white border-gray-300'}`}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Amount (₹)
              </label>
              <input
                type="number"
                step="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className={`w-full p-3 border rounded ${darkMode ? 'bg-dark-input border-dark-border' : 'bg-white border-gray-300'}`}
                required
              />
            </div>

            {/* Round-up Preview */}
            {amount && (
              <div className={`p-4 rounded border-2 ${darkMode ? 'bg-dark-input border-primary' : 'bg-green-50 border-green-200'}`}>
                <p className={`font-bold ${darkMode ? 'text-primary' : 'text-green-700'} mb-2`}>
                  💡 Smart Round-Up Preview
                </p>
                <div className="space-y-1">
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    You spend: <span className="font-bold">₹{parseFloat(amount).toFixed(2)}</span>
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    We round to: <span className="font-bold text-primary">₹{roundedAmount}</span>
                  </p>
                  {investmentSavings > 0 && (
                    <p className={`text-sm font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      ✓ Spare change invested: ₹{investmentSavings.toFixed(2)} 📈
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Balance Info */}
            <div className={`p-3 rounded ${darkMode ? 'bg-dark-input' : 'bg-blue-50'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Available Balance: <span className="font-bold text-primary">{formatCurrency(wallet.balance)}</span>
              </p>
            </div>

            {/* Button */}
            <Button type="submit" className="w-full" loading={loading}>
              <FiCheck className="inline mr-2" /> Log Expense
            </Button>

          </form>
        </Card>

        {/* Educational Tip */}
        <Card darkMode={darkMode}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            <span className="font-bold">💡 Tip:</span> Did you know? By investing just ₹2-5 daily through round-ups, you could accumulate ₹20,000+ in 4 years with 5% annual returns!
          </p>
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