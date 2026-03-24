# NovusCap - CI/CD ve Dağıtım Planı

## Genel Bakış

Bu belge, NovusCap platformunun sürekli entegrasyon (CI), sürekli dağıtım (CD) stratejisini ve dağıtım mimarisini tanımlar. Belge, geliştirme sürecinden başlayarak test, staging ve prodüksiyon ortamlarına dağıtım süreçlerini kapsar.

## 1. CI/CD Mimarisi

### 1.1 Genel Mimari

```
+-------------+     +-------------+     +-------------+     +-------------+
|             |     |             |     |             |     |             |
| Geliştirme  | --> |    Test     | --> |   Staging   | --> | Prodüksiyon |
|  (Dev)      |     |   Ortamı    |     |   Ortamı    |     |   Ortamı    |
|             |     |             |     |             |     |             |
+-------------+     +-------------+     +-------------+     +-------------+
       ^                   ^                  ^                  ^
       |                   |                  |                  |
       |                   |                  |                  |
+-----------------------------------------------------------------------------+
|                                                                             |
|                           GitHub Actions CI/CD Pipeline                     |
|                                                                             |
+-----------------------------------------------------------------------------+
       ^
       |
+-------------+
|             |
|  Kaynak Kod |
|   (GitHub)  |
|             |
+-------------+
```

### 1.2 Ortamlar

| Ortam | URL | Amacı | Dağıtım Sıklığı |
|-------|-----|-------|----------------|
| Geliştirme (Dev) | Yerel | Aktif geliştirme | Sürekli |
| Test | https://test.novuscap.com | Test ve QA | Her PR sonrası |
| Staging | https://staging.novuscap.com | UAT ve son onay | Onaylı sürümler |
| Prodüksiyon | https://novuscap.com | Canlı sistem | Planlı release'ler |

## 2. GitHub Actions CI/CD Pipeline

### 2.1 Pipeline Yapısı

```yaml
name: NovusCap CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 6.0.x
        
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Restore dependencies (Backend)
      run: dotnet restore
      working-directory: ./backend
      
    - name: Build (Backend)
      run: dotnet build --no-restore --configuration Release
      working-directory: ./backend
      
    - name: Test (Backend)
      run: dotnet test --no-build --configuration Release
      working-directory: ./backend
      
    - name: Install dependencies (Frontend)
      run: npm ci
      working-directory: ./frontend
      
    - name: Build (Frontend)
      run: npm run build
      working-directory: ./frontend
      
    - name: Test (Frontend)
      run: npm test
      working-directory: ./frontend
    
    - name: Upload backend artifacts
      uses: actions/upload-artifact@v2
      with:
        name: backend-artifacts
        path: ./backend/WebApi/bin/Release/net6.0/publish/
        
    - name: Upload frontend artifacts
      uses: actions/upload-artifact@v2
      with:
        name: frontend-artifacts
        path: ./frontend/build/
  
  deploy-test:
    needs: build-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
    - name: Download backend artifacts
      uses: actions/download-artifact@v2
      with:
        name: backend-artifacts
        path: ./backend-publish
        
    - name: Download frontend artifacts
      uses: actions/download-artifact@v2
      with:
        name: frontend-artifacts
        path: ./frontend-build
        
    - name: Deploy to test environment
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'novuscap-test'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE_TEST }}
        package: ./backend-publish
        
    - name: Deploy frontend to test CDN
      uses: azure/cli@v1
      with:
        inlineScript: |
          az storage blob upload-batch --account-name novuscapteststorage --auth-mode key --account-key ${{ secrets.AZURE_STORAGE_KEY_TEST }} --destination '$web' --source ./frontend-build
  
  deploy-staging:
    needs: build-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
    - name: Download backend artifacts
      uses: actions/download-artifact@v2
      with:
        name: backend-artifacts
        path: ./backend-publish
        
    - name: Download frontend artifacts
      uses: actions/download-artifact@v2
      with:
        name: frontend-artifacts
        path: ./frontend-build
        
    - name: Deploy to staging environment
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'novuscap-staging'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE_STAGING }}
        package: ./backend-publish
        
    - name: Deploy frontend to staging CDN
      uses: azure/cli@v1
      with:
        inlineScript: |
          az storage blob upload-batch --account-name novuscapstagingstorage --auth-mode key --account-key ${{ secrets.AZURE_STORAGE_KEY_STAGING }} --destination '$web' --source ./frontend-build
          
  deploy-production:
    needs: deploy-staging
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
    - name: Download backend artifacts
      uses: actions/download-artifact@v2
      with:
        name: backend-artifacts
        path: ./backend-publish
        
    - name: Download frontend artifacts
      uses: actions/download-artifact@v2
      with:
        name: frontend-artifacts
        path: ./frontend-build
        
    - name: Deploy to production environment
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'novuscap-prod'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE_PROD }}
        package: ./backend-publish
        
    - name: Deploy frontend to production CDN
      uses: azure/cli@v1
      with:
        inlineScript: |
          az storage blob upload-batch --account-name novuscapprod --auth-mode key --account-key ${{ secrets.AZURE_STORAGE_KEY_PROD }} --destination '$web' --source ./frontend-build
```

