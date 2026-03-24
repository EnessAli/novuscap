# 🎯 Visual Studio 2022'de NovusCap Projesi Çalıştırma Rehberi

Bu rehber, NovusCap projesini Visual Studio 2022'de açma, konfigüre etme ve çalıştırma sürecini adım adım açıklamaktadır.

## 📋 Ön Gereksinimler ve Kurulum

### 1. Visual Studio 2022 Community/Professional/Enterprise

#### Gerekli Workload'lar:
- ✅ **ASP.NET and web development**
- ✅ **.NET 8.0 SDK** (minimum 8.0.0)
- ✅ **Web development tools**
- ✅ **NuGet Package Manager**
- ✅ **Git for Windows** (VS içinde entegre)

#### VS 2022 Kurulum Kontrolü:
```bash
# Command Prompt'ta .NET versiyonunu kontrol edin:
dotnet --version
# Çıktı: 8.0.x veya üzeri olmalı
```

### 2. Ek Gerekli Araçlar

#### A) Node.js 18+ (Frontend için)
- 📥 [Node.js LTS](https://nodejs.org/en/download/) indirin
- ✅ Kurulum sonrası kontrol:
```bash
node --version  # v18.x.x veya üzeri
npm --version   # 9.x.x veya üzeri
```

#### B) PostgreSQL 15+ (Database)
- 📥 [PostgreSQL](https://www.postgresql.org/download/windows/) indirin
- ⚙️ Kurulum ayarları:
  - Port: **5432**
  - Username: **postgres**
  - Password: **123** (projedeki config'e uygun)

#### C) Google Chrome/Edge (Debugging)
- Modern browser debugging için gerekli

## 🚀 Projeyi Visual Studio 2022'de Açma

### Yöntem 1: Solution File ile (Önerilen)
1. **Windows Explorer'da projeye gidin:**
   ```
   c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap\
   ```
2. **Backend klasörüne gidin:**
   ```
   c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap\backend\
   ```
3. **`NovusCap.sln`** dosyasına çift tıklayın
4. Visual Studio 2022 otomatik olarak açılacak

### Yöntem 2: Visual Studio'dan Açma
1. **Visual Studio 2022**'yi açın
2. **"Open a project or solution"** seçin
3. Şu klasöre gidin:
   ```
   c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap\backend\
   ```
4. **`NovusCap.sln`** seçin ve **Open** tıklayın

### Yöntem 3: Folder ile Açma
1. **Visual Studio 2022**'yi açın
2. **"Open a local folder"** seçin
3. Şu klasörü seçin:
   ```
   c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap\
   ```

## 💾 Database Kurulumu

### 1. PostgreSQL Database Oluşturma

#### pgAdmin ile (Grafik Arayüz)
1. **pgAdmin 4**'ü açın
2. **Servers → PostgreSQL 15 → Right Click → Create → Database**
3. **Database name:** `novuscapdb`
4. **Owner:** `postgres`
5. **Save** tıklayın

#### Command Line ile
```sql
-- PostgreSQL komut satırında çalıştırın:
psql -U postgres -h localhost

-- Database oluşturun:
CREATE DATABASE novuscapdb;

-- Bağlantıyı test edin:
\c novuscapdb
\q
```

### 2. Connection String Kontrolü
`backend/src/NovusCap.WebApi/appsettings.json` dosyasında:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=novuscapdb;Username=postgres;Password=123;"
  }
}
```

## ⚙️ Backend Konfigürasyonu ve Çalıştırma

### 1. NuGet Packages Restore
1. **Visual Studio'da Solution'ı açın**
2. **Solution Explorer → Right Click → Restore NuGet Packages**
3. Veya **Tools → NuGet Package Manager → Package Manager Console**:
   ```bash
   Update-Package -reinstall
   ```

### 2. Database Migration (İlk Çalıştırma)
**Package Manager Console**'da (Tools → NuGet Package Manager → Package Manager Console):
```bash
# Default project'i NovusCap.Infrastructure olarak ayarlayın
Add-Migration InitialCreate
Update-Database
```

### 3. Backend'i Çalıştırma

#### Yöntem A: Visual Studio Debug Mode
1. **Solution Explorer**'da **NovusCap.WebApi** projesine sağ tıklayın
2. **"Set as Startup Project"** seçin
3. **F5** tuşuna basın veya **Debug → Start Debugging**
4. Browser otomatik açılacak: `https://localhost:7139/swagger`

#### Yöntem B: IIS Express
1. **Debug dropdown**'dan **IIS Express** seçin
2. **Start** butonuna tıklayın

### 4. Backend Test Etme
- **Swagger UI:** `https://localhost:7139/swagger`
- **Health Check:** `https://localhost:7139/health`
- **API Base:** `https://localhost:7139/api/`

## 🌐 Frontend Kurulumu ve Çalıştırma

### 1. Node.js Dependencies Kurulumu
**Visual Studio Terminal** veya **Command Prompt**'ta:
```bash
# Frontend klasörüne gidin:
cd "c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap\frontend"

# Dependencies kurun:
npm install

# Kurulumu doğrulayın:
npm list --depth=0
```

### 2. Environment Variables
`frontend/.env` dosyasını kontrol edin:
```env
REACT_APP_API_URL=https://localhost:7139/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3. Frontend'i Çalıştırma

#### Yöntem A: npm scripts ile
```bash
# Development mode:
npm start

# Production build:
npm run build

# Test:
npm test
```

#### Yöntem B: Visual Studio'dan
1. **Solution Explorer → Add → Existing Web Site**
2. Frontend klasörünü ekleyin
3. **F5** ile çalıştırın

### 4. Frontend Test Etme
- **Development Server:** `http://localhost:3000`
- **React App Test:** Browser'da Map ve diğer sayfaları kontrol edin

## 🔄 Full Stack Development Workflow

### 1. Her İki Servisi Birlikte Çalıştırma

#### Terminal Setup (Önerilen)
**Terminal 1 - Backend:**
```bash
cd "c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap\backend"
dotnet run --project src/NovusCap.WebApi
```

**Terminal 2 - Frontend:**
```bash
cd "c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap\frontend"
npm start
```

#### Visual Studio Multiple Startup
1. **Solution Explorer → Solution → Properties**
2. **Startup Project → Multiple startup projects**
3. **NovusCap.WebApi:** Start
4. **Frontend (eklenmişse):** Start
5. **Apply → OK**

### 2. Debug Konfigürasyonu

#### Backend Debugging
- **Breakpoint'ler:** Controller'larda ve Service'lerde
- **Debug Console:** Exception ve log mesajları
- **Watch Window:** Variable değerlerini takip

#### Frontend Debugging
- **Browser Developer Tools:** F12
- **React Developer Tools:** Chrome extension
- **Console:** JavaScript hataları ve logları

## 🐛 Common Issues ve Çözümleri

### 1. "Database Connection Failed"
```bash
# PostgreSQL servisinin çalıştığını kontrol edin:
# Services.msc → PostgreSQL Database Server → Status: Running

# Connection string'i doğrulayın:
# appsettings.json → ConnectionStrings → DefaultConnection
```

### 2. "npm install" Hataları
```bash
# Cache temizleme:
npm cache clean --force

# Node modules silip yeniden kurma:
rm -rf node_modules package-lock.json
npm install
```

### 3. "SSL Certificate" Hataları
```bash
# Development certificate güveni:
dotnet dev-certs https --trust
```

### 4. "Port Already in Use"
```bash
# Port kullanımını kontrol edin:
netstat -ano | findstr :7139
netstat -ano | findstr :3000

# Process'i sonlandırın:
taskkill /PID <PID_NUMBER> /F
```

## 📚 Useful Visual Studio Extensions

### Recommended Extensions:
1. **Resharper** veya **SonarLint** - Code quality
2. **GitLens** - Git integration
3. **REST Client** - API testing
4. **Thunder Client** - Postman alternative
5. **Live Server** - Frontend development

### Installation:
**Extensions → Manage Extensions → Online → Search**

## 🎯 Production Ready Checklist

### Before Deployment:
- ✅ All tests passing
- ✅ No console errors
- ✅ Database migrations applied
- ✅ Environment variables configured
- ✅ API endpoints responding
- ✅ Frontend-backend connectivity confirmed

### Final Testing:
```bash
# Backend test:
dotnet test

# Frontend test:
npm test -- --coverage

# Integration test:
# Browser'da bütün functionality'leri test edin
```

## 📞 Support ve Troubleshooting

### Log Files Locations:
- **Backend Logs:** `backend/logs/` klasörü
- **IIS Express Logs:** `%IISExpressLogs%`
- **Browser Console:** F12 → Console tab

### Debug Commands:
```bash
# Backend health check:
curl https://localhost:7139/health

# Frontend build check:
npm run build

# Database connection test:
dotnet ef database update --verbose
```

Bu rehber ile NovusCap projenizi Visual Studio 2022'de başarıyla çalıştırabilirsiniz! 🚀

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=novuscapdb;Username=postgres;Password=123;Port=5432"
  },
  "Jwt": {
    "SecretKey": "ThisIsAVerySecureSecretKeyForNovusCapApplicationThatShouldBeAtLeast32Characters",
    "Issuer": "NovusCap",
    "Audience": "NovusCapUsers",
    "ExpirationInMinutes": 60
  },
  "GoogleMaps": {
    "ApiKey": "AIzaSyBCU4x_en_zLcX5fc3Wt8wKZwjTkyWNyqI"
  }
}
```

### 4. Backend Çalıştırma (Visual Studio 2022)

#### Adım 1: Startup Project Ayarlama
1. **Solution Explorer**'da sağ tık
2. **"Set Startup Projects..."** seçin
3. **"Single startup project"** seçin
4. **"NovusCap.WebApi"** projesini seçin
5. **OK** tıklayın

#### Adım 2: Package Restore
```bash
# Package Manager Console'da (Tools > NuGet Package Manager > Package Manager Console):
Update-Package -Reinstall
```

#### Adım 3: Database Migration
```bash
# Package Manager Console'da:
cd src/NovusCap.WebApi
dotnet ef database update
```

#### Adım 4: Backend'i Çalıştırma
1. **F5** tuşuna basın veya **"Start Debugging"** butonuna tıklayın
2. Browser'da şu URL açılacak: `https://localhost:7049` veya `http://localhost:5000`
3. Swagger UI görünmelidir

