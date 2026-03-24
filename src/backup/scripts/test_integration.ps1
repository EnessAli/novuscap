# NovusCap Integration Test Script
# This script tests the complete integration between frontend and backend

Write-Host "===========================================" -ForegroundColor Green
Write-Host "   🧪 NovusCap Integration Test Suite" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

$projectPath = "c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap"
Set-Location $projectPath

# Test 1: Backend Health Check
Write-Host "[1] Testing Backend API Health..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://localhost:7139/health" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend API is healthy" -ForegroundColor Green
        Write-Host "   Status: $($response.StatusCode)" -ForegroundColor White
    } else {
        Write-Host "⚠️ Backend API returned: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Backend API is not responding" -ForegroundColor Red
    Write-Host "   Make sure backend is running (F5 in Visual Studio)" -ForegroundColor Yellow
}
Write-Host ""

# Test 2: Swagger Documentation
Write-Host "[2] Testing Swagger Documentation..." -ForegroundColor Yellow
try {
    $swaggerResponse = Invoke-WebRequest -Uri "https://localhost:7139/swagger" -UseBasicParsing -TimeoutSec 10
    if ($swaggerResponse.StatusCode -eq 200) {
        Write-Host "✅ Swagger documentation is accessible" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Swagger documentation not accessible" -ForegroundColor Red
}
Write-Host ""

# Test 3: Database Connection
Write-Host "[3] Testing Database Connection..." -ForegroundColor Yellow
try {
    # Test if we can connect to PostgreSQL
    $env:PGPASSWORD = "123"
    $dbTest = & psql -h localhost -p 5432 -U postgres -d novuscapdb -c "SELECT 1;" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database connection successful" -ForegroundColor Green
    } else {
        Write-Host "❌ Database connection failed" -ForegroundColor Red
        Write-Host "   Ensure PostgreSQL is running and novuscapdb exists" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ PostgreSQL not accessible" -ForegroundColor Red
    Write-Host "   Install PostgreSQL and create 'novuscapdb' database" -ForegroundColor Yellow
}
Write-Host ""

# Test 4: Frontend Server
Write-Host "[4] Testing Frontend Server..." -ForegroundColor Yellow
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 10
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "✅ Frontend server is running" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Frontend server is not running" -ForegroundColor Red
    Write-Host "   Run 'npm start' in frontend directory" -ForegroundColor Yellow
}
Write-Host ""

# Test 5: API Endpoints
Write-Host "[5] Testing Key API Endpoints..." -ForegroundColor Yellow

$endpoints = @(
    @{ Url = "https://localhost:7139/api/organizations"; Name = "Organizations" },
    @{ Url = "https://localhost:7139/api/organizationtypes"; Name = "Organization Types" },
    @{ Url = "https://localhost:7139/api/auth/refresh"; Name = "Auth Refresh" }
)

foreach ($endpoint in $endpoints) {
    try {
        $apiResponse = Invoke-WebRequest -Uri $endpoint.Url -UseBasicParsing -TimeoutSec 5
        Write-Host "✅ $($endpoint.Name) endpoint: $($apiResponse.StatusCode)" -ForegroundColor Green
    } catch {
        if ($_.Exception.Response.StatusCode -eq 401) {
            Write-Host "✅ $($endpoint.Name) endpoint: 401 (Authentication required - expected)" -ForegroundColor Green
        } else {
            Write-Host "⚠️ $($endpoint.Name) endpoint: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
        }
    }
}
Write-Host ""

# Test 6: File Structure
Write-Host "[6] Verifying Project Structure..." -ForegroundColor Yellow

$requiredFiles = @(
    "NovusCap.sln",
    "backend\src\NovusCap.WebApi\NovusCap.WebApi.csproj",
    "frontend\package.json",
    "docker-compose.yml",
    "README.md"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file" -ForegroundColor Red
    }
}
Write-Host ""

# Test 7: Environment Configuration
Write-Host "[7] Checking Environment Configuration..." -ForegroundColor Yellow

# Check backend appsettings
$appsettingsPath = "backend\src\NovusCap.WebApi\appsettings.json"
if (Test-Path $appsettingsPath) {
    Write-Host "✅ Backend appsettings.json found" -ForegroundColor Green
    try {
        $appsettings = Get-Content $appsettingsPath | ConvertFrom-Json
        if ($appsettings.ConnectionStrings.DefaultConnection) {
            Write-Host "✅ Database connection string configured" -ForegroundColor Green
        } else {
            Write-Host "❌ Database connection string missing" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Invalid appsettings.json format" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Backend appsettings.json not found" -ForegroundColor Red
}

# Check frontend environment
$frontendEnvPath = "frontend\.env"
if (Test-Path $frontendEnvPath) {
    Write-Host "✅ Frontend .env file found" -ForegroundColor Green
} else {
    Write-Host "⚠️ Frontend .env file not found (optional)" -ForegroundColor Yellow
}
Write-Host ""

# Summary
Write-Host "===========================================" -ForegroundColor Green
Write-Host "         📊 Test Summary" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

Write-Host "🎯 Development URLs:" -ForegroundColor Cyan
Write-Host "   Backend API: https://localhost:7139" -ForegroundColor White
Write-Host "   Swagger Docs: https://localhost:7139/swagger" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""

Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "   Quick Start: QUICK_START_VS2022.md" -ForegroundColor White
Write-Host "   Detailed Setup: VISUAL_STUDIO_SETUP.md" -ForegroundColor White
Write-Host "   Deployment: DEPLOYMENT.md" -ForegroundColor White
Write-Host ""

Write-Host "🚀 Ready for development!" -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter to exit..."
