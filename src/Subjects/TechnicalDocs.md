# NovusCap - Teknik Dokümantasyon

## İçindekiler

1. [Giriş](#1-giriş)
2. [Sistem Mimarisi](#2-sistem-mimarisi)
3. [Teknoloji Yığını](#3-teknoloji-yığını)
4. [Kurulum Kılavuzu](#4-kurulum-kılavuzu)
5. [API Belgelendirmesi](#5-api-belgelendirmesi)
6. [Veritabanı Şeması](#6-veritabanı-şeması)
7. [Kimlik Doğrulama ve Yetkilendirme](#7-kimlik-doğrulama-ve-yetkilendirme)
8. [Google Maps Entegrasyonu](#8-google-maps-entegrasyonu)
9. [Önbellek Stratejisi](#9-önbellek-stratejisi)
10. [Loglama ve Hata Yönetimi](#10-loglama-ve-hata-yönetimi)
11. [Güvenlik Önlemleri](#11-güvenlik-önlemleri)
12. [Performans Optimizasyonları](#12-performans-optimizasyonları)
13. [Sık Görülen Hatalar ve Çözümleri](#13-sık-görülen-hatalar-ve-çözümleri)
14. [Sürüm Geçmişi](#14-sürüm-geçmişi)

## 1. Giriş

NovusCap, Türkiye'deki girişimcilik ekosistemini harita üzerinden dijitalleştiren bir web uygulamasıdır. Bu teknik dokümantasyon, projenin teknik yönlerini, kurulumunu ve sürdürülmesini açıklar.

### 1.1 Amaç ve Kapsam

Bu doküman, NovusCap uygulamasının geliştiriciler ve sistem yöneticileri için temel referans noktası olarak hazırlanmıştır. Doküman, sistemi oluşturan bileşenlerin nasıl çalıştığını, birbirleriyle nasıl etkileşime girdiğini ve sistemin nasıl kurulup yapılandırılacağını açıklar.

### 1.2 Hedef Kitle

- Backend geliştiriciler
- Frontend geliştiriciler
- DevOps mühendisleri
- Sistem yöneticileri
- Veritabanı yöneticileri

## 2. Sistem Mimarisi

### 2.1 Genel Mimari Diyagramı

```
+------------------+         +------------------+
|                  |         |                  |
|   Client         |         |   CDN            |
|   (Web Browser)  +-------->+   (Frontend)     |
|                  |         |                  |
+--------+---------+         +--------+---------+
         |                            |
         |                            |
         v                            v
+--------+---------+         +--------+---------+
|                  |         |                  |
|   Load Balancer  +-------->+   API Gateway    |
|                  |         |                  |
+--------+---------+         +--------+---------+
         |                            |
         |                            |
         v                            v
+--------+---------+         +--------+---------+
|                  |         |                  |
|   Web API        +-------->+   Services       |
|   (.NET Core)    |         |   (Business)     |
|                  |         |                  |
+--------+---------+         +--------+---------+
         |                            |
         |                            |
         v                            v
+--------+---------+         +--------+---------+
|                  |         |                  |
|   Data Access    +-------->+   PostgreSQL     |
|   (EF Core)      |         |   Database       |
|                  |         |                  |
+------------------+         +------------------+
```

### 2.2 Mimari Yaklaşımı

NovusCap, Clean Architecture prensiplerini takip eden katmanlı bir mimari kullanmaktadır:

1. **Domain Layer**: Temel varlıklar ve iş kuralları
2. **Application Layer**: Uygulama servis ve arayüzleri
3. **Infrastructure Layer**: Teknoloji implementasyonları ve harici servisler
4. **WebAPI Layer**: HTTP API ve istemci iletişimi

Bu yapı, iş mantığının teknik detaylardan soyutlanmasını ve bağımlılıkların doğru yönlendirilmesini sağlar.

### 2.3 Docker Mimarisi

```
+---------------------+    +---------------------+    +----------------------+
|                     |    |                     |    |                      |
|    Frontend         |    |    Backend          |    |    PostgreSQL        |
|    (NGINX)          |    |    (ASP.NET Core)   |    |    Database          |
|                     |    |                     |    |                      |
+---------------------+    +---------------------+    +----------------------+
         |                           |                           |
         |                           |                           |
         v                           v                           v
+-------------------------------------------------------------------------+
|                                                                         |
|                           Docker Network                                |
|                                                                         |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                                                                         |
|                          Docker Volumes                                 |
|                             - postgres-data                             |
|                             - uploads                                   |
|                             - logs                                      |
|                                                                         |
+-------------------------------------------------------------------------+
```

## 3. Teknoloji Yığını

### 3.1 Frontend

- **Framework**: React 18
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS
- **Harita**: Google Maps JavaScript API
- **HTTP Client**: Axios
- **Form Validasyon**: Formik + Yup
- **Unit Testing**: Jest + React Testing Library
- **Build Tool**: Vite

### 3.2 Backend

- **Framework**: ASP.NET Core 6
- **API Style**: REST
- **Authentication**: JWT token + ASP.NET Identity
- **ORM**: Entity Framework Core 6
- **API Documentation**: Swagger / OpenAPI
- **Dependency Injection**: Native ASP.NET Core DI
- **File Storage**: Fiziksel dosya sistemi
- **Validation**: FluentValidation
- **Testing**: xUnit + Moq

### 3.3 Veritabanı

- **DBMS**: PostgreSQL 14
- **Migrations**: EF Core Migrations
- **Query Performance**: Indexing, View materializing
- **Data Access Pattern**: Repository + Unit of Work

### 3.4 DevOps

- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: Serilog

## 4. Kurulum Kılavuzu

### 4.1 Geliştirme Ortamı Kurulumu

#### 4.1.1 Gereksinimler

- .NET 6 SDK
- Node.js 16+
- PostgreSQL 14
- Docker & Docker Compose
- IDE (Visual Studio 2022 veya VS Code)
- Git

#### 4.1.2 Backend Kurulumu

1. Repository'i klonla:
```
git clone https://github.com/novuscap/novuscap.git
cd novuscap/backend
```

2. NuGet paketlerini yükle:
```
dotnet restore
```

3. Veritabanını oluştur:
```
cd NovusCap.WebApi
dotnet ef database update --project ../NovusCap.Infrastructure
```

4. Projeyi başlat:
```
dotnet run
```

API http://localhost:5000 adresinde çalışacaktır.

#### 4.1.3 Frontend Kurulumu

1. Frontend dizinine geç:
```
cd ../frontend
```

2. Npm paketlerini yükle:
```
npm install
```

3. .env.local dosyasını oluştur:
```
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBCU4x_en_zLcX5fc3Wt8wKZwjTkyWNyqI
```

4. Geliştirme sunucusunu başlat:
```
npm start
```

Frontend http://localhost:3000 adresinde çalışacaktır.

### 4.2 Docker ile Kurulum

1. Docker Compose dosyasını kullanarak tüm servisleri başlat:
```
docker-compose -f docker-compose.yml up -d
```

2. Environment değişkenlerini ayarlamak için `.env` dosyası oluştur:
```
# Database
POSTGRES_USER=novuscapuser
POSTGRES_PASSWORD=SecureDBPassword123!
POSTGRES_DB=novuscapdb

# JWT Authentication
JWT_SECRET=YourSuperSecureJWTSecretKey123!
JWT_ISSUER=novuscap.com
JWT_AUDIENCE=novuscap.com
JWT_DURATION=60

# Google Maps
GOOGLE_MAPS_API_KEY=AIzaSyBCU4x_en_zLcX5fc3Wt8wKZwjTkyWNyqI
```

3. Servis durumlarını kontrol et:
```
docker-compose ps
```

### 4.3 Prodüksiyon Dağıtımı

Prodüksiyon dağıtımı için CI/CD pipeline kullanılması önerilir. Detaylı bilgiler için [CI/CD ve Dağıtım Planı](./CICDPlan.md) belgesine bakınız.

## 5. API Belgelendirmesi

### 5.1 API Genel Bakış

NovusCap API'si RESTful prensipleri takip eden ve JWT token tabanlı kimlik doğrulama kullanan bir yapıdadır. Tam API belgelerine Swagger UI üzerinden erişilebilir: `https://{api-base-url}/swagger`.

### 5.2 Kimlik Doğrulama Endpoint'leri

#### 5.2.1 Kullanıcı Kaydı
- **Endpoint**: `POST /api/v1/auth/register`
- **Açıklama**: Yeni kullanıcı kaydı
- **Request**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

#### 5.2.2 Kullanıcı Girişi
- **Endpoint**: `POST /api/v1/auth/login`
- **Açıklama**: JWT token alma
- **Request**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "token": "string",
  "refreshToken": "string",
  "expiration": "2023-05-25T12:00:00Z"
}
```

### 5.3 Organizations Endpoint'leri

#### 5.3.1 Tüm Organizasyonları Alma
- **Endpoint**: `GET /api/v1/organizations`
- **Auth**: Gerekli
- **Query Parameters**: 
  - page (int): Sayfa numarası
  - pageSize (int): Sayfa başına kayıt
  - typeId (uuid): Organizasyon türü filtresi
  - searchTerm (string): Arama terimi

#### 5.3.2 Organizasyon Detay Alma
- **Endpoint**: `GET /api/v1/organizations/{id}`
- **Auth**: Gerekli
- **Path Parameters**:
  - id (uuid): Organizasyon ID

#### 5.3.3 Organizasyon Oluşturma
- **Endpoint**: `POST /api/v1/organizations`
- **Auth**: Gerekli
- **Request**:
```json
{
  "name": "string",
  "typeId": "uuid",
  "description": "string",
  "logoUrl": "string",
  "websiteUrl": "string",
  "locationId": "uuid"
}
```

### 5.4 Ortak Yanıt Formatı

Tüm API yanıtları aşağıdaki formatı takip eder:

```json
{
  "success": true,
  "message": "string",
  "data": {},
  "errors": []
}
```

- **success**: İşlem başarılı ise true, değilse false
- **message**: İşlem sonucunu açıklayan mesaj
- **data**: İşlem sonucu dönen veriler (başarılı ise)
- **errors**: Hata mesajları listesi (başarısız ise)

## 6. Veritabanı Şeması

### 6.1 ER Diyagramı

Ayrıntılı ER Diyagramı için [ERDiagram.md](./ERDiagram.md) dokümanına bakınız.

### 6.2 Temel Tablolar ve İlişkileri

- **Users**: Sistem kullanıcıları
  - İlişkiler: Roles (M:N), Organizations (1:N)
- **Roles**: Kullanıcı rolleri
  - İlişkiler: Users (M:N)
- **Organizations**: Girişimler ve kurumlar
  - İlişkiler: OrganizationTypes (N:1), OrganizationDetails (1:1), Users (N:1)
- **OrganizationDetails**: Organizasyon detayları
  - İlişkiler: Organizations (1:1), Locations (N:1)
- **OrganizationTypes**: Organizasyon türleri
  - İlişkiler: Organizations (1:N)
- **Locations**: Konum bilgileri
  - İlişkiler: OrganizationDetails (1:N)

### 6.3 İndeks Stratejisi

| Tablo | İndekslenmiş Alan | Tür | Açıklama |
|-------|-------------------|-----|----------|
| Users | Email | Unique | Email araması için |
| Organizations | Name | Non-unique | İsim araması için |
| Organizations | TypeId | Non-unique | Tür filtreleme için |
| Locations | (Latitude, Longitude) | Spatial | Konum sorguları için |

### 6.4 Migration Stratejisi

Entity Framework Core Code First yaklaşımı kullanılarak migrations yönetilir. Geliştirme sırasında aşağıdaki adımlar izlenir:

1. Model sınıflarında değişiklikler yapılır
2. Migration eklenir:
```
dotnet ef migrations add MigrationName --project NovusCap.Infrastructure
```
3. Veritabanı güncellenir:
```
dotnet ef database update --project NovusCap.Infrastructure
```

## 7. Kimlik Doğrulama ve Yetkilendirme

### 7.1 JWT Token Yapılandırması

```json
{
  "JWT": {
    "Secret": "YourSuperSecureJWTSecretKey123!",
    "Issuer": "novuscap.com",
    "Audience": "novuscap.com",
    "DurationInMinutes": 60
  }
}
```

### 7.2 Token Oluşturma Örneği

```csharp
public string GenerateJwtToken(ApplicationUser user, List<string> roles)
{
    var authClaims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
    };
    
    foreach (var role in roles)
    {
        authClaims.Add(new Claim(ClaimTypes.Role, role));
    }
    
    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
    
    var token = new JwtSecurityToken(
        issuer: _configuration["JWT:Issuer"],
        audience: _configuration["JWT:Audience"],
        expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["JWT:DurationInMinutes"])),
        claims: authClaims,
        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
    );
    
    return new JwtSecurityTokenHandler().WriteToken(token);
}
```

### 7.3 Yetkilendirme Politika Örnekleri

```csharp
public static void ConfigureAuthorizationPolicies(this IServiceCollection services)
{
    services.AddAuthorization(options =>
    {
        options.AddPolicy("RequireSuperAdmin", policy => 
            policy.RequireRole("SuperAdmin"));
            
        options.AddPolicy("RequireEditor", policy => 
            policy.RequireRole("SuperAdmin", "Editor"));
            
        options.AddPolicy("RequireGirisimTemsilcisi", policy => 
            policy.RequireRole("SuperAdmin", "Editor", "GirisimTemsilcisi"));
            
        options.AddPolicy("CanViewNonPublicOrganizations", policy =>
            policy.RequireRole("SuperAdmin", "Editor"));
    });
}
```

### 7.4 Frontend Token Yönetimi

```javascript
// authService.js
export const authService = {
  login: async (email, password) => {
    const response = await axios.post('/api/v1/auth/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('tokenExpiration', response.data.data.expiration);
      return true;
    }
    return false;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
  },
  
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');
    if (!token || !expiration) return false;
    
    return new Date(expiration) > new Date();
  },
  
  getToken: () => {
    return localStorage.getItem('token');
  }
};
```

## 8. Google Maps Entegrasyonu

### 8.1 API Key Yapılandırması

Backend `.env` dosyası:

```
GOOGLE_MAPS_API_KEY=AIzaSyBCU4x_en_zLcX5fc3Wt8wKZwjTkyWNyqI
```

Frontend `.env` dosyası:

```
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBCU4x_en_zLcX5fc3Wt8wKZwjTkyWNyqI
```

### 8.2 React Google Maps Bileşeni

```javascript
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 39.925533, // Türkiye'nin merkezi
  lng: 32.866287
};

function MapComponent({ markers, onMarkerClick }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={6}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            icon={{
              url: marker.iconUrl,
              scaledSize: new window.google.maps.Size(30, 30)
            }}
            onClick={() => {
              setSelectedMarker(marker);
              if (onMarkerClick) onMarkerClick(marker);
            }}
          />
        ))}
        
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.name}</h3>
              <p>{selectedMarker.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
```

### 8.3 Marker Clustering

```javascript
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MarkerClusterer } from '@react-google-maps/api';

function ClusteredMapComponent({ markers }) {
  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  };
  
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={6}
      >
        <MarkerClusterer options={options}>
          {(clusterer) =>
            markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
}

export default ClusteredMapComponent;
```

## 9. Önbellek Stratejisi

### 9.1 In-Memory Caching (Backend)

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // Memory Cache ekle
    services.AddMemoryCache();

    // Diğer servisler...
}

// OrganizationService.cs
public class OrganizationService : IOrganizationService
{
    private readonly IMemoryCache _cache;
    private readonly IOrganizationRepository _repository;
    
    public OrganizationService(IMemoryCache cache, IOrganizationRepository repository)
    {
        _cache = cache;
        _repository = repository;
    }
    
    public async Task<IEnumerable<OrganizationDto>> GetAllAsync()
    {
        // Önce cache'e bak
        if (_cache.TryGetValue("allOrganizations", out IEnumerable<OrganizationDto> cachedOrganizations))
        {
            return cachedOrganizations;
        }
        
        // Cache'de yoksa veritabanından al
        var organizations = await _repository.GetAllAsync();
        var organizationDtos = _mapper.Map<IEnumerable<OrganizationDto>>(organizations);
        
        // Cache'e ekle (1 saatlik)
        var cacheOptions = new MemoryCacheEntryOptions()
            .SetAbsoluteExpiration(TimeSpan.FromHours(1));
            
        _cache.Set("allOrganizations", organizationDtos, cacheOptions);
        
        return organizationDtos;
    }
}
```

### 9.2 React Query Önbelleği (Frontend)

```javascript
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { organizationService } from '../services/organizationService';

export function useOrganizations(filters) {
  return useQuery(
    ['organizations', filters], 
    () => organizationService.getAll(filters),
    {
      staleTime: 5 * 60 * 1000, // 5 dakika
      cacheTime: 30 * 60 * 1000, // 30 dakika
    }
  );
}

export function useOrganization(id) {
  return useQuery(
    ['organization', id], 
    () => organizationService.getById(id),
    {
      staleTime: 10 * 60 * 1000, // 10 dakika
      cacheTime: 60 * 60 * 1000, // 60 dakika
    }
  );
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  
  return useMutation(
    (newOrganization) => organizationService.create(newOrganization),
    {
      onSuccess: () => {
        // Önbelleği geçersiz kıl ve yeniden yükle
        queryClient.invalidateQueries('organizations');
      }
    }
  );
}
```

## 10. Loglama ve Hata Yönetimi

### 10.1 Serilog Yapılandırması

```csharp
// Program.cs
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .UseSerilog((context, services, configuration) => configuration
            .ReadFrom.Configuration(context.Configuration)
            .ReadFrom.Services(services)
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .WriteTo.File("logs/novuscap-.log", rollingInterval: RollingInterval.Day))
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });
```

```json
// appsettings.json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    }
  }
}
```

### 10.2 Global Error Handling Middleware

```csharp
public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;

    public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred.");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        
        var response = new ApiResponse { Success = false };

        if (exception is ValidationException validationException)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            response.Message = "Validation error occurred.";
            response.Errors = validationException.Errors.Select(e => e.ErrorMessage).ToList();
        }
        else if (exception is AuthenticationException)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            response.Message = "Authentication failed.";
        }
        else if (exception is AuthorizationException)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            response.Message = "You don't have permission to access this resource.";
        }
        else if (exception is NotFoundException)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            response.Message = exception.Message;
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            response.Message = "An error occurred. Please try again later.";
            
            #if DEBUG
            response.Errors = new List<string> { exception.Message };
            #endif
        }

        return context.Response.WriteAsJsonAsync(response);
    }
}
```

### 10.3 Frontend Hata Yönetimi

```javascript
// axios-interceptor.js
import axios from 'axios';
import { toast } from 'react-toastify';
import { authService } from './authService';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Backend yanıtı var, hatayı işle
      const { status, data } = error.response;

      switch (status) {
        case 400:
          // Validation hatası
          if (data.errors && data.errors.length) {
            data.errors.forEach(err => toast.error(err));
          } else {
            toast.error(data.message || 'İşlem gerçekleştirilemedi.');
          }
          break;
          
        case 401:
          // Yetkilendirme hatası
          toast.error('Oturum süreniz dolmuş olabilir. Lütfen yeniden giriş yapın.');
          authService.logout();
          window.location.href = '/login';
          break;
          
        case 403:
          // Erişim engellendi
          toast.error('Bu işlemi gerçekleştirme yetkiniz bulunmuyor.');
          break;
          
        case 404:
          // Kaynak bulunamadı
          toast.error(data.message || 'İstenen kaynak bulunamadı.');
          break;
          
        case 500:
          // Sunucu hatası
          toast.error('Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.');
          break;
          
        default:
          toast.error('Beklenmeyen bir hata oluştu.');
      }
    } else if (error.request) {
      // Yanıt alınamadı (network hatası)
      toast.error('Sunucu ile bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edin.');
    } else {
      // İstek oluşturulurken hata
      toast.error('İstek gönderilemedi.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

## 11. Güvenlik Önlemleri

### 11.1 CORS Yapılandırması

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("default", policy =>
    {
        policy.WithOrigins(
                "https://novuscap.com",
                "https://www.novuscap.com")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Middleware uygulaması
app.UseCors("default");
```

### 11.2 XSS Koruması

```csharp
// Program.cs
builder.Services.AddAntiforgery(options => 
{
    options.HeaderName = "X-XSRF-TOKEN";
});

// Middleware uygulaması
app.UseAntiforgery();
```

### 11.3 SQL Injection Koruması

```csharp
// Parametre kullanımı ile korunma
public async Task<Organization> GetByName(string name)
{
    // Parametre kullanarak SQL Injection önlenmesi
    return await _context.Organizations
        .Where(o => o.Name == name)
        .FirstOrDefaultAsync();
}
```

### 11.4 API Rate Limiting

```csharp
// Program.cs
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? httpContext.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 60,
                QueueLimit = 0,
                Window = TimeSpan.FromMinutes(1)
            }));

    options.RejectionStatusCode = 429; // Too Many Requests
});

// Middleware uygulaması
app.UseRateLimiter();
```

## 12. Performans Optimizasyonları

### 12.1 Entity Framework Sorgu Optimizasyonları

```csharp
public async Task<List<OrganizationDto>> GetOrganizationsWithDetailsAsync()
{
    // Tüm ilişkili verileri tek sorguda çekme (N+1 sorunu çözümü)
    var organizations = await _context.Organizations
        .AsNoTracking() // Değişiklik takibi olmadığında performans artışı
        .Include(o => o.OrganizationType)
        .Include(o => o.OrganizationDetail)
            .ThenInclude(d => d.Location)
        .Where(o => o.IsDeleted == false)
        .OrderBy(o => o.Name)
        .ToListAsync();
        
    return _mapper.Map<List<OrganizationDto>>(organizations);
}
```

### 12.2 React Performans İyileştirmeleri

```javascript
// Gereksiz render'ları önlemek için memoization
import React, { useMemo, useCallback } from 'react';

function OrganizationList({ organizations, onSelect }) {
  // useMemo ile hesaplama sonucunu önbelleğe alma
  const sortedOrganizations = useMemo(() => {
    return [...organizations].sort((a, b) => a.name.localeCompare(b.name));
  }, [organizations]);
  
  // useCallback ile fonksiyon referansını önbelleğe alma
  const handleSelect = useCallback((id) => {
    onSelect(id);
  }, [onSelect]);
  
  return (
    <ul>
      {sortedOrganizations.map(org => (
        <li key={org.id} onClick={() => handleSelect(org.id)}>
          {org.name}
        </li>
      ))}
    </ul>
  );
}

// React.memo ile component'i önbelleğe alma
export default React.memo(OrganizationList);
```

### 12.3 API Response Compression

```csharp
// Program.cs
builder.Services.AddResponseCompression(options =>
{
    options.Providers.Add<GzipCompressionProvider>();
    options.Providers.Add<BrotliCompressionProvider>();
    options.EnableForHttps = true;
    options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
        new[] { "image/svg+xml", "application/json" });
});

// Middleware uygulaması
app.UseResponseCompression();
```

## 13. Sık Görülen Hatalar ve Çözümleri

### 13.1 API Connection Hataları

**Sorun**: Frontend React uygulaması API'ye bağlanamıyor.

**Çözüm**:
1. `.env` dosyasındaki `REACT_APP_API_BASE_URL` değerini kontrol edin.
2. CORS ayarlarını kontrol edin.
3. API servisinin ayakta olup olmadığını kontrol edin.
4. Network sekmesinde API isteklerinde hata detaylarını inceleyin.

### 13.2 Google Maps API Hataları

**Sorun**: Google Maps yüklenmiyor veya hata veriyor.

**Çözüm**:
1. Google Maps API anahtarının doğru olduğunu kontrol edin.
2. API anahtarının gerekli izinlere (Maps JavaScript API) sahip olduğunu doğrulayın.
3. API anahtarının domain kısıtlamalarını kontrol edin.
4. Console'da JavaScript hatalarına bakın.

### 13.3 Veritabanı Bağlantı Hataları

**Sorun**: Uygulama veritabanına bağlanamıyor.

**Çözüm**:
1. PostgreSQL servisinin çalıştığını kontrol edin.
2. Connection string'in doğruluğunu kontrol edin.
3. PostgreSQL kullanıcısının gerekli yetkilere sahip olduğunu doğrulayın.
4. PostgreSQL log dosyalarını kontrol edin.

### 13.4 JWT Token Hataları

**Sorun**: Authentication hatası alınıyor.

**Çözüm**:
1. JWT secret key değerinin backend ve frontend arasında eşleştiğini kontrol edin.
2. Token expiration süresini kontrol edin.
3. Token içindeki claim'lerin doğru olduğunu doğrulayın.
4. Frontend'de token'ın localStorage'da saklanıp saklanmadığını kontrol edin.

## 14. Sürüm Geçmişi

### v1.0.0 (2023-06-01)
- İlk resmi sürüm
- Temel harita görünümü ve marker sistemi
- Kullanıcı yetkilendirme sistemi
- Admin panel CRUD işlemleri

### v0.9.0 (2023-05-15)
- Beta sürümü
- Tüm temel özellikler tamamlandı
- Son kullanıcı testleri yapıldı

### v0.5.0 (2023-04-01)
- Alpha sürümü
- Backend API ve temel veritabanı şeması
- Frontend yapısı ve sayfa geçişleri
