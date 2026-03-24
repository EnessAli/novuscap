# 🐳 Docker ve Environment Dosyaları Optimizasyon Planı

## 🎯 Hedef: Tek ve Tutarlı Yapı

### 📁 Yeni Yapı:
```
novuscap/
├── .env                     # Ana environment file (development)
├── .env.production          # Production environment file
├── docker-compose.yml       # Development compose
├── docker-compose.prod.yml  # Production compose
├── frontend/
│   └── Dockerfile           # Tek Dockerfile (multi-stage)
└── backend/
    └── Dockerfile           # Tek Dockerfile (multi-stage)
```

## 🔧 Yapılacak Değişiklikler:

### 1. Environment Dosyalarını Consolidate Et
- Root seviyede tek `.env` ve `.env.production`
- Alt klasörlerdeki `.env` dosyalarını kaldır
- Tüm environment variables'ları merkezi yönet

### 2. Dockerfile'ları Optimize Et
- Multi-stage build ile development ve production'ı tek dosyada
- ARG ve ENV kullanarak environment-specific builds

### 3. Docker Compose Dosyalarını Root'a Taşı
- `config/docker-compose.*` → root'a taşı
- Environment file references güncelle

## ✅ Avantajlar:
- Tek noktadan environment yönetimi
- Daha az dosya karmaşası
- Tutarlı deployment process
- Kolay maintenance

## 🚨 Riskler:
- Mevcut development workflow'unu bozabilir
- Environment variables conflicts
- Docker build context değişimi
