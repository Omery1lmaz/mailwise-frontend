# Mailwise Geliştirme Önerileri ve UX/UI Tavsiyeleri

## 🧭 1. Dashboard Sayfası – Geliştirme Önerileri

### ➕ Eklenebilecek Özellikler
- **Success Rate Göstergesi:**
  - Sent / Total oranını yüzde olarak gösteren bir gösterge (örneğin: %85 başarı oranı).
- **Recent Activity Listesi:**
  - Son gönderilen veya gönderilemeyen 5 e-posta kısa bilgisi.
- **Top Companies Chart:**
  - En çok mail gönderilen şirketleri sıralayan küçük bir çubuk grafik.
- **KPI Kartlarına İkon + Tooltip:**
  - Örneğin: Processing (Batch running) yanına bir i ikonu eklenip, tooltip ile batch'in ne olduğu açıklanabilir.
- **Verimlilik Zaman Grafiği:**
  - Saatlik / günlük gönderim sayısı — kullanıcı kendi eforunu analiz edebilir.

---

## 📬 2. Queue Sayfası – Geliştirme Önerileri

### ➕ Eklenebilecek Özellikler
- **"Send Now" Butonu (Tekil):**
  - Bir satırın yanında "Gönder" butonu — toplu işleme girmeden manuel gönderim.
- **"Remove from Queue" Seçeneği:**
  - Listeye alınmış ama iptal edilmek istenen kişileri silme imkânı.
- **Filtreler & Sıralama:**
  - Şirkete göre
  - Gönderim durumuna göre
  - Tarihe göre azalan/artan
- **Excel / CSV Dışa Aktar:**
  - Queue listesini dışarıya almak isteyen kullanıcılar için.

---

## 🔄 3. Processing Sayfası – Geliştirme Önerileri

### ➕ Eklenebilecek Özellikler
- **İşlem Süresi Tahmini:**
  - "Ortalama gönderim süresi: 3.2 saniye" gibi bilgiler.
- **Kuyruktaki Kalan Süre:**
  - Toplam kaç kişi kaldı, tahmini bitiş süresi ne zaman?
- **Hata Yönetimi:**
  - Gönderim sırasında hata olursa, burada gösterilsin (örn. SMTP hatası, bağlantı hatası vs.)

---

## ❌ 4. Not Sent Sayfası – Geliştirme Önerileri

### ➕ Eklenebilecek Özellikler
- **Hata Nedeni Göstergesi:**
  - Her satırda neden gönderilemedi (örneğin "SMTP hatası", "Mail geçersiz" vb.)
- **"Tekrar Dene" Butonu:**
  - Fail olan mailleri tek tek veya topluca yeniden kuyruğa alma.
- **Export/Log Butonu:**
  - Başarısız gönderimleri dışa aktarma veya hata loglarını görme.

---

## 📚 5. Documentation Sayfası – Önerilen Yapı

### 📌 Bölüm Önerileri
- **Giriş – Bu sistem nedir?**
- **Veriler nereden geliyor?**
- **Teknolojiler (Tech Stack)**
- **E-posta şablonunun nasıl oluşturulduğu**
- **Gizlilik politikası**
- **Gelecek planları**
- **İletişim bilgileri**

> Not: Yukarıdaki mesajda bu sayfa için içerik örneği verilmiştir. Genişletmek isterseniz detaylandırılabilir.

---

## 💡 Genel UX/UI Tavsiyeleri

- **Temalar:** Karanlık & aydınlık mod.
- **Toastr bildirimleri:** "Mail başarıyla gönderildi" gibi canlı feedback'ler.
- **Admin Ayar Paneli:** SMTP, imza, mail başlığı gibi alanları düzenlemek için settings sayfası.
- **CSV Yükleme:** Apollo.io'dan CSV olarak kişi çekip içeriye yükleme seçeneği (bulk import).
- **Mail preview modal:** Gönderilecek mailin içeriğini önceden gösteren popup.

---

## Ekstra
- İsterseniz bu bölümleri doğrudan React/HTML olarak hazır komponentler halinde sunabilirim.
- Sisteme login/signup gibi kullanıcı çokluluğu da eklemek isterseniz, altyapı önerileri de sunabilirim.
- Devam etmek veya detaylandırmak için belirtmeniz yeterli! 