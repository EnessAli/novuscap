📘 **NovusCap – Uygulama Geliştirme Prompt’u (Derinlemesine ve Uygulanabilir Format)**

---

### 🎯 **Projenin Amacı ve Hedefi**

"NovusCap", Türkiye’deki girişimcilik ekosistemini harita üzerinden dijitalleştiren, yatırımcıları, startup’ları, AR-GE merkezlerini, teknoparkları, kuluçka merkezlerini, toplulukları ve co-working alanlarını tek bir platformda görünür kılan, tamamen admin panel üzerinden yönetilebilir ve son kullanıcıya sadeleştirilmiş bilgiler sunan bir web uygulamasıdır.

---

### 🧱 **Genel Teknoloji Yığını**

* **Frontend**: React + TailwindCSS
* **Backend**: ASP.NET Core Web API (MVC değil, API-first yapı tercih edilmeli)
* **Veritabanı**: PostgreSQL (Code First Entity Framework)
* **Harita Servisi**: Google Maps JavaScript API
* **Authentication**: ASP.NET Identity + JWT Token
* **Authorization**: Role-Based + Policy-Based
* **ORM**: Entity Framework Core (Migrations dahil)
* **Loglama**: Serilog + File & Console Logging + opsiyonel Application Insights
* **Config Yönetimi**: .env dosyaları (hem frontend hem backend)
* **Deployment**: Docker + GitHub Actions CI/CD + Azure/Linux VPS

---

### 🧠 **Kullanıcı Rolleri ve Yetkilendirme**

| Rol                | Yetkiler                                     |
| ------------------ | -------------------------------------------- |
| Super Admin        | Tüm sistem erişimi, kullanıcı & rol yönetimi |
| Editör             | İçerik ve marker yönetimi                    |
| Girişim Temsilcisi | Sadece kendi girişimini düzenleyebilir       |
| Gözlemci           | Salt okunur erişim                           |

* JWT tokenlar ile giriş yapılmalı, refresh token destekli.
* Yetkiler attribute tabanlı filtrelenmeli (`[Authorize(Roles = "Admin")]` gibi).

---

### 🗂️ **Klasör Yapısı (Örnek - Clean Architecture)**

**Backend:**

```
- /Application
  - DTOs
  - Interfaces
  - Services
- /Domain
  - Entities
  - Enums
- /Infrastructure
  - DataContext
  - Repositories
  - Config
- /WebApi
  - Controllers
  - Middlewares
  - Program.cs / Startup.cs
```

**Frontend:**

```
- /src
  - /components
  - /pages
  - /services (axios ile api çağrıları)
  - /contexts
  - /utils
  - /routes
  - App.jsx
  - index.js
```

---

### 🗃️ **Veritabanı Tasarımı (ER Model – Özet)**

* Users
* Roles
* UserRoles
* Organizations
* OrganizationDetails
* Locations (il, ilçe, koordinat)
* OrganizationTypes (startup, yatırımcı vs)
* Logs (login, değişiklik kayıtları)
* Reports (istatistik ve analiz için)

> **Not:** ID olarak `GUID` (UUID) kullanılmalı. Foreign key ilişkileri açık tanımlanmalı. Index’ler kurulmalı.

---

### 📌 **Harita Üzerindeki Yapılar**

* Her kurum bir marker ile temsil edilir
* Marker kategorileri: renk/ikon ayrımı (örnek: yatırımcı turuncu, startup mavi)
* Marker meta verisi: `id, ad, açıklama, logo url, websitesi, kategori, gizlilik, lokasyon, oluşturulma tarihi`
* **Clustering**: Marker yoğunluğu arttığında gruplandırma
* Sağ panelde tıklanılan marker'ın özeti (açıklama, websitesi, logo)
* Mouse scroll ile zoom aktif, harita üzerindeki tüm default UI kaldırılmalı
* `Marker Gizlilik`: Yalnızca admin görebilir (boolean flag: isPublic)

---

### 🔐 **Güvenlik ve Kimlik Doğrulama**

