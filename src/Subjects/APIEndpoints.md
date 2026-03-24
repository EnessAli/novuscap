# NovusCap - API Endpoint Tasarımı (RESTful)

## Genel Özellikler

- Tüm API endpoint'leri RESTful prensiplerine uygun tasarlanmıştır
- Base URL: `https://api.novuscap.com/api`
- API versiyonlaması path içinde belirtilecektir: `/api/v1/resource`
- Tüm endpoint'ler JWT token doğrulaması gerektirir (auth middleware ile korunur)
- Response formatı standart JSON formatındadır
- Hata kodları ve mesajları standardize edilmiştir

## Authentication Endpoints

### `/api/v1/auth/register`
- **Metod**: POST
- **Açıklama**: Yeni kullanıcı kaydı
- **Yetkilendirme**: Açık (token gerektirmez)
- **Request Body**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Kullanıcı başarıyla kaydedildi.",
  "data": {
    "id": "uuid",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  }
}
```

### `/api/v1/auth/login`
- **Metod**: POST
- **Açıklama**: Kullanıcı girişi
- **Yetkilendirme**: Açık (token gerektirmez)
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Giriş başarılı.",
  "data": {
    "token": "string",
    "refreshToken": "string",
    "expiration": "datetime",
    "user": {
      "id": "uuid",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "roles": ["string"]
    }
  }
}
```

### `/api/v1/auth/refresh-token`
- **Metod**: POST
- **Açıklama**: JWT token yenileme
- **Yetkilendirme**: Açık (token gerektirmez)
- **Request Body**:
```json
{
  "token": "string",
  "refreshToken": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Token yenilendi.",
  "data": {
    "token": "string",
    "refreshToken": "string",
    "expiration": "datetime"
  }
}
```

### `/api/v1/auth/me`
- **Metod**: GET
- **Açıklama**: Mevcut kullanıcı bilgilerini getir
- **Yetkilendirme**: Token gerekli
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "roles": ["string"]
  }
}
```

### `/api/v1/auth/change-password`
- **Metod**: PUT
- **Açıklama**: Kullanıcı şifre değişikliği
- **Yetkilendirme**: Token gerekli
- **Request Body**:
```json
{
  "currentPassword": "string",
  "newPassword": "string",
  "confirmPassword": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Şifre başarıyla değiştirildi."
}
```

## Users Endpoints

### `/api/v1/users`
- **Metod**: GET
- **Açıklama**: Tüm kullanıcılar listesi (pagination, filtering)
- **Yetkilendirme**: SuperAdmin rol gerekli
- **Query Params**:
  - page: int (default: 1)
  - pageSize: int (default: 10)
  - search: string (ad soyad, e-posta araması)
  - role: string (rol filtreleme)
- **Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "roles": ["string"]
      }
    ],
    "totalCount": 0,
    "page": 0,
    "pageSize": 0,
    "totalPages": 0
  }
}
```

### `/api/v1/users/{id}`
- **Metod**: GET
- **Açıklama**: Belirli bir kullanıcının detayları
- **Yetkilendirme**: SuperAdmin rol veya kendisi
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "string",
    "lastName": "string", 
    "email": "string",
    "phoneNumber": "string",
    "roles": ["string"],
    "createdAt": "datetime"
  }
}
```

### `/api/v1/users/{id}`
- **Metod**: PUT
- **Açıklama**: Kullanıcı bilgilerini güncelle
- **Yetkilendirme**: SuperAdmin rol veya kendisi
- **Request Body**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Kullanıcı bilgileri güncellendi.",
  "data": {
    "id": "uuid",
    "firstName": "string",
    "lastName": "string", 
    "email": "string",
    "phoneNumber": "string"
  }
}
```

### `/api/v1/users/{id}`
- **Metod**: DELETE
- **Açıklama**: Kullanıcı sil (soft delete)
- **Yetkilendirme**: SuperAdmin rol
- **Response**:
```json
{
  "success": true,
  "message": "Kullanıcı silindi."
}
```

### `/api/v1/users/{id}/roles`
- **Metod**: PUT
- **Açıklama**: Kullanıcı rollerini güncelle
- **Yetkilendirme**: SuperAdmin rol
- **Request Body**:
```json
{
  "roles": ["string"]
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Kullanıcı rolleri güncellendi."
}
```

