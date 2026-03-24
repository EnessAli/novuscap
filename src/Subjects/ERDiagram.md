# NovusCap - ER Diyagramı (Entity-Relationship)

## Varlıklar (Entities) ve İlişkileri

```
+----------------+       +----------------+       +------------------+
|     Users      |       |     Roles      |       |   UserRoles      |
+----------------+       +----------------+       +------------------+
| Id (UUID) PK   |       | Id (UUID) PK   |       | Id (UUID) PK     |
| FirstName      |       | Name           |       | UserId FK        |
| LastName       |       | Description    |       | RoleId FK        |
| Email UNIQUE   |       | NormalizedName |       | CreatedAt        |
| PasswordHash   |       | CreatedAt      |       | UpdatedAt        |
| UserName       |       | UpdatedAt      |       | IsDeleted        |
| PhoneNumber    |       | IsDeleted      |       +------------------+
| CreatedAt      |       +----------------+               |
| UpdatedAt      |               |                        |
| IsDeleted      |               +------------------------+
+----------------+                        |
        |                                 |
        |                                 |
+-------------------------------+  +---------------------------+
|     Organizations            |  |    OrganizationTypes      |
+-------------------------------+  +---------------------------+
| Id (UUID) PK                 |  | Id (UUID) PK              |
| Name                         |  | Name                      |
| Description                  |  | Description               |
| LogoUrl                      |  | Color                     |
| WebsiteUrl                   |  | Icon                      |
| TypeId FK                    |--| CreatedAt                 |
| CreatedByUserId FK           |  | UpdatedAt                 |
| IsPublic                     |  | IsDeleted                 |
| CreatedAt                    |  +---------------------------+
| UpdatedAt                    |
| IsDeleted                    |
+-------------------------------+
        |
        |
+-------------------------------+  +---------------------------+
|    OrganizationDetails       |  |      Locations            |
+-------------------------------+  +---------------------------+
| Id (UUID) PK                 |  | Id (UUID) PK              |
| OrganizationId FK           -|--| City                      |
| Address                      |  | District                  |
| Phone                        |  | Latitude                  |
| Email                        |  | Longitude                 |
| ContentHtml                  |  | CreatedAt                 |
| ContactPerson                |  | UpdatedAt                 |
| LocationId FK               -|--| IsDeleted                 |
| CreatedAt                    |  +---------------------------+
| UpdatedAt                    |
| IsDeleted                    |
+-------------------------------+
        |
        |
+-------------------------------+  +---------------------------+
|           Logs               |  |        Reports            |
+-------------------------------+  +---------------------------+
| Id (UUID) PK                 |  | Id (UUID) PK              |
| UserId FK                    |  | Name                      |
| Action                       |  | Type                      |
| EntityId                     |  | Description               |
| EntityType                   |  | Data (JSON)               |
| OldValues (JSON)             |  | StartDate                 |
| NewValues (JSON)             |  | EndDate                   |
| IP                           |  | CreatedByUserId FK        |
| UserAgent                    |  | CreatedAt                 |
| CreatedAt                    |  | UpdatedAt                 |
| IsDeleted                    |  | IsDeleted                 |
+-------------------------------+  +---------------------------+
```

## Detaylı Alan Tanımları

### Users
- **Id**: UUID formatında birincil anahtar
- **FirstName**: Kullanıcının adı (nvarchar(100))
- **LastName**: Kullanıcının soyadı (nvarchar(100))
- **Email**: Kullanıcının benzersiz e-posta adresi (nvarchar(256), UNIQUE)
- **PasswordHash**: Şifre hash'i (nvarchar(MAX))
- **UserName**: Kullanıcının kullanıcı adı (nvarchar(256))
- **PhoneNumber**: Telefon numarası (nvarchar(20))
- **CreatedAt**: Kaydın oluşturulma zamanı (datetime2)
- **UpdatedAt**: Kaydın son güncellenme zamanı (datetime2)
- **IsDeleted**: Soft delete için bayrak (bit)

### Roles
- **Id**: UUID formatında birincil anahtar
- **Name**: Rol adı (nvarchar(50))
- **Description**: Rol açıklaması (nvarchar(256))
- **NormalizedName**: Normalizasyon için büyük harfli rol adı (nvarchar(50))
- **CreatedAt**: Kaydın oluşturulma zamanı (datetime2)
- **UpdatedAt**: Kaydın son güncellenme zamanı (datetime2)
- **IsDeleted**: Soft delete için bayrak (bit)

