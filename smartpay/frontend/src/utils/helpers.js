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

// Financial tips for learning - College Student Focused
export const financialTips = [
  {
    title: 'Round-up Investing',
    description: 'Invest loose change from everyday purchases. ₹2-5 daily turns into ₹20K+ in 4 years!',
    icon: '💰',
  },
  {
    title: 'Emergency Fund',
    description: 'Save 3-6 months of expenses. For students: ₹5K-₹10K safety net.',
    icon: '🛡️',
  },
  {
    title: 'Early Bird Advantage',
    description: 'Start investing at 20 vs 30: ₹3x more wealth by 60 (thanks to compounding).',
    icon: '📈',
  },
  {
    title: 'Track Campus Spending',
    description: 'Know where your money goes. Average student saves 20% just by tracking.',
    icon: '📝',
  },
  {
    title: 'Avoid Student Debt',
    description: 'Every ₹1 of education loan = ₹1.5 repayment. Plan carefully!',
    icon: '⚠️',
  },
  {
    title: 'Index Fund Magic',
    description: 'Diversified easy investing. Historically beat 80% of active traders.',
    icon: '🎯',
  },
  {
    title: 'The Power of ₹1',
    description: 'Invest ₹1 daily at 10% returns: ₹1,30,000 in 30 years!',
    icon: '✨',
  },
  {
    title: 'Peer Challenge',
    description: 'Join savings challenges with friends. Social accountability = higher success!',
    icon: '👥',
  },
];

// Comprehensive Quiz Questions - Gamified Learning
export const quizQuestions = [
  {
    id: 1,
    question: 'What is compound interest?',
    options: [
      'Earning interest on your interest - money grows exponentially',
      'A type of savings account',
      'Interest you pay on loans',
      'A strategy to avoid taxes',
    ],
    correct: 0,
    explanation: 'Compound interest is when your earnings generate their own earnings. Einstein called it the 8th wonder! A ₹100 investment at 10% annual returns becomes ₹259 in 10 years.',
  },
  {
    id: 2,
    question: 'You\'re a college student with limited funds. What\'s your best emergency fund?',
    options: [
      '₹50,000',
      '₹5,000-₹10,000 (1-2 months expenses)',
      'No need - parents will help',
      '₹100,000',
    ],
    correct: 1,
    explanation: 'For students, 1-2 months of expenses (≈₹5K-₹10K) is a realistic emergency fund. Build from there as income increases.',
  },
  {
    id: 3,
    question: 'If you save ₹5 daily from round-ups, how much by end of 4 years?',
    options: [
      '₹7,300',
      '₹20,000+ (with 5-10% growth)',
      '₹5,000',
      'Depends on inflation',
    ],
    correct: 1,
    explanation: '₹5 daily = ₹150/month = ₹1,800/year. With 5-10% annual returns (market average), you\'d have ₹20,000-₹24,000 in 4 years!',
  },
  {
    id: 4,
    question: 'Best way to diversify as a student investor?',
    options: [
      'Put all money in one stock',
      'Keep all cash (safest)',
      'Diversified index fund (50% equity, 50% bonds)',
      'Only invest in crypto',
    ],
    correct: 2,
    explanation: 'A balanced index fund reduces risk while giving you market participation. Historically, 70% of traders underperform index funds.',
  },
  {
    id: 5,
    question: 'What is the 50-30-20 budget rule?',
    options: [
      '50% taxes, 30% savings, 20% spending',
      '50% needs, 30% wants, 20% savings',
      '50% spending, 30% taxes, 20% needs',
      'It\'s outdated - ignore it',
    ],
    correct: 1,
    explanation: 'This classic rule helps balance spending: 50% for essentials, 30% for lifestyle, 20% for savings. Perfect for student budgeting!',
  },
  {
    id: 6,
    question: 'If you invest ₹100 at age 20 vs 30 (both at 10% annual returns), what\'s the difference by age 60?',
    options: [
      'About 2x more money at age 20',
      'About 3-4x more money at age 20',
      'No significant difference',
      'Double compared to starting late',
    ],
    correct: 1,
    explanation: 'Time is your superpower! Starting at 20 gives you 40 years vs 30 years. Due to compounding, you\'d have ~₹4,700 vs ~₹1,500. That\'s 3x more wealth!',
  },
  {
    id: 7,
    question: 'What\'s an example of good campus spending to avoid?',
    options: [
      'Books and study materials',
      'Food for health',
      'Daily ₹200 coffee when dorm coffee is free',
      'Transport to attend classes',
    ],
    correct: 2,
    explanation: '₹200/day coffee = ₹6,000/month = ₹72,000/year. That\'s ₹2.8 lakh by graduation! Cutting unnecessary habits creates investment capital.',
  },
  {
    id: 8,
    question: 'According to this app, what happens to your round-ups?',
    options: [
      'They stay in your wallet',
      'Automatically invested in a diversified portfolio',
      'Lost to your bank',
      'Kept separately you decide later',
    ],
    correct: 1,
    explanation: 'SmartPay auto-invests round-ups immediately. Spend ₹28 → rounds to ₹30 → ₹2 auto-invested. No friction = better savings habits!',
  },
];

// Gamified Achievements/Badges
export const achievements = [
  {
    id: 'first_expense',
    title: 'First Step',
    description: 'Log your first expense',
    icon: '🎯',
    reward: '10 XP',
  },
  {
    id: 'investment_100',
    title: 'Century Club',
    description: 'Invest ₹100 through round-ups',
    icon: '💯',
    reward: '50 XP',
  },
  {
    id: 'investment_1000',
    title: 'Four-Figure Fortune',
    description: 'Invest ₹1,000+',
    icon: '🏆',
    reward: '200 XP',
  },
  {
    id: 'quiz_master',
    title: 'Financial Genius',
    description: 'Score 100% on a quiz',
    icon: '🧠',
    reward: '100 XP',
  },
  {
    id: 'streak_7',
    title: '7-Day Habit',
    description: 'Log expenses 7 days straight',
    icon: '🔥',
    reward: '75 XP',
  },
  {
    id: 'challenge_winner',
    title: 'Challenge Champion',
    description: 'Win a peer savings challenge',
    icon: '👑',
    reward: '150 XP',
  },
  {
    id: 'financier',
    title: 'Young Financier',
    description: 'Complete all financial literacy quizzes',
    icon: '📚',
    reward: '300 XP',
  },
  {
    id: 'millionaire_dream',
    title: 'Millionaire in Making',
    description: 'Portfolio value reaches ₹50,000',
    icon: '💎',
    reward: '500 XP',
  },
];
