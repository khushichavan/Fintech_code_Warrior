import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const SmartPayContext = createContext();

export const SmartPayProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [insights, setInsights] = useState([]);
  const [savings, setSavings] = useState(null);

  // Wallet System
  const [wallet, setWallet] = useState({
    balance: 5000,
    savings: 0,
    invested: 0,
    investmentValue: 0,
  });

  const [expenses, setExpenses] = useState([]);

  // Investment growth simulation
  useEffect(() => {
    const growthInterval = setInterval(() => {
      setWallet(prev => ({
        ...prev,
        investmentValue: Number((prev.investmentValue * 1.001).toFixed(2)), // 0.1% daily growth
      }));
    }, 60000); // Every minute

    return () => clearInterval(growthInterval);
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });
      setUser(response.data.user);
      await fetchUserData(response.data.user.id);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (email, password, name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        email,
        password,
        name
      });
      setUser(response.data.user);
      await fetchUserData(response.data.user.id);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserData = useCallback(async (userId) => {
    try {
      const [userRes, transRes, insRes, savRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/user/${userId}`),
        axios.get(`${API_BASE_URL}/transactions/${userId}`),
        axios.get(`${API_BASE_URL}/insights/${userId}`),
        axios.get(`${API_BASE_URL}/savings/${userId}`)
      ]);
      setUser(userRes.data);
      setTransactions(transRes.data.transactions);
      setInsights(insRes.data.insights);
      setSavings(savRes.data);
    } catch (err) {
      setError('Failed to fetch user data');
    }
  }, []);

  const sendPayment = useCallback((receiverName, amount, investmentAmount) => {
    const roundedUp = Math.ceil(amount);
    const autoSave = investmentAmount || (roundedUp - amount);

    const newTransaction = {
      id: Date.now(),
      description: `Payment to ${receiverName}`,
      amount,
      receiverName,
      roundedUp,
      autoSave,
      timestamp: new Date(),
      status: 'success',
      type: 'payment',
    };

    setExpenses(prev => [newTransaction, ...prev]);

    // Update wallet
    setWallet(prev => ({
      balance: Math.max(0, prev.balance - roundedUp),
      savings: prev.savings + autoSave,
      invested: prev.invested + autoSave,
      investmentValue: prev.investmentValue + autoSave,
    }));

    return newTransaction;
  }, []);

  // Add expense with round-up logic
  const addExpense = useCallback((description, amount, category) => {
    const roundedUp = Math.ceil(amount);
    const autoSave = roundedUp - amount;
    const investThreshold = 10; // Invest savings above ₹10

    const newExpense = {
      id: Date.now(),
      description,
      amount,
      category,
      roundedUp,
      autoSave,
      timestamp: new Date(),
      status: 'success',
    };

    setExpenses(prev => [newExpense, ...prev]);

    // Update wallet
    setWallet(prev => ({
      balance: Math.max(0, prev.balance - roundedUp),
      savings: prev.savings + autoSave,
      invested: prev.invested + (autoSave >= investThreshold ? autoSave : 0),
      investmentValue: prev.investmentValue + (autoSave >= investThreshold ? autoSave : 0),
    }));

    return newExpense;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setTransactions([]);
    setInsights([]);
    setSavings(null);
    setError(null);
    setExpenses([]);
  }, []);

  // Calculate spending insights
  const getSpendingInsights = useCallback(() => {
    if (expenses.length === 0) return [];

    const categorySpending = {};
    expenses.forEach(exp => {
      categorySpending[exp.category] = (categorySpending[exp.category] || 0) + exp.amount;
    });

    const totalSpent = Object.values(categorySpending).reduce((a, b) => a + b, 0);

    return Object.entries(categorySpending)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: ((amount / totalSpent) * 100).toFixed(1),
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses]);

  // Get monthly savings rate
  const getMonthlySavingsRate = useCallback(() => {
    if (expenses.length === 0) return 0;
    const totalSaved = expenses.reduce((sum, exp) => sum + exp.autoSave, 0);
    return totalSaved;
  }, [expenses]);

  return (
    <SmartPayContext.Provider
      value={{
        user,
        loading,
        error,
        transactions,
        insights,
        savings,
        wallet,
        expenses,
        login,
        signup,
        sendPayment,
        logout,
        fetchUserData,
        addExpense,
        getSpendingInsights,
        getMonthlySavingsRate,
      }}
    >
      {children}
    </SmartPayContext.Provider>
  );
};

export const useSmartPay = () => {
  const context = useContext(SmartPayContext);
  if (!context) {
    throw new Error('useSmartPay must be used within SmartPayProvider');
  }
  return context;
};
