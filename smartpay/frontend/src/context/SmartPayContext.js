import React, { createContext, useContext, useState, useCallback } from 'react';
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

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });
      setUser(response.data.user);
      // Fetch user details, transactions, and insights
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

  const sendPayment = useCallback(async (receiverName, amount) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/payment/send`, {
        senderId: user.id,
        receiverName,
        amount: parseFloat(amount)
      });
      // Update local state
      setUser(prev => ({
        ...prev,
        balance: response.data.newBalance,
        savingsBalance: response.data.newSavingsBalance
      }));
      // Refresh all data
      await fetchUserData(user.id);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, fetchUserData]);

  const logout = useCallback(() => {
    setUser(null);
    setTransactions([]);
    setInsights([]);
    setSavings(null);
    setError(null);
  }, []);

  return (
    <SmartPayContext.Provider value={{
      user,
      loading,
      error,
      transactions,
      insights,
      savings,
      login,
      signup,
      sendPayment,
      logout,
      fetchUserData
    }}>
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
