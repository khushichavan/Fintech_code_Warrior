# 🆘 Troubleshooting Guide

## Common Problems & Solutions

### Backend Issues

#### Backend won't start
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Find what's using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Kill the process
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # Mac/Linux

# Or change port in .env
PORT=5001 npm start
```

#### Module not found
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
cd backend
npm install
npm start
```

#### Backend crashes on startup
```
TypeError: Cannot read property 'length' of undefined
```

**Solution:**
- Check if server.js syntax is correct
- Ensure package.json exists
- Try deleting node_modules and reinstalling

```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

#### Port already in use
```bash
# Try different port
PORT=5001 npm start

# Update frontend API URL in SmartPayContext.js
const API_BASE_URL = 'http://localhost:5001/api';
```

### Frontend Issues

#### Frontend won't start
```
Error: npm ERR! code ERESOLVEUNMET
```

**Solution:**
```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

#### White screen after login
**Causes:**
- Backend not running
- API not responding
- Component error

**Debug:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Verify backend is running on http://localhost:5000

**Solution:**
```javascript
// Add console logs to debug
console.log('Component mounted');
console.log('User data:', user);
console.log('API response:', response);
```

#### Tailwind CSS not loading
```
Styling looks broken, fonts are default
```

**Solution:**
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run build
npm start
```

Ensure `tailwind.config.js` exists with correct content paths.

### API Connection Issues

#### CORS Error in Browser Console
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Causes:**
- Backend not running
- Backend not on port 5000
- CORS configuration wrong

**Debug your frontend:**
```javascript
// In SmartPayContext.js, add logging
console.log('API_BASE_URL:', API_BASE_URL);

// Test API manually
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(data => console.log('Backend:', data))
  .catch(e => console.error('Error:', e))
```

**Debug your backend:**
```javascript
// Add to server.js before other routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

#### 404 Error on Login
```
POST http://localhost:5000/api/auth/login 404
```

**Solutions:**
1. Check if backend is running
2. Verify endpoint spelling is exact
3. Check if backend router is defined

```bash
# Test endpoint manually
curl http://localhost:5000/api/health
```

#### 500 Error from Backend
```
Internal Server Error
```

**Check backend console:**
- Look at terminal where `npm start` is running
- Find the error message
- Common causes:
  - User doesn't exist
  - Syntax error in route
  - database connection issue

**Example fix:**
```javascript
// Add try-catch to routes
app.post('/api/auth/login', (req, res) => {
  try {
    // logic here
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
  }
});
```

### Login/Authentication Issues

#### "Invalid credentials" when using correct email
```
Error: Invalid credentials
```

**Debug:**
- Email is case-sensitive in mock database
- Check spelling: `student1@example.com` not `student@example.com`
- Try demo account: `student1@example.com` / `password123`

**Solutions:**
```javascript
// In backend, add case-insensitive search
const user = Object.values(mockUsers).find(u => 
  u.email.toLowerCase() === email.toLowerCase()
);
```

#### Signup creates account but can't login
```
Account created but login fails
```

**Solution:**
```bash
# Restart backend to clear cache (if using mock DB)
npm start

# Or add debugging
console.log('All users:', Object.keys(mockUsers));
console.log('Trying to find:', email);
```

### Payment Issues

#### "Insufficient balance" error when balance shows sufficient
```
Amount: ₹500
Balance: ₹1000
Error: "Insufficient balance"
```

**Causes:**
- Balance includes recent unsaved transactions
- Check if balance was decremented twice
- Frontend state out of sync with backend

**Solutions:**
```bash
# Refresh dashboard to sync state
# F5 or browser refresh
```

**Check backend:**
```javascript
// Add logging to payment route
console.log('Sender balance:', sender.balance);
console.log('Amount:', amount);
console.log('Can pay:', sender.balance >= amount);
```

#### Receiver not found
```
Error: undefined is not a real User
```

**Causes:**
- Receiver name doesn't exist
- Name is case-sensitive
- Typo in receiver name

**Available receivers:**
- `Rahul Kumar` (user1)
- `Priya Singh` (user2)

**Create test user:**
```javascript
// In backend mockUsers add:
'user3': {
  id: 'user3',
  name: 'Test User',
  // ... other fields
}
```

