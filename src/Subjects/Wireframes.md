# NovusCap - Wireframe ve Mockup Tasarımları

## Genel Tasarım İlkeleri

- **Renk Paleti**:
  - Turuncu: `#F57C00` (Ana aksiyonlar ve vurgular)
  - Lacivert: `#0D47A1` (Başlıklar ve ikincil öğeler)
  - Beyaz: `#FFFFFF` (Arkaplan)
  - Açık gri: `#F5F5F5` (Panel arkaplanları)
  - Koyu gri: `#333333` (Metin)

- **Tipografi**:
  - Başlıklar: Montserrat, 24px-32px
  - Alt başlıklar: Montserrat, 18px-22px
  - Ana metin: Roboto, 14px-16px
  - Butonlar: Roboto Medium, 14px

- **Boşluklar**:
  - İçerik alanları arası: 24px
  - Grup içi öğeler: 16px
  - Metin paragrafları: 12px

- **Responsiveness**:
  - Masaüstü: 1200px+
  - Tablet: 768px - 1199px
  - Mobil: < 768px

## Ekran Tasarımları

### 1. Giriş Ekranı (Login)

```
+-------------------------------------------+
|                                           |
|                 NOVUSCAP                  |
|                                           |
|  +-----------------------------------+    |
|  |          Email Address           |    |
|  +-----------------------------------+    |
|                                           |
|  +-----------------------------------+    |
|  |           Password               |    |
|  +-----------------------------------+    |
|                                           |
|  [Beni Hatırla]                           |
|                                           |
|  +-----------------------------------+    |
|  |             GİRİŞ YAP             |    |
|  +-----------------------------------+    |
|                                           |
|  Şifrenizi mi unuttunuz?                  |
|                                           |
|  Hesabınız yok mu? Kaydolun              |
|                                           |
+-------------------------------------------+
```

### 2. Kayıt Ekranı (Register)

```
+-------------------------------------------+
|                                           |
|                 NOVUSCAP                  |
|                                           |
|  +-----------------------------------+    |
|  |             Ad                   |    |
|  +-----------------------------------+    |
|                                           |
|  +-----------------------------------+    |
|  |            Soyad                 |    |
|  +-----------------------------------+    |
|                                           |
|  +-----------------------------------+    |
|  |          Email Address           |    |
|  +-----------------------------------+    |
|                                           |
|  +-----------------------------------+    |
|  |           Password               |    |
|  +-----------------------------------+    |
|                                           |
|  +-----------------------------------+    |
|  |       Confirm Password           |    |
|  +-----------------------------------+    |
|                                           |
|  +-----------------------------------+    |
|  |             KAYDOL               |    |
|  +-----------------------------------+    |
|                                           |
|  Zaten üye misiniz? Giriş yapın           |
|                                           |
+-------------------------------------------+
```

### 3. Ana Harita Ekranı (Dashboard)

```
+-------------------------------------------+
| NOVUSCAP      [Harita] [Liste]  [Giriş]  |
+-------------------------------------------+
|                                   |       |
|                                   |       |
|                                   |       |
|                                   |       |
|                                   | DETAY |
|                                   |       |
|            HARİTA GÖRÜNÜMÜ        | PANEL |
|                                   |       |
|                                   |       |
|                                   |       |
|                                   |       |
|                                   |       |
+-------------------+---------------+-------+
| FİLTRELER:  [Tür ▼] [Şehir ▼] [Ara...]   |
+-------------------------------------------+
```

### 4. Admin Panel Dashboard

```
+-------------------------------------------+
| NOVUSCAP       Admin Panel               |
+-------------------------------------------+
|                                           |
| +-----+ +---------+ +--------+ +-------+ |
| |     | |         | |        | |       | |
| | 125 | |   45    | |   8    | |  270  | |
| |     | |         | |        | |       | |
| +-----+ +---------+ +--------+ +-------+ |
| Startup  Yatırımcı  Teknopark   Toplam   |
+-------------------------------------------+
|                                           |
| SON EKLENENLER                 [Tümü >]  |
|                                           |
| +---------------------------------------+ |
| | Marka Adı | Tür     | Tarih   | İşlem | |
| |-----------|---------|---------|-------| |
| | ABC Ltd.  | Startup | 10/05   | [···] | |
| | XYZ Inc.  | Yatırım | 10/05   | [···] | |
| | Tech Park | Tekno.  | 09/05   | [···] | |
| +---------------------------------------+ |
|                                           |
| ŞEHİRLERE GÖRE DAĞILIM        [Grafik ↓] |
|                                           |
| +---------------------------------------+ |
| |                                       | |
| |                                       | |
| |              PIE CHART               | |
| |                                       | |
| |                                       | |
| +---------------------------------------+ |
|                                           |
+-------------------------------------------+
```

### 5. Marker (Organizasyon) Ekleme Ekranı

