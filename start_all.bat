@echo off
echo Starting Backend (Port 3000)...
start "ADA Backend" cmd /k "restart_server.bat"

echo.
echo Starting Frontend (React - Port 5173)...
cd client
start "ADA Frontend" cmd /k "npm run dev"

echo.
echo ===================================================
echo  ADA Compliance Scanner - Hybrid Mode Started
echo.
echo  Backend: http://localhost:3000 (Old UI + API)
echo  Frontend: http://localhost:5173 (New React UI)
echo ===================================================
pause
