# 📁 Scripts Klasörü

Bu klasör, NovusCap projesi için gerekli otomasyon scriptlerini içerir.

## 🚀 Development Scripts

### Quick Start Scripts
- **`start-dev.ps1`** - 🐳 Development ortamını Docker ile başlatır
- **`start-dev.sh`** - 🐳 Development ortamını başlatır (Linux/Mac)
- **`dev-setup.ps1`** - ⚙️ Development ortamını kurar

### Production Scripts  
- **`deploy-prod.ps1`** - 🚀 Production deployment script
- **`deploy.ps1`** - 🚀 Genel deployment script
- **`deploy.sh`** - 🚀 Deployment script (Linux/Mac)

### System Management
- **`check_system.bat`** - 🔍 Sistem gereksinimlerini kontrol eder
- **`fix_vs2022_issues.ps1`** - 🔧 Visual Studio 2022 sorunlarını çözer
- **`test_integration.ps1`** - 🧪 Integration testlerini çalıştırır

### Visual Studio Integration
- **`launch_vs2022.bat`** - 🎯 Visual Studio 2022'yi proje ile açar
- **`setup_vs2022.ps1`** - ⚙️ Visual Studio 2022 kurulumunu yapar

### Frontend Specific
- **`setup_frontend.ps1`** - ⚛️ Frontend dependency kurulumu

## 🛠️ Kullanım

### Development Ortamını Başlatma
```powershell
# Docker ile development ortamını başlat
.\scripts\start-dev.ps1

# Veya sistem kontrolü ile birlikte
.\scripts\check_system.bat
.\scripts\start-dev.ps1
```

### Production Deployment
```powershell
# Production'a deploy et
.\scripts\deploy-prod.ps1 -Build -UpdateDatabase

# Sadece restart
.\scripts\deploy-prod.ps1
```

### Visual Studio 2022 ile Çalışma
```powershell
# Tek tıkla VS2022'yi açmak için
.\scripts\launch_vs2022.bat

# VS2022 kurulum sorunları varsa
.\scripts\fix_vs2022_issues.ps1
```

## 🔧 Script Parametreleri

### deploy-prod.ps1 Parametreleri:
- `-Build` - Docker image'larını yeniden build eder
- `-UpdateDatabase` - Database migration'ları çalıştırır
- `-Environment` - Deployment environment belirtir

### Örnek Kullanım:
```powershell
.\scripts\deploy-prod.ps1 -Build -UpdateDatabase -Environment production
```

## 📋 Gereksinimler

Bu scriptlerin çalışması için:
- ✅ PowerShell 5.1 veya üzeri
- ✅ Docker Desktop (Docker scripts için)
- ✅ .NET 8 SDK (backend scripts için)
- ✅ Node.js 18+ (frontend scripts için)
- ✅ Git (deployment scripts için)

## 🚨 Güvenlik Notları

- Production deployment scriptlerini çalıştırmadan önce `.env.production` dosyasını kontrol edin
- Sensitive değerleri scriptlere hard-code etmeyin
- Production ortamında script loglarını kontrol edin