## Roles Endpoints

### `/api/v1/roles`
- **Metod**: GET
- **Açıklama**: Tüm roller listesi
- **Yetkilendirme**: SuperAdmin rol
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string"
    }
  ]
}
```

### `/api/v1/roles`
- **Metod**: POST
- **Açıklama**: Yeni rol oluştur
- **Yetkilendirme**: SuperAdmin rol
- **Request Body**:
```json
{
  "name": "string",
  "description": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Rol oluşturuldu.",
  "data": {
    "id": "uuid",
    "name": "string",
    "description": "string"
  }
}
```

### `/api/v1/roles/{id}`
- **Metod**: PUT
- **Açıklama**: Rol güncelle
- **Yetkilendirme**: SuperAdmin rol
- **Request Body**:
```json
{
  "name": "string",
  "description": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Rol güncellendi.",
  "data": {
    "id": "uuid",
    "name": "string",
    "description": "string"
  }
}
```

### `/api/v1/roles/{id}`
- **Metod**: DELETE
- **Açıklama**: Rol sil
- **Yetkilendirme**: SuperAdmin rol
- **Response**:
```json
{
  "success": true,
  "message": "Rol silindi."
}
```

## Organization Endpoints

### `/api/v1/organizations`
- **Metod**: GET
- **Açıklama**: Tüm organizasyonlar (pagination, filtering)
- **Yetkilendirme**: Token gerekli
- **Query Params**:
  - page: int (default: 1)
  - pageSize: int (default: 10)
  - search: string (organizasyon adı, açıklama)
  - typeId: uuid (tür filtresi)
  - city: string (şehir filtresi)
  - includeNonPublic: boolean (default: false - SuperAdmin/Editor için true olabilir)
- **Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "string",
        "description": "string",
        "logoUrl": "string",
        "websiteUrl": "string",
        "type": {
          "id": "uuid",
          "name": "string"
        },
        "location": {
          "city": "string",
          "district": "string",
          "latitude": 0,
          "longitude": 0
        },
        "isPublic": true,
        "createdAt": "datetime"
      }
    ],
    "totalCount": 0,
    "page": 0,
    "pageSize": 0,
    "totalPages": 0
  }
}
```

### `/api/v1/organizations/{id}`
- **Metod**: GET
- **Açıklama**: Belirli bir organizasyonun detayları
- **Yetkilendirme**: Token gerekli + Gizli ise yetkilendirme kontrolü
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "logoUrl": "string",
    "websiteUrl": "string",
    "type": {
      "id": "uuid",
      "name": "string"
    },
    "details": {
      "address": "string",
      "phone": "string",
      "email": "string",
      "contentHtml": "string",
      "contactPerson": "string"
    },
    "location": {
      "city": "string",
      "district": "string",
      "latitude": 0,
      "longitude": 0
    },
    "isPublic": true,
    "createdByUser": {
      "id": "uuid",
      "firstName": "string",
      "lastName": "string"
    },
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### `/api/v1/organizations`
- **Metod**: POST
- **Açıklama**: Yeni organizasyon oluştur
- **Yetkilendirme**: SuperAdmin, Editor rol veya GirişimTemsilcisi
- **Request Body**:
```json
{
  "name": "string",
  "description": "string",
  "logoUrl": "string",
  "websiteUrl": "string",
  "typeId": "uuid",
  "isPublic": true,
  "details": {
    "address": "string",
    "phone": "string",
    "email": "string",
    "contentHtml": "string",
    "contactPerson": "string"
  },
  "location": {
    "city": "string",
    "district": "string",
    "latitude": 0,
    "longitude": 0
  }
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Organizasyon oluşturuldu.",
  "data": {
    "id": "uuid",
    "name": "string"
  }
}
```

### `/api/v1/organizations/{id}`
- **Metod**: PUT
- **Açıklama**: Organizasyon güncelle
- **Yetkilendirme**: SuperAdmin, Editor rol veya organizasyon sahibi
- **Request Body**: (POST ile aynı)
- **Response**:
```json
{
  "success": true,
  "message": "Organizasyon güncellendi."
}
```

### `/api/v1/organizations/{id}`
- **Metod**: DELETE
- **Açıklama**: Organizasyon sil (soft delete)
- **Yetkilendirme**: SuperAdmin, Editor rol veya organizasyon sahibi
- **Response**:
```json
{
  "success": true,
  "message": "Organizasyon silindi."
}
```

