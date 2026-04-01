# 🚀 AI SmartPay - Payment + Micro-Savings Web App

A full-stack fintech web application designed for students with integrated payment and micro-savings features.

## 📋 Features

✅ **Authentication**
- Simple login/signup system
- Pre-configured demo accounts

✅ **Payment Module**
- Send money between users (mock UPI-style)
- Auto-savings triggered on each transaction
- Real-time balance updates

✅ **Savings System**
- Separate savings wallet
- Automatic micro-savings (₹10 per transaction)
- Track savings progress

✅ **Dashboard**
- User balance card with main wallet
- Savings wallet display
- Recent transactions list
- Quick financial stats

✅ **AI Insights**
- Rule-based financial suggestions
- Daily/weekly spending analysis
- Smart saving tips

✅ **Environmental Impact**
- Visual representation of savings impact
- Convert savings to planted trees
- CO₂ offset tracking

## 🛠️ Tech Stack

- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: In-memory mock database (easily replaceable with MongoDB/Firebase)
- **API**: RESTful architecture with CORS support

## 📦 Project Structure

```
smartpay/
├── backend/
│   ├── server.js           # Express server with all APIs
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context API for state management
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

## 📝 Demo Credentials

| Email | Password | Wallet |
|-------|----------|--------|
| student1@example.com | password123 | ₹5000 |
| student2@example.com | password123 | ₹3500 |

Or use **Demo Login** button for quick access.

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Create new account

### User
- `GET /api/user/:userId` - Get user details

### Payments
- `POST /api/payment/send` - Send money
- `GET /api/transactions/:userId` - Get transaction history

### Savings
- `GET /api/savings/:userId` - Get savings details

### Insights
- `GET /api/insights/:userId` - Get AI insights

### Health
- `GET /api/health` - Check backend status

## 💡 Key Features Explained

### Auto-Savings Logic
Every transaction automatically saves ₹10 or 3% of the amount (whichever is smaller).

Example:
- Send ₹500 → Auto-save ₹10
- Send ₹100 → Auto-save ₹3

### Environmental Impact
- ₹100 saved = 1 tree planted
- 1 tree = 25kg CO₂ offset

### Financial Insights
- Daily spending analysis
- Weekly spending patterns
- Personalized saving recommendations
- Environmental impact tracking

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile
- **Gradient Cards**: Modern fintech aesthetic
- **Real-time Updates**: Auto-refresh data every 5 seconds
- **Success Notifications**: Toast messages for actions
- **Modal Dialogs**: Clean popup interfaces

## 🔐 Security Notes

This is a demo application with mock authentication. For production:
- Use Firebase Authentication or JWT
- Implement proper password hashing
- Add rate limiting
- Use HTTPS
- Implement proper input validation

## 📱 UI Screenshots Preview

- **Login Page**: Gradient background with auth form
- **Dashboard**: Balance cards, recent transactions, insights
- **Send Money Modal**: Easy payment form with auto-save info
- **Savings View**: Savings wallet with tree count and CO₂ offset
- **Insights Modal**: AI-generated financial suggestions

## 🎯 Future Enhancements

- Real backend database (MongoDB/Firebase)
- Bill splitting feature
- Monthly budget planner
- Advanced analytics with charts
- Mobile app version
- Actual financial APIs integration
- User profiles and settings
- Transaction receipts
- Group payments

## 🤝 Contributing

Feel free to fork and improve this project!

## 📄 License

MIT License - Free for educational and commercial use

---

**Built with ❤️ for students who want to save smarter!**
