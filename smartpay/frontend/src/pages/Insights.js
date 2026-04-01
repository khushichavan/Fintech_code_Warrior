import React, { useMemo } from 'react';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import { useSmartPay } from '../context/SmartPayContext_new';
import { formatCurrency } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function InsightsPage({ darkMode }) {
  const { expenses, wallet } = useSmartPay();

  // Get payment data grouped by receiver
  const paymentData = useMemo(() => {
    const receivers = {};
    expenses.forEach(exp => {
      if (exp.receiverName) {
        receivers[exp.receiverName] = (receivers[exp.receiverName] || 0) + 1;
      }
    });

    return Object.entries(receivers)
      .map(([name, count]) => ({
        name,
        payments: count,
      }))
      .sort((a, b) => b.payments - a.payments);
  }, [expenses]);

  const totalSpent = useMemo(
    () => expenses.reduce((sum, exp) => sum + (exp.roundedUp || exp.amount), 0),
    [expenses]
  );
  const totalSaved = useMemo(
    () => expenses.reduce((sum, exp) => sum + exp.autoSave, 0),
    [expenses]
  );
  const savingRate = totalSpent > 0 ? ((totalSaved / totalSpent) * 100).toFixed(1) : 0;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-4 md:p-8`}>
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
        Payment Insights
      </h1>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Paid"
          value={formatCurrency(totalSpent)}
          icon="💸"
          darkMode={darkMode}
        />
        <StatCard
          title="Total Invested"
          value={formatCurrency(totalSaved)}
          subtitle="through round-ups"
          icon="💎"
          darkMode={darkMode}
        />
        <StatCard
          title="Saving Rate"
          value={`${savingRate}%`}
          subtitle="of each payment"
          icon="📊"
          darkMode={darkMode}
        />
      </div>

      {/* Payment Chart */}
      {paymentData.length > 0 && (
        <Card darkMode={darkMode} className="mb-8">
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Payments to Recipients
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1e293b' : '#fff',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  }}
                />
                <Bar dataKey="payments" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Recipients Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card darkMode={darkMode}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Recipients
          </h2>
          <div className="space-y-3">
            {paymentData.length > 0 ? (
              paymentData.slice(0, 5).map((item) => (
                <div key={item.name} className={`flex items-center justify-between`}>
                  <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    👤 {item.name}
                  </span>
                  <span className="font-bold text-primary">{item.payments} payment{item.payments !== 1 ? 's' : ''}</span>
                </div>
              ))
            ) : (
              <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No payment data yet
              </p>
            )}
          </div>
        </Card>

        <Card darkMode={darkMode}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            💡 Smart Tips
          </h2>
          <div className={`${darkMode ? 'bg-dark-bg' : 'bg-blue-50'} border border-blue-200 rounded-lg p-4`}>
            <p className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-2`}>
              Your Smart Payment Plan
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              You've invested <span className="font-bold text-primary">{formatCurrency(totalSaved)}</span> through round-ups! That's <span className="font-bold text-primary">{savingRate}%</span> of your total payments automatically saved for growth.
            </p>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card darkMode={darkMode}>
        <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          📈 Recommendations
        </h2>
        <ul className={`space-y-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">→</span>
            <span>Save more by using digital payments. Every time you pay, a portion is automatically saved.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">→</span>
            <span>Set a monthly saving goal and track your progress on the dashboard.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">→</span>
            <span>Your investments are growing at ~5% monthly. Stay invested for better returns.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">→</span>
            <span>Send money regularly to build a consistent investment habit through round-ups.</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
