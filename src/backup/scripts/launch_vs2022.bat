@echo off
title NovusCap - Visual Studio 2022 Launcher
color 0A

echo ==========================================
echo     🚀 NovusCap VS2022 Launcher
echo ==========================================
echo.

REM Change to project directory
cd /d "c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap"

echo Current directory: %CD%
echo.

echo Choose your setup method:
echo [1] Quick Launch (Batch)
echo [2] Advanced Setup (PowerShell)
echo [3] Fix Build Issues (PowerShell)
echo [4] Integration Test (PowerShell)
echo [5] Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto :quick_launch
if "%choice%"=="2" goto :powershell_setup
if "%choice%"=="3" goto :fix_issues
if "%choice%"=="4" goto :integration_test
if "%choice%"=="5" goto :exit
goto :invalid_choice

:quick_launch
echo.
echo [QUICK LAUNCH MODE]
echo ==========================================
echo.

echo [1] Checking basic requirements...
if exist "NovusCap.sln" (
    echo ✅ Found solution file: NovusCap.sln
) else (
    echo ❌ Solution file not found!
    pause
    exit /b 1
)

echo.
echo [2] Opening Visual Studio 2022...
echo 📂 Opening in Visual Studio 2022...
start "" "NovusCap.sln"
timeout /t 3 /nobreak >nul

echo.
echo [3] Setting up frontend...
cd frontend
if not exist "node_modules" (
    echo 🔄 Installing npm dependencies (first time)...
    npm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        echo Try running: npm cache clean --force
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencies already installed
)

echo.
echo [4] Starting React development server...
start cmd /k "title Frontend Development Server && npm start"

echo.
echo ==========================================
echo     ✅ Quick Launch Complete!
echo ==========================================
echo.
echo 🎯 Next Steps:
echo    1. Visual Studio 2022 should be opening
echo    2. Set NovusCap.WebApi as startup project
echo    3. Press F5 to start backend
echo    4. Frontend server is starting in separate window
echo.
echo 📱 Development URLs:
echo    - Backend API: https://localhost:7139
echo    - Frontend: http://localhost:3000
echo    - Swagger: https://localhost:7139/swagger
echo.
goto :end

:powershell_setup
echo.
echo [ADVANCED POWERSHELL SETUP]
echo ==========================================
echo.
echo Running PowerShell setup script...
powershell -ExecutionPolicy Bypass -File "setup_vs2022.ps1"
goto :end

:fix_issues
echo.
echo [FIX BUILD ISSUES]
echo ==========================================
echo.
echo Running fix script for build issues...
powershell -ExecutionPolicy Bypass -File "fix_vs2022_issues.ps1"
goto :end

:integration_test
echo.
echo [INTEGRATION TEST]
echo ==========================================
echo.
echo Running integration tests...
powershell -ExecutionPolicy Bypass -File "test_integration.ps1"
goto :end

:invalid_choice
echo.
echo ❌ Invalid choice. Please enter 1, 2, 3, 4, or 5.
timeout /t 2 /nobreak >nul
goto :menu

:end
echo.
echo 📚 Documentation:
echo    - Quick Start: QUICK_START_VS2022.md
echo    - Detailed Guide: VISUAL_STUDIO_SETUP.md
echo.
echo Happy coding! 🚀
echo.
pause
goto :exit

:exit
exit /b 0
