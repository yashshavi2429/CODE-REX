@echo off
echo Starting CodeREX Servers...

:: Start AI Engine
echo Starting AI Engine on port 8000...
start "CodeREX AI Engine" cmd /k "cd ai-engine && python -m uvicorn main:app --reload"

:: Start Backend
echo Starting Backend on port 8080...
start "CodeREX Backend" cmd /k "cd backend && mvnw.cmd spring-boot:run"

:: Start Frontend
echo Starting Frontend on port 5173...
start "CodeREX Frontend" cmd /k "cd frontend && npm run dev"

echo Servers are starting in new windows.
echo Please wait for them to initialize before using the chat.
pause
