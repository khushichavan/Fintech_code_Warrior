const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database
const mockUsers = {
  'user1': {
    id: 'user1',
    email: 'student1@example.com',
    password: 'password123',
    name: 'Rahul Kumar',
    balance: 5000,
    savingsBalance: 500,
    transactions: [],
    savingsDetails: {
      totalSaved: 500,
      savingRate: 10,
      lastUpdated: new Date()
    }
  },
  'user2': {
    id: 'user2',
    email: 'student2@example.com',
    password: 'password123',
    name: 'Priya Singh',
    balance: 3500,
    savingsBalance: 250,
    transactions: [],
    savingsDetails: {
      totalSaved: 250,
      savingRate: 10,
      lastUpdated: new Date()
    }
  }
};

const allTransactions = [];

// ==================== AUTH ROUTES ====================

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = Object.values(mockUsers).find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      balance: user.balance,
      savingsBalance: user.savingsBalance
    }
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { email, password, name } = req.body;

  const existingUser = Object.values(mockUsers).find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUserId = 'user' + (Object.keys(mockUsers).length + 1);
  mockUsers[newUserId] = {
    id: newUserId,
    email,
    password,
    name,
    balance: 5000,
    savingsBalance: 0,
    transactions: [],
    savingsDetails: {
      totalSaved: 0,
      savingRate: 10,
      lastUpdated: new Date()
    }
  };

  res.json({
    success: true,
    user: {
      id: newUserId,
      email,
      name,
      balance: 5000,
      savingsBalance: 0
    }
  });
});

// ==================== USER ROUTES ====================

app.get('/api/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = mockUsers[userId];

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    balance: user.balance,
    savingsBalance: user.savingsBalance,
    savingsDetails: user.savingsDetails
  });
});

// ==================== PAYMENT ROUTES ====================

app.post('/api/payment/send', (req, res) => {
  const { senderId, receiverName, amount } = req.body;

  if (!mockUsers[senderId]) {
    return res.status(404).json({ message: 'Sender not found' });
  }

  const sender = mockUsers[senderId];

  if (sender.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  // Auto-save calculation (₹10 per transaction or 3% of amount)
  const autoSave = Math.min(10, Math.floor(amount * 0.03));

  // Deduct from sender (including savings)
  sender.balance -= amount;
  sender.savingsBalance += autoSave;
  sender.savingsDetails.totalSaved += autoSave;

  // Find receiver (mock)
  const receiver = Object.values(mockUsers).find(u => u.name.toLowerCase() === receiverName.toLowerCase());
  if (receiver) {
    receiver.balance += amount;
  }

  // Create transaction
  const transaction = {
    id: uuidv4(),
    type: 'payment',
    senderId,
    senderName: sender.name,
    receiverName,
    amount,
    autoSaved: autoSave,
    timestamp: new Date(),
    status: 'completed'
  };

  sender.transactions.push(transaction);
  allTransactions.push(transaction);

  res.json({
    success: true,
    message: 'Payment sent successfully',
    transaction,
    newBalance: sender.balance,
    newSavingsBalance: sender.savingsBalance
  });
});

app.get('/api/transactions/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = mockUsers[userId];

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    transactions: user.transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  });
});

// ==================== SAVINGS ROUTES ====================

app.get('/api/savings/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = mockUsers[userId];

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const treesPlanted = Math.floor(user.savingsBalance / 100);

  res.json({
    savingsBalance: user.savingsBalance,
    totalSaved: user.savingsDetails.totalSaved,
    savingRate: user.savingsDetails.savingRate,
    treesPlanted,
    co2Offset: treesPlanted * 25, // 25kg CO2 per tree
    lastUpdated: user.savingsDetails.lastUpdated
  });
});

// ==================== ANALYTICS / INSIGHTS ROUTES ====================

app.get('/api/insights/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = mockUsers[userId];

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Calculate daily spending
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTransactions = user.transactions.filter(t => {
    const tDate = new Date(t.timestamp);
    tDate.setHours(0, 0, 0, 0);
    return tDate.getTime() === today.getTime();
  });

  const dailySpending = todayTransactions.reduce((sum, t) => sum + t.amount, 0);
  const potentialSavings = Math.floor(dailySpending * 0.1);

  // Calculate weekly spending
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - 7);
  const weeklyTransactions = user.transactions.filter(t => new Date(t.timestamp) >= weekStart);
  const weeklySpending = weeklyTransactions.reduce((sum, t) => sum + t.amount, 0);

  const insights = [
    {
      type: 'spending',
      title: 'Daily Spending',
      value: `₹${dailySpending}`,
      suggestion: `You spent ₹${dailySpending} today. You could save ₹${potentialSavings}.`
    },
    {
      type: 'savings',
      title: 'Weekly Savings',
      value: `₹${user.savingsDetails.totalSaved}`,
      suggestion: 'Great job! Keep saving consistently. Small amounts add up quickly!'
    },
    {
      type: 'impact',
      title: 'Environmental Impact',
      value: `${Math.floor(user.savingsBalance / 100)} 🌱`,
      suggestion: 'Your savings have helped plant trees! Every ₹100 = 1 tree.'
    }
  ];

  // Add spending pattern
  if (weeklySpending > 0) {
    const avgTransaction = weeklySpending / weeklyTransactions.length;
    insights.push({
      type: 'pattern',
      title: 'Spending Pattern',
      value: `₹${Math.floor(avgTransaction)}/transaction`,
      suggestion: `Your average transaction is ₹${Math.floor(avgTransaction)}. Consider smaller frequent payments.`
    });
  }

  res.json({ insights });
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`SmartPay Backend running on http://localhost:${PORT}`);
});