### 5. Frontend Setup ve Çalıştırma

#### Adım 1: Dependencies Kurulumu
```bash
# Visual Studio Terminal'de (View > Terminal):
cd c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap\frontend
npm install
```

#### Adım 2: Environment Variables
`frontend/.env.local` dosyası oluşturun:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBCU4x_en_zLcX5fc3Wt8wKZwjTkyWNyqI
```

#### Adım 3: Frontend'i Çalıştırma
```bash
# Terminal'de:
npm start
```

React development server başlayacak: `http://localhost:3000`

## 🔧 Visual Studio 2022 Configuration

### 1. Multiple Startup Projects (Önerilen)

#### Hem Backend hem Frontend'i aynı anda başlatmak için:
1. Solution'a sağ tık > **"Set Startup Projects..."**
2. **"Multiple startup projects"** seçin
3. Şu projeleri **"Start"** olarak ayarlayın:
   - **NovusCap.WebApi** (Port: 5000)
   - **Frontend** (npm start script ile)

### 2. Launch Settings Configuration

`backend/src/NovusCap.WebApi/Properties/launchSettings.json`:
```json
{
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "https://localhost:7049;http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

### 3. Debug Configuration

#### Backend Debugging
1. **Breakpoint** koymak için kod satırına tıklayın
2. **F5** ile debug mode'da başlatın
3. API calls debug edilebilir

#### Frontend Debugging
1. **Chrome DevTools** kullanın
2. VS Code extension'ı kullanarak VS 2022'de debug edebilirsiniz
3. React Developer Tools browser extension'ı yükleyin

## 🧪 Testing Setup

### Backend Tests
```bash
# Package Manager Console'da:
dotnet test
```

### Frontend Tests
```bash
# Frontend dizininde:
npm test
```

## 🚨 Troubleshooting

### Common Issues ve Çözümleri

#### 1. Port Conflicts
```bash
# PowerShell'de port kullanımını kontrol edin:
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Process'i kill etmek için:
taskkill /PID <PID> /F
```

#### 2. Database Connection Error
- PostgreSQL service'in çalıştığını kontrol edin
- Connection string'i verify edin
- Database'in var olduğunu kontrol edin

#### 3. Package Restore Issues
```bash
# NuGet cache temizle:
dotnet nuget locals all --clear

