import React from 'react';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import ProgressBar from '../components/common/ProgressBar';
import { useSmartPay } from '../context/SmartPayContext_new';
import { formatCurrency } from '../utils/helpers';
import { FiTrendingUp, FiBarChart2 } from 'react-icons/fi';

export default function DashboardPage({ darkMode }) {
  const { wallet, expenses, getMonthlySavingsRate, getAIInsights } = useSmartPay();

  const monthlySavings = getMonthlySavingsRate();
  const savingsProgress = (wallet.savings / 500) * 100; // Goal: ₹500
  const aiInsights = getAIInsights();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-4 md:p-8`}>

      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Smart Wealth Builder 🎓
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Turn your campus expenses into automatic investments
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Current Balance"
          value={formatCurrency(wallet.balance)}
          icon="💵"
          darkMode={darkMode}
        />
        <StatCard
          title="Round-Ups Saved"
          value={formatCurrency(wallet.savings)}
          subtitle="auto-invested daily"
          icon="🎯"
          darkMode={darkMode}
        />
        <StatCard
          title="Investment Growth"
          value={formatCurrency(wallet.investmentValue)}
          subtitle="simulated ~5% monthly"
          icon="📈"
          darkMode={darkMode}
        />
      </div>

      {/* Savings Goal */}
      <Card darkMode={darkMode} className="mb-8">
        <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Savings Goal
        </h2>

        <ProgressBar
          progress={savingsProgress}
          label={`${formatCurrency(wallet.savings)} of ${formatCurrency(500)} goal`}
          darkMode={darkMode}
        />

        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-3`}>
          You are{' '}
          <span className="font-bold text-green-500">
            {Math.round(savingsProgress)}%
          </span>{' '}
          towards your ₹500 savings goal!
        </p>
      </Card>

      {/* AI Financial Insights - IMPORTANT */}
      {aiInsights.length > 0 && (
        <div className="mb-8">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            🤖 AI Financial Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border-l-4 transition-all ${
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
                  <span className="text-2xl">{insight.icon}</span>
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

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Monthly Savings */}
        <Card darkMode={darkMode}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
            <FiBarChart2 /> Monthly Savings Rate
          </h2>

          <div className="text-4xl font-bold text-green-500 mb-2">
            {formatCurrency(monthlySavings)}
          </div>

          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            You're saving {monthlySavings > 0 ? 'great' : 'started'} this month!
          </p>
        </Card>

        {/* Total Expenses */}
        <Card darkMode={darkMode}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
            <FiTrendingUp /> Total Expenses
          </h2>

          <div className="text-4xl font-bold text-blue-500 mb-2">
            {expenses.length}
          </div>

          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            transactions this month
          </p>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card darkMode={darkMode} className="mt-8">
        <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Recent Expenses & Round-Ups
        </h2>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {expenses.length > 0 ? (
            expenses.slice(0, 5).map((exp) => (
              <div
                key={exp.id}
                className={`flex justify-between items-center ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                } p-3 rounded-lg`}
              >
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {exp.description || (exp.receiverName ? `Paid to ${exp.receiverName}` : 'Expense')}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(exp.timestamp).toLocaleDateString()} {new Date(exp.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-red-500">
                    -{formatCurrency(exp.roundedUp || exp.amount)}
                  </p>
                  {exp.autoSave > 0 && (
                    <p className="text-xs text-green-500">
                      +{formatCurrency(exp.autoSave)} saved 💚
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No expenses logged yet. Start tracking to grow your investments!
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}