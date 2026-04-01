@echo off
echo ======================================
echo AI SmartPay - Full Stack Setup
echo ======================================
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
echo Backend setup complete!
echo.

cd ..
echo Installing Frontend Dependencies...
cd frontend
call npm install
echo Frontend setup complete!
echo.

cd ..
echo.
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo To run the application:
echo.
echo 1. Start Backend (in new terminal):
echo    cd backend ^&^& npm start
echo.
echo 2. Start Frontend (in new terminal):
echo    cd frontend ^&^& npm start
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Demo Credentials:
echo   Email: student1@example.com
echo   Password: password123
echo.
pause
