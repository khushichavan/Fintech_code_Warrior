# 🏗️ Architecture & API Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Browser (React SPA)                   │
│  Components: Auth, Dashboard, Modals, Context API       │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP/CORS
                      │
┌─────────────────────▼───────────────────────────────────┐
│              Express.js Backend (Node.js)               │
│  ├─ Authentication Routes                              │
│  ├─ Payment Routes                                      │
│  ├─ Savings Routes                                      │
│  ├─ Analytics/Insights Routes                           │
│  └─ Mock Database (In-Memory)                           │
└─────────────────────────────────────────────────────────┘
```

## Frontend Architecture

```
src/
├── components/
│   ├── AuthPage.js          # Login/Signup
│   ├── Dashboard.js         # Main dashboard view
│   ├── SendPaymentModal.js  # Payment form
│   ├── SavingsView.js       # Savings details
│   └── InsightsView.js      # Financial insights
├── context/
│   └── SmartPayContext.js   # Global state management
├── App.js                   # Main app component
├── index.js                 # React entry point
└── App.css                  # Styles
```

## Backend Architecture

```
server.js
├── Middleware
│   ├─ CORS
│   └─ JSON Parser
├── Mock Database
│   ├─ mockUsers {}
│   └─ allTransactions []
├── Auth Routes
│   ├─ POST /api/auth/login
│   └─ POST /api/auth/signup
├── Payment Routes
│   ├─ POST /api/payment/send
│   └─ GET /api/transactions/:userId
├── User Routes
│   └─ GET /api/user/:userId
├── Savings Routes
│   └─ GET /api/savings/:userId
├── Insights Routes
│   └─ GET /api/insights/:userId
└─ Health Check
   └─ GET /api/health
```

## API Endpoints Reference

### 1. Authentication

#### Login
```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "student1@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "user": {
    "id": "user1",
    "email": "student1@example.com",
    "name": "Rahul Kumar",
    "balance": 5000,
    "savingsBalance": 500
  }
}
```

#### Signup
```
POST /api/auth/signup
Content-Type: application/json

Request:
{
  "email": "newstudent@example.com",
  "password": "password123",
  "name": "New Student"
}

Response (200):
{
  "success": true,
  "user": {
    "id": "user3",
    "email": "newstudent@example.com",
    "name": "New Student",
    "balance": 5000,
    "savingsBalance": 0
  }
}
```

### 2. Payment Routes

#### Send Payment
```
POST /api/payment/send
Content-Type: application/json

Request:
{
  "senderId": "user1",
  "receiverName": "Priya Singh",
  "amount": 500
}

Response (200):
{
  "success": true,
  "message": "Payment sent successfully",
  "transaction": {
    "id": "uuid",
    "type": "payment",
    "senderId": "user1",
    "senderName": "Rahul Kumar",
    "receiverName": "Priya Singh",
    "amount": 500,
    "autoSaved": 10,
    "timestamp": "2024-01-15T10:30:00Z",
    "status": "completed"
  },
  "newBalance": 4490,
  "newSavingsBalance": 510
}
```

#### Get Transactions
```
GET /api/transactions/user1

Response (200):
{
  "transactions": [
    {
      "id": "uuid",
      "type": "payment",
      "senderId": "user1",
      "senderName": "Rahul Kumar",
      "receiverName": "Priya Singh",
      "amount": 500,
      "autoSaved": 10,
      "timestamp": "2024-01-15T10:30:00Z",
      "status": "completed"
    }
  ]
}
```

### 3. User Routes

#### Get User Details
```
GET /api/user/user1

