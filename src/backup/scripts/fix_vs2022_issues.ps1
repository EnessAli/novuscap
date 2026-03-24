# NovusCap - Visual Studio 2022 Sorun Giderme Script'i
# Bu script'i tüm .NET build hatalarını çözmek için kullanın

Write-Host "===========================================" -ForegroundColor Green
Write-Host "   🔧 NovusCap VS2022 Sorun Giderme" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

$projectPath = "c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap"

# Navigate to project
Set-Location $projectPath
Write-Host "📂 Proje klasörüne geçildi: $projectPath" -ForegroundColor Yellow
Write-Host ""

# Step 1: Clean Solution
Write-Host "[1] Solution temizleniyor..." -ForegroundColor Yellow
try {
    & dotnet clean NovusCap.sln --configuration Debug
    & dotnet clean NovusCap.sln --configuration Release
    Write-Host "✅ Solution temizlendi" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Clean işlemi tamamlanamadı" -ForegroundColor Yellow
}
Write-Host ""

# Step 2: Remove bin/obj directories
Write-Host "[2] Build cache temizleniyor..." -ForegroundColor Yellow
try {
    Get-ChildItem -Path "backend" -Recurse -Directory -Name "bin" | ForEach-Object {
        $path = Join-Path "backend" $_
        Remove-Item $path -Recurse -Force -ErrorAction SilentlyContinue
    }
    
    Get-ChildItem -Path "backend" -Recurse -Directory -Name "obj" | ForEach-Object {
        $path = Join-Path "backend" $_
        Remove-Item $path -Recurse -Force -ErrorAction SilentlyContinue
    }
    Write-Host "✅ Build cache temizlendi" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Cache temizleme kısmen başarılı" -ForegroundColor Yellow
}
Write-Host ""

# Step 3: Restore packages
Write-Host "[3] NuGet paketleri restore ediliyor..." -ForegroundColor Yellow
try {
    & dotnet restore NovusCap.sln
    Write-Host "✅ NuGet paketleri restore edildi" -ForegroundColor Green
} catch {
    Write-Host "❌ Restore işlemi başarısız" -ForegroundColor Red
    Write-Host "   Manuel olarak Visual Studio'da Tools > NuGet Package Manager > Restore çalıştırın" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Build solution
Write-Host "[4] Solution build ediliyor..." -ForegroundColor Yellow
try {
    $buildResult = & dotnet build NovusCap.sln --configuration Debug 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Build başarılı!" -ForegroundColor Green
    } else {
        Write-Host "❌ Build hatası mevcut" -ForegroundColor Red
        Write-Host "Build çıktısı:" -ForegroundColor Yellow
        $buildResult | ForEach-Object { Write-Host "   $_" -ForegroundColor White }
    }
} catch {
    Write-Host "❌ Build işlemi başarısız" -ForegroundColor Red
}
Write-Host ""

# Step 5: Check for common issues
Write-Host "[5] Yaygın sorunlar kontrol ediliyor..." -ForegroundColor Yellow

# Check .NET version
$dotnetVersion = & dotnet --version
if ($dotnetVersion -like "8.*") {
    Write-Host "✅ .NET 8.0 SDK kurulu: $dotnetVersion" -ForegroundColor Green
} else {
    Write-Host "❌ .NET 8.0 SDK gerekli, mevcut: $dotnetVersion" -ForegroundColor Red
    Write-Host "   İndirin: https://dotnet.microsoft.com/download/dotnet/8.0" -ForegroundColor Yellow
}

# Check test projects
$testProjects = @(
    "backend\tests\NovusCap.UnitTests\NovusCap.UnitTests.csproj",
    "backend\tests\NovusCap.IntegrationTests\NovusCap.IntegrationTests.csproj"
)

foreach ($testProject in $testProjects) {
    if (Test-Path $testProject) {
        Write-Host "✅ Test projesi bulundu: $testProject" -ForegroundColor Green
    } else {
        Write-Host "❌ Test projesi eksik: $testProject" -ForegroundColor Red
    }
}

# Check project files target framework
$projectFiles = Get-ChildItem -Path "backend\src" -Recurse -Name "*.csproj"
foreach ($projectFile in $projectFiles) {
    $fullPath = Join-Path "backend\src" $projectFile
    $content = Get-Content $fullPath -Raw
    if ($content -match "<TargetFramework>net8\.0</TargetFramework>") {
        Write-Host "✅ $projectFile - .NET 8.0 target framework" -ForegroundColor Green
    } elseif ($content -match "<TargetFramework>net6\.0</TargetFramework>") {
        Write-Host "⚠️ $projectFile - .NET 6.0 (güncelleme gerekli)" -ForegroundColor Yellow
    }
}
Write-Host ""

# Step 6: Database check
Write-Host "[6] Veritabanı bağlantısı kontrol ediliyor..." -ForegroundColor Yellow
try {
    $env:PGPASSWORD = "123"
    $dbCheck = & psql -h localhost -p 5432 -U postgres -d novuscapdb -c "SELECT 1;" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ PostgreSQL veritabanı erişilebilir" -ForegroundColor Green
    } else {
        Write-Host "❌ Veritabanı bağlantı sorunu" -ForegroundColor Red
        Write-Host "   PostgreSQL'in çalıştığını ve novuscapdb'nin var olduğunu kontrol edin" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ PostgreSQL erişilemez" -ForegroundColor Red
    Write-Host "   PostgreSQL kurulu değil veya çalışmıyor" -ForegroundColor Yellow
}
Write-Host ""

# Summary and recommendations
Write-Host "===========================================" -ForegroundColor Green
Write-Host "         📋 Özet ve Öneriler" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

Write-Host "🎯 Visual Studio'da yapmak gerekenler:" -ForegroundColor Cyan
Write-Host "   1. NovusCap.sln dosyasını açın" -ForegroundColor White
Write-Host "   2. Solution Explorer'da NovusCap.WebApi'ye sağ tıklayın" -ForegroundColor White
Write-Host "   3. 'Set as Startup Project' seçin" -ForegroundColor White
Write-Host "   4. Build > Rebuild Solution yapın" -ForegroundColor White
Write-Host "   5. F5 ile debug modunda çalıştırın" -ForegroundColor White
Write-Host ""

Write-Host "🔧 Sorun devam ederse:" -ForegroundColor Cyan
Write-Host "   • Tools > NuGet Package Manager > Package Manager Console" -ForegroundColor White
Write-Host "   • Update-Package -Reinstall komutunu çalıştırın" -ForegroundColor White
Write-Host "   • Tools > Options > NuGet Package Manager > Clear All NuGet Cache" -ForegroundColor White
Write-Host ""

Write-Host "📱 Test URL'leri:" -ForegroundColor Cyan
Write-Host "   • Backend: https://localhost:7139" -ForegroundColor White
Write-Host "   • Swagger: https://localhost:7139/swagger" -ForegroundColor White
Write-Host "   • Health: https://localhost:7139/health" -ForegroundColor White
Write-Host ""

Write-Host "🚀 Sorunlar çözüldü! Happy coding!" -ForegroundColor Green
Write-Host ""

Read-Host "Devam etmek için Enter tuşuna basın..."
