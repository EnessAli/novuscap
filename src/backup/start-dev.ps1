# NovusCap Docker Development Script (PowerShell)
# Usage: .\scripts\start-dev.ps1

Write-Host "🚀 NovusCap Development Environment Starter" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Please copy .env.example to .env and configure your environment variables." -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 Loading environment variables from .env..." -ForegroundColor Blue

Write-Host "🐳 Starting development environment with Docker Compose..." -ForegroundColor Blue
Write-Host "Backend will be available at: http://localhost:5002" -ForegroundColor Cyan
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Database will be available at: localhost:5432" -ForegroundColor Cyan

# Start services
Write-Host "Starting Docker services with unified configuration..." -ForegroundColor Yellow
docker compose --env-file .env up --build -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Services started successfully!" -ForegroundColor Green
    Write-Host ""    Write-Host "📊 Service Status:" -ForegroundColor Blue
    docker compose ps
    
    Write-Host ""    Write-Host "📝 Useful Commands:" -ForegroundColor Blue
    Write-Host "  - View logs: docker compose logs -f [service_name]" -ForegroundColor White
    Write-Host "  - Stop services: docker compose down" -ForegroundColor White
    Write-Host "  - Rebuild: docker compose up --build" -ForegroundColor White
    Write-Host "  - Access database: docker compose exec postgres psql -U postgres -d novuscapdb" -ForegroundColor White
    Write-Host ""
    Write-Host "🎯 Ready for development!" -ForegroundColor Green
} else {    Write-Host "❌ Failed to start services. Check Docker logs for details." -ForegroundColor Red
    Write-Host "Try: docker compose logs" -ForegroundColor Yellow
}