#### Auto-save not working
```
Transaction completes but auto-save doesn't increase
```

**Debug:**
1. Check calculation: `Math.min(10, Math.floor(amount * 0.03))`
2. Verify savings balance was updated
3. Check if response is received correctly

```javascript
// Test calculation
Math.min(10, Math.floor(500 * 0.03))  // Should be 10
Math.min(10, Math.floor(100 * 0.03))  // Should be 3
```

### Data Display Issues

#### Transactions not showing in dashboard
```
Empty recent transactions list
```

**Causes:**
- User has no transactions
- API not returning transactions
- Frontend not displaying them

**Solutions:**
```bash
# Make a test payment first
# Then dashboard should show it

# If still empty, debug:
# 1. Open DevTools Console
# 2. Check transactions array
# 3. Look for API call in Network tab
```

#### Balance doesn't update after payment
```
Balance shown before payment, not updated after
```

**Causes:**
- Frontend not refreshing
- API response not processed
- Old data cached

**Solutions:**
```bash
# Manual refresh
# Press Ctrl+Shift+R (hard refresh)

# Or change refresh rate in Dashboard.js
const interval = setInterval(() => fetchUserData(user.id), 3000); // 3 seconds
```

#### Savings trees not showing
```
"Trees planted: 0" even with savings
```

**Check:**
```javascript
// Calculation should be:
Math.floor(savingsBalance / 100)

// Examples:
Math.floor(100 / 100) // 1
Math.floor(250 / 100) // 2
Math.floor(99 / 100)  // 0
```

### Browser Issues

#### App doesn't work in Safari
```
Blank page or errors in Safari
```

**Solution:**
- Make sure backend is running
- Clear Safari cache (Cmd+Option+E)
- Try different browser (Chrome/Firefox)

#### Mobile layout broken
```
Buttons overlap or text too small
```

**Solution:**
```jsx
// Check responsive classes in components
// Example: md: means on medium screens and up
<div className="grid grid-cols-1 md:grid-cols-2">

// Ensure padding is adequate on mobile
<div className="p-4 md:p-8">
```

### Network Issues

#### Request timeout
```
The server took too long to send the data
```

**Causes:**
- Backend is slow
- Network connection issue
- Server crashed

**Solutions:**
1. Check if backend terminal has errors
2. Restart backend
3. Check internet connection
4. Increase timeout in Context:

```javascript
axios.defaults.timeout = 10000; // 10 seconds
```

#### Request aborted
```
Network request cancelled unexpectedly
```

**Solution:**
- Check browser console
- Clear cache and reload
- Restart both servers

## Testing Checklist

### Before Submitting
- [ ] Backend starts without errors
- [ ] Frontend loads without errors  
- [ ] Can login with demo account
- [ ] Can send payment
- [ ] Balance updates correctly
- [ ] Auto-save works
- [ ] Can view savings
- [ ] Can view insights
- [ ] Can logout
- [ ] Can signup new account

### Functional Testing
- [ ] Payment with ₹100 saves ₹3
- [ ] Payment with ₹500 saves ₹10 (capped)
- [ ] ₹100 saved = 1 tree
- [ ] Recent transactions show
- [ ] Daily insights show

### UI Testing
- [ ] All buttons clickable
- [ ] No broken links
- [ ] Responsive on mobile
- [ ] Modals open/close correctly
- [ ] Notifications display

## Debug Mode

### Frontend Debugging
```javascript
// Add to App.js for verbose logging
if (process.env.NODE_ENV === 'development') {
  window.DEBUG_MODE = true;
}

// Then use:
if (window.DEBUG_MODE) console.log('Data:', data);
```

### Backend Debugging
```javascript
// Add to server.js
app.use((req, res, next) => {
  console.log('→', req.method, req.path);
  console.log('  Body:', req.body);
  res.on('finish', () => {
    console.log('← Status:', res.statusCode);
  });
  next();
});
```

## Getting Help

If you're stuck:
1. Check the error message carefully
2. Google the error message
3. Check GitHub Issues
4. Ask in development community
5. Share code with context

---

**Still stuck? Check the logs! 📋**
