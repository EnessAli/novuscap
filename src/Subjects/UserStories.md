# NovusCap - Kullanıcı Hikayeleri (User Stories)

## Giriş

Bu belge, NovusCap platformunun farklı kullanıcı tipleri tarafından nasıl kullanılacağını tanımlamak ve geliştirme sürecini yönlendirmek için hazırlanmış kullanıcı hikayelerini içermektedir. Her bir hikaye, bir kullanıcının belirli bir rolde sistemle etkileşimini ve bu etkileşimden beklediği sonuçları tanımlar.

## Rol Tanımları

1. **Ziyaretçi**: Platforma henüz kayıt olmamış ya da giriş yapmamış kullanıcı
2. **Gözlemci**: Sisteme kayıt olmuş, yalnızca görüntüleme yetkisi olan kullanıcı
3. **Girişim Temsilcisi**: Bir organizasyonu temsil eden ve sadece kendi girişimini yönetebilen kullanıcı
4. **Editör**: İçerik ve marker yönetimi yapabilen kullanıcı
5. **Super Admin**: Tüm sistem erişimine sahip, kullanıcı ve rol yönetimi yapabilen kullanıcı

## Kullanıcı Hikayeleri

### 1. Ziyaretçi Hikayeleri

#### 1.1 Harita Görüntüleme
> **Bir ziyaretçi olarak**, Türkiye'deki girişimcilik ekosisteminin harita üzerinde dağılımını görebilmek istiyorum ki, hangi bölgelerde ne tür girişimcilik faaliyetlerinin yoğunlaştığını anlayabileyim.

#### 1.2 Filtre Kullanımı
> **Bir ziyaretçi olarak**, haritada görüntülenen girişimleri türüne, şehrine ve diğer kriterlere göre filtreleyebilmek istiyorum ki, sadece ilgilendiğim türdeki girişimleri görebileyim.

#### 1.3 Girişim Detayı Görüntüleme
> **Bir ziyaretçi olarak**, haritada işaretlenen bir girişime tıklayarak detaylı bilgilerini görüntüleyebilmek istiyorum ki, girişim hakkında daha fazla bilgi edinebilim.

#### 1.4 Kayıt Olma
> **Bir ziyaretçi olarak**, platforma kayıt olabilmek istiyorum ki, daha fazla özelliğe erişebilim ve kendi girişimimi ekleyebilim.

#### 1.5 Öneri Gönderme
> **Bir ziyaretçi olarak**, platforma öneri ve geri bildirim gönderebilmek istiyorum ki, platformun gelişimine katkı sağlayabileyim ve eksik gördüğüm yerleri bildirebilim.

### 2. Gözlemci Hikayeleri

#### 2.1 Liste Görünümü
> **Bir gözlemci olarak**, girişimleri harita yerine liste formatında görebilmek istiyorum ki, bilgileri daha kolay karşılaştırabileyim ve aradığım girişimleri daha hızlı bulabileyim.

#### 2.2 Favori İşaretleme
> **Bir gözlemci olarak**, beğendiğim girişimleri favorilerime ekleyebilmek istiyorum ki, daha sonra kolayca geri dönebilim ve takip edebilim.

#### 2.3 Profil Düzenleme
> **Bir gözlemci olarak**, kendi profilimi düzenleyebilmek istiyorum ki, bilgilerimi güncel tutabileyim ve iletişim tercihlerimi belirleyebilim.

#### 2.4 Girişim Önerme
> **Bir gözlemci olarak**, eksik gördüğüm bir girişimi sisteme eklenebilmesi için önerebilmek istiyorum ki, platform daha kapsamlı hale gelebilsin.

#### 2.5 Filtreleri Kaydetme
> **Bir gözlemci olarak**, sık kullandığım filtreleri kaydedebilmek istiyorum ki, her ziyaretimde aynı filtreleri tekrar tekrar ayarlamak zorunda kalmayayım.

### 3. Girişim Temsilcisi Hikayeleri

#### 3.1 Girişim Ekleme
> **Bir girişim temsilcisi olarak**, temsil ettiğim girişimi sisteme ekleyebilmek istiyorum ki, girişimimiz ekosistemde yer alabilsin ve görünürlük kazanabilsin.

#### 3.2 Girişim Düzenleme
> **Bir girişim temsilcisi olarak**, girişimimin bilgilerini güncelleyebilmek istiyorum ki, en güncel ve doğru bilgiler sistemde yer alsın.

#### 3.3 Girişim İstatistiklerini Görüntüleme
> **Bir girişim temsilcisi olarak**, girişimimin görüntülenme ve etkileşim istatistiklerini görebilmek istiyorum ki, platformdaki performansımızı değerlendirebilim.

