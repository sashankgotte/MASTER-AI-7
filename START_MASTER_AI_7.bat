@echo off
title MASTER AI 7 - Interactive AI Platform
echo ========================================================
echo        STARTING MASTER AI 7 LEARNING PLATFORM
echo            "LEARN • CREATE • INNOVATE"
echo ========================================================
echo.
echo Starting local development server...
echo.
cd /d "%~dp0"
start http://127.0.0.1:3000
npm run dev -- --host 127.0.0.1 --port 3000
pause

