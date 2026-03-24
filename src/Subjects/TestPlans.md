# NovusCap - Test Senaryoları ve Planları

## Test Stratejisi Özeti

NovusCap uygulaması için kapsamlı bir test yaklaşımı benimsenmektedir. Bu strateji, yazılımın tüm katmanlarında kalite güvencesi sağlayacak ve hataların erken tespit edilmesine olanak tanıyacaktır. Test kategorileri şunları içermektedir:

- Birim Testleri (Unit Tests)
- Entegrasyon Testleri (Integration Tests)
- UI Testleri (User Interface Tests)
- Kabul Testleri (Acceptance Tests)
- Performans Testleri (Performance Tests)
- Güvenlik Testleri (Security Tests)

## 1. Birim Testleri (Unit Tests)

### 1.1 Backend Birim Testleri

| Test ID | Başlık | Açıklama | Beklenen Sonuç |
|---------|--------|----------|----------------|
| UT-001 | OrganizationService.Create | Organizasyon oluşturma servis metodu test edilir | Organizasyon veritabanına eklenir ve ID döner |
| UT-002 | OrganizationService.GetById | ID'ye göre organizasyon getirme metodu test edilir | Doğru organizasyon nesnesi döner |
| UT-003 | OrganizationService.Update | Organizasyon güncelleme metodu test edilir | Organizasyon güncellenir ve true döner |
| UT-004 | OrganizationService.Delete | Organizasyon silme metodu test edilir | IsDeleted=true olarak ayarlanır |
| UT-005 | UserService.Authenticate | Kullanıcı doğrulama metodu test edilir | Geçerli kimlik bilgileriyle JWT token döner |
| UT-006 | UserService.Register | Kullanıcı kayıt metodu test edilir | Kullanıcı veritabanına eklenir |
| UT-007 | LocationService.GetByCoordinates | Koordinatlara göre konum getirme metodu test edilir | Doğru konum nesnesi döner |
| UT-008 | AuthorizationHelper.HasPermission | İzin kontrolü metodu test edilir | Doğru yetki durumunu döner |
| UT-009 | TokenGenerator.GenerateToken | JWT token üretme metodu test edilir | Geçerli JWT token döner |
| UT-010 | PasswordHasher.HashPassword | Şifre hashleme metodu test edilir | Şifre güvenli şekilde hashlenmiş olur |

### 1.2 Frontend Birim Testleri

| Test ID | Başlık | Açıklama | Beklenen Sonuç |
|---------|--------|----------|----------------|
| UT-101 | LoginForm Component | Giriş formu bileşeni test edilir | Form doğru şekilde render edilir ve submit çalışır |
| UT-102 | MapComponent | Harita bileşeni test edilir | Google Maps yüklenir ve markerlar gösterilir |
| UT-103 | OrganizationCard | Organizasyon kart bileşeni test edilir | Organizasyon bilgileri doğru şekilde gösterilir |
| UT-104 | FilterComponent | Filtre bileşeni test edilir | Filtre seçenekleri uygulanır |
| UT-105 | AuthContext | Yetkilendirme context'i test edilir | Login/logout olayları doğru çalışır |
| UT-106 | useOrganization Hook | Organizasyon hook'u test edilir | Organizasyon verileri doğru yüklenir |
| UT-107 | NotificationComponent | Bildirim bileşeni test edilir | Bildirimler gösterilir ve kaybolur |

## 2. Entegrasyon Testleri (Integration Tests)

| Test ID | Başlık | Açıklama | Beklenen Sonuç |
|---------|--------|----------|----------------|
| IT-001 | Organization CRUD API | Organizasyon API endpoint'leri test edilir | Tüm CRUD işlemleri veritabanına yansır |
| IT-002 | Authentication Flow | Giriş yapma akışı test edilir | Token alınır ve subsequent istekler çalışır |
| IT-003 | User Registration | Kullanıcı kayıt akışı test edilir | Kullanıcı hesabı oluşturulur ve giriş yapılabilir |
| IT-004 | Organization Filtering | Organizasyon filtreleme API'si test edilir | Filtrelenmiş sonuçlar döner |
| IT-005 | Map Data Loading | Harita veri yükleme API'si test edilir | Marker verileri doğru formatda döner |
| IT-006 | Permissions Check | Yetki kontrolü için endpoint test edilir | Uygun yetkilerle erişim sağlanır/engellenir |
| IT-007 | File Upload | Dosya yükleme API'si test edilir | Dosya sunucuya yüklenir ve URL döner |
| IT-008 | Bulk Import | Toplu içe aktarma API'si test edilir | CSV dosyasındaki veriler içe aktarılır |
| IT-009 | Dashboard Stats | Dashboard istatistik API'si test edilir | Doğru istatistikler hesaplanır ve döner |
| IT-010 | Suggestion Submission | Öneri gönderme API'si test edilir | Öneri veritabanına kaydedilir |

## 3. UI Testleri (User Interface Tests)

| Test ID | Başlık | Açıklama | Beklenen Sonuç |
|---------|--------|----------|----------------|
| UI-001 | Login Page | Giriş sayfası test edilir | Form validasyonları çalışır, giriş başarılı olur |
| UI-002 | Registration Page | Kayıt sayfası test edilir | Form validasyonları çalışır, kayıt başarılı olur |
| UI-003 | Map View | Harita görünümü test edilir | Harita yüklenir, marker'lar görüntülenir |
| UI-004 | Map Filter | Harita filtre fonksiyonu test edilir | Filtreler çalışır, sonuçlar güncellenir |
| UI-005 | Organization Detail | Organizasyon detay sayfası test edilir | Organizasyon bilgileri doğru gösterilir |
| UI-006 | Admin Dashboard | Admin panel ana sayfası test edilir | İstatistikler ve grafikleri gösterilir |
| UI-007 | User Management | Kullanıcı yönetimi sayfası test edilir | Kullanıcılar listelenir, CRUD işlemleri çalışır |
| UI-008 | Organization Form | Organizasyon ekleme/düzenleme formu test edilir | Form validasyonları çalışır, işlemler başarılı olur |
| UI-009 | Mobile Responsiveness | Mobil cihaz uyumluluğu test edilir | Tüm sayfalar farklı ekran boyutlarında düzgün görünür |
| UI-010 | Map Clustering | Harita clustering özelliği test edilir | Yakın marker'lar gruplanır ve sayı gösterilir |

## 4. Kabul Testleri (Acceptance Tests)

| Test ID | Başlık | Açıklama | Beklenen Sonuç |
|---------|--------|----------|----------------|
| AT-001 | Ziyaretçi Harita İnceleme | Ziyaretçinin haritayı inceleyebilmesi test edilir | Ziyaretçi haritada girişimleri görebilir |
| AT-002 | Kullanıcı Kayıt Olma | Yeni kullanıcı kayıt akışı test edilir | Kullanıcı başarıyla kayıt olup giriş yapabilir |
| AT-003 | Girişim Temsilcisi Girişim Ekleme | Girişim temsilcisinin yeni girişim ekleyebilmesi test edilir | Girişim başarıyla eklenir ve onaya gönderilir |
| AT-004 | Editör Girişim Onaylama | Editörün bekleyen girişimleri onaylayabilmesi test edilir | Girişim onaylanır ve haritada görünür hale gelir |
| AT-005 | Super Admin Kullanıcı Yönetimi | Admin'in kullanıcı rollerini değiştirebilmesi test edilir | Kullanıcı rolleri güncellenir ve yetkiler değişir |
| AT-006 | Filtreleme ile Arama | Kullanıcının filtreleri kullanarak arama yapması test edilir | Filtrelere uygun sonuçlar gösterilir |
| AT-007 | Toplu Veri Yükleme | Editörün CSV ile toplu veri yüklemesi test edilir | Veriler başarıyla içe aktarılır |
| AT-008 | Harita-Liste Görünümü Geçişi | Harita ve liste görünümleri arası geçiş test edilir | Görünüm sorunsuz değişir ve veriler korunur |
| AT-009 | Organizasyon Logo Yükleme | Logo yükleme işlevi test edilir | Logo yüklenir ve organizasyon kartında gösterilir |
| AT-010 | Kayıtlı Kullanıcı Öneri Gönderimi | Kullanıcının öneri gönderebilmesi test edilir | Öneri kaydedilir ve admin panelde görünür |

## 5. Performans Testleri (Performance Tests)

| Test ID | Başlık | Açıklama | Beklenen Sonuç |
|---------|--------|----------|----------------|
| PT-001 | Harita Yükleme Performansı | 1000+ marker ile harita yükleme performansı test edilir | Sayfa 3 saniyeden kısa sürede yüklenir |
| PT-002 | Veritabanı Sorgu Performansı | Filtreli sorguların yanıt süreleri test edilir | Sorgular 1 saniyeden kısa sürede tamamlanır |
| PT-003 | Eş Zamanlı Kullanıcı Testi | 100 eş zamanlı kullanıcı ile sistem yükü test edilir | Sistem yanıt süreleri kabul edilebilir sınırda kalır |
| PT-004 | API Endpoint Yanıt Süreleri | Tüm API endpoint'lerinin yanıt süreleri ölçülür | Endpoint'ler 300ms içinde yanıt verir |
| PT-005 | Clustering Performansı | Yoğun bölgelerde clustering performansı test edilir | Clustering işlemi 1 saniyeden kısa sürer |
| PT-006 | Dosya Yükleme Performansı | Büyük dosya yükleme performansı test edilir | 5MB dosya 10 saniyeden kısa sürede yüklenir |
| PT-007 | Toplu İçe Aktarma Performansı | 1000 kayıtlık CSV yükleme performansı test edilir | İçe aktarma 30 saniyeden kısa sürer |
| PT-008 | Harita Filtre Değişimi | Filtre değişiminde harita güncelleme hızı test edilir | Filtreleme işlemi 2 saniyeden kısa sürer |
| PT-009 | Dashboard Yükleme | Admin dashboard yükleme performansı test edilir | Dashboard 3 saniyeden kısa sürede yüklenir |
| PT-010 | Login/Logout Performansı | Kimlik doğrulama işlemlerinin performansı test edilir | Login/logout işlemleri 1 saniyeden kısa sürer |

## 6. Güvenlik Testleri (Security Tests)

| Test ID | Başlık | Açıklama | Beklenen Sonuç |
|---------|--------|----------|----------------|
| ST-001 | SQL Injection | SQL injection saldırılarına karşı savunma test edilir | Saldırılar başarısız olur, hatalar loglanır |
| ST-002 | XSS (Cross-Site Scripting) | XSS açıklarına karşı savunma test edilir | Script içeren girdiler güvenli şekilde işlenir |
| ST-003 | CSRF (Cross-Site Request Forgery) | CSRF koruması test edilir | CSRF token doğrulaması yapılır |
| ST-004 | JWT Token Güvenliği | JWT token güvenliği test edilir | Token süresi doğru ayarlanır, imzalama güvenlidir |
| ST-005 | Rol Tabanlı Erişim Kontrolü | İzinsiz kaynaklara erişim denemeleri test edilir | İzinsiz erişimler engellenir ve loglanır |
| ST-006 | API Rate Limiting | Rate limiting koruması test edilir | Limit aşıldığında istekler engellenir |
| ST-007 | Şifre Güvenliği | Şifre politikaları ve hashleme test edilir | Zayıf şifreler reddedilir, şifreler güvenli hashlenmiş |
| ST-008 | Dosya Yükleme Güvenliği | Zararlı dosya yükleme denemeleri test edilir | Sadece izin verilen dosya türleri kabul edilir |
| ST-009 | Hassas Veri Sızıntısı | API yanıtlarında hassas veri kontrolü | Hassas veriler API yanıtlarında bulunmaz |
| ST-010 | Kimlik Doğrulama Sınırlaması | Brute force saldırı korumaları test edilir | Başarısız login denemeleri sınırlandırılır |

## 7. Regresyon Test Senaryoları

| Test ID | Başlık | Açıklama | Beklenen Sonuç |
|---------|--------|----------|----------------|
| RT-001 | Kullanıcı Kaydı ve Giriş | Kullanıcı kaydı yapılır ve giriş yapılır | Kayıt ve giriş başarılı olur |
| RT-002 | Organizasyon Ekle ve Düzenle | Organizasyon eklenir ve sonra düzenlenir | Ekleme ve düzenleme işlemleri başarılı olur |
| RT-003 | Filtre Uygulama ve Temizleme | Çeşitli filtreler uygulanır ve temizlenir | Filtreler doğru çalışır, temizleme işlemi çalışır |
| RT-004 | Profil Güncelleme | Kullanıcı profili güncellenir | Profil bilgileri güncellenir |
| RT-005 | Marker Ayrıntıları Görüntüleme | Haritada marker'a tıklanır | Marker detayları doğru gösterilir |
| RT-006 | Liste Görünümüne Geçiş | Haritadan liste görünümüne geçilir | Liste görünümü doğru yüklenir |
| RT-007 | Kullanıcı Rolü Değiştirme | Kullanıcı rolü değiştirilir | Kullanıcının yetkileri değişir |
| RT-008 | Toplu İçe Aktarma | CSV ile veri içe aktarılır | Veriler başarıyla içe aktarılır |
| RT-009 | Logo Yükleme ve Görüntüleme | Organizasyona logo yüklenir | Logo yüklenir ve doğru gösterilir |
| RT-010 | Mobil Görünüm | Mobil cihazda sayfa açılır | Responsive tasarım doğru çalışır |

## 8. Test Araçları ve Ortamlar

### 8.1 Test Araçları

- **Backend Birim Testleri**: xUnit, Moq
- **Frontend Birim Testleri**: Jest, React Testing Library
- **Entegrasyon Testleri**: xUnit, TestServer, Postman
- **UI Testleri**: Cypress, Selenium
- **Performans Testleri**: JMeter, LoadNinja
- **Güvenlik Testleri**: OWASP ZAP, SonarQube
- **Regresyon Testleri**: Cypress, TestRail

### 8.2 Test Ortamları

| Ortam | Açıklama | Kullanım Amacı |
|-------|----------|----------------|
| Geliştirme (Dev) | Geliştiricilerin yerel ortamları | Hızlı birim ve entegrasyon testleri |
| Test | Test sunucusu ortamı | Kapsamlı test ve QA çalışmaları |
| Staging | Prodüksiyon benzeri ortam | UAT ve son kontroller |
| Prodüksiyon | Canlı ortam | Prodüksiyon sonrası smoke testler |

## 9. Test Vaka Örnekleri

### 9.1 Kullanıcı Giriş Testi (UI-001)

**Önkoşullar:**
- Sistemde kayıtlı bir kullanıcı olmalı (test@novuscap.com / Test123!)

**Test Adımları:**
1. Giriş sayfasına git
2. E-posta alanına "test@novuscap.com" gir
3. Şifre alanına "Test123!" gir
4. "Giriş Yap" butonuna tıkla

**Beklenen Sonuçlar:**
- Kullanıcı ana sayfaya yönlendirilmeli
- Kullanıcı adı üst menüde görünmeli
- Yetkili sayfalar menüde görünür olmalı

**Alternatif Akış 1: Hatalı Şifre**
1. E-posta alanına "test@novuscap.com" gir
2. Şifre alanına "YanlışŞifre" gir
3. "Giriş Yap" butonuna tıkla

**Beklenen Sonuç:**
- Hata mesajı görüntülenmeli: "Geçersiz e-posta veya şifre"
- Kullanıcı giriş sayfasında kalmalı

