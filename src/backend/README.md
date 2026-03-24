# NovusCap Backend API

NovusCap projesi backend'i - Türkiye'nin girişimcilik ekosistemini harita üzerinde dijitalleştiren web uygulaması.

## 🚀 Teknolojiler

- **ASP.NET Core 6.0** - Web API Framework
- **Entity Framework Core** - ORM ve Database Management
- **PostgreSQL** - Ana Veritabanı
- **JWT Authentication** - Kimlik Doğrulama
- **AutoMapper** - Object Mapping
- **Swagger/OpenAPI** - API Dokümantasyonu
- **Clean Architecture** - Mimari Yapı

## 📁 Proje Yapısı

```
backend/
├── src/
│   ├── NovusCap.WebApi/          # API Controllers ve Configuration
│   ├── NovusCap.Application/     # Business Logic ve Services
│   ├── NovusCap.Domain/          # Domain Entities ve Interfaces
│   └── NovusCap.Infrastructure/  # Data Access ve External Services
└── tests/
    ├── NovusCap.UnitTests/
    └── NovusCap.IntegrationTests/
```

## 🏗️ Kurulum ve Çalıştırma

### Ön Gereksinimler
- .NET 6.0 SDK
- PostgreSQL (Docker ile sağlanır)
- Docker & Docker Compose

### 1. PostgreSQL Veritabanını Başlat
```bash
# Ana proje klasöründen
docker-compose up -d db
```

### 2. Backend'i Çalıştır
```bash
cd backend/src/NovusCap.WebApi
dotnet run
```

### 3. API'ye Erişim
- **Swagger UI**: http://localhost:5000/swagger
- **API Base URL**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/refresh-token` - Token yenileme
- `POST /api/auth/logout` - Kullanıcı çıkışı
- `POST /api/auth/change-password` - Şifre değiştirme

### Organizations
- `GET /api/organizations` - Organizasyonları listele (sayfalama, filtreleme)
- `GET /api/organizations/{id}` - Organizasyon detayı
- `POST /api/organizations` - Yeni organizasyon oluştur
- `PUT /api/organizations/{id}` - Organizasyon güncelle
- `DELETE /api/organizations/{id}` - Organizasyon sil
- `GET /api/organizations/by-type/{typeId}` - Türe göre organizasyonlar
- `GET /api/organizations/search` - Organizasyon arama
- `GET /api/organizations/nearby` - Yakındaki organizasyonlar
- `POST /api/organizations/{id}/approve` - Organizasyon onayla
- `POST /api/organizations/{id}/reject` - Organizasyon reddet

### Organization Types
- `GET /api/organizationtypes` - Organizasyon türleri
- `GET /api/organizationtypes/{id}` - Organizasyon türü detayı
- `POST /api/organizationtypes` - Yeni tür oluştur (Admin)
- `PUT /api/organizationtypes/{id}` - Tür güncelle (Admin)
- `DELETE /api/organizationtypes/{id}` - Tür sil (Admin)

### Locations
- `GET /api/locations` - Lokasyonları listele
- `GET /api/locations/{id}` - Lokasyon detayı
- `POST /api/locations` - Yeni lokasyon oluştur
- `PUT /api/locations/{id}` - Lokasyon güncelle
- `DELETE /api/locations/{id}` - Lokasyon sil
- `GET /api/locations/by-city` - Şehre göre lokasyonlar
- `GET /api/locations/within-bounds` - Harita sınırları içindeki lokasyonlar
- `GET /api/locations/nearby` - Yakındaki lokasyonlar

### Users
- `GET /api/users/profile` - Kullanıcı profili
- `PUT /api/users/profile` - Profil güncelle
- `GET /api/users` - Kullanıcı listesi (Admin/Moderator)
- `GET /api/users/{id}` - Kullanıcı detayı (Admin/Moderator)
- `POST /api/users` - Yeni kullanıcı oluştur (Admin)
- `PUT /api/users/{id}` - Kullanıcı güncelle (Admin)
- `DELETE /api/users/{id}` - Kullanıcı sil (Admin)

### Reports
- `GET /api/reports` - Raporları listele (Admin/Moderator)
- `GET /api/reports/{id}` - Rapor detayı
- `POST /api/reports` - Yeni rapor oluştur
- `POST /api/reports/organization-report` - Organizasyon raporu oluştur
- `POST /api/reports/user-activity-report` - Kullanıcı aktivite raporu
- `POST /api/reports/location-stats-report` - Lokasyon istatistik raporu

## 🔑 Authentication

API JWT tabanlı authentication kullanır. Login sonrası dönen token'ı Authorization header'ına ekleyin:

```
Authorization: Bearer {your-jwt-token}
```

## 👥 Roller

- **Admin**: Tüm yetkilere sahip
- **Moderator**: Organizasyon onaylama/reddetme, rapor görüntüleme
- **User**: Temel kullanıcı yetkileri

## ⚙️ Configuration

`appsettings.json` dosyasında aşağıdaki ayarları yapılandırabilirsiniz:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=novuscapdb;Username=postgres;Password=123;Port=5432"
  },
  "Jwt": {
    "SecretKey": "your-secret-key",
    "Issuer": "NovusCap",
    "Audience": "NovusCapUsers",
    "ExpirationInMinutes": 60,
    "RefreshTokenExpirationInDays": 7
  },
  "GoogleMaps": {
    "ApiKey": "your-google-maps-api-key"
  }
}
```

## 🧪 Test

```bash
# Unit testler
cd tests/NovusCap.UnitTests
dotnet test

# Integration testler
cd tests/NovusCap.IntegrationTests
dotnet test
```

## 📦 Docker

```bash
# Backend'i Docker ile çalıştır
docker-compose up backend

# Tüm servisleri çalıştır
docker-compose up
```

## 🔧 Development

### Database Migration
```bash
# Migration oluştur
dotnet ef migrations add MigrationName --project src/NovusCap.Infrastructure --startup-project src/NovusCap.WebApi

# Database güncelle
dotnet ef database update --project src/NovusCap.Infrastructure --startup-project src/NovusCap.WebApi
```

### Seed Data
Uygulama ilk çalıştırıldığında otomatik olarak:
- Organizasyon türleri
- Örnek lokasyonlar
- Admin kullanıcısı (admin@novuscap.com / Admin123!)
- Temel roller

oluşturulur.

## 📈 Monitoring

- Health Check: `/api/health`
- Database Health: `/api/health/database`
- Swagger UI: `/swagger`

## 🚀 Production Deployment

1. `appsettings.Production.json` oluşturun
2. Production connection string'ini ayarlayın
3. JWT secret key'i güvenli bir değerle değiştirin
4. HTTPS sertifikası yapılandırın
5. Docker compose ile deploy edin

---

**NovusCap Backend API v1.0.0**
