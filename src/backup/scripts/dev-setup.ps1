# ===========================================
# NovusCap Development Setup Script (Windows)
# ===========================================

param(
    [switch]$Backend,
    [switch]$Frontend,
    [switch]$All
)

Write-Host "🚀 NovusCap Development Setup" -ForegroundColor Green

if (-not $Backend -and -not $Frontend -and -not $All) {
    $All = $true
}

# Function to check if a port is in use
function Test-Port {
    param($Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    } catch {
        return $false
    }
}

if ($All -or $Backend) {
    Write-Host ""
    Write-Host "🔧 Setting up Backend..." -ForegroundColor Cyan
    
    # Check if .NET is installed
    try {
        $dotnetVersion = dotnet --version
        Write-Host "✅ .NET SDK version: $dotnetVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ .NET SDK not found. Please install .NET 8.0 SDK" -ForegroundColor Red
        exit 1
    }
    
    # Navigate to backend directory and restore packages
    Set-Location "backend"
    Write-Host "📦 Restoring backend packages..." -ForegroundColor Yellow
    dotnet restore
    
    # Build the project
    Write-Host "🔨 Building backend..." -ForegroundColor Yellow
    dotnet build
    
    if ($All) {
        # Start backend in background
        Write-Host "🚀 Starting backend on port 5000..." -ForegroundColor Green
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; dotnet run --project src/NovusCap.WebApi" -WindowStyle Normal
        Start-Sleep -Seconds 5
    } else {
        # Just run backend
        Write-Host "🚀 Starting backend..." -ForegroundColor Green
        dotnet run --project src/NovusCap.WebApi
    }
    
    Set-Location ".."
}

if ($All -or $Frontend) {
    Write-Host ""
    Write-Host "🔧 Setting up Frontend..." -ForegroundColor Cyan
    
    # Check if Node.js is installed
    try {
        $nodeVersion = node --version
        Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
        exit 1
    }
    
    # Navigate to frontend directory
    Set-Location "frontend"
    
    # Install dependencies if node_modules doesn't exist
    if (-not (Test-Path "node_modules")) {
        Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
        npm install
    } else {
        Write-Host "✅ Frontend dependencies already installed" -ForegroundColor Green
    }
    
    if ($All) {
        # Start frontend in background
        Write-Host "🚀 Starting frontend on port 3000..." -ForegroundColor Green
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start" -WindowStyle Normal
    } else {
        # Just run frontend
        Write-Host "🚀 Starting frontend..." -ForegroundColor Green
        npm start
    }
    
    Set-Location ".."
}

if ($All) {
    Write-Host ""
    Write-Host "⏳ Waiting for services to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    
    Write-Host ""
    Write-Host "🎉 Development environment is ready!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Services:" -ForegroundColor Cyan
    Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor White
    Write-Host "🔗 Backend API: http://localhost:5000" -ForegroundColor White
    Write-Host "📊 API Docs: http://localhost:5000/swagger" -ForegroundColor White
    Write-Host ""
    Write-Host "Press Ctrl+C to stop services" -ForegroundColor Yellow
    
    # Keep script running
    try {
        while ($true) {
            Start-Sleep -Seconds 30
            if (-not (Test-Port 3000) -and -not (Test-Port 5000)) {
                Write-Host "Services stopped." -ForegroundColor Yellow
                break
            }
        }
    } catch {
        Write-Host "Stopping..." -ForegroundColor Yellow
    }
}
