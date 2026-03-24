# 🚀 NovusCap - Visual Studio 2022 Hızlı Başlangıç

Bu kısa rehber ile projenizi 5 dakikada çalıştırabilirsiniz!

## ⚡ Hızlı Kurulum (5 Dakika)

### 1️⃣ Ön Gereksinimler (2 dk)
```bash
# Bu komutları Command Prompt'ta çalıştırarak kontrol edin:
dotnet --version  # 8.0+ olmalı
node --version    # 18.0+ olmalı
npm --version     # 9.0+ olmalı
```

❌ **Eksik olan araçları kurun:**
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org)

### 2️⃣ PostgreSQL Setup (1 dk)
```sql
-- pgAdmin veya psql ile:
CREATE DATABASE novuscapdb;
```

### 3️⃣ Visual Studio'da Proje Açma (30 sn)
**En basit yol:**
```
1. Windows Explorer → c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap\
2. NovusCap.sln dosyasına çift tıkla
3. Visual Studio 2022 açılacak
```

### 4️⃣ Backend Çalıştırma (1 dk)
```bash
# Visual Studio'da:
1. Solution Explorer → NovusCap.WebApi → Set as Startup Project
2. F5 tuşuna bas (Debug → Start Debugging)
3. Browser açılıp Swagger görünecek: https://localhost:7139/swagger
```

### 5️⃣ Frontend Çalıştırma (30 sn)
```bash
# Yeni Terminal penceresi aç:
cd "c:\Users\enest\OneDrive\Masaüstü\zıppırr\novuscap\frontend"
npm install  # İlk sefer için
npm start    # Her seferinde
```

**✅ Başarılı! Frontend: http://localhost:3000**

---

## 🎯 Development Workflow

### Her Gün Başlarken:
```bash
# Terminal 1 - Backend:
# Visual Studio'da F5 bas

# Terminal 2 - Frontend:
cd frontend && npm start
```

### Değişiklik Yaparken:
- **Backend:** Visual Studio'da kod değiştir → F5 ile restart
- **Frontend:** Kod değiştir → Otomatik hot reload

---

## 🐛 Hızlı Sorun Çözümleri

### "Database connection failed"
```bash
# PostgreSQL servisi çalışıyor mu?
# Services.msc → PostgreSQL Database Server → Running olmalı
```

### "Port already in use"
```bash
# Task Manager → Processes → Port kullanan uygulamayı kapat
# Ya da terminalde: taskkill /PID <PID> /F
```

### "npm install" hataları
```bash
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### "SSL Certificate" hataları
```bash
dotnet dev-certs https --trust
```

### ".NET Build" hataları
```bash
# Otomatik fix script'i çalıştır:
# launch_vs2022.bat → Option 3: Fix Build Issues
# Ya da PowerShell'de:
.\fix_vs2022_issues.ps1
```

### "Metadata file could not be found"
```bash
# Solution'ı temizle ve yeniden build et:
# Visual Studio'da: Build → Clean Solution → Rebuild Solution
```

---

## 📱 Test Etme (1 dk)

### Backend Test:
- Swagger: `https://localhost:7139/swagger`
- Health: `https://localhost:7139/health`

### Frontend Test:
- Ana sayfa: `http://localhost:3000`
- Harita: `http://localhost:3000/map`

### Full Integration Test:
1. Frontend'de harita sayfasına git
2. System Status panelinde tüm servisler yeşil olmalı
3. Harita yüklenmeli ve konum alınmalı

---

## 📞 Yardım

**Eğer sorun yaşıyorsanız:**
1. `VISUAL_STUDIO_SETUP.md` detaylı rehberi inceleyin
2. Logs kontrol edin: `backend/logs/` klasörü
3. Browser Console: F12 → Console tab

**🎉 Başarıyla çalıştırdınız! Happy coding! 🚀**