### UserRoles
- **Id**: UUID formatında birincil anahtar
- **UserId**: Kullanıcı ID, Users tablosuna dış anahtarla bağlı
- **RoleId**: Rol ID, Roles tablosuna dış anahtarla bağlı
- **CreatedAt**: Kaydın oluşturulma zamanı (datetime2)
- **UpdatedAt**: Kaydın son güncellenme zamanı (datetime2)
- **IsDeleted**: Soft delete için bayrak (bit)

### Organizations
- **Id**: UUID formatında birincil anahtar
- **Name**: Organizasyon adı (nvarchar(100))
- **Description**: Organizasyon açıklaması (nvarchar(500))
- **LogoUrl**: Logo dosya yolu (nvarchar(256))
- **WebsiteUrl**: Web sitesi URL'si (nvarchar(256))
- **TypeId**: Organizasyon türü, OrganizationTypes tablosuna dış anahtarla bağlı
- **CreatedByUserId**: Kaydı oluşturan kullanıcı, Users tablosuna dış anahtarla bağlı
- **IsPublic**: Kaydın genel görünür olup olmadığı (bit)
- **CreatedAt**: Kaydın oluşturulma zamanı (datetime2)
- **UpdatedAt**: Kaydın son güncellenme zamanı (datetime2)
- **IsDeleted**: Soft delete için bayrak (bit)

### OrganizationTypes
- **Id**: UUID formatında birincil anahtar
- **Name**: Tür adı (nvarchar(50)) - Startup, Yatırımcı, Teknopark vb.
- **Description**: Tür açıklaması (nvarchar(256))
- **Color**: Haritada gösterilecek renk kodu (nvarchar(20))
- **Icon**: İkon dosya yolu (nvarchar(256))
- **CreatedAt**: Kaydın oluşturulma zamanı (datetime2)
- **UpdatedAt**: Kaydın son güncellenme zamanı (datetime2)
- **IsDeleted**: Soft delete için bayrak (bit)

### OrganizationDetails
- **Id**: UUID formatında birincil anahtar
- **OrganizationId**: Organizasyon ID, Organizations tablosuna dış anahtarla bağlı
- **Address**: Fiziksel adres (nvarchar(500))
- **Phone**: Telefon numarası (nvarchar(20))
- **Email**: E-posta (nvarchar(256))
- **ContentHtml**: HTML formatında zengin içerik (nvarchar(MAX))
- **ContactPerson**: İletişim kurulacak kişi (nvarchar(100))
- **LocationId**: Konum ID, Locations tablosuna dış anahtarla bağlı
- **CreatedAt**: Kaydın oluşturulma zamanı (datetime2)
- **UpdatedAt**: Kaydın son güncellenme zamanı (datetime2)
- **IsDeleted**: Soft delete için bayrak (bit)

### Locations
- **Id**: UUID formatında birincil anahtar
- **City**: Şehir adı (nvarchar(50))
- **District**: İlçe adı (nvarchar(50))
- **Latitude**: Enlem (decimal(18,14))
- **Longitude**: Boylam (decimal(18,14))
- **CreatedAt**: Kaydın oluşturulma zamanı (datetime2)
- **UpdatedAt**: Kaydın son güncellenme zamanı (datetime2)
- **IsDeleted**: Soft delete için bayrak (bit)

### Logs
- **Id**: UUID formatında birincil anahtar
- **UserId**: İşlemi yapan kullanıcı ID, Users tablosuna dış anahtarla bağlı
- **Action**: Yapılan işlem (nvarchar(50)) - Create, Update, Delete, Login vb.
- **EntityId**: İşlem yapılan varlığın ID'si (nvarchar(36))
- **EntityType**: İşlem yapılan varlığın türü (nvarchar(50))
- **OldValues**: Eski değerler, JSON formatında (nvarchar(MAX))
- **NewValues**: Yeni değerler, JSON formatında (nvarchar(MAX))
- **IP**: İşlemi yapan kullanıcının IP adresi (nvarchar(50))
- **UserAgent**: İşlemi yapan kullanıcının tarayıcı bilgisi (nvarchar(500))
- **CreatedAt**: Kaydın oluşturulma zamanı (datetime2)
- **IsDeleted**: Soft delete için bayrak (bit)

