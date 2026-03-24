# NovusCap Deployment Guide

Bu döküman NovusCap uygulamasının production ortamına deploy edilmesi için adım adım rehberdir.

## 📋 Ön Gereksinimler

### Sistem Gereksinimleri
- Docker & Docker Compose
- Git
- 4GB RAM (minimum)
- 20GB Disk Alanı
- PostgreSQL 15+
- Node.js 18+ (development için)
- .NET 8 SDK (development için)

### Environment Variables
Aşağıdaki environment variable'lar configure edilmelidir:

#### Backend (.env)
```env
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__DefaultConnection=Host=localhost;Database=novuscapdb;Username=postgres;Password=YOUR_SECURE_PASSWORD
Jwt__SecretKey=YOUR_VERY_SECURE_JWT_SECRET_KEY_AT_LEAST_32_CHARACTERS
Jwt__Issuer=NovusCap
Jwt__Audience=NovusCapUsers
Jwt__ExpirationInMinutes=60
GoogleMaps__ApiKey=YOUR_GOOGLE_MAPS_API_KEY
```

#### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-domain.com/api
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
REACT_APP_ENVIRONMENT=production
```

## 🚀 Deployment Yöntemleri

### 1. Docker Compose ile Deployment (Önerilen)

#### Adım 1: Repository'yi Clone Edin
```bash
git clone <repository-url>
cd novuscap
```

#### Adım 2: Environment Variables Ayarlayın
```bash
# Backend için
cp backend/.env.example backend/.env
# Frontend için  
cp frontend/.env.example frontend/.env.production
```

#### Adım 3: Docker Compose ile Başlatın
```bash
# Production ortamı için build ve start
docker-compose up -d --build

# Logları kontrol edin
docker-compose logs -f

# Durum kontrolü
docker-compose ps
```

#### Adım 4: Database Migration
```bash
# Backend container'a bağlanın
docker exec -it novuscap-backend bash

# Migration çalıştırın
dotnet ef database update
```

### 2. Manual Deployment

#### Backend Deployment
```bash
cd backend/src/NovusCap.WebApi

# Dependencies restore
dotnet restore

# Production build
dotnet publish -c Release -o ./publish

# Run application
cd publish
dotnet NovusCap.WebApi.dll
```

#### Frontend Deployment
```bash
cd frontend

# Dependencies install
npm install

# Production build
npm run build:prod

# Serve static files (nginx/apache gerekli)
# build klasörünü web server'a deploy edin
```

## 🔧 Configuration

### 1. Database Configuration

#### PostgreSQL Setup
```sql
-- Database oluştur
CREATE DATABASE novuscapdb;

-- User oluştur
CREATE USER novuscap_user WITH PASSWORD 'secure_password';

-- Permissions ver
GRANT ALL PRIVILEGES ON DATABASE novuscapdb TO novuscap_user;
```

### 2. Nginx Configuration (Opsiyonel)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🔐 Security Checklist

### Backend Security
- [ ] JWT secret key güvenli ve 32+ karakter
- [ ] Database password güvenli
- [ ] HTTPS kullanımı
- [ ] CORS policy configure edildi
- [ ] API rate limiting aktif
- [ ] Input validation aktif

### Frontend Security
- [ ] Environment variables production için set
- [ ] Source maps production'da kapalı
- [ ] Content Security Policy headers
- [ ] XSS protection aktif

## 📊 Monitoring & Health Checks

### Health Check Endpoints
- Backend: `http://localhost:5000/health`
- Database: PostgreSQL health check
- Redis: Redis ping

### Monitoring Setup
```bash
# Container health check
docker-compose exec backend curl -f http://localhost:5000/health

# Database connection test
docker-compose exec postgres pg_isready -U postgres

# Log monitoring
docker-compose logs -f --tail=100
```

## 🔄 CI/CD Pipeline

### GitHub Actions Pipeline
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build and Deploy
        run: |
          docker-compose down
          docker-compose up -d --build
          
      - name: Health Check
        run: |
          sleep 30
          curl -f http://localhost:5000/health
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Port Conflicts
```bash
# Port kullanımını kontrol et
netstat -tulpn | grep :5000
netstat -tulpn | grep :3000

# Conflicting process'i kill et
sudo kill -9 <PID>
```

#### 2. Database Connection Issues
```bash
# PostgreSQL status
sudo systemctl status postgresql

# Connection test
psql -h localhost -U postgres -d novuscapdb

# Container logs
docker-compose logs postgres
```

#### 3. Frontend Build Issues
```bash
# Clear cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### 4. CORS Issues
```bash
# Backend CORS configuration check
# appsettings.json dosyasında AllowedOrigins kontrol et
```

## 📱 Performance Optimization

### Frontend Optimization
- Bundle analysis: `npm run analyze`
- Lazy loading aktif
- Image optimization
- CDN kullanımı

### Backend Optimization
- Database indexing
- Caching (Redis)
- Connection pooling
- Query optimization

## 🔄 Backup & Recovery

### Database Backup
```bash
# Backup oluştur
docker-compose exec postgres pg_dump -U postgres novuscapdb > backup.sql

# Backup restore
docker-compose exec -i postgres psql -U postgres novuscapdb < backup.sql
```

### Automated Backups
```bash
# Crontab entry for daily backup
0 2 * * * docker-compose exec postgres pg_dump -U postgres novuscapdb > /backups/novuscap_$(date +%Y%m%d).sql
```

## 📞 Support

Deployment sırasında sorun yaşarsanız:
1. Logları kontrol edin: `docker-compose logs`
2. Health check endpoint'leri test edin
3. Database bağlantısını verify edin
4. Environment variables'ları kontrol edin

---

**Not:** Production deployment öncesi mutlaka staging environment'da test yapın!
