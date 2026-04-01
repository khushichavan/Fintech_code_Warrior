// Format currency
export const formatCurrency = (amount, symbol = '₹') => {
  return `${symbol}${Number(amount).toFixed(2)}`;
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Calculate round-up savings
export const calculateRoundUp = (amount) => {
  const roundedUp = Math.ceil(amount);
  const savings = roundedUp - amount;
  return { roundedUp, savings };
};

// Get spending category icon
export const getCategoryIcon = (category) => {
  const icons = {
    food: '🍔',
    transport: '🚗',
    entertainment: '🎬',
    shopping: '🛍️',
    utilities: '💡',
    health: '🏥',
    other: '📌',
  };
  return icons[category] || icons.other;
};

// Get spending advice based on category
export const getSpendingAdvice = (category, amount) => {
  const adviceMap = {
    food: 'Consider meal planning to reduce food expenses. Cooking at home can save up to 60%.',
    transport: 'Use public transport more often. It\'s cheaper and eco-friendly.',
    entertainment: 'Limit entertainment expenses by using free alternatives.',
    shopping: 'Wait 48 hours before making purchases. You might save money.',
    utilities: 'Monitor your utility consumption to reduce bills.',
    health: 'Invest in preventive health care to avoid expensive treatments.',
    other: 'Track your miscellaneous spending to identify savings opportunities.',
  };
  return adviceMap[category] || adviceMap.other;
};

// Investment growth calculator
export const calculateInvestmentValue = (principal, monthsPassed) => {
  const monthlyRate = 0.08 / 12; // 8% annual return
  return Number((principal * Math.pow(1 + monthlyRate, monthsPassed)).toFixed(2));
};

// Financial tips for learning
export const financialTips = [
  {
    title: '50-30-20 Rule',
    description: 'Allocate 50% to needs, 30% to wants, and 20% to savings.',
    icon: '📊',
  },
  {
    title: 'Emergency Fund',
    description: 'Save 3-6 months of expenses for emergencies.',
    icon: '🛡️',
  },
  {
    title: 'Compound Interest',
    description: 'Start investing early to benefit from compound interest over time.',
    icon: '📈',
  },
  {
    title: 'Budget Tracking',
    description: 'Track every expense to understand your spending patterns.',
    icon: '📝',
  },
  {
    title: 'Avoid Debt',
    description: 'Pay off high-interest loans as soon as possible.',
    icon: '⚠️',
  },
  {
    title: 'Diversify Investments',
    description: 'Don\'t put all your money in one investment. Spread the risk.',
    icon: '🎯',
  },
];

// Quiz questions
export const quizQuestions = [
  {
    id: 1,
    question: 'What is the benefit of compound interest?',
    options: [
      'Your money grows exponentially over time',
      'You pay less taxes',
      'You can withdraw anytime',
      'There is no benefit',
    ],
    correct: 0,
    explanation: 'Compound interest means earning interest on your interest, leading to exponential growth.',
  },
  {
    id: 2,
    question: 'What should your emergency fund cover?',
    options: [
      '1 month of expenses',
      '3-6 months of expenses',
      '1 year of expenses',
      'No need for emergency fund',
    ],
    correct: 1,
    explanation: 'Financial experts recommend maintaining 3-6 months of living expenses as an emergency fund.',
  },
  {
    id: 3,
    question: 'Which is the best way to invest money?',
    options: [
      'Put all in one investment',
      'Keep all in cash',
      'Diversify investments across different assets',
      'Invest only in stocks',
    ],
    correct: 2,
    explanation: 'Diversification reduces risk by spreading investments across different asset classes.',
  },
];