* ASP.NET Identity ile kullanıcı oluşturma, şifreleme
* JWT token ile login, refresh token desteği
* Brute-force engelleme (rate limit middleware)
* Giriş kayıtları loglanmalı (IP, tarayıcı, zaman)
* Admin panel erişimi role-check ile sınırlandırılmalı

---

### 🧭 **Admin Panel Özellikleri (Kapsamlı)**

* Kullanıcı girişi (JWT token tabanlı)
* Dashboard (istatistik, kullanıcı sayısı, marker sayısı)
* Marker CRUD (oluştur, düzenle, sil, gizli yap)
* Marker harita konumu seçme (Google Map içinden point seçimi)
* Marker filtreleme: Kategori, şehir, aktif/pasif
* Marker toplu yükleme (CSV/Excel desteği)
* Marker'a dosya yükleme (logo, video, pdf)
* Değişiklik geçmişi (audit trail)
* E-posta ile bilgilendirme
* Kullanıcı önerileri listesi (moderasyon paneli)

---

### 📱 **Responsive Arayüz & Tasarım Detayları**

* Tüm ekran boyutlarına uyumlu (mobil/tablet/masaüstü)
* Harita görünümü mobilde farklılaştırılmalı (dikey + accordion filtre)
* Tasarım: sade, modern, minimalist
* Ana renkler:

  * Turuncu (#F57C00)
  * Lacivert (#0D47A1)
  * Beyaz (#FFFFFF)

---

### ⚙️ **Ekstra Fonksiyonlar**

* Kullanıcı öneri kutusu (form tabanlı)
* Ziyaret sayaçları ve girişim popülerlik sıralama
* Liste görünümü (harita yerine tablo/görsel kart)
* PWA desteği (mobil cihazlar için)
* Rehberlik modu (ilk girişte açıklayıcı yönlendirmeler)

---

### 🧪 **Testler & Kalite Güvencesi**

* Backend: xUnit, Moq ile servis ve repository testleri
* Frontend: Jest + React Testing Library ile bileşen testleri
* Manuel Test Senaryoları: Login, marker ekleme, filtreleme, role geçişi

---

### 🚀 **Deployment & CI/CD**

* PostgreSQL ayrı docker container içinde
* React build edilip NGINX ile serve edilir
* .NET API ayrı container’da
* GitHub Actions ile push sonrası build-test-deploy pipeline

---

### 📦 **.env Örnekleri**

**Backend (.env.local):**

```
JWT_SECRET=supersecurekey
DB_CONNECTION=Host=localhost;Database=novuscapdb;Username=postgres;Password=xxx
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=admin@novuscap.com
EMAIL_PASS=xyz
```

**Frontend (.env):**

```
REACT_APP_API_BASE_URL=https://api.novuscap.com
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSy...xyz
google map apı key = "AIzaSyBCU4x_en_zLcX5fc3Wt8wKZwjTkyWNyqI"
```

---


ADIM 2
---

### 📏 ** ER Diyagramı Tasarımı (Entity-Relationship Model)**

#### 🔗 Amaç:

Veritabanındaki tablo yapılarını ve ilişkilerini mantıksal olarak tanımlamak.

#### ✅ Ana Tablolar:

* **Users**: Kullanıcı bilgileri (Ad, Email, ŞifreHash, RolId)
* **Roles**: Kullanıcı rolleri (Admin, Editör, Startup Yetkilisi)
* **Organizations**: Genel girişim yapıları (ad, açıklama, logo, websitesi)
* **OrganizationDetails**: Adres, telefon, e-posta, gizlilik durumu, içerik
* **OrganizationTypes**: Startup, Yatırımcı, Teknopark vb.
* **Locations**: Şehir, ilçe, enlem-boylam
* **Logs**: Kullanıcı hareketleri
* **Reports**: Sistem istatistikleri ve analiz kayıtları

#### ✏þ Teknik Detaylar:

* Primary Key: `UUID (GUID)` formatında
* Foreign Key yapıları: Users.RoleId → Roles.Id, Organizations.TypeId → OrganizationTypes.Id
* Normalize edilmeli (3NF)
* Tablolarda `CreatedAt`, `UpdatedAt` ve `IsDeleted` alanları olmalıdır.

#### 🔹 Ekstra:

* `isPublic` alanı (Boolean): Dışarıya açık mı?
* `createdByUserId`: Kaydı ekleyen kullanıcı bilgisi

---

### 🌐 ** API Endpoint Tasarımı (RESTful Design)**

#### 🔗 Amaç:

Frontend (React) ile backend (.NET Core API) arasında haberleşmeyi sağlayan yapılar.

#### 🔹 Genel Format:

```
GET      /api/organizations
GET      /api/organizations/{id}
POST     /api/organizations
PUT      /api/organizations/{id}
DELETE   /api/organizations/{id}

GET      /api/organization-types
POST     /api/users/login
POST     /api/users/register
GET      /api/users/me
```

#### ✏þ Teknik Detaylar:

* API’ler JWT token istemeli (auth middleware)
* Swagger ile belgelendirilmeli
* "api-versioning" destekli olmalı

---

### 🎨 ** Wireframe ve Mockup Tasarımı (Figma Çizimleri)**

#### 🔗 Amaç:

Kullanıcı arayüzlerinin geliştirilmeden önce kağıt/ekran üzerinde tasarlanması.

#### 🔹 Sayfa Örnekleri:

* Giriş/Kayıt ekranı
* Admin panel dashboard
* Marker ekleme/düzenleme ekranı
* Harita ekranı (marker detay sütunu sağda)
* Mobil görünümler

#### 🔹 Kullanılacak Renkler:

* Turuncu (#F57C00)
* Lacivert (#0D47A1)
* Beyaz (#FFFFFF)

---

### 🧠 ** Kullanıcı Hikayeleri (User Stories)**

#### 🔗 Amaç:

Sistemle etkileşimde bulunan kişilerin işlemlerini tanımlamak.

#### 🔹 Örnek Hikayeler:

* "Bir admin olarak, yeni bir startup ekleyebilmek istiyorum ki harita üzerinde temsil edilsin."
* "Bir gözlemci olarak, yatırımcı filtrelemesi yapabilmek istiyorum ki sadece ilgili marker'ları göreyim."

#### 🔹 Format:

```
Bir [rol] olarak, [amacı] yapmak istiyorum ki [neden/katkı] elde edeyim.
```

---

### 🧪 ** Test Senaryoları ve Planları**

#### 🔗 Amaç:

Fonksiyonların hatasız çalışıp çalışmadığını doğrulamak.

#### 🔹 Test Türleri:

* **Birim Testleri** (xUnit): Servislerin fonksiyon testi
* **Entegrasyon Testleri**: API endpoint doğrulama
* **UI Testleri**: React bileşenlerinin görsel davranışı (Jest, RTL)
* **Kabul Testi**: User story'lere uygun davranıyor mu?

#### 🔹 Örnek Senaryo:

> Giriş ekranında geçersiz şifre ile login denemesi başarısız olmalı ve mesaj dönmeli.

---

### 🚀 **CI/CD ve Dağıtım Planı**

#### 🔗 Amaç:

Kodun otomatik test edilip, hatasız bir şekilde yayına alınması.

#### 🔹 Adımlar:

* GitHub Actions ile push üzerinden otomatik build & test
* Docker Compose: PostgreSQL + .NET API + React
* Build çıktısı: React (NGINX), API (.NET), Veritabanı (Docker Volume)
* Sunucu: Azure VM veya Linux VPS

---

### 📆 ** Teknik Dökümantasyon**

#### 🔗 Amaç:

Yeni geliştiricilerin ya da sistem yöneticilerinin yapıyı hızla anlayabilmesini sağlamak.

#### 🔹 İçerik:

* Proje kurulumu (frontend/backend)
* .env dosyası örnekleri
* Swagger API referansı
* Roller ve yetkiler
* Docker kurulumu ve kullanımı

---