```
+-------------------------------------------+
| NOVUSCAP       Yeni Marker Ekle          |
+-------------------------------------------+
|                                           |
| TEMEL BİLGİLER                           |
|                                           |
| Adı*                                      |
| +-----------------------------------+     |
| |                                   |     |
| +-----------------------------------+     |
|                                           |
| Kategori*                                 |
| +-----------------------------------+     |
| | [Seçiniz ▼]                      |     |
| +-----------------------------------+     |
|                                           |
| Açıklama                                  |
| +-----------------------------------+     |
| |                                   |     |
| |                                   |     |
| +-----------------------------------+     |
|                                           |
| Website URL                               |
| +-----------------------------------+     |
| |                                   |     |
| +-----------------------------------+     |
|                                           |
| Logo                                      |
| [Dosya seç]  Hiçbir dosya seçilmedi      |
|                                           |
| İLETİŞİM BİLGİLERİ                       |
|                                           |
| E-mail                                    |
| +-----------------------------------+     |
| |                                   |     |
| +-----------------------------------+     |
|                                           |
| Telefon                                   |
| +-----------------------------------+     |
| |                                   |     |
| +-----------------------------------+     |
|                                           |
| KONUM BİLGİLERİ                          |
|                                           |
| Şehir*                                    |
| +-----------------------------------+     |
| | [Seçiniz ▼]                      |     |
| +-----------------------------------+     |
|                                           |
| İlçe*                                     |
| +-----------------------------------+     |
| | [Seçiniz ▼]                      |     |
| +-----------------------------------+     |
|                                           |
| Harita üzerinde konum seç:               |
| +-----------------------------------+     |
| |                                   |     |
| |                                   |     |
| |           HARİTA                  |     |
| |                                   |     |
| |                                   |     |
| +-----------------------------------+     |
|                                           |
| [ ] Yalnızca admin tarafından görülebilir |
|                                           |
| [İPTAL]               [✓ KAYDET]         |
+-------------------------------------------+
```

### 6. Marker Detay Sütunu (Sağ Panel)

```
+----------------------------+
|         LOGO               |
|                            |
| ABC STARTUP                |
+----------------------------+
| Kategori: Startup          |
| Şehir: İstanbul            |
+----------------------------+
| Lorem ipsum dolor sit amet |
| consectetur adipiscing... |
+----------------------------+
| Website: abc.com.tr        |
| E-mail: info@abc.com.tr    |
| Tel: +90 212 123 45 67     |
+----------------------------+
| [DETAY GÖRÜNTÜLE]          |
+----------------------------+
```

### 7. Mobil Görünüm - Ana Harita Ekranı

```
+----------------------+
| NOVUSCAP      [≡]   |
+----------------------+
|                      |
|                      |
|                      |
|                      |
|                      |
|     HARİTA          |
|                      |
|                      |
|                      |
|                      |
|                      |
+----------------------+
| [Filtreler ▼]        |
|                      |
| ◯ Startup            |
| ◯ Yatırımcı          |
| ◯ Teknopark          |
| ◯ Diğer              |
|                      |
| [Şehir ▼]            |
|                      |
| [     Uygula     ]   |
+----------------------+
```

### 8. Mobil Görünüm - Marker Detayı

```
+----------------------+
| NOVUSCAP     [←]    |
+----------------------+
|                      |
|         LOGO         |
|                      |
| ABC STARTUP          |
+----------------------+
| Kategori: Startup    |
| Şehir: İstanbul      |
+----------------------+
| Lorem ipsum dolor sit|
| amet consectetur     |
| adipiscing elit.     |
| Nullam auctor est... |
+----------------------+
| Website: abc.com.tr  |
| E-mail: info@abc.com |
| Tel: +90 212 1234567 |
+----------------------+
| [YOL TARİFİ]         |
+----------------------+
```

### 9. Liste Görünümü

```
+-------------------------------------------+
| NOVUSCAP      [Harita] [Liste]  [Giriş]  |
+-------------------------------------------+
| FİLTRELER:  [Tür ▼] [Şehir ▼] [Ara...]   |
+-------------------------------------------+
|                                           |
| +---------------------------------------+ |
| | LOGO | ABC STARTUP                     | |
| |      | Kategori: Startup               | |
| |      | Şehir: İstanbul                 | |
| |      | Lorem ipsum dolor sit amet...   | |
| +---------------------------------------+ |
|                                           |
| +---------------------------------------+ |
| | LOGO | XYZ YATIRIM                     | |
| |      | Kategori: Yatırımcı             | |
| |      | Şehir: Ankara                   | |
| |      | Lorem ipsum dolor sit amet...   | |
| +---------------------------------------+ |
|                                           |
| +---------------------------------------+ |
| | LOGO | DEF TEKNOPARK                   | |
| |      | Kategori: Teknopark             | |
| |      | Şehir: İzmir                    | |
| |      | Lorem ipsum dolor sit amet...   | |
| +---------------------------------------+ |
|                                           |
| < 1 2 3 ... 10 >                         |
+-------------------------------------------+
```

### 10. Admin Panel - Kullanıcı Yönetimi

