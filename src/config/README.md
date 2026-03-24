# ⚙️ Configuration Klasörü

Bu klasör, NovusCap projesi için gerekli olan tüm konfigürasyon dosyalarını içerir.

## 📁 Dosyalar

### 🌐 Web Server Configuration
- **`nginx.conf`** - Nginx reverse proxy konfigürasyonu

## 📋 Not

Docker Compose ve Environment dosyaları artık root seviyede yönetiliyor:
- `../docker-compose.yml` - Development ortamı
- `../docker-compose.prod.yml` - Production ortamı 
- `../.env` - Development environment variables
- `../.env.production` - Production environment variables
- `../.env.example` - Environment template

Bu değişiklik daha temiz ve merkezi bir yapılandırma yönetimi sağlar.

## 🚀 Kullanım

### Environment Variables Kurulumu

1. Development için:
```bash
cp .env.example ../.env
# .env dosyasını kendi değerlerinizle düzenleyin
```

2. Production için:
```bash
cp .env.prod.example ../.env.prod
# .env.prod dosyasını production değerlerinizle düzenleyin
```

### Docker ile Çalıştırma

1. Development:
```bash
docker-compose -f config/docker-compose.yml up -d
```

2. Production:
```bash
docker-compose -f config/docker-compose.prod.yml up -d
```

## 📝 Önemli Notlar

- ⚠️ **Asla gerçek .env dosyalarını Git'e commit etmeyin!**
- 🔒 **Production değerlerini güvenli tutun**
- 🔄 **Template dosyalarını güncel tutun**
