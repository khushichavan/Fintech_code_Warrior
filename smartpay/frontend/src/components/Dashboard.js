import React, { useEffect } from 'react';
import { useSmartPay } from '../context/SmartPayContext';

export default function Dashboard({ onSendPayment, onViewSavings, onViewInsights, onLogout }) {
  const { user, transactions, fetchUserData } = useSmartPay();

  useEffect(() => {
    if (user) {
      fetchUserData(user.id);
      const interval = setInterval(() => fetchUserData(user.id), 5000);
      return () => clearInterval(interval);
    }
  }, [user, fetchUserData]);

  if (!user) return <div>Loading...</div>;

  const recentTransactions = transactions.slice(0, 5);
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.name.split(' ')[0]}</h1>
            <p className="text-blue-100">Your financial dashboard</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Main Balance Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm font-semibold mb-2">MAIN WALLET</p>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">₹{user.balance}</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">{user.email}</span>
              <button
                onClick={onSendPayment}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Send Money →
              </button>
            </div>
          </div>

          {/* Savings Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm font-semibold mb-2">SAVINGS WALLET</p>
            <h2 className="text-4xl font-bold text-green-600 mb-4">₹{user.savingsBalance}</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Auto-saved amount</span>
              <button
                onClick={onViewSavings}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                View Details →
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 text-sm">Total Spent</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-2">₹{totalSpent}</h3>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 text-sm">Transactions</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-2">{transactions.length}</h3>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 text-sm">Savings Rate</p>
            <h3 className="text-2xl font-bold text-green-600 mt-2">3-10%</h3>
          </div>
        </div>

        {/* Recent Activity & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div>
                      <p className="font-semibold text-gray-800">To: {tx.receiverName}</p>
                      <p className="text-xs text-gray-600">{new Date(tx.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">-₹{tx.amount}</p>
                      <p className="text-xs text-green-600">+₹{tx.autoSaved} saved</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center py-8">No transactions yet</p>
              )}
            </div>
          </div>

          {/* Financial Tips / AI Insights */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">💡 AI Insights</h3>
              <button
                onClick={onViewInsights}
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-600">
                <p className="text-sm font-semibold text-blue-900">💰 Smart Saving</p>
                <p className="text-xs text-blue-800 mt-1">Every ₹100 saved = 1 tree planted</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-600">
                <p className="text-sm font-semibold text-green-900">🌱 Environmental Impact</p>
                <p className="text-xs text-green-800 mt-1">Your savings reduce carbon footprint</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-600">
                <p className="text-sm font-semibold text-purple-900">📈 Growth Strategy</p>
                <p className="text-xs text-purple-800 mt-1">Consistent micro-savings = wealth building</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