```
+-------------------------------------------+
| NOVUSCAP       Kullanıcı Yönetimi        |
+-------------------------------------------+
| [+ YENİ KULLANICI]      [Ara...]         |
+-------------------------------------------+
|                                           |
| +---------------------------------------+ |
| | Ad Soyad | E-mail    | Rol    | İşlem | |
| |----------|-----------|--------|-------| |
| | Ahmet Y. | ahm@a.com | Admin  | [···] | |
| | Ayşe K.  | ays@a.com | Editör | [···] | |
| | Mehmet L.| meh@a.com | Startup| [···] | |
| | Zeynep T.| zey@a.com | Göz.   | [···] | |
| +---------------------------------------+ |
|                                           |
| < 1 2 3 ... 5 >                          |
+-------------------------------------------+
```

## Animasyonlar ve Etkileşimler

### Harita Etkileşimleri
- **Marker Hover**: Marker büyür ve hafif bir gölge efekti oluşur
- **Marker Tıklama**: Sağ panel açılır ve marker bilgileri gösterilir
- **Harita Yakınlaştırma**: Scroll ile zoom in/out
- **Marker Cluster**: Yakın markörler birleşir ve üzerinde sayı gösterilir

### Filtre Etkileşimleri
- **Filtre Açılır Menüleri**: Yumuşak slide-down animasyonu
- **Filtre Uygulama**: Harita markerleri yeniden yüklenirken loading spinner gösterilir
- **Arama**: Anında filtreleme ile sonuçlar daraltılır

### Sayfa Geçişleri
- **Sayfa Yüklenme**: Fade-in animasyonu
- **Panel Geçişleri**: Slide animasyonları
- **Form Gönderimi**: Yumuşak loading spinner

## Responsive Tasarım Prensipleri

### Masaüstü (1200px+)
- İki panel görünümü (Harita + Detay Paneli)
- Yatay filtreler
- Tam özellikli harita kontrolleri

### Tablet (768px - 1199px)
- İhtiyaca göre tek/çift panel görünümü
- Dikey veya yatay filtreler (ekran boyutuna göre)
- Sadeleştirilmiş harita kontrolleri

### Mobil (< 768px)
- Tek panel görünümü (harita veya detay)
- Dikey, accordion filtreler
- En sade harita kontrolleri
- Bottom sheet detay görünümü

## Kullanıcı Arabirimi Bileşenleri

### Butonlar
- **Birincil Buton**: Turuncu arka plan (#F57C00), beyaz metin, hafif gölge
- **İkincil Buton**: Beyaz arka plan, turuncu kenarlık ve metin
- **Tehlikeli Aksiyon**: Kırmızı arka plan, beyaz metin
- **Link Buton**: Metin altı çizgi ile

### Form Elemanları
- **Metin Kutuları**: Beyaz arka plan, gri kenarlık, fokusta mavi kenarlık
- **Seçim Kutuları**: Özel turuncu tick icon
- **Radio Butonlar**: Özel turuncu seçili durumu
- **Açılır Menüler**: Beyaz arka plan, gri kenarlık, ok icon

### Kartlar ve Paneller
- **Kart**: Beyaz arka plan, hafif gölge, 8px köşe yuvarlaklığı
- **Panel**: Açık gri arka plan, beyaz başlık çubuğu, 4px köşe yuvarlaklığı
- **Modal**: Beyaz arka plan, koyu gölge, 12px köşe yuvarlaklığı, outside click ile kapanma

## İkon ve Görsel Kullanımı

### Marker İkonları
- **Startup**: Mavi (raund nokta + bina ikonu)
- **Yatırımcı**: Turuncu (raund nokta + para ikonu)
- **Teknopark**: Yeşil (raund nokta + kampüs ikonu)
- **Co-working**: Mor (raund nokta + masa ikonu)
- **Topluluk**: Sarı (raund nokta + grup ikonu)

### UI İkonları
- **Menü**: Hamburger menü (≡)
- **Arama**: Büyüteç
- **Filtre**: Huni
- **İşlemler**: Üç nokta (...)
- **Yükle**: Yukarı ok + dosya
- **İndir**: Aşağı ok + dosya

## Erişilebilirlik

- Tüm interaktif elementler için yardımcı metin sağlanacak
- Uygun renk kontrastı (WCAG AA seviyesi)
- Klavye navigasyonu desteklenecek
- Ekran okuyucular için uygun HTML semantic yapısı
- Tüm formlar için hata geri bildirimleri

## Rehberlik Modu (Onboarding)

- **Adım 1**: Hoş geldiniz ekranı ve kısa açıklama
- **Adım 2**: Harita filtreleme özellikleri tanıtımı
- **Adım 3**: Marker etkileşimi nasıl çalışır
- **Adım 4**: Listeleme görünümünün tanıtımı
- **Adım 5**: Kullanıcı profilinin özelleştirilmesi

## Notlar

1. Tüm tasarımlarda NovusCap ana renkleri belirgin şekilde kullanılmalı
2. Mobil görünümde özellikle harita kullanıcı deneyimi optimize edilmeli
3. Admin panelinde tüm CRUD operasyonları için uygun UI tasarlanmalı
4. Uyarı ve hata mesajları kullanıcı dostu olmalı