#### 3.4 Logo Yükleme
> **Bir girişim temsilcisi olarak**, girişimimin logosunu yükleyebilmek istiyorum ki, markamız doğru şekilde temsil edilebilsin.

#### 3.5 İletişim Bilgilerini Yönetme
> **Bir girişim temsilcisi olarak**, girişimimin hangi iletişim bilgilerinin herkese açık olacağını belirleyebilmek istiyorum ki, gizliliğimizi ve iletişim tercihlerimizi yönetebilim.

### 4. Editör Hikayeleri

#### 4.1 Onay Bekleyen Girişimleri Yönetme
> **Bir editör olarak**, sisteme eklenmek üzere önerilen girişimleri inceleyip onaylayabilmek istiyorum ki, platformdaki bilgilerin doğruluğunu ve kalitesini sağlayabileyim.

#### 4.2 Toplu Veri Yükleme
> **Bir editör olarak**, çok sayıda girişimi CSV/Excel dosyası ile toplu olarak yükleyebilmek istiyorum ki, veri girişini hızlandırabileyim ve zaman kazanabileyim.

#### 4.3 Kategori Yönetimi
> **Bir editör olarak**, girişim kategorilerini düzenleyebilmek istiyorum ki, yeni ortaya çıkan girişim türlerini sisteme ekleyebilim ve mevcut kategorileri güncelleyebilim.

#### 4.4 İçerik Düzenleme
> **Bir editör olarak**, tüm girişimlerin içeriklerini düzenleyebilmek istiyorum ki, bilgi kalitesini artırabileyim ve tutarlı bir görünüm sağlayabileyim.

#### 4.5 Raporlar Oluşturma
> **Bir editör olarak**, platform verilerinden raporlar oluşturabilmek istiyorum ki, ekosistem hakkında anlamlı içgörüler üretebilim ve gelişim trendlerini takip edebilim.

### 5. Super Admin Hikayeleri

#### 5.1 Kullanıcı Yönetimi
> **Bir super admin olarak**, tüm kullanıcıları görüntüleyebilmek, düzenleyebilmek ve silebilmek istiyorum ki, platform kullanıcılarını etkin şekilde yönetebilim.

#### 5.2 Rol Atama
> **Bir super admin olarak**, kullanıcılara rol atayabilmek istiyorum ki, her kullanıcının uygun yetkilere sahip olmasını sağlayabileyim.

#### 5.3 Sistem Ayarları
> **Bir super admin olarak**, platform genelinde geçerli olan ayarları değiştirebilmek istiyorum ki, sistemin davranışını ihtiyaçlara göre özelleştirebilim.

#### 5.4 Aktivite Loglarını İnceleme
> **Bir super admin olarak**, sistemdeki tüm kullanıcı aktivitelerini ve değişiklik kayıtlarını görüntüleyebilmek istiyorum ki, güvenlik ve denetim amaçlı izleme yapabileyim.

#### 5.5 Veri Yedekleme ve Geri Yükleme
> **Bir super admin olarak**, platform verilerinin yedeğini alabilmek ve gerektiğinde geri yükleyebilmek istiyorum ki, veri güvenliğini sağlayabilim ve olası veri kayıplarına karşı önlem alabileyim.

## Detaylı Kullanım Senaryoları

### Senaryo 1: Girişim Temsilcisinin Kayıt ve Girişim Ekleme Süreci

1. Kullanıcı ziyaretçi olarak platforma gelir
2. "Kayıt Ol" butonuna tıklar
3. Kayıt formunu ad, soyad, e-posta, şifre bilgileriyle doldurur
4. Kaydı tamamlar ve e-posta doğrulama sürecinden geçer
5. Sisteme "Gözlemci" rolüyle giriş yapar
6. "Girişim Ekle" butonuna tıklar
7. Girişim bilgilerini doldurur (ad, tür, açıklama, iletişim bilgileri, vb.)
8. Harita üzerinde girişimin konumunu işaretler
9. Girişiminin logosunu yükler
10. Formu gönderir ve sistem otomatik olarak "onay bekliyor" statüsüne alır
11. Editör veya admin onayından sonra kullanıcıya "Girişim Temsilcisi" rolü atanır
12. Kullanıcı artık kendi girişimini yönetebilir

### Senaryo 2: Editörün Toplu Veri İçe Aktarma Süreci