### `/api/v1/organizations/{id}/image-upload`
- **Metod**: POST
- **Açıklama**: Organizasyon logosu yükle
- **Yetkilendirme**: SuperAdmin, Editor rol veya organizasyon sahibi
- **Content-Type**: multipart/form-data
- **Request Body**:
```
file: (binary data)
```
- **Response**:
```json
{
  "success": true,
  "message": "Logo yüklendi.",
  "data": {
    "logoUrl": "string"
  }
}
```

### `/api/v1/organizations/bulk-import`
- **Metod**: POST
- **Açıklama**: Toplu organizasyon verisi içe aktar (CSV/Excel)
- **Yetkilendirme**: SuperAdmin, Editor rol
- **Content-Type**: multipart/form-data
- **Request Body**:
```
file: (binary data)
```
- **Response**:
```json
{
  "success": true,
  "message": "Veriler içe aktarıldı.",
  "data": {
    "importedCount": 0,
    "failedCount": 0,
    "errors": [
      {
        "row": 0,
        "message": "string"
      }
    ]
  }
}
```

## OrganizationTypes Endpoints

### `/api/v1/organization-types`
- **Metod**: GET
- **Açıklama**: Tüm organizasyon türleri
- **Yetkilendirme**: Token gerekli
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "color": "string",
      "icon": "string"
    }
  ]
}
```

### `/api/v1/organization-types/{id}`
- **Metod**: GET
- **Açıklama**: Belirli bir tür detayı
- **Yetkilendirme**: Token gerekli
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "color": "string",
    "icon": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### `/api/v1/organization-types`
- **Metod**: POST
- **Açıklama**: Yeni tür oluştur
- **Yetkilendirme**: SuperAdmin rol
- **Request Body**:
```json
{
  "name": "string",
  "description": "string",
  "color": "string",
  "icon": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Organizasyon türü oluşturuldu.",
  "data": {
    "id": "uuid",
    "name": "string"
  }
}
```

### `/api/v1/organization-types/{id}`
- **Metod**: PUT
- **Açıklama**: Tür güncelle
- **Yetkilendirme**: SuperAdmin rol
- **Request Body**: (POST ile aynı)
- **Response**:
```json
{
  "success": true,
  "message": "Organizasyon türü güncellendi."
}
```

### `/api/v1/organization-types/{id}`
- **Metod**: DELETE
- **Açıklama**: Tür sil
- **Yetkilendirme**: SuperAdmin rol
- **Response**:
```json
{
  "success": true,
  "message": "Organizasyon türü silindi."
}
```

## Locations Endpoints

### `/api/v1/locations/cities`
- **Metod**: GET
- **Açıklama**: Tüm şehirler listesi
- **Yetkilendirme**: Token gerekli
- **Response**:
```json
{
  "success": true,
  "data": [
    "string"
  ]
}
```

### `/api/v1/locations/districts`
- **Metod**: GET
- **Açıklama**: Belirli bir şehre ait ilçeler listesi
- **Yetkilendirme**: Token gerekli
- **Query Params**:
  - city: string (zorunlu)
- **Response**:
```json
{
  "success": true,
  "data": [
    "string"
  ]
}
```

## Reports Endpoints

### `/api/v1/reports`
- **Metod**: GET
- **Açıklama**: Tüm raporlar (pagination)
- **Yetkilendirme**: SuperAdmin rol
- **Query Params**:
  - page: int (default: 1)
  - pageSize: int (default: 10)
  - type: string (rapor türü filtresi)
- **Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "string",
        "type": "string",
        "description": "string",
        "startDate": "datetime",
        "endDate": "datetime",
        "createdAt": "datetime"
      }
    ],
    "totalCount": 0,
    "page": 0,
    "pageSize": 0,
    "totalPages": 0
  }
}
```

