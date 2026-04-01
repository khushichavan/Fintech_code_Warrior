# 🎯 SmartPay - Getting Started Checklist

## ✅ Pre-Launch Checklist

Before you begin, make sure you have:
- [ ] Node.js 14+ installed (download from nodejs.org)
- [ ] npm (comes with Node.js)
- [ ] Ports 3000 and 5000 available on your machine
- [ ] A modern web browser (Chrome, Firefox, Safari, Edge)
- [ ] Terminal/Command Prompt access
- [ ] Internet connection (for npm install)

## 🚀 Launch Steps

### Step 1: Navigate to Project
```bash
cd c:\Users\khush\OneDrive\Pictures\Desktop\2k26\smartpay
```
✅ You should see folders: backend/, frontend/, and documentation files

### Step 2: Automatic Setup (Recommended)
**Windows Users:**
```bash
setup.bat
```

**Mac/Linux Users:**
```bash
chmod +x setup.sh
./setup.sh
```

**Manual Setup (if scripts fail):**
```bash
# Backend
cd backend
npm install

# Frontend  
cd frontend
npm install
```

### Step 3: Start Backend (Open NEW Terminal)
```bash
cd backend
npm start
```

✅ **Expected Output:**
```
SmartPay Backend running on http://localhost:5000
```

✅ **Verify it works:**
- Open browser: http://localhost:5000/api/health
- Should see: `{"status":"Backend is running!"}`

### Step 4: Start Frontend (Open ANOTHER NEW Terminal)
```bash
cd frontend
npm start
```

✅ **Expected Behavior:**
- Browser automatically opens http://localhost:3000
- You see SmartPay login page
- Gradient background with login form

### Step 5: Login & Explore
**Demo Account:**
- Email: `student1@example.com`
- Password: `password123`

**Or use:**
- Click "Demo Login" button (easier!)

✅ **You should now see:**
- Welcome message with your name
- Dashboard with balance card
- Savings card showing ₹500
- Recent transactions (empty at first)
- AI Insights section

## 🎮 First-Time User Activities

### Activity 1: Send Payment
1. Click "Send Money" button
2. Receiver Name: `Priya Singh`
3. Amount: `100`
4. Click Send
5. ✅ See success notification: "Payment sent successfully!"
6. ✅ Balance decreases by ₹100
7. ✅ Savings increases by ₹3 (auto-save)

### Activity 2: Check Savings
1. Click "View Details" on Savings Wallet card
2. ✅ See total savings (₹503 after payment)
3. ✅ See progress bar
4. ✅ See trees planted (5 trees = ₹500)
5. ✅ See CO₂ offset (125kg)
6. Close modal

### Activity 3: View Insights
1. Click "View All →" in AI Insights section
2. ✅ See Daily Spending analysis
3. ✅ See Weekly Savings
4. ✅ See Environmental Impact
5. ✅ See smart tips for better savings
6. Close modal

### Activity 4: Check Transactions
1. Look at "Recent Transactions" section
2. ✅ See your payment to Priya Singh
3. ✅ See amount: ₹100
4. ✅ See auto-save: ₹3
5. ✅ See timestamp

### Activity 5: Logout & Re-login
1. Click "Logout" button
2. ✅ Return to login page
3. Click "Demo Login" again
4. ✅ See updated balance (₹4903)
5. ✅ See saved transactions

## 🧪 Verification Checklist

After completing all activities, verify:

### Frontend
- [ ] App loads on http://localhost:3000
- [ ] Login page displays with gradient
- [ ] Demo login button works
- [ ] Dashboard displays after login
- [ ] All modals open correctly
- [ ] All buttons are clickable
- [ ] No console errors (F12 to check)

### Backend
- [ ] Server runs on http://localhost:5000
- [ ] Health check returns success
- [ ] Login API works
- [ ] Payment API works
- [ ] Savings API works
- [ ] Insights API works
- [ ] No server errors in terminal

### Functionality
- [ ] Can send payment
- [ ] Balance updates
- [ ] Savings increases
- [ ] Transactions display
- [ ] Auto-refresh works
- [ ] Can logout
- [ ] Can login again
- [ ] Data persists (in-memory)