### Reports
- **Id**: UUID formatında birincil anahtar
- **Name**: Rapor adı (nvarchar(100))
- **Type**: Rapor türü (nvarchar(50))
- **Description**: Rapor açıklaması (nvarchar(500))
- **Data**: Rapor verileri, JSON formatında (nvarchar(MAX))
- **StartDate**: Rapor başlangıç tarihi (datetime2)
- **EndDate**: Rapor bitiş tarihi (datetime2)
- **CreatedByUserId**: Raporu oluşturan kullanıcı ID, Users tablosuna dış anahtarla bağlı
- **CreatedAt**: Kaydın oluşturulma zamanı (datetime2)
- **UpdatedAt**: Kaydın son güncellenme zamanı (datetime2)
- **IsDeleted**: Soft delete için bayrak (bit)

## İlişki Tanımları

1. **User - Role (Birden Çoğa İlişki):**
   - Bir kullanıcı birden fazla role sahip olabilir ve bir rol birden fazla kullanıcıya atanabilir.
   - Bu ilişki UserRoles ara tablosu ile sağlanır.

2. **Organization - OrganizationType (Çoka Bir İlişki):**
   - Her organizasyonun tek bir türü olabilir; bir tür birden çok organizasyona ait olabilir.
   - Organizations.TypeId → OrganizationTypes.Id

3. **Organization - OrganizationDetails (Bire Bir İlişki):**
   - Her organizasyonun tek bir detay kaydı olabilir ve her detay kaydı tek bir organizasyona aittir.
   - OrganizationDetails.OrganizationId → Organizations.Id

4. **OrganizationDetails - Location (Çoka Bir İlişki):**
   - Her organizasyon detayının tek bir konumu olabilir; bir konum birden çok organizasyon detayına ait olabilir.
   - OrganizationDetails.LocationId → Locations.Id

5. **User - Organizations (Çoka Çok İlişki):**
   - Bir kullanıcı birden fazla organizasyon oluşturabilir veya yönetebilir.
   - Organizations.CreatedByUserId → Users.Id

6. **User - Logs (Bire Çok İlişki):**
   - Bir kullanıcı birden fazla log kaydı oluşturabilir; her log kaydı tek bir kullanıcıya aittir.
   - Logs.UserId → Users.Id

7. **User - Reports (Bire Çok İlişki):**
   - Bir kullanıcı birden fazla rapor oluşturabilir; her rapor tek bir kullanıcıya aittir.
   - Reports.CreatedByUserId → Users.Id

## İndeksler

1. **Users**:
   - Email (UNIQUE)
   - UserName
   - IsDeleted

2. **Roles**:
   - Name (UNIQUE)
   - NormalizedName (UNIQUE)
   - IsDeleted

3. **Organizations**:
   - Name
   - TypeId
   - IsPublic
   - IsDeleted

4. **OrganizationTypes**:
   - Name (UNIQUE)
   - IsDeleted

5. **Locations**:
   - City
   - District
   - (Latitude, Longitude) - İkili indeks, harita tabanlı sorgular için performans

6. **Logs**:
   - UserId
   - Action
   - EntityType
   - CreatedAt

7. **Reports**:
   - CreatedByUserId
   - Type
   - StartDate, EndDate

## Veri Normalizasyonu (3NF)

Bu veritabanı tasarımı üçüncü normal forma (3NF) uygun şekilde yapılandırılmıştır:

1. **1NF**: Tüm tablolarda, her sütun atomik ve tekrarlanmayan verilerden oluşur.
2. **2NF**: Tüm tablolar 1NF'dir ve anahtar olmayan tüm sütunlar tam olarak birincil anahtara bağımlıdır.
3. **3NF**: Tüm tablolar 2NF'dir ve anahtar olmayan sütunlar birbirine bağımlı değildir.

## Veri Bütünlüğü Kontrolleri

1. **Foreign Key Kısıtlamaları**: Tüm ilişkiler CASCADE UPDATE, RESTRICT DELETE olarak ayarlanmalıdır.
2. **Soft Delete**: Gerçek silme yerine IsDeleted alanı TRUE olarak işaretlenir.
3. **Unique Constraints**: Email, UserName, Role Name gibi benzersiz olması gereken alanlar için kısıtlamalar uygulanmalıdır.
