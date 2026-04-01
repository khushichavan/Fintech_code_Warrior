import React from 'react';
import { useSmartPay } from '../context/SmartPayContext';

export default function SavingsView({ onClose }) {
  const { savings } = useSmartPay();

  if (!savings) return <div>Loading...</div>;

  const savingsPercentage = Math.min((savings.savingsBalance / (savings.savingsBalance + 1000)) * 100, 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Savings Wallet</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ✕
          </button>
        </div>

        {/* Main Savings Amount */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 mb-6 text-center">
          <p className="text-green-100 text-sm mb-2">Current Savings Balance</p>
          <h3 className="text-5xl font-bold mb-2">₹{savings.savingsBalance}</h3>
          <p className="text-green-100">+₹{savings.totalSaved} total saved</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Savings Progress</span>
            <span className="text-sm font-semibold text-gray-700">{Math.round(savingsPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-500"
              style={{ width: `${savingsPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6 border border-green-200">
          <h4 className="font-bold text-gray-800 mb-4">🌱 Environmental Impact</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{savings.treesPlanted}</p>
              <p className="text-sm text-gray-600 mt-1">Trees Planted</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{savings.co2Offset} kg</p>
              <p className="text-sm text-gray-600 mt-1">CO₂ Offset</p>
            </div>
          </div>
        </div>

        {/* Savings Details */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Auto-Save Rate per Transaction:</span>
            <span className="font-bold text-gray-800">₹{savings.savingRate} or 3%</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Conversion Rate:</span>
            <span className="font-bold text-gray-800">₹100 = 1 🌱</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
