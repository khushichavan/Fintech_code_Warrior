import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import NotificationToast from '../components/common/NotificationToast';
import { useSmartPay } from '../context/SmartPayContext_new';
import { formatCurrency } from '../utils/helpers';
import { FiCheck, FiSend } from 'react-icons/fi';

export default function ExpensesPage({ darkMode }) {
  const { sendPayment, wallet } = useSmartPay();
  const [receiverName, setReceiverName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const roundedAmount = amount ? Math.ceil(parseFloat(amount)) : 0;
  const investmentSavings = amount ? roundedAmount - parseFloat(amount) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!receiverName.trim() || !amount) {
      setNotification({ msg: 'Please enter receiver name and amount', type: 'error' });
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
      sendPayment(receiverName, parseFloat(amount), investmentSavings);

      setNotification({
        msg: `✓ ${formatCurrency(roundedAmount)} sent to ${receiverName}! ₹${investmentSavings.toFixed(2)} invested automatically.`,
        type: 'success',
      });

      setReceiverName('');
      setAmount('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-4 md:p-8`}>
      {loading && <LoadingSpinner message="Processing payment..." />}

      <div className="max-w-2xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
          💸 Send Money
        </h1>

        <Card darkMode={darkMode} className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Receiver */}
            <div>
              <label className="block mb-2">Receiver Name</label>
              <input
                type="text"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className="w-full p-3 border rounded"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-2">Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border rounded"
                required
              />
            </div>

            {/* Preview */}
            {amount && (
              <div className="bg-green-100 p-4 rounded">
                <p>Rounded: ₹{roundedAmount}</p>
                <p>Invested: ₹{investmentSavings.toFixed(2)}</p>
              </div>
            )}

            {/* Balance */}
            <div className="bg-gray-100 p-4 rounded">
              <p>Balance: {formatCurrency(wallet.balance)}</p>
            </div>

            {/* Button */}
            <Button type="submit" className="w-full" loading={loading}>
              <FiSend className="inline mr-2" /> Send Money
            </Button>

          </form>
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