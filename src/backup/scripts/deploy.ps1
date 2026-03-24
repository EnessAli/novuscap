# ===========================================
# NovusCap Production Deployment Script (Windows)
# ===========================================

param(
    [string]$Environment = "production"
)

Write-Host "🚀 Starting NovusCap production deployment..." -ForegroundColor Green

# Check if .env.prod.example exists
if (-not (Test-Path ".env.prod.example")) {
    Write-Host "❌ Error: .env.prod.example file not found!" -ForegroundColor Red
    Write-Host "Please ensure the production environment template exists." -ForegroundColor Red
    exit 1
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Warning: .env file not found!" -ForegroundColor Yellow
    Write-Host "Please copy .env.prod.example to .env and configure your environment variables." -ForegroundColor Yellow
    $response = Read-Host "Do you want to copy .env.prod.example to .env now? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        Copy-Item ".env.prod.example" ".env"
        Write-Host "✅ .env file created from template" -ForegroundColor Green
        Write-Host "Please edit .env file with your actual values before continuing." -ForegroundColor Yellow
        notepad.exe .env
        $continue = Read-Host "Press Enter to continue after configuring .env file..."
    } else {
        exit 1
    }
}

Write-Host "✅ Environment configuration checked" -ForegroundColor Green

# Stop existing containers
Write-Host "🛑 Stopping existing containers..." -ForegroundColor Yellow
docker-compose -f docker-compose.prod.yml down 2>$null

# Build and deploy with Docker Compose
Write-Host "📦 Building and starting containers..." -ForegroundColor Cyan
try {
    docker-compose -f docker-compose.prod.yml build --no-cache
    docker-compose -f docker-compose.prod.yml up -d
} catch {
    Write-Host "❌ Error during container build/start: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Wait for services to be ready
Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 45

# Health check function
function Test-ServiceHealth {
    param($Url, $ServiceName)
    try {
        $response = Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec 10 -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ $ServiceName health check passed" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "❌ $ServiceName health check failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    return $false
}

# Perform health checks
Write-Host "🏥 Performing health checks..." -ForegroundColor Cyan

$backendHealthy = Test-ServiceHealth "http://localhost/api/health" "Backend"
$frontendHealthy = Test-ServiceHealth "http://localhost" "Frontend"

if (-not $backendHealthy -or -not $frontendHealthy) {
    Write-Host "❌ Health checks failed. Checking container status..." -ForegroundColor Red
    docker-compose -f docker-compose.prod.yml ps
    Write-Host "To view logs: docker-compose -f docker-compose.prod.yml logs" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Services are running:" -ForegroundColor Cyan
Write-Host "🌐 Application: http://localhost" -ForegroundColor White
Write-Host "🔗 Backend API: http://localhost/api" -ForegroundColor White
Write-Host "📊 API Documentation: http://localhost/swagger" -ForegroundColor White
Write-Host "💾 Database: PostgreSQL on port 5432" -ForegroundColor White
Write-Host "⚡ Redis: Available on port 6379" -ForegroundColor White
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Yellow
Write-Host "  View logs: docker-compose -f docker-compose.prod.yml logs -f" -ForegroundColor Gray
Write-Host "  Stop services: docker-compose -f docker-compose.prod.yml down" -ForegroundColor Gray
Write-Host "  Restart: docker-compose -f docker-compose.prod.yml restart" -ForegroundColor Gray
Write-Host "  Check status: docker-compose -f docker-compose.prod.yml ps" -ForegroundColor Gray