### UI/UX
- [ ] Mobile responsive (resize browser)
- [ ] All fonts readable
- [ ] All colors visible
- [ ] All buttons hover smoothly
- [ ] No layout breaks
- [ ] Modals display properly

## 🆘 Troubleshooting Quick Fixes

### Backend won't start?
```bash
# Try different port
PORT=5001 npm start

# Or find what's using 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### Frontend won't start?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Blank page after login?
```bash
# Hard refresh (Clear browser cache)
# Windows/Linux: Ctrl+Shift+R
# Mac: Cmd+Shift+R
```

### CORS error in console?
1. Check backend is running on port 5000
2. Check frontend is on http://localhost:3000
3. Restart both servers

## 📚 Next Steps After Verification

### To Learn More
→ Read [INDEX.md](INDEX.md) for navigation guide

### To Customize
→ Read [DEVELOPMENT.md](DEVELOPMENT.md) for examples

### To Deploy
→ Read [DEPLOYMENT.md](DEPLOYMENT.md) for options

### To Understand Architecture
→ Read [ARCHITECTURE.md](ARCHITECTURE.md) for technical details

### For Features Overview
→ Read [FEATURES.md](FEATURES.md) for complete list

### If Something Breaks
→ Read [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for solutions

## 💡 Power Tips

✨ **Use Demo Login** - Faster than typing credentials
✨ **Check Terminal Logs** - Errors show when you restart
✨ **Use Browser DevTools** - F12 shows JavaScript errors
✨ **Hard Refresh** - Ctrl+Shift+R fixes most UI issues
✨ **Two New Terminals** - Backend and frontend need separate terminals

## 🎯 Success Indicator

✅ **You'll know it's working when:**

```
✅ Backend terminal shows:
   "SmartPay Backend running on http://localhost:5000"

✅ Frontend opens automatically at http://localhost:3000

✅ You see the SmartPay login page with:
   - Logo and welcome text
   - Email/password inputs
   - Demo Login button
   - Sign up toggle

✅ After demo login, you see:
   - Welcome message with user name
   - Balance card showing ₹5000
   - Savings card showing ₹500
   - Recent transactions (empty)
   - Statistics and insights

✅ When you send a payment:
   - Success notification appears
   - Balance updates
   - Savings increases
   - Transaction appears in history
```

## 🚨 Common Mistakes to Avoid

❌ **Don't** run backend and frontend in same terminal
✅ **Do** open two separate terminals

❌ **Don't** forget to run setup or npm install
✅ **Do** run setup.bat/setup.sh or npm install in both folders

❌ **Don't** try to access http://localhost:3000 before starting frontend
✅ **Do** wait for "Compiled successfully!" message in terminal

❌ **Don't** ignore terminal error messages
✅ **Do** read error messages carefully - they often tell you what's wrong

❌ **Don't** assume ports are free
✅ **Do** check if ports 3000 and 5000 are available

## 📞 Help Resources

| Issue | Document |
|-------|----------|
| Can't get it working | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) |
| Want to understand | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Want to customize | [DEVELOPMENT.md](DEVELOPMENT.md) |
| Want to deploy | [DEPLOYMENT.md](DEPLOYMENT.md) |
| Want to learn features | [FEATURES.md](FEATURES.md) |
| Need general guide | [INDEX.md](INDEX.md) |

## ✨ Final Checklist

- [ ] Completed all 5 verification activities
- [ ] All 15+ verification checkboxes checked
- [ ] No errors in browser console
- [ ] No errors in terminal
- [ ] Can send payment successfully
- [ ] Balance updates correctly
- [ ] Savings increases correctly
- [ ] Can logout and re-login
- [ ] Data persists after refresh (in-memory)

## 🎉 Congratulations!

If you've checked all boxes above, you have a **fully working fintech web application**!

### What You Can Do Now

✅ Use the app - Send payments, track savings
✅ Learn from it - Understand full-stack development
✅ Customize it - Change colors, rates, features
✅ Deploy it - Go live to production
✅ Extend it - Add new features
✅ Share it - Show your friends

---

**Time to completion: 5 minutes**
**Featured: Full-stack fintech app**
**Ready for: Production deployment**

---

**Enjoy SmartPay! 🚀💰🌱**

*Your student-friendly payment + savings app is ready to rock!*
