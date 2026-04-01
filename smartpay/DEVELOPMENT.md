# 🔧 Development & Customization Guide

## Project Structure Deep Dive

### Backend Files

#### `server.js` - Main Application
The heart of your application with all microservices:

**Sections**:
1. **Middleware Setup** (lines 10-13)
   - CORS configuration
   - JSON body parser

2. **Mock Database** (lines 15-55)
   - Pre-loaded users: user1, user2
   - Transaction history
   - Savings details

3. **Authentication Routes** (lines 57-116)
   - `/api/auth/login` - User login
   - `/api/auth/signup` - New user registration

4. **User Routes** (lines 118-134)
   - `/api/user/:userId` - Get user profile

5. **Payment Routes** (lines 136-200)
   - `/api/payment/send` - Send money + auto-save
   - `/api/transactions/:userId` - Get transaction history

6. **Savings Routes** (lines 202-225)
   - `/api/savings/:userId` - Savings details with tree count

7. **Insights Routes** (lines 227-287)
   - `/api/insights/:userId` - AI-generated insights

8. **Health Check** (lines 289-295)
   - `/api/health` - Backend status

### Frontend Files

#### `src/context/SmartPayContext.js` - Global State
Centralized state management using React Context:

**Exports**:
- `SmartPayProvider` - Wrapper component
- `useSmartPay()` - Hook to access state

**State**:
- `user` - Current logged-in user
- `loading` - API call status
- `error` - Error messages
- `transactions` - User's transaction history
- `insights` - Financial insights
- `savings` - Savings wallet details

**Functions**:
- `login(email, password)` - User authentication
- `signup(email, password, name)` - New account
- `sendPayment(receiverName, amount)` - Send money
- `logout()` - Clear state
- `fetchUserData(userId)` - Refresh all data

#### `src/components/AuthPage.js` - Authentication
Login and signup interface:

**Features**:
- Email/password form
- Toggle between login and signup
- Pre-filled demo credentials
- "Demo Login" quick button

**Props**:
- `setIsLoggedIn` - Callback to update auth state

#### `src/components/Dashboard.js` - Main Dashboard
Main application view after login:

**Displays**:
- User welcome message
- Balance card (main wallet)
- Savings card
- Statistics (total spent, transactions)
- Recent transactions list
- AI insights preview
- Logout button

**Props**:
- `onSendPayment` - Open payment modal
- `onViewSavings` - Open savings view
- `onViewInsights` - Open insights modal
- `onLogout` - Logout handler

**Features**:
- Auto-refresh every 5 seconds
- Real-time balance updates

#### `src/components/SendPaymentModal.js` - Payment Form
Modal for sending payments:

**Inputs**:
- Receiver name
- Amount
- Shows available balance

**Features**:
- Auto-save preview
- Validation (amount > 0, sufficient balance)
- Success notification
- Error handling

#### `src/components/SavingsView.js` - Savings Details
Display savings wallet information:

**Displays**:
- Current savings balance
- Total saved (cumulative)
- Progress bar (0-100%)
- Trees planted count
- CO₂ offset calculation
- Savings rate info

#### `src/components/InsightsView.js` - Financial Insights
Show AI-generated financial tips:

**Displays**:
- Daily spending analysis
- Weekly spending patterns
- Environmental impact
- Smart tips for saving

**Customizable**:
- Tip suggestions (lines 45-48)

## Customization Guide

### 1. Change Savings Rate

In `backend/server.js`, line 179:
```javascript
// Current: ₹10 or 3%, whichever is lower
const autoSave = Math.min(10, Math.floor(amount * 0.03));

// Change to: 5% of amount
const autoSave = Math.floor(amount * 0.05);

// Or: Fixed ₹5 per transaction
const autoSave = 5;
```

### 2. Change Tree Conversion Rate

In `backend/server.js`, line 213:
```javascript
// Current: ₹100 = 1 tree
const treesPlanted = Math.floor(user.savingsBalance / 100);

// Change to: ₹200 = 1 tree
const treesPlanted = Math.floor(user.savingsBalance / 200);

// Or: ₹50 = 1 tree
const treesPlanted = Math.floor(user.savingsBalance / 50);
```

### 3. Modify UI Colors

In React components, update Tailwind classes:

**Example - Change primary color from blue to cyan:**

Before:
```jsx
className="bg-blue-600 hover:bg-blue-700"
```

After:
```jsx
className="bg-cyan-600 hover:bg-cyan-700"
```

### 4. Change Dashboard Refresh Rate

In `src/components/Dashboard.js`, line 11:
```javascript
// Current: 5 seconds
const interval = setInterval(() => fetchUserData(user.id), 5000);

// Change to: 10 seconds
const interval = setInterval(() => fetchUserData(user.id), 10000);

// Or: No auto-refresh (comment out interval)
// const interval = setInterval(() => fetchUserData(user.id), 5000);
```

### 5. Add New Demo Users