### `/api/v1/reports/{id}`
- **Metod**: GET
- **Açıklama**: Belirli bir raporun detayları
- **Yetkilendirme**: SuperAdmin rol
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "type": "string",
    "description": "string",
    "data": {},
    "startDate": "datetime",
    "endDate": "datetime",
    "createdByUser": {
      "id": "uuid",
      "firstName": "string",
      "lastName": "string"
    },
    "createdAt": "datetime"
  }
}
```

### `/api/v1/reports`
- **Metod**: POST
- **Açıklama**: Yeni rapor oluştur
- **Yetkilendirme**: SuperAdmin rol
- **Request Body**:
```json
{
  "name": "string",
  "type": "string",
  "description": "string",
  "data": {},
  "startDate": "datetime",
  "endDate": "datetime"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Rapor oluşturuldu.",
  "data": {
    "id": "uuid"
  }
}
```

## Dashboard Endpoints

### `/api/v1/dashboard/stats`
- **Metod**: GET
- **Açıklama**: Dashboard istatistikleri
- **Yetkilendirme**: SuperAdmin, Editor rol
- **Response**:
```json
{
  "success": true,
  "data": {
    "totalOrganizations": 0,
    "totalUsers": 0,
    "organizationsByType": [
      {
        "type": "string",
        "count": 0
      }
    ],
    "organizationsByCity": [
      {
        "city": "string",
        "count": 0
      }
    ],
    "recentOrganizations": [
      {
        "id": "uuid",
        "name": "string",
        "type": "string",
        "createdAt": "datetime"
      }
    ]
  }
}
```

### `/api/v1/dashboard/map-data`
- **Metod**: GET
- **Açıklama**: Harita için marker verisi
- **Yetkilendirme**: Token gerekli
- **Query Params**:
  - typeIds: [uuid] (organizasyon türleri filtresi)
  - city: string (şehir filtresi)
  - includeNonPublic: boolean (default: false - SuperAdmin/Editor için true olabilir)
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "logoUrl": "string",
      "websiteUrl": "string",
      "typeId": "uuid",
      "typeName": "string",
      "color": "string",
      "latitude": 0,
      "longitude": 0,
      "isPublic": true
    }
  ]
}
```

## Suggestion Box Endpoints

### `/api/v1/suggestions`
- **Metod**: POST
- **Açıklama**: Kullanıcı önerisi gönder
- **Yetkilendirme**: Açık (token gerektirmez)
- **Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Öneriniz alındı. Teşekkürler!"
}
```

### `/api/v1/suggestions`
- **Metod**: GET
- **Açıklama**: Tüm öneriler
- **Yetkilendirme**: SuperAdmin rol
- **Query Params**:
  - page: int (default: 1)
  - pageSize: int (default: 10)
  - status: string (duruma göre filtre - "new", "reviewed", "archived")
- **Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "string",
        "email": "string",
        "subject": "string",
        "message": "string",
        "status": "string",
        "createdAt": "datetime"
      }
    ],
    "totalCount": 0,
    "page": 0,
    "pageSize": 0,
    "totalPages": 0
  }
}
```

### `/api/v1/suggestions/{id}/status`
- **Metod**: PUT
- **Açıklama**: Öneri durumunu güncelle
- **Yetkilendirme**: SuperAdmin rol
- **Request Body**:
```json
{
  "status": "string",
  "comment": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Öneri durumu güncellendi."
}
```

## Hata Kodları

| HTTP Kodu | Açıklama                           |
|-----------|-------------------------------------|
| 200       | Başarılı                            |
| 201       | Oluşturuldu                         |
| 400       | Hatalı istek                        |
| 401       | Yetkisiz erişim                     |
| 403       | Erişim reddedildi                   |
| 404       | Kaynak bulunamadı                   |
| 422       | İşlenemeyen varlık (validasyon)     |
| 500       | Sunucu hatası                       |

## API Versiyonlama

- Tüm API endpoint'leri `/api/v{version}/` şeklinde versiyonlanacaktır
- Örnek: `/api/v1/organizations` ve gelecekte `/api/v2/organizations`
- Middleware ile API versiyonu otomatik olarak yönlendirilecektir

## Swagger Entegrasyonu

- Tüm API endpointleri Swagger UI ile belgelendirilecektir
- Swagger URL: `https://api.novuscap.com/swagger`
- Her endpoint için örnek request ve response bilgisi sağlanacaktır
- Swagger, kullanıcıların API'yi test etmesine olanak tanıyacaktır

## Rate Limiting

- IP başına dakikada 60 istek
- API token başına dakikada 120 istek
- Rate limit aşıldığında 429 Too Many Requests döndürülür
