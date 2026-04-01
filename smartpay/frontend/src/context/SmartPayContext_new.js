import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const SmartPayContext = createContext();

// ✅ Round to nearest ₹10
const roundToNearest10 = (amount) => {
  return Math.ceil(amount / 10) * 10;
};

// ✅ AI Insights
const generateAIInsights = (expenses, wallet) => {
  if (expenses.length === 0) return [];

  const insights = [];

  const totalSaved = expenses.reduce((sum, exp) => sum + (exp.autoSave || 0), 0);

  if (totalSaved > 0) {
    insights.push({
      id: 'roundup',
      type: 'success',
      title: '💚 Smart Saving',
      description: `You saved ₹${totalSaved.toFixed(0)} automatically!`,
    });
  }

  if (wallet.invested > 0) {
    insights.push({
      id: 'growth',
      type: 'info',
      title: '📈 Investment Growth',
      description: `Your investments are growing steadily.`,
    });
  }

  return insights;
};

// ✅ MAIN PROVIDER
export const SmartPayProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const [insights, setInsights] = useState([]);
  const [savings, setSavings] = useState(null);

  const [wallet, setWallet] = useState({
    balance: 5000,
    savings: 0,
    invested: 0,
    investmentValue: 0,
  });

  const [expenses, setExpenses] = useState([]);

  // 📈 Investment Growth
  useEffect(() => {
    const interval = setInterval(() => {
      setWallet(prev => ({
        ...prev,
        investmentValue: Number((prev.investmentValue * 1.001).toFixed(2)),
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // 🔐 LOGIN (NEW)
  const login = useCallback(async (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simple validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Demo login (no backend required)
      const demoUser = {
        id: Date.now(),
        name: "Student User",
        email,
        createdAt: new Date(),
      };

      setUser(demoUser);
      setError(null);

      return { success: true, user: demoUser };
    } catch (err) {
      const errorMsg = err.message || 'Login failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // 📝 SIGNUP (NEW)
  const signup = useCallback(async (email, password, name) => {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validation
      if (name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email');
      }

      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email,
        createdAt: new Date(),
      };

      setUser(newUser);
      setError(null);

      return { success: true, user: newUser };
    } catch (err) {
      const errorMsg = err.message || 'Signup failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // � LOGOUT (NEW)
  const logout = useCallback(async () => {
    setUser(null);
    setError(null);
    setExpenses([]);
    setWallet({
      balance: 5000,
      savings: 0,
      invested: 0,
      investmentValue: 0,
    });
    return { success: true };
  }, []);

  // �💳 Send Payment
  const sendPayment = useCallback((receiverName, amount) => {
    const roundedUp = roundToNearest10(amount);
    const autoSave = roundedUp - amount;

    const newTransaction = {
      id: Date.now(),
      description: `Payment to ${receiverName}`,
      amount,
      roundedUp,
      autoSave,
      timestamp: new Date(),
    };

    setExpenses(prev => [newTransaction, ...prev]);

    setWallet(prev => ({
      ...prev,
      balance: prev.balance - roundedUp,
      savings: prev.savings + autoSave,
      invested: prev.invested + autoSave,
      investmentValue: prev.investmentValue + autoSave,
    }));

  }, []);

  // ➕ Add Expense
  const addExpense = useCallback((description, amount, category) => {
    const roundedUp = roundToNearest10(amount);
    const autoSave = roundedUp - amount;

    const newExpense = {
      id: Date.now(),
      description,
      amount,
      category,
      roundedUp,
      autoSave,
      timestamp: new Date(),
    };

    setExpenses(prev => [newExpense, ...prev]);

    setWallet(prev => ({
      ...prev,
      balance: prev.balance - roundedUp,
      savings: prev.savings + autoSave,
      invested: prev.invested + autoSave,
      investmentValue: prev.investmentValue + autoSave,
    }));

  }, []);

  const getMonthlySavingsRate = useCallback(() => {
    return expenses.reduce((sum, exp) => sum + (exp.autoSave || 0), 0);
  }, [expenses]);

  const getAIInsights = useCallback(() => {
    return generateAIInsights(expenses, wallet);
  }, [expenses, wallet]);

  return (
    <SmartPayContext.Provider
      value={{
        user,
        loading,
        error,
        wallet,
        expenses,

        // ✅ AUTH
        login,
        signup,
        logout,

        // ✅ FEATURES
        sendPayment,
        addExpense,
        getMonthlySavingsRate,
        getAIInsights,
      }}
    >
      {children}
    </SmartPayContext.Provider>
  );
};

// ✅ Hook
export const useSmartPay = () => {
  const context = useContext(SmartPayContext);
  if (!context) {
    throw new Error('useSmartPay must be used within SmartPayProvider');
  }
  return context;
};