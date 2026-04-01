import React from 'react';
import { useSmartPay } from '../context/SmartPayContext';

export default function InsightsView({ onClose }) {
  const { insights } = useSmartPay();

  if (!insights || insights.length === 0) return <div>Loading...</div>;

  const getIconForType = (type) => {
    const icons = {
      spending: '💸',
      savings: '💚',
      impact: '🌍',
      pattern: '📊'
    };
    return icons[type] || '💡';
  };

  const getColorClass = (type) => {
    const colors = {
      spending: 'from-red-50 to-orange-50 border-red-200',
      savings: 'from-green-50 to-emerald-50 border-green-200',
      impact: 'from-blue-50 to-cyan-50 border-blue-200',
      pattern: 'from-purple-50 to-pink-50 border-purple-200'
    };
    return colors[type] || 'from-gray-50 to-gray-100 border-gray-200';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">AI Financial Insights</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${getColorClass(insight.type)} border rounded-lg p-4`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    {getIconForType(insight.type)} {insight.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{insight.value}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-3 leading-relaxed">{insight.suggestion}</p>
            </div>
          ))}
        </div>

        {/* Smart Tips Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-bold text-gray-800 mb-3">💡 Smart Tips for Better Savings</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Save consistently every day for better financial health</li>
            <li>✓ Round up payments to nearest 10 for easier tracking</li>
            <li>✓ Set weekly savings target of ₹500</li>
            <li>✓ Each ₹100 saved plants a tree - help the environment!</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
