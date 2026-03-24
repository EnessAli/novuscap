# Frontend Dependencies Setup Script
Write-Host "===========================================" -ForegroundColor Green
Write-Host "   📦 Frontend Dependencies Kurulumu" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

$projectPath = "c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap"
$frontendPath = Join-Path $projectPath "frontend"

# Navigate to frontend directory
if (Test-Path $frontendPath) {
    Set-Location $frontendPath
    Write-Host "📂 Frontend klasörüne geçildi: $frontendPath" -ForegroundColor Yellow
} else {
    Write-Host "❌ Frontend klasörü bulunamadı!" -ForegroundColor Red
    exit 1
}

# Check Node.js
Write-Host "[1] Node.js kontrol ediliyor..." -ForegroundColor Yellow
try {
    $nodeVersion = & node --version
    Write-Host "✅ Node.js bulundu: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js bulunamadı!" -ForegroundColor Red
    Write-Host "   İndirin: https://nodejs.org" -ForegroundColor Yellow
    Read-Host "Devam etmek için Enter tuşuna basın..."
    exit 1
}

# Check npm
Write-Host "[2] npm kontrol ediliyor..." -ForegroundColor Yellow
try {
    $npmVersion = & npm --version
    Write-Host "✅ npm bulundu: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm bulunamadı!" -ForegroundColor Red
    exit 1
}

# Clean cache if needed
Write-Host "[3] npm cache temizleniyor..." -ForegroundColor Yellow
try {
    & npm cache clean --force
    Write-Host "✅ npm cache temizlendi" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Cache temizleme başarısız" -ForegroundColor Yellow
}

# Remove existing node_modules if exists
Write-Host "[4] Mevcut node_modules temizleniyor..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    try {
        Remove-Item "node_modules" -Recurse -Force
        Write-Host "✅ node_modules silindi" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ node_modules silinemedi" -ForegroundColor Yellow
    }
}

# Remove package-lock.json if exists
if (Test-Path "package-lock.json") {
    try {
        Remove-Item "package-lock.json" -Force
        Write-Host "✅ package-lock.json silindi" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ package-lock.json silinemedi" -ForegroundColor Yellow
    }
}

# Install dependencies
Write-Host "[5] Dependencies kuruluyor..." -ForegroundColor Yellow
Write-Host "   Bu işlem birkaç dakika sürebilir..." -ForegroundColor White
try {
    & npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependencies başarıyla kuruldu!" -ForegroundColor Green
    } else {
        Write-Host "❌ Dependencies kurulumu başarısız" -ForegroundColor Red
        Write-Host "   Yeniden deneniyor..." -ForegroundColor Yellow
        & npm install --force
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Dependencies --force ile kuruldu!" -ForegroundColor Green
        } else {
            Write-Host "❌ Dependencies kurulumu tamamen başarısız" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "❌ npm install hatası: $($_.Exception.Message)" -ForegroundColor Red
}

# Verify installation
Write-Host "[6] Kurulum doğrulanıyor..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    $moduleCount = (Get-ChildItem "node_modules" -Directory).Count
    Write-Host "✅ $moduleCount adet paket kuruldu" -ForegroundColor Green
} else {
    Write-Host "❌ node_modules klasörü oluşturulamadı" -ForegroundColor Red
}

# Test start command
Write-Host "[7] Start komutu test ediliyor..." -ForegroundColor Yellow
try {
    Write-Host "   React script'leri kontrol ediliyor..." -ForegroundColor White
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    if ($packageJson.scripts.start) {
        Write-Host "✅ Start script mevcut: $($packageJson.scripts.start)" -ForegroundColor Green
    } else {
        Write-Host "❌ Start script bulunamadı" -ForegroundColor Red
    }
} catch {
    Write-Host "⚠️ package.json okunamadı" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Green
Write-Host "         ✅ Frontend Kurulum Tamamlandı!" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

Write-Host "🚀 Frontend'i başlatmak için:" -ForegroundColor Cyan
Write-Host "   npm start" -ForegroundColor White
Write-Host ""
Write-Host "📱 Frontend URL:" -ForegroundColor Cyan
Write-Host "   http://localhost:3000" -ForegroundColor White
Write-Host ""

# Ask if user wants to start now
$startNow = Read-Host "Frontend'i şimdi başlatmak ister misiniz? (y/n)"
if ($startNow -eq 'y' -or $startNow -eq 'Y') {
    Write-Host ""
    Write-Host "🌐 Frontend başlatılıyor..." -ForegroundColor Green
    & npm start
} else {
    Write-Host ""
    Write-Host "Frontend'i daha sonra 'npm start' komutu ile başlatabilirsiniz." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Devam etmek için Enter tuşuna basın..."