In `backend/server.js`, line 17, add to `mockUsers`:
```javascript
'user3': {
  id: 'user3',
  email: 'newuser@example.com',
  password: 'password123',
  name: 'New User',
  balance: 5000,
  savingsBalance: 0,
  transactions: [],
  savingsDetails: {
    totalSaved: 0,
    savingRate: 10,
    lastUpdated: new Date()
  }
}
```

### 6. Modify Insights Logic

In `backend/server.js`, lines 235-280, edit insight generation:

```javascript
// Example: Add new insight type
insights.push({
  type: 'budget',
  title: 'Monthly Budget',
  value: '₹5000',
  suggestion: 'You have been spending around ₹5000/month'
});
```

### 7. Change API Port

In `backend/.env`:
```
# Change from 5000 to 3001
PORT=3001
```

Also update frontend in `src/context/SmartPayContext.js`, line 5:
```javascript
const API_BASE_URL = 'http://localhost:3001/api';
```

### 8. Add New Payment Route

In `backend/server.js`, add after line 200:

```javascript
app.post('/api/payment/request', (req, res) => {
  const { senderId, receiverName, amount } = req.body;
  // Implementation...
});
```

### 9. Modify Dashboard Cards

In `src/components/Dashboard.js`:

```jsx
// Example: Add new card
<div className="bg-white rounded-lg shadow p-6 text-center">
  <p className="text-gray-600 text-sm">Monthly Savings Goal</p>
  <h3 className="text-2xl font-bold text-blue-600 mt-2">₹5000</h3>
</div>
```

### 10. Change Success Notification Style

In `src/App.js`, lines 16-20:

```jsx
// Current: Green with animation
<div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-40 animate-pulse">

// Change to: Blue notification
<div className="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-40">

// Or: Bottom-left corner
<div className="fixed bottom-4 left-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-40">
```

## Adding New Features

### Example: Add Transaction Search

1. **Update Context** (`SmartPayContext.js`):
```javascript
const searchTransactions = useCallback(async (userId, query) => {
  // Filter transactions by amount or receiver name
  const filtered = transactions.filter(t => 
    t.receiverName.includes(query) || t.amount.toString().includes(query)
  );
  return filtered;
}, [transactions]);
```

2. **Update Dashboard**:
```jsx
const [searchQuery, setSearchQuery] = useState('');
const filteredTransactions = transactions.filter(t => 
  t.receiverName.toLowerCase().includes(searchQuery.toLowerCase())
);

// Add search input
<input 
  type="text" 
  placeholder="Search transactions..." 
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

### Example: Add Export Transactions

1. **Add backend route** (`server.js`):
```javascript
app.get('/api/export/transactions/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = mockUsers[userId];
  res.json({ csv: generateCSV(user.transactions) });
});
```

2. **Add download button** (Dashboard.js):
```jsx
<button onClick={() => downloadTransactions(user.id)}>
  Download CSV
</button>
```

### Example: Add Budget Tracking

1. **Extend User Model** (server.js):
```javascript
budget: {
  monthlyLimit: 10000,
  spent: 2500,
  remaining: 7500
}
```

2. **Create Budget Component**:
```jsx
<div className="bg-red-50 p-4 rounded">
  <p>Monthly Budget Spent</p>
  <div className="progress-bar">
    <div style={{width: '25%'}}></div>
  </div>
  <p>₹2500 of ₹10000</p>
</div>
```

## Testing

### Manual Testing Checklist

- [ ] Login works
- [ ] Signup creates account
- [ ] Dashboard loads correctly
- [ ] Send payment updates balance
- [ ] Auto-save is calculated correctly
- [ ] Recent transactions display
- [ ] Savings wallet shows correct amount
- [ ] Trees planted calculated correctly
- [ ] Insights display
- [ ] Logout clears session

### Test Cases

```javascript
// Test: Send payment of ₹500
Input: senderId='user1', receiverName='Priya Singh', amount=500
Expected: Balance -₹500, Savings +₹10, Transaction logged

// Test: Insufficient balance
Input: senderId='user1', amount=10000 (more than balance)
Expected: Error "Insufficient balance"

// Test: Tree calculation
Input: savingsBalance = ₹500
Expected: treesPlanted = 5

// Test: CO₂ calculation
Input: treesPlanted = 5
Expected: co2Offset = 125 (5 * 25)
```

## Performance Tips

1. **Optimize API Calls**: Reduce fetchUserData frequency
2. **Use React.memo**: Wrap components to prevent re-renders
3. **Lazy Load**: Import components only when needed
4. **Database**: Switch to database for scalability
5. **Caching**: Cache frequently accessed data

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| CORS Error | Backend not running | Start backend on port 5000 |
| Blank Dashboard | API call failed | Check console for errors |
| Balance not updating | Auto-refresh disabled | Check interval in Dashboard |
| Savings not increasing | Wrong auto-save logic | Verify calculation in backend |
| Trees not showing | Wrong conversion rate | Verify ÷100 calculation |

## Debugging Tips

1. **Check browser console**: `F12` → Console tab
2. **Check backend logs**: Terminal where server is running
3. **Network tab**: See API requests/responses
4. **React DevTools**: Check component state
5. **Breakpoints**: Add `debugger;` in code

---

**Happy customizing! 🚀**
