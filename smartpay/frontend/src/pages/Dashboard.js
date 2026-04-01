import React from 'react';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import ProgressBar from '../components/common/ProgressBar';
import { useSmartPay } from '../context/SmartPayContext_new';
import { formatCurrency } from '../utils/helpers';
import { FiTrendingUp, FiBarChart2 } from 'react-icons/fi';

export default function DashboardPage({ darkMode }) {
  const { wallet, expenses, getMonthlySavingsRate } = useSmartPay();

  const monthlySavings = getMonthlySavingsRate();
  const savingsProgress = (wallet.savings / 500) * 100; // Goal: ₹500

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-4 md:p-8`}>

      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Welcome to SmartPay Pro
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Your intelligent financial dashboard
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Wallet Balance"
          value={formatCurrency(wallet.balance)}
          icon="💳"
          darkMode={darkMode}
        />
        <StatCard
          title="Total Savings"
          value={formatCurrency(wallet.savings)}
          subtitle="invested below ₹10"
          icon="💰"
          darkMode={darkMode}
        />
        <StatCard
          title="Investment Value"
          value={formatCurrency(wallet.investmentValue)}
          subtitle="+5-10% simulated growth"
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
          Recent Payments
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
                    {exp.receiverName ? `Paid to ${exp.receiverName}` : exp.description}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(exp.timestamp).toLocaleDateString()} {new Date(exp.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-red-500">
                    -{formatCurrency(exp.roundedUp || exp.amount)}
                  </p>
                  <p className="text-xs text-green-500">
                    +{formatCurrency(exp.autoSave)} invested
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No payments yet. Send money to get started!
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}