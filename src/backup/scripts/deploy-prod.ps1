# NovusCap Production Deployment Script
# Usage: .\scripts\deploy-prod.ps1

param(
    [string]$Environment = "production",
    [switch]$Build = $false,
    [switch]$UpdateDatabase = $false
)

Write-Host "🚀 NovusCap Production Deployment" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Check if .env.production file exists
if (-not (Test-Path ".env.production")) {
    Write-Host "❌ .env.production file not found!" -ForegroundColor Red
    Write-Host "Please create .env.production with production environment variables." -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 Deploying to: $Environment" -ForegroundColor Blue

# Check Docker installation
$dockerVersion = docker --version 2>$null
if (-not $dockerVersion) {
    Write-Host "❌ Docker is not installed or not running!" -ForegroundColor Red
    exit 1
}

Write-Host "🐳 Docker version: $dockerVersion" -ForegroundColor Blue

# Stop existing containers if running
Write-Host "🛑 Stopping existing containers..." -ForegroundColor Yellow
docker-compose -f docker-compose.prod.yml down

if ($Build) {
    Write-Host "🔨 Building images..." -ForegroundColor Yellow
    docker-compose -f docker-compose.prod.yml build --no-cache
}

# Start production services
Write-Host "🚀 Starting production services..." -ForegroundColor Blue
docker-compose -f docker-compose.prod.yml up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Production deployment successful!" -ForegroundColor Green
    
    # Wait for services to be ready
    Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    
    Write-Host ""
    Write-Host "📊 Service Status:" -ForegroundColor Blue
    docker-compose -f docker-compose.prod.yml ps
    
    if ($UpdateDatabase) {
        Write-Host ""
        Write-Host "🗄️ Running database migrations..." -ForegroundColor Yellow
        docker-compose -f docker-compose.prod.yml exec backend dotnet ef database update
    }
    
    Write-Host ""
    Write-Host "🌐 Production URLs:" -ForegroundColor Blue
    Write-Host "  - Frontend: http://localhost" -ForegroundColor Cyan
    Write-Host "  - Backend API: http://localhost/api" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📝 Management Commands:" -ForegroundColor Blue
    Write-Host "  - View logs: docker-compose -f docker-compose.prod.yml logs -f [service]" -ForegroundColor White
    Write-Host "  - Stop: docker-compose -f docker-compose.prod.yml down" -ForegroundColor White
    Write-Host "  - Update: .\scripts\deploy-prod.ps1 -Build" -ForegroundColor White
    Write-Host ""
    Write-Host "🎉 Production environment is ready!" -ForegroundColor Green
} else {
    Write-Host "❌ Production deployment failed!" -ForegroundColor Red
    Write-Host "Check logs: docker-compose -f docker-compose.prod.yml logs" -ForegroundColor Yellow
    exit 1
}
