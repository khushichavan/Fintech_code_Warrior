import React from 'react';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import { useSmartPay } from '../context/SmartPayContext_new';
import { formatCurrency, formatDate } from '../utils/helpers';
import { FiDownload, FiCreditCard, FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';

export default function WalletPage({ darkMode }) {
  const { wallet, expenses } = useSmartPay();

  const displayTransactions = expenses.slice(0, 10);
  const investmentGrowth = ((wallet.investmentValue - wallet.invested) / wallet.invested * 100).toFixed(2);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-4 md:p-8`}>
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
        💳 Wallet
      </h1>

      {/* Main Wallet Card */}
      <Card
        darkMode={darkMode}
        className="mb-8 bg-gradient-to-r from-primary to-secondary text-white shadow-2xl"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-white text-opacity-80 text-sm">Wallet Balance</p>
            <h2 className="text-4xl font-bold">{formatCurrency(wallet.balance)}</h2>
          </div>
          <FiCreditCard size={48} className="text-white text-opacity-30" />
        </div>
        <div className="border-t border-white border-opacity-20 pt-4">
          <p className="text-sm text-white text-opacity-70">Card Holder Name</p>
          <p className="font-medium">SmartPay User</p>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Savings"
          value={formatCurrency(wallet.savings)}
          subtitle="Auto-saved amount"
          icon="🏦"
          darkMode={darkMode}
        />
        <StatCard
          title="Invested"
          value={formatCurrency(wallet.invested)}
          subtitle="Actively invested"
          icon="📈"
          darkMode={darkMode}
        />
        <StatCard
          title="Investment Value"
          value={formatCurrency(wallet.investmentValue)}
          subtitle={`+${investmentGrowth}% growth`}
          icon="💹"
          darkMode={darkMode}
        />
      </div>

      {/* Investment Growth Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card darkMode={darkMode}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Investment Growth
          </h2>
          <ProgressBar
            progress={Math.min((wallet.investmentValue / (wallet.invested || 1)) * 100 - 100, 100)}
            label="Growth Progress"
            darkMode={darkMode}
          />
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Initial Invested:</span>
              <span className="font-bold">{formatCurrency(wallet.invested)}</span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Current Value:</span>
              <span className="font-bold text-primary">{formatCurrency(wallet.investmentValue)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Profit:</span>
              <span className="font-bold text-success">{formatCurrency(wallet.investmentValue - wallet.invested)}</span>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Button variant="primary" className="w-full">
              <FiArrowDownLeft size={18} /> Add Money
            </Button>
            <Button variant="secondary" className="w-full">
              <FiArrowUpRight size={18} /> Withdraw
            </Button>
            <Button variant="outline" className="w-full">
              <FiDownload size={18} /> Download Statement
            </Button>
          </div>
        </Card>
      </div>

      {/* Transaction History */}
      <Card darkMode={darkMode}>
        <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
          Transaction History
        </h2>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {displayTransactions.length > 0 ? (
            displayTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between ${
                  darkMode ? 'bg-dark-bg' : 'bg-gray-50'
                } p-4 rounded-lg`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-2xl">💸</div>
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {transaction.receiverName ? `Sent to ${transaction.receiverName}` : transaction.description}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {formatDate(transaction.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-500">-{formatCurrency(transaction.roundedUp || transaction.amount)}</p>
                  <p className="text-sm text-green-600">+{formatCurrency(transaction.autoSave)} invested</p>
                </div>
              </div>
            ))
          ) : (
            <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No transactions yet
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