# Packages restore:
dotnet restore
```

#### 4. Node.js Issues
```bash
# Node modules temizle:
rmdir /s node_modules
del package-lock.json
npm install
```

## 📊 Performance Tips

### Visual Studio 2022 Optimizasyonu
1. **Solution Filter** kullanın (sadece aktif projeler)
2. **IntelliSense** cache'i temizleyin
3. **Background Tasks** disable edin (Tools > Options)
4. **Lightweight Solution Load** aktifleştirin

### Development Workflow
1. **Hot Reload** aktifleştirin (.NET 8 otomatik)
2. **React Fast Refresh** aktif (npm start ile otomatik)
3. **IIS Express** yerine **Kestrel** kullanın

## 🔍 Debugging Workflow

### 1. Backend API Debug
1. **NovusCap.WebApi** startup project olarak set edin
2. Controller'larda breakpoint koyun
3. **F5** ile başlatın
4. Swagger UI'dan test edin

### 2. Full-Stack Debug
1. Backend'i debug mode'da başlatın
2. Ayrı terminal'de frontend'i başlatın
3. Browser DevTools ile frontend debug edin
4. Network tab'da API calls monitor edin

### 3. Database Debug
1. **SQL Server Object Explorer** kullanın
2. Connection string'i test edin
3. Migration history kontrol edin

## 🎯 Development Tasks

### Daily Workflow
1. **F5** - Backend'i başlat (Swagger açılır)
2. **Ctrl+`** - Terminal aç
3. `npm start` - Frontend'i başlat
4. **Ctrl+Shift+`** - Yeni terminal
5. Development'a başla!

### Git Integration
1. **Team Explorer** tab'ı kullanın
2. **Changes** view'da commit yapın
3. **Branches** view'da branch değiştirin

---

## 🎉 Ready to Develop!

Bu rehberi takip ettikten sonra:
- ✅ Backend API: `http://localhost:5000/swagger`
- ✅ Frontend: `http://localhost:3000`
- ✅ Full debugging capability
- ✅ Hot reload aktif
- ✅ Database connection established

**Happy Coding! 🚀**