### 2.2 Branch Stratejisi

- **main**: Prodüksiyon-ready kod
- **develop**: Geliştirme dalı, test ortamına otomatik dağıtılır
- **feature/***:  Özellik dalları
- **bugfix/***:  Hata düzeltme dalları
- **release/***:  Sürüm hazırlama dalları

### 2.3 CI/CD Akışı

1. Geliştirici `feature/*` veya `bugfix/*` dalında çalışır
2. Geliştirme tamamlandığında `develop` dalına Pull Request (PR) açılır
3. PR onaylandığında ve birleştirildiğinde CI Pipeline tetiklenir
4. Testler başarılı olursa, kod test ortamına otomatik dağıtılır
5. Sürüm için hazırsa, `main` dalına PR açılır
6. PR onaylandığında ve birleştirildiğinde, kod staging ortamına otomatik dağıtılır
7. Staging'de onay sonrası, production dağıtımı manuel onay ile gerçekleştirilir

## 3. Containerization ve Docker Yapılandırması

### 3.1 Docker Mimarisi

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

### 3.2 Docker Compose Yapılandırması

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    image: novuscap/frontend:${TAG:-latest}
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_BASE_URL=${API_BASE_URL:-https://api.novuscap.com}
      - REACT_APP_GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
    volumes:
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
    restart: unless-stopped
    networks:
      - novuscap-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    image: novuscap/backend:${TAG:-latest}
    ports:
      - "5000:80"
    depends_on:
      - postgres
    environment:
      - ASPNETCORE_ENVIRONMENT=${ASPNETCORE_ENVIRONMENT:-Production}
      - ConnectionStrings__DefaultConnection=Host=postgres;Database=novuscapdb;Username=${POSTGRES_USER};Password=${POSTGRES_PASSWORD}
      - JWT__Secret=${JWT_SECRET}
      - JWT__Issuer=${JWT_ISSUER:-novuscap.com}
      - JWT__Audience=${JWT_AUDIENCE:-novuscap.com}
      - JWT__DurationInMinutes=${JWT_DURATION:-60}
      - GoogleMaps__ApiKey=${GOOGLE_MAPS_API_KEY}
      - Email__Host=${EMAIL_HOST}
      - Email__Port=${EMAIL_PORT:-587}
      - Email__UserName=${EMAIL_USER}
      - Email__Password=${EMAIL_PASSWORD}
      - Email__EnableSsl=${EMAIL_SSL:-true}
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/app/logs
    restart: unless-stopped
    networks:
      - novuscap-network

  postgres:
    image: postgres:14
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=novuscapdb
    volumes:
      - postgres-data:/var/lib/postgresql/data
    restart: unless-stopped
    networks:
      - novuscap-network

networks:
  novuscap-network:
    driver: bridge

volumes:
  postgres-data:
  uploads:
  logs:
```

### 3.3 Dockerfile - Backend (ASP.NET Core)

```dockerfile
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["NovusCap.WebApi/NovusCap.WebApi.csproj", "NovusCap.WebApi/"]
COPY ["NovusCap.Application/NovusCap.Application.csproj", "NovusCap.Application/"]
COPY ["NovusCap.Domain/NovusCap.Domain.csproj", "NovusCap.Domain/"]
COPY ["NovusCap.Infrastructure/NovusCap.Infrastructure.csproj", "NovusCap.Infrastructure/"]

RUN dotnet restore "NovusCap.WebApi/NovusCap.WebApi.csproj"

# Copy all files and build
COPY . .
WORKDIR "/src/NovusCap.WebApi"
RUN dotnet build "NovusCap.WebApi.csproj" -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish "NovusCap.WebApi.csproj" -c Release -o /app/publish

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app

# Install additional packages
RUN apt-get update && apt-get install -y curl iputils-ping && rm -rf /var/lib/apt/lists/*

COPY --from=publish /app/publish .

# Create volumes directories
RUN mkdir -p /app/uploads /app/logs
VOLUME ["/app/uploads", "/app/logs"]

EXPOSE 80

ENTRYPOINT ["dotnet", "NovusCap.WebApi.dll"]
```

### 3.4 Dockerfile - Frontend (React)

```dockerfile
# Build stage
FROM node:16 AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS final
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
```

## 4. Dağıtım Ortamları

### 4.1 Altyapı Diyagramı

```
+----------------------------------------------+
|            Azure / Linux VPS                 |
|                                              |
| +------------------+  +-------------------+  |
| |  Docker Swarm /  |  |   Azure Database  |  |
| |   Kubernetes     |  |   for PostgreSQL  |  |
| +------------------+  +-------------------+  |
|        |    |                  |             |
|        |    |                  |             |
| +------v----v--+  +------------v---------+   |
| |              |  |                      |   |
| | Application  |  |      Database        |   |
| | Containers   |  |      (Master)        |   |
| |              |  |                      |   |
| +--------------+  +----------------------+   |
|                                              |
+----------------------------------------------+
           |                    |
           |                    |
+----------v----+  +-----------v----+
|               |  |                |
| Azure CDN /   |  |   Database     |
| Cloudflare    |  |   Replica      |
|               |  |                |
+---------------+  +----------------+
```

### 4.2 Kaynak Gereksinimleri

| Bileşen | CPU | RAM | Disk | Açıklama |
|---------|-----|-----|------|----------|
| Frontend Container | 0.5 CPU | 256 MB | 100 MB | NGINX ile React uygulaması |
| Backend Container | 1 CPU | 1 GB | 500 MB | ASP.NET Core API |
| PostgreSQL | 2 CPU | 4 GB | 20 GB | Ana veritabanı |
| Uploads Volume | - | - | 10 GB | Logo ve dosyalar |
| Logs Volume | - | - | 5 GB | Log dosyaları |

### 4.3 Yüksek Erişilebilirlik Yapılandırması

- **Load Balancing**: Azure Load Balancer veya NGINX Ingress Controller
- **Database Replica**: PostgreSQL read-replica yapılandırması
- **Container Orchestration**: Docker Swarm veya Kubernetes
- **Auto-scaling**: CPU kullanımına göre otomatik ölçeklendirme
- **Health Checks**: Düzenli sağlık kontrolleri ve otomatik yeniden başlatma

## 5. Veritabanı Dağıtım Stratejisi

### 5.1 Migrasyon Süreci

1. Entity Framework Core Code First yaklaşımı
2. Migration'ların otomatik oluşturulması:
   ```
   dotnet ef migrations add {MigrationName} --project NovusCap.Infrastructure --startup-project NovusCap.WebApi
   ```
3. CI/CD pipeline içinde veritabanı güncellemeleri:
   ```
   dotnet ef database update --project NovusCap.Infrastructure --startup-project NovusCap.WebApi
   ```

### 5.2 Veri Yedekleme Stratejisi

| Yedek Tipi | Sıklık | Saklama Süresi | Amacı |
|------------|--------|----------------|-------|
| Tam Yedek | Günlük | 7 gün | Tam veri geri yükleme |
| Artımlı Yedek | Saatlik | 48 saat | Kısa süreli geri alma |

## 6. Güvenlik ve SSL Yapılandırması

### 6.1 SSL Sertifikaları

- Let's Encrypt ile otomatik yenilenen SSL sertifikaları
- Wildcard sertifikası: *.novuscap.com
- Certbot ile sertifika yönetimi

### 6.2 NGINX SSL Yapılandırması

```nginx
server {
    listen 80;
    server_name novuscap.com www.novuscap.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name novuscap.com www.novuscap.com;

    ssl_certificate /etc/nginx/ssl/novuscap.com.crt;
    ssl_certificate_key /etc/nginx/ssl/novuscap.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_stapling on;
    ssl_stapling_verify on;
    add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
        expires 1d;
    }

    location /api {
        proxy_pass http://backend:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads {
        alias /uploads;
        expires 30d;
    }
}
```

## 7. İzleme ve Loglama

### 7.1 İzleme Araçları

- **Serilog**: Uygulama logları için
- **Prometheus**: Metrik toplama
- **Grafana**: Gösterge panelleri ve görselleştirme
- **Azure Application Insights**: (Opsiyonel) APM çözümü

### 7.2 Log Yapılandırması

```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    },
    "WriteTo": [
      {
        "Name": "Console"
      },
      {
        "Name": "File",
        "Args": {
          "path": "/app/logs/novuscap-.log",
          "rollingInterval": "Day",
          "retainedFileCountLimit": 7
        }
      }
    ],
    "Enrich": [ "FromLogContext", "WithMachineName", "WithThreadId" ]
  }
}
```

### 7.3 Alarm Yapılandırması

| Alarm | Tetikleyici | Yanıt |
|-------|-------------|-------|
| Yüksek CPU Kullanımı | >80% 5 dakika boyunca | E-posta & SMS |
| Yüksek Bellek Kullanımı | >75% 5 dakika boyunca | E-posta |
| API Yüksek Yanıt Süresi | >500ms ortalama | E-posta |
| Disk Alanı Azalması | >85% doluluk | E-posta & SMS |
| Sertifika Son Kullanım Tarihi | <15 gün kalan | E-posta |

## 8. Kesintisiz Dağıtım Stratejisi

### 8.1 Blue-Green Deployment

```
   [Aktif]                     [Test]
+--------------+           +--------------+
|              |           |              |
|   Blue       |           |   Green      |
|  Environment |           |  Environment |
|              |           |              |
+--------------+           +--------------+
       ^                           ^
       |                           |
       |      +-----------+        |
       +------| Load      |--------+
              | Balancer  |
              +-----------+
                    ^
                    |
            +--------------+
            |              |
            |   Traffic    |
            |              |
            +--------------+
```

### 8.2 Blue-Green Süreç Akışı

1. Mevcut üretim ortamı "Blue" olarak işaretlenir
2. Yeni sürüm "Green" ortamına dağıtılır
3. Green ortamında kapsamlı test ve doğrulama yapılır
4. Testler başarılıysa, Load Balancer trafiği Green'e yönlendirilir
5. Green ortamı sorunsuz çalışıyorsa, artık yeni "Blue" olur
6. Eski Blue ortamı standby modunda tutulur veya yeni Green olarak hazırlanır

## 9. Rollback Stratejisi

### 9.1 Veritabanı Rollback

- Her migration için "down" metodlarının tanımlanması
- Snapshot tabanlı geri alma
- Point-in-time recovery desteği

### 9.2 Uygulama Rollback

- Önceki Docker image'a geri dönüş:
  ```bash
  docker service update --image novuscap/backend:{previous-tag} novuscap_backend
  docker service update --image novuscap/frontend:{previous-tag} novuscap_frontend
  ```
- Blue-Green deployment ile hızlı geri alma (trafik yönlendirmesi)

## 10. Environment Değişkenleri

### 10.1 Backend .env Dosyası

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

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=admin@novuscap.com
EMAIL_PASSWORD=SecureEmailPassword123!
EMAIL_SSL=true

# Application Settings
ASPNETCORE_ENVIRONMENT=Production
API_BASE_URL=https://api.novuscap.com
```

### 10.2 Frontend .env Dosyası

```
REACT_APP_API_BASE_URL=https://api.novuscap.com
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBCU4x_en_zLcX5fc3Wt8wKZwjTkyWNyqI
REACT_APP_ENVIRONMENT=production
```

## 11. Dağıtım Kontrol Listesi

### 11.1 Dağıtım Öncesi

- [ ] Tüm testler başarıyla geçildi
- [ ] Code review tamamlandı
- [ ] Veritabanı migrasyon scriptleri doğrulandı
- [ ] Eksik environment değişkenleri kontrolü yapıldı
- [ ] Uygulamanın Docker imajları oluşturuldu ve test edildi
- [ ] Dağıtım duyurusu ilgili ekiplere gönderildi

### 11.2 Dağıtım Sırasında

- [ ] Veritabanı yedeği alındı
- [ ] Blue-Green deployment için yeni ortam hazırlandı
- [ ] Migrasyon scriptleri çalıştırıldı
- [ ] Docker servisleri güncellendi
- [ ] Sağlık kontrolleri yapıldı

### 11.3 Dağıtım Sonrası

- [ ] Uygulama sağlık kontrolleri tekrarlandı
- [ ] Örnek kullanım senaryoları test edildi
- [ ] Performans metrikleri kontrol edildi
- [ ] Loglar incelendi ve sorun olmadığı doğrulandı
- [ ] Dağıtım tamamlandı bildirimi gönderildi

## 12. Felaket Kurtarma Planı

### 12.1 Olası Felaket Senaryoları

1. Sunucu donanım arızası
2. Veritabanı bozulması
3. Siber saldırı ve veri kaybı
4. Bulut hizmet sağlayıcı kesintisi

### 12.2 Kurtarma Adımları

#### 12.2.1 Sunucu Donanım Arızası

1. Trafiği yedek sunuculara yönlendir
2. Arızalı sunucuyu tanımla ve izole et
3. Yeni sunucu ortamı hazırla
4. Docker imajlarını yeni sunucuya dağıt
5. Sağlık kontrollerini yap ve trafiği yönlendir

#### 12.2.2 Veritabanı Bozulması

1. Veritabanı trafiğini durdur
2. En son geçerli yedeği tanımla
3. Veritabanını yedekten geri yükle
4. Uygulamayı maintenance moduna al
5. Veritabanı bağlantılarını test et
6. Uygulamayı normal moda al

### 12.3 Recovery Point Objective (RPO) ve Recovery Time Objective (RTO)

| Bileşen | RPO | RTO | Açıklama |
|---------|-----|-----|----------|
| Veritabanı | 1 saat | 2 saat | Saatlik yedekleme, 2 saat içinde geri yükleme |
| Uygulama | 0 | 30 dakika | Stateless uygulama, kaynak koddan hızlı dağıtım |
| Uploads | 24 saat | 4 saat | Günlük yedeği geri yükleme |

## 13. Dağıtım Takvimi

| Dönem | Aktivite | Tarih |
|-------|----------|-------|
| Hafta 1 | CI/CD pipeline kurulumu | 01-07 Haziran 2023 |
| Hafta 2 | Test ortamı dağıtımı | 08-14 Haziran 2023 |
| Hafta 3 | Staging ortamı dağıtımı | 15-21 Haziran 2023 |
| Hafta 4 | Prodüksiyon altyapı hazırlığı | 22-28 Haziran 2023 |
| Hafta 5 | İlk prodüksiyon dağıtımı | 29 Haziran 2023 |
| Hafta 6+ | Düzenli güncelleme ve bakım | Ongoing |