1. Editör rolündeki kullanıcı sisteme giriş yapar
2. Admin paneline gider
3. "Toplu İçe Aktarma" bölümünü seçer
4. İçe aktarma şablonunu indirir
5. Şablonu belirtilen formatta doldurur (ad, tür, konum, açıklama, iletişim bilgileri)
6. Doldurulmuş dosyayı sisteme yükler
7. Sistem veri doğrulama sürecini çalıştırır
8. Sorunlu kayıtlar varsa hata raporunu görüntüler
9. Hataları düzeltir ve yeniden yükler veya hatalar olmadan devam eder
10. İçe aktarılan girişimlerin haritada görünüp görünmediğini kontrol eder
11. Gerekirse eklenen girişimlerin detaylarını manuel olarak düzenler

### Senaryo 3: Super Admin'in Kullanıcı Rol Yönetimi

1. Super Admin sisteme giriş yapar
2. Admin paneline gider
3. "Kullanıcı Yönetimi" bölümünü seçer
4. Kullanıcı listesini görüntüler
5. Rol değiştirmek istediği kullanıcıyı bulur
6. Kullanıcı detay sayfasına gider
7. "Roller" bölümünde kullanıcıya atanacak rolleri seçer
8. Değişiklikleri kaydeder
9. Sistem, kullanıcıya rol değişikliğiyle ilgili e-posta gönderir
10. Kullanıcının doğru yetkilere sahip olup olmadığını kontrol eder

## Kullanıcı Kabul Kriterleri

Her kullanıcı hikayesi için kabul kriterleri, hikayenin başarılı bir şekilde tamamlandığını doğrulamak için kullanılacaktır.

### Örnek: "Girişim Ekleme" Hikayesi Kabul Kriterleri

1. Kullanıcı, "Girişim Ekle" formuna erişebilmelidir
2. Form, tüm zorunlu alanları içermelidir (ad, tür, konum vb.)
3. Harita üzerinde konum seçilebilmelidir
4. Logo yükleme işlevi çalışmalıdır (en az 100x100, en fazla 1000x1000 piksel)
5. Form gönderildiğinde doğrulama kontrolleri yapılmalıdır
6. Başarılı gönderim sonrası kullanıcıya onay beklendiğine dair bilgi verilmelidir
7. Editör/admin onayından sonra girişim haritada görünür olmalıdır
8. Kullanıcı kendi eklediği girişimi "Girişimlerim" sayfasında görebilmelidir

## Önceliklendirilmiş Kullanıcı Hikayeleri

Projenin ilk aşamasında öncelikli olarak geliştirilmesi gereken hikayeler:

### Minimum Uygulanabilir Ürün (MVP) Hikayeleri

1. **Ziyaretçi olarak harita görüntüleme**
2. **Ziyaretçi olarak filtre kullanımı**
3. **Ziyaretçi olarak girişim detayı görüntüleme**
4. **Ziyaretçi olarak kayıt olma**
5. **Super Admin olarak kullanıcı yönetimi**
6. **Super Admin olarak rol atama**
7. **Editör olarak içerik düzenleme**
8. **Girişim Temsilcisi olarak girişim ekleme**
9. **Girişim Temsilcisi olarak girişim düzenleme**

### İkinci Sprint Hikayeleri

10. **Gözlemci olarak liste görünümü**
11. **Editör olarak toplu veri yükleme**
12. **Editör olarak kategori yönetimi**
13. **Ziyaretçi olarak öneri gönderme**
14. **Girişim Temsilcisi olarak logo yükleme**

### Sonraki Sprint Hikayeleri

15. **Gözlemci olarak favori işaretleme**
16. **Gözlemci olarak filtreleri kaydetme**
17. **Girişim Temsilcisi olarak istatistikleri görüntüleme**
18. **Super Admin olarak aktivite loglarını inceleme**
19. **Editör olarak raporlar oluşturma**
20. **Super Admin olarak veri yedekleme ve geri yükleme**

## Epikler

Birbiriyle ilişkili ve daha büyük değer ifade eden kullanıcı hikayeleri grupları:

### Epik 1: Harita Görünürlüğü ve Etkileşim
- Harita görüntüleme
- Filtre kullanımı
- Girişim detayı görüntüleme
- Liste görünümü
- Marker clustering

### Epik 2: Kullanıcı Yönetimi ve Yetkilendirme
- Kayıt olma
- Kullanıcı yönetimi
- Rol atama
- Profil düzenleme

### Epik 3: Girişim Yönetimi
- Girişim ekleme
- Girişim düzenleme
- Logo yükleme
- İçerik düzenleme
- Toplu veri yükleme

### Epik 4: Veri Analizi ve Raporlama
- Raporlar oluşturma
- Girişim istatistikleri
- Aktivite logları
- Dashboard metrikleri
