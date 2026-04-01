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
  const [notification, setNotification] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStage, setPaymentStage] = useState('processing'); // 'processing' or 'success'
  const [pendingData, setPendingData] = useState(null);

  const categories = [
    { id: 'food', label: 'Food & Meals', icon: '🍔' },
    { id: 'transport', label: 'Transport', icon: '🚗' },
    { id: 'books', label: 'Books & Study', icon: '📚' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'utilities', label: 'Utilities', icon: '💡' },
  ];

  // Round to nearest ₹10
  const roundToNearest10 = (num) => {
    return Math.ceil(num / 10) * 10;
  };

  const roundedAmount = amount ? roundToNearest10(parseFloat(amount)) : 0;
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

    // Show UPI payment modal
    setPendingData({
      description,
      amount: parseFloat(amount),
      category,
      roundedAmount,
      investmentSavings
    });
    setShowPaymentModal(true);
    setPaymentStage('processing');

    // Simulate payment processing (2 seconds)
    setTimeout(() => {
      addExpense(description, parseFloat(amount), category);
      setPaymentStage('success');

      // Auto-hide success screen after 2 more seconds
      setTimeout(() => {
        const categoryData = categories.find(c => c.id === category);
        setNotification({
          msg: `✓ ${categoryData.icon} ${formatCurrency(roundedAmount)} logged!\n${investmentSavings > 0 ? `₹${investmentSavings.toFixed(2)} automatically invested 💚` : ''}`,
          type: 'success',
        });

        setShowPaymentModal(false);
        setDescription('');
        setAmount('');
        setCategory('food');
        setPendingData(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-4 md:p-8 transition-colors`}>
      <div className="max-w-2xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          📊 Track Expenses
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
          Every ₹28 becomes ₹30 → rounds up ₹2 investment! 💰
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
                className={`w-full p-3 border rounded-lg transition ${
                  darkMode
                    ? 'bg-dark-input border-dark-border focus:border-primary'
                    : 'bg-white border-gray-300 focus:border-primary'
                } focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none`}
                required
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className={`block mb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3 rounded-lg border-2 transition font-medium ${
                      category === cat.id
                        ? 'border-primary bg-primary bg-opacity-10'
                        : darkMode
                        ? 'border-gray-700 hover:border-primary'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
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
                className={`w-full p-3 border rounded-lg transition ${
                  darkMode
                    ? 'bg-dark-input border-dark-border focus:border-primary'
                    : 'bg-white border-gray-300 focus:border-primary'
                } focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none text-lg`}
                required
              />
            </div>

            {/* Advanced Round-Up Preview - IMPORTANT */}
            {amount && (
              <div className={`p-4 rounded-lg border-2 ${darkMode ? 'border-primary bg-dark-input' : 'border-primary bg-blue-50'} transition-all`}>
                <p className={`font-bold ${darkMode ? 'text-primary' : 'text-primary'} mb-3`}>
                  ✨ Smart Round-Up Preview (Rounded to Nearest ₹10)
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount you enter:</span>
                    <span className="font-bold text-lg">₹{parseFloat(amount).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
                    <span className={`text-xs font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>ROUNDS</span>
                    <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Rounded amount:</span>
                    <span className="font-bold text-2xl text-primary">₹{roundedAmount}</span>
                  </div>
                  {investmentSavings > 0 && (
                    <>
                      <div className="border-t pt-3"></div>
                      <div className="flex justify-between items-center bg-opacity-50 p-2 rounded">
                        <span className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                          💚 Auto-Invested (Spare Change):
                        </span>
                        <span className={`font-bold text-lg ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                          +₹{investmentSavings.toFixed(2)}
                        </span>
                      </div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        This difference automatically goes to your investment portfolio!
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Balance Info */}
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-dark-input' : 'bg-blue-50'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Available Balance: <span className="font-bold text-primary">{formatCurrency(wallet.balance)}</span>
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              <FiCheck className="inline mr-2" /> Log Expense
            </Button>

          </form>
        </Card>

        {/* Educational Content */}
        <Card darkMode={darkMode}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'} leading-relaxed`}>
            <span className="font-bold">💡 Power of Spare Change:</span> Spend ₹28 daily for 365 days? That's ₹2 × 365 = <span className="font-bold text-primary">₹730 invested</span> automatically, growing to <span className="font-bold text-primary">₹1,200+ in 5 years</span> at 5% returns! 📈
          </p>
        </Card>
      </div>

      {/* UPI-Style Payment Modal - IMPORTANT */}
      {showPaymentModal && pendingData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div
            className={`w-full max-w-sm rounded-3xl shadow-2xl ${
              darkMode ? 'bg-dark-card' : 'bg-white'
            } overflow-hidden transition-all duration-300 transform`}
          >
            {paymentStage === 'processing' ? (
              // Processing Screen
              <div className="p-8 text-center min-h-80 flex flex-col items-center justify-center">
                <div className="mb-6">
                  <div className="inline-block animate-spin">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full"></div>
                  </div>
                </div>
                <p className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Processing Payment
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Please wait...
                </p>

                {/* Payment Details */}
                <div className={`mt-6 w-full p-4 rounded-lg ${darkMode ? 'bg-dark-input' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Amount</p>
                  <p className="font-bold text-lg">₹{pendingData.roundedAmount}</p>
                </div>
              </div>
            ) : (
              // Success Screen
              <div className="p-8 text-center min-h-80 flex flex-col items-center justify-center animate-in">
                <div className="mb-6 animate-bounce">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                    <span className="text-5xl">✅</span>
                  </div>
                </div>
                
                <p className={`font-bold text-2xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payment Successful!
                </p>
                <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Transaction completed
                </p>

                {/* Payment Breakdown */}
                <div className={`w-full p-4 rounded-2xl ${darkMode ? 'bg-dark-input' : 'bg-gray-50'} mb-4`}>
                  <div className="mb-4">
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                      Amount Paid
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      ₹{pendingData.roundedAmount}
                    </p>
                  </div>

                  <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-4`}>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                      Auto-Invested (Spare Change)
                    </p>
                    <p className="text-xl font-bold text-green-500 flex items-center justify-center gap-2">
                      💚 +₹{pendingData.investmentSavings.toFixed(2)}
                    </p>
                  </div>
                </div>

                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your round-up is investing! 📈
                </p>
              </div>
            )}
          </div>
        </div>
      )}

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
