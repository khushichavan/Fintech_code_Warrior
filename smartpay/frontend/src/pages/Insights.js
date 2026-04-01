import React, { useMemo } from 'react';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import { useSmartPay } from '../context/SmartPayContext_new';
import { formatCurrency, getSpendingAdvice, getCategoryIcon } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function InsightsPage({ darkMode }) {
  const { expenses, getSpendingInsights, wallet } = useSmartPay();

  const spendingData = useMemo(() => {
    const insights = getSpendingInsights();
    return insights.map((item) => ({
      name: item.category,
      amount: parseInt(item.amount),
      percentage: parseFloat(item.percentage),
    }));
  }, [expenses]);

  const topCategory = spendingData.length > 0 ? spendingData[0] : null;
  const totalSpent = useMemo(
    () => expenses.reduce((sum, exp) => sum + exp.amount, 0),
    [expenses]
  );
  const totalSaved = useMemo(
    () => expenses.reduce((sum, exp) => sum + exp.autoSave, 0),
    [expenses]
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-4 md:p-8`}>
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
        Financial Insights
      </h1>

      {/* Spending Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Spent"
          value={formatCurrency(totalSpent)}
          icon="💸"
          darkMode={darkMode}
        />
        <StatCard
          title="Total Saved"
          value={formatCurrency(totalSaved)}
          subtitle="through round-ups"
          icon="💎"
          darkMode={darkMode}
        />
        <StatCard
          title="Saving Rate"
          value={`${totalSpent > 0 ? ((totalSaved / (totalSpent + totalSaved)) * 100).toFixed(1) : 0}%`}
          subtitle="of transactions"
          icon="📊"
          darkMode={darkMode}
        />
      </div>

      {/* Spending Chart */}
      {spendingData.length > 0 && (
        <Card darkMode={darkMode} className="mb-8">
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Spending by Category
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1e293b' : '#fff',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  }}
                />
                <Bar dataKey="amount" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card darkMode={darkMode}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Category Breakdown
          </h2>
          <div className="space-y-3">
            {spendingData.length > 0 ? (
              spendingData.map((item) => (
                <div key={item.name} className={`flex items-center justify-between`}>
                  <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {getCategoryIcon(item.name)} {item.name}
                  </span>
                  <span className="font-bold text-primary">{item.percentage}%</span>
                </div>
              ))
            ) : (
              <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No spending data yet
              </p>
            )}
          </div>
        </Card>

        {topCategory && (
          <Card darkMode={darkMode}>
            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              💡 Smart Advice
            </h2>
            <div className={`${darkMode ? 'bg-dark-bg' : 'bg-blue-50'} border border-blue-200 rounded-lg p-4`}>
              <p className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-2`}>
                {getCategoryIcon(topCategory.name)} {topCategory.name.toUpperCase()}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {getSpendingAdvice(topCategory.name, topCategory.amount)}
              </p>
            </div>
          </Card>
        )}
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
            <span>Reduce discretionary spending by identifying your top expense categories.</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