### 9.2 Organizasyon Ekleme Testi (AT-003)

**Önkoşullar:**
- "Girişim Temsilcisi" rolüne sahip kullanıcı giriş yapmış olmalı

**Test Adımları:**
1. "Girişim Ekle" butonuna tıkla
2. Formda gerekli alanları doldur:
   - Ad: "Test Startup"
   - Tür: "Startup"
   - Açıklama: "Test açıklaması"
   - Websitesi: "https://teststartup.com"
   - Şehir: "İstanbul"
   - İlçe: "Kadıköy"
3. Haritadan konum seç (enlem: 41.0082, boylam: 28.9784)
4. "Logo Yükle" ile bir test logosu yükle
5. "Kaydet" butonuna tıkla

**Beklenen Sonuçlar:**
- Başarı mesajı görüntülenmeli: "Girişim başarıyla kaydedildi ve onay için gönderildi"
- Girişim, kullanıcının "Girişimlerim" listesinde "Onay Bekliyor" statüsüyle görünmeli

## 10. Test Raporlama

### 10.1 Test Rapor Şablonu

Her test koşumu sonrası aşağıdaki bilgileri içeren bir rapor oluşturulacaktır:

- Test ID ve Başlık
- Test Tarihi ve Süresi
- Test Eden Kişi
- Kullanılan Ortam ve Araçlar
- Testlerin Sonuçları (Başarılı/Başarısız/Bloke)
- Bulunan Hatalar (ID, Önem, Açıklama)
- Ekran Görüntüleri ve Loglar
- Sonuç ve Öneriler

### 10.2 Hata Takip Süreci

Bulunan hatalar aşağıdaki süreçle takip edilecektir:

1. Hata tespiti ve dokümantasyonu (Hata ID, açıklama, yeniden üretme adımları)
2. Hata önceliklendirme (Kritik, Yüksek, Orta, Düşük)
3. Geliştirici ataması ve düzeltme
4. Düzeltmenin doğrulanması
5. Hata kapama

## 11. Test Takvimi

| Hafta | Aktivite |
|-------|----------|
| Hafta 1 | Test planı hazırlama, test senaryoları geliştirme |
| Hafta 2 | Birim testleri yazımı ve koşumu |
| Hafta 3 | Entegrasyon testleri yazımı ve koşumu |
| Hafta 4 | UI testleri yazımı ve koşumu |
| Hafta 5 | Performans ve güvenlik testleri |
| Hafta 6 | Kabul testleri ve regresyon testleri |
| Hafta 7 | Hata düzeltmeleri ve tekrar test |
| Hafta 8 | Final test raporu hazırlama |

## 12. Sorumluluklar ve Kaynaklar

| Rol | Sorumluluklar |
|-----|--------------|
| Test Yöneticisi | Test stratejisi, planlama, kaynak yönetimi |
| QA Mühendisi | Test senaryoları yazma, test koşumu, hata raporlama |
| Otomasyon Mühendisi | Test otomasyonu geliştirme ve bakımı |
| Güvenlik Uzmanı | Güvenlik testleri planlama ve uygulama |
| Performans Test Uzmanı | Performans testleri planlama ve uygulama |

## 13. Risk Analizi ve Azaltma Stratejileri

| Risk | Etki | Olasılık | Azaltma Stratejisi |
|------|------|----------|---------------------|
| Google Maps API kesintisi | Yüksek | Düşük | Alternatif harita sağlayıcısı hazır bulundurma |
| Veritabanı performans sorunları | Yüksek | Orta | İndeksleme, sorgu optimizasyonu, önbellek kullanımı |
| Mobil uyumluluk sorunları | Orta | Yüksek | Farklı cihazlarda kapsamlı test, responsive tasarım |
| Kullanıcı kimlik bilgilerinin sızması | Yüksek | Düşük | Güçlü şifreleme, güvenlik testleri, kod gözden geçirme |
| Yanlış konum verileri | Orta | Orta | Lokasyon doğrulama ekleme, manuel onay süreci |
