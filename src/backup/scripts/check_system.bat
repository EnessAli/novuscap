@echo off
echo ==========================================
echo  NovusCap - System Check for Windows
echo ==========================================
echo.

echo Checking required tools...
echo.

REM Check .NET SDK
echo [1] Checking .NET 8 SDK...
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ .NET SDK not found! Please install .NET 8 SDK
    echo    Download: https://dotnet.microsoft.com/download/dotnet/8.0
) else (
    for /f %%i in ('dotnet --version') do set dotnet_version=%%i
    echo ✅ .NET SDK found: %dotnet_version%
)
echo.

REM Check Node.js
echo [2] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js 18+
    echo    Download: https://nodejs.org
) else (
    for /f %%i in ('node --version') do set node_version=%%i
    echo ✅ Node.js found: %node_version%
)
echo.

REM Check npm
echo [3] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found!
) else (
    for /f %%i in ('npm --version') do set npm_version=%%i
    echo ✅ npm found: %npm_version%
)
echo.

REM Check PostgreSQL
echo [4] Checking PostgreSQL...
pg_isready -h localhost -p 5432 >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL not running or not accessible
    echo    Please ensure PostgreSQL is installed and running
    echo    Default connection: localhost:5432
    echo    Download: https://www.postgresql.org/download/windows/
) else (
    echo ✅ PostgreSQL is running on localhost:5432
)
echo.

REM Check if database exists
echo [5] Checking novuscapdb database...
psql -h localhost -p 5432 -U postgres -d novuscapdb -c "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Database 'novuscapdb' not found or not accessible
    echo    Please create the database:
    echo    psql -U postgres -h localhost -c "CREATE DATABASE novuscapdb;"
) else (
    echo ✅ Database 'novuscapdb' is accessible
)
echo.

REM Check Visual Studio
echo [6] Checking Visual Studio...
where devenv >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Visual Studio not found in PATH
    echo    Please ensure Visual Studio 2022 is installed
) else (
    echo ✅ Visual Studio found
)
echo.

REM Check ports
echo [7] Checking ports...
netstat -an | find ":5432" | find "LISTENING" >nul
if %errorlevel% equ 0 (
    echo ✅ Port 5432 (PostgreSQL) is in use
) else (
    echo ❌ Port 5432 (PostgreSQL) is not listening
)

netstat -an | find ":7139" | find "LISTENING" >nul
if %errorlevel% equ 0 (
    echo ⚠️  Port 7139 (Backend) is already in use
) else (
    echo ✅ Port 7139 (Backend) is available
)

netstat -an | find ":3000" | find "LISTENING" >nul
if %errorlevel% equ 0 (
    echo ⚠️  Port 3000 (Frontend) is already in use
) else (
    echo ✅ Port 3000 (Frontend) is available
)
echo.

echo ==========================================
echo  System Check Complete
echo ==========================================
echo.
echo Next steps:
echo 1. Fix any ❌ issues above
echo 2. Open NovusCap.sln in Visual Studio 2022
echo 3. Follow QUICK_START_VS2022.md guide
echo.
pause
