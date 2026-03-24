# NovusCap Visual Studio 2022 PowerShell Setup Script
# Run this script as Administrator in PowerShell

Write-Host "===========================================" -ForegroundColor Green
Write-Host "   🚀 NovusCap VS2022 PowerShell Setup" -ForegroundColor Green  
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

# Set execution policy
Write-Host "[1] Setting PowerShell execution policy..." -ForegroundColor Yellow
try {
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
    Write-Host "✅ Execution policy set successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Could not set execution policy: $($_.Exception.Message)" -ForegroundColor Yellow
}
Write-Host ""

# Check .NET SDK
Write-Host "[2] Checking .NET 8 SDK..." -ForegroundColor Yellow
try {
    $dotnetVersion = dotnet --version
    Write-Host "✅ .NET SDK found: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ .NET SDK not found!" -ForegroundColor Red
    Write-Host "   Download: https://dotnet.microsoft.com/download/dotnet/8.0" -ForegroundColor Yellow
}
Write-Host ""

# Check Node.js
Write-Host "[3] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "   Download: https://nodejs.org" -ForegroundColor Yellow
}
Write-Host ""

# Check npm
Write-Host "[4] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found!" -ForegroundColor Red
}
Write-Host ""

# Check PostgreSQL
Write-Host "[5] Checking PostgreSQL..." -ForegroundColor Yellow
try {
    $pgService = Get-Service -Name "*postgresql*" -ErrorAction SilentlyContinue
    if ($pgService -and $pgService.Status -eq "Running") {
        Write-Host "✅ PostgreSQL service is running" -ForegroundColor Green
    } else {
        Write-Host "❌ PostgreSQL service not running" -ForegroundColor Red
        Write-Host "   Please start PostgreSQL service or install it" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ PostgreSQL not found!" -ForegroundColor Red
    Write-Host "   Download: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
}
Write-Host ""

# Check ports
Write-Host "[6] Checking port availability..." -ForegroundColor Yellow

# Check 7139 (Backend)
$port7139 = Get-NetTCPConnection -LocalPort 7139 -ErrorAction SilentlyContinue
if ($port7139) {
    Write-Host "⚠️  Port 7139 (Backend) is already in use" -ForegroundColor Yellow
} else {
    Write-Host "✅ Port 7139 (Backend) is available" -ForegroundColor Green
}

# Check 3000 (Frontend)
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    Write-Host "⚠️  Port 3000 (Frontend) is already in use" -ForegroundColor Yellow
} else {
    Write-Host "✅ Port 3000 (Frontend) is available" -ForegroundColor Green
}

# Check 5432 (PostgreSQL)
$port5432 = Get-NetTCPConnection -LocalPort 5432 -ErrorAction SilentlyContinue
if ($port5432) {
    Write-Host "✅ Port 5432 (PostgreSQL) is in use" -ForegroundColor Green
} else {
    Write-Host "❌ Port 5432 (PostgreSQL) is not listening" -ForegroundColor Red
}
Write-Host ""

# Navigate to project directory
Write-Host "[7] Setting up project..." -ForegroundColor Yellow
$projectPath = "c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap"

if (Test-Path $projectPath) {
    Set-Location $projectPath
    Write-Host "✅ Navigated to project directory: $projectPath" -ForegroundColor Green
    
    # Check solution file
    if (Test-Path "NovusCap.sln") {
        Write-Host "✅ Solution file found: NovusCap.sln" -ForegroundColor Green
    } else {
        Write-Host "❌ Solution file not found!" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Project directory not found: $projectPath" -ForegroundColor Red
}
Write-Host ""

# Install frontend dependencies
Write-Host "[8] Installing frontend dependencies..." -ForegroundColor Yellow
$frontendPath = Join-Path $projectPath "frontend"
if (Test-Path $frontendPath) {
    Set-Location $frontendPath
    
    if (Test-Path "package.json") {
        Write-Host "✅ Found package.json, installing dependencies..." -ForegroundColor Green
        try {
            npm install
            Write-Host "✅ Frontend dependencies installed successfully" -ForegroundColor Green
        } catch {
            Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
            Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ package.json not found in frontend directory" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Frontend directory not found" -ForegroundColor Red
}

Set-Location $projectPath
Write-Host ""

Write-Host "===========================================" -ForegroundColor Green
Write-Host "          🎯 Setup Complete!" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Double-click NovusCap.sln to open in Visual Studio 2022" -ForegroundColor White
Write-Host "2. Set NovusCap.WebApi as startup project" -ForegroundColor White
Write-Host "3. Press F5 to start backend (https://localhost:7139)" -ForegroundColor White
Write-Host "4. Open new terminal and run: cd frontend && npm start" -ForegroundColor White
Write-Host "5. Frontend will be available at: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Happy coding!" -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter to continue..."
