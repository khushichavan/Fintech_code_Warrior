import React, { useMemo } from 'react';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import { useSmartPay } from '../context/SmartPayContext_new';
import { formatCurrency } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function InsightsPage({ darkMode }) {
  const { expenses, wallet, getAIInsights } = useSmartPay();
  const aiInsights = getAIInsights();

  // Get expense data grouped by category
  const categoryData = useMemo(() => {
    const categories = {};
    expenses.forEach(exp => {
      if (exp.category) {
        categories[exp.category] = (categories[exp.category] || 0) + 1;
      }
    });

    return Object.entries(categories)
      .map(([category, count]) => ({
        category,
        count,
        amount: expenses
          .filter(e => e.category === category)
          .reduce((sum, e) => sum + (e.roundedUp || e.amount), 0),
      }))
      .sort((a, b) => b.count - a.count);
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
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
        💡 Spending Analytics
      </h1>
      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
        Understand your campus spending patterns and identify savings opportunities
      </p>

      {/* Spending Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Spent"
          value={formatCurrency(totalSpent)}
          icon="💵"
          darkMode={darkMode}
        />
        <StatCard
          title="Total Invested"
          value={formatCurrency(totalSaved)}
          subtitle="through round-ups"
          icon="🎯"
          darkMode={darkMode}
        />
        <StatCard
          title="Saving Rate"
          value={`${savingRate}%`}
          subtitle="of every ₹100 spent"
          icon="📊"
          darkMode={darkMode}
        />
      </div>

      {/* AI-Powered Financial Insights - IMPORTANT */}
      {aiInsights.length > 0 && (
        <div className="mb-8">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            🤖 Smart Financial Recommendations
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border-l-4 transition-all hover:shadow-md ${
                  insight.type === 'success'
                    ? darkMode
                      ? 'bg-dark-input border-l-green-500'
                      : 'bg-green-50 border-l-green-500'
                    : insight.type === 'warning'
                    ? darkMode
                      ? 'bg-dark-input border-l-yellow-500'
                      : 'bg-yellow-50 border-l-yellow-500'
                    : darkMode
                    ? 'bg-dark-input border-l-blue-500'
                    : 'bg-blue-50 border-l-blue-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{insight.icon}</span>
                  <div className="flex-1">
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {insight.title}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'} mt-1`}>
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {categoryData.length > 0 && (
        <Card darkMode={darkMode} className="mb-8">
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Spending by Category
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="category" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
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
            Category Insights
          </h2>
          <div className="space-y-3">
            {categoryData.length > 0 ? (
              categoryData.map((item) => {
                const totalSpend = categoryData.reduce((sum, c) => sum + c.amount, 0);
                const percentage = ((item.amount / totalSpend) * 100).toFixed(0);
                return (
                  <div key={item.category} className={`flex items-center justify-between`}>
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      💳 {item.category}
                    </span>
                    <span className="font-bold text-primary">{percentage}% ({item.count}x)</span>
                  </div>
                );
              })
            ) : (
              <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Start tracking to see category breakdown
              </p>
            )}
          </div>
        </Card>

        <Card darkMode={darkMode}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            💡 Student Money Tips
          </h2>
          <div className={`${darkMode ? 'bg-dark-bg' : 'bg-blue-50'} border border-blue-200 rounded-lg p-4`}>
            <p className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-2`}>
              Your Wealth Building Progress
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              You've invested <span className="font-bold text-primary">{formatCurrency(totalSaved)}</span> through round-ups! That's <span className="font-bold text-primary">{savingRate}%</span> of spending automatically saved. By graduation, this could be ₹50,000+! 🚀
            </p>
          </div>
        </Card>
      </div>

      {/* Peer Savings Challenge */}
      <Card darkMode={darkMode}>
        <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          🏆 Join a Savings Challenge
        </h2>
        <div className="space-y-3">
          <div className={`p-4 rounded border-2 border-primary`}>
            <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              7-Day Expense Tracker Challenge
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
              Log expenses every day for a week. Compete with friends to see who saves the most!
            </p>
            <div className="flex gap-2">
              <div className={`flex-1 p-2 rounded ${darkMode ? 'bg-dark-input' : 'bg-gray-100'} text-center`}>
                <p className="text-xs">Saved</p>
                <p className="font-bold text-primary">{formatCurrency(totalSaved)}</p>
              </div>
              <div className={`flex-1 p-2 rounded ${darkMode ? 'bg-dark-input' : 'bg-gray-100'} text-center`}>
                <p className="text-xs">Goal</p>
                <p className="font-bold">₹500</p>
              </div>
              <div className={`flex-1 p-2 rounded ${darkMode ? 'bg-dark-input' : 'bg-gray-100'} text-center`}>
                <p className="text-xs">Rank</p>
                <p className="font-bold text-primary">#3</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Financial Literacy Recommendations */}
      <Card darkMode={darkMode} className="mt-8">
        <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          📈 Student Money Recommendations
        </h2>
        <ul className={`space-y-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">💡</span>
            <span><span className="font-bold">Cut biggest expense:</span> If food is highest, meal prep to save 40%. That's automatic investment capital!</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">📚</span>
            <span><span className="font-bold">Take quizzes:</span> Learn stock market basics through our 8-question financial literacy quiz and earn badges!</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">🎯</span>
            <span><span className="font-bold">Review portfolio:</span> Your invested round-ups are diversified across 5 major stocks. Watch your wealth compound.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold">👥</span>
            <span><span className="font-bold">Challenge friends:</span> Run group savings challenges. Study shows peer accountability increases savings by 50%!</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
