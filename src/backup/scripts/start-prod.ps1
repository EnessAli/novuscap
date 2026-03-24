# NovusCap Production Environment Startup Script (PowerShell)
Write-Host "🚀 Starting NovusCap Production Environment..." -ForegroundColor Green

# Check if Docker is running
try {
    docker info | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "Docker is not running"
    }
} catch {
    Write-Host "❌ Docker is not running. Please start Docker first." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Using unified docker-compose.yml with production configuration..." -ForegroundColor Yellow

# Load production environment and start services (including nginx)
docker compose --env-file .env.production --profile production up -d

# Check if services started successfully
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production environment started successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Services available at:" -ForegroundColor Cyan
    Write-Host "   Frontend: http://localhost (via Nginx)" -ForegroundColor White
    Write-Host "   HTTPS:    https://localhost (via Nginx)" -ForegroundColor White
    Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
    Write-Host "   Database: localhost:5432" -ForegroundColor White
    Write-Host "   Redis:    localhost:6379 (password protected)" -ForegroundColor White
    Write-Host ""    Write-Host "📊 To view logs: docker compose --profile production logs -f" -ForegroundColor Yellow
    Write-Host "🛑 To stop: docker compose --profile production down" -ForegroundColor Yellow
} else {
    Write-Host "❌ Failed to start production environment" -ForegroundColor Red
    exit 1
}