Response (200):
{
  "id": "user1",
  "email": "student1@example.com",
  "name": "Rahul Kumar",
  "balance": 4490,
  "savingsBalance": 510,
  "savingsDetails": {
    "totalSaved": 510,
    "savingRate": 10,
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

### 4. Savings Routes

#### Get Savings Details
```
GET /api/savings/user1

Response (200):
{
  "savingsBalance": 510,
  "totalSaved": 510,
  "savingRate": 10,
  "treesPlanted": 5,
  "co2Offset": 125,
  "lastUpdated": "2024-01-15T10:30:00Z"
}
```

### 5. Insights Routes

#### Get Financial Insights
```
GET /api/insights/user1

Response (200):
{
  "insights": [
    {
      "type": "spending",
      "title": "Daily Spending",
      "value": "₹500",
      "suggestion": "You spent ₹500 today. You could save ₹50."
    },
    {
      "type": "savings",
      "title": "Weekly Savings",
      "value": "₹510",
      "suggestion": "Great job! Keep saving consistently."
    },
    {
      "type": "impact",
      "title": "Environmental Impact",
      "value": "5 🌱",
      "suggestion": "Your savings have helped plant trees!"
    }
  ]
}
```

### 6. Health Check

#### Backend Status
```
GET /api/health

Response (200):
{
  "status": "Backend is running!"
}
```

## Data Models

### User Model
```javascript
{
  id: string,                    // unique identifier
  email: string,                 // user email
  password: string,              // plaintext (demo only!)
  name: string,                  // user full name
  balance: number,               // main wallet balance
  savingsBalance: number,        // savings wallet balance
  transactions: Transaction[],   // transaction history
  savingsDetails: {
    totalSaved: number,          // cumulative savings
    savingRate: number,          // ₹ saved per transaction
    lastUpdated: Date
  }
}
```

### Transaction Model
```javascript
{
  id: string,                    // UUID
  type: 'payment',              // transaction type
  senderId: string,             // sender user ID
  senderName: string,           // sender full name
  receiverName: string,         // receiver name
  amount: number,               // transaction amount
  autoSaved: number,            // amount auto-saved
  timestamp: Date,              // transaction time
  status: 'completed'           // transaction status
}
```

### Insight Model
```javascript
{
  type: 'spending'|'savings'|'impact'|'pattern',
  title: string,                // insight title
  value: string,                // display value
  suggestion: string            // actionable advice
}
```

## Auto-Savings Logic

The system automatically saves money from each transaction:

```
autoSave = minimum($10, amount * 0.03)

Examples:
- ₹100 transaction → save ₹3 (3% of 100)
- ₹500 transaction → save ₹10 (capped at max)
- ₹1000 transaction → save ₹10 (capped at max)
```

## Environmental Impact Calculation

```
treesPlanted = floor(savingsBalance / 100)

For each tree:
- CO₂ offset = 25 kg
- Example: ₹500 saved = 5 trees = 125 kg CO₂ offset
```

## Insight Generation Algorithm

The system generates insights based on:

1. **Daily Spending**: Sum of transactions today
2. **Potential Savings**: 10% of daily spending
3. **Weekly Analysis**: Transactions from last 7 days
4. **Savings Impact**: Trees and CO₂ from savings
5. **Spending Patterns**: Average transaction size

## Error Handling

All endpoints return standard error responses:

```
Response (400):
{
  "message": "Error description"
}

Response (404):
{
  "message": "User not found"
}

Response (401):
{
  "message": "Invalid credentials"
}
```

## State Management

Frontend uses React Context API for:
- User data (logged-in user info)
- Transactions (history)
- Savings data
- Insights
- Loading/error states

Context provides hooks:
- `useSmartPay()` - Access all state and methods

## Performance Considerations

- Dashboard auto-refreshes every 5 seconds
- Frontend caches API responses
- Backend uses mock in-memory database
- No database queries (instant response)
- API response time: < 50ms

## Scaling Suggestions

To scale this to production:

1. **Replace Mock DB**: Use MongoDB/Firebase
2. **Add Authentication**: Implement JWT/OAuth
3. **API Gateway**: Use Kong/AWS API Gateway
4. **Caching**: Add Redis for frequently accessed data
5. **Real Payments**: Integrate Razorpay/Stripe API
6. **Analytics**: Use Mixpanel/Amplitude
7. **Monitoring**: Add Sentry/New Relic

## Example Usage Flow

```
1. User opens app → AuthPage component
2. User logs in → API call to /api/auth/login
3. Login successful → SmartPayContext updates, redirect to Dashboard
4. Dashboard loads user data → API calls to /api/user, /api/transactions, /api/insights
5. User clicks "Send Money" → SendPaymentModal opens
6. User enters details → API call to /api/payment/send
7. Payment processed → Auto-save triggered
8. Success notification → Dashboard auto-refreshes with new data
9. User sees updated balance and transactions
10. User checks "View Details" → SavingsView modal shows impact
```

---

**This architecture is designed for easy extension and scaling!**
