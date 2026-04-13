# Validebağ Tarih Çalıştayı Website

## Proje Özeti
Editorial/Magazine tarzında, responsive ve tamamen işlevsel bir website. Ana sayfada merkeze yerleştirilmiş 9 Mayıs 2026'ya kadar sayıcı, mekan bilgisi ve sponsorlar. 6 tarihsel komite her biri moderatör ve yardımcı moderatörle tanıtılıyor.

---

## 📁 Dosya Yapısı

```
tarih çalıştay site/
├── index.html              # Ana sayfa (hero + countdown + mekan + sponsorlar)
├── team.html               # Ekip/Etkinlik tanımı
├── venue.html              # Mekan bilgileri + Google Maps
├── committees.html         # 6 komiteyi gösteren sayfa
├── site.css                # Design system + styling (CSS Variables)
├── app.js                  # Countdown, navigation, komite modal
├── data/
│   └── committees.json     # Komite verileri (6 komite × 2 moderatör)
├── images/
│   └── logo.png            # SVG logo (1974 VFL TARİH)
└── web-design-rules.md     # Design guidelines (referans)
```

---

## 🎨 Design System

### Renkler (Editorial/Warm)
- **Primary Brown**: #6B4423 (başlıklar, metinler)
- **Primary Light**: #8B7355 (vurgu)
- **Accent Terracotta**: #C45D3E (hover, vurgular)
- **Background**: #faf7f2 (krem sahası)
- **Surface**: #ffffff (kartlar)
- **Text Primary**: #2d2d2d
- **Text Secondary**: #6d6d6d

### Typography
- **Display Font**: Fraunces (Google Fonts) - başlıklar, nav, butonlar
- **Body Font**: Crimson Pro (Google Fonts) - gövde metni, paragraflar
- **Mono**: Monaco - kodlar (gerekirse)

### Spacing (8px Grid)
- xs: 4px, sm: 8px, md: 16px, lg: 24px
- xl: 32px, 2xl: 48px, 3xl: 64px, 4xl: 96px, 5xl: 128px

### Responsive Breakpoints
- Mobil: < 640px
- Tablet: 768px
- Laptop: 1024px
- Desktop: 1280px
- Large Desktop: 1536px

---

## 📱 Sayfalar & Bölümler

### 1. **index.html** (Anasayfa)
- **Hero Section**: Logo + başlık
- **Countdown**: 9 Mayıs 2026'ya geri sayıcı (gün/saat/dakika/saniye)
- **Venue Section**: Mekan bilgisi + detay linki
- **Sponsors**: 4 placeholder sponsor SVG  + grid layout

### 2. **team.html** (Ekip)
- Etkinlik tanımı
- Amaçlar (5 madde)
- 6 komite özet kartları

### 3. **venue.html** (Mekan)
- Validebağ Fen Lisesi adresi + harita
- Google Maps embed iframe
- Mekan görseli
- 6 imkân kartı (konferans salonu, çalışma odaları, vb.)

### 4. **committees.html** (Komiteler)
- 6 komite kartı grid (3 sütun responsive)
- Tıklanınca **MODAL** açılır:
  - Komite adı + full açıklama
  - Moderatör adı + unvan
  - Yardımcı moderatör adı + unvan
  - ESC tuşu veya backdrop'e tıkla = modal kapat

### 5. **Başvuru (Navbar'da)**
- Google Form linki: https://docs.google.com/forms/d/e/1FAIpQLSepZLl8uXbgT4K2OB60KtO8QF2mVtDlX2-Ci7YyKdT0IY5fSQ/viewform?usp=header
- Yeni tab'de açılır (target="_blank")

---

## ⚙️ Teknik Detaylar

### HTML5 Semantikler
- `<nav>` - Navigation bar (sticky, 100% genişlik)
- `<main>` - Ana content
- `<section>` - Bölümler (hero, dark, light, vb.)
- `<footer>` - Alt bilgiler

### CSS Özellikleri
- **CSS Variables**: Tüm renkler, spacing, shadows değişkenler
- **Flexbox & Grid**: Layout sistemi
- **Responsive**: Mobile-first approach
- **Animations**: 
  - `@keyframes fadeInUp` - scroll animasyonu
  - `@keyframes scaleIn`, `slideInLeft`, `slideInRight`
  - Stagger delays: 0.1s - 0.5s

### JavaScript Fonksiyonları
1. **initCountdown()** - 9 Mayıs 2026'ya sayıcı (her 1s güncelle)
2. **initNavigation()** - Sticky nav, hamburger menü toggle, active link
3. **initScrollAnimations()** - IntersectionObserver ile fade-in-up
4. **loadCommittees()** - committees.json'dan 6 komiteyi yükle
5. **showCommitteeModal()** - Komite detayını modal'da göster
6. **closeModal()** - Modal'ı kapat (ESC veya backdrop tıkla)

### Responsive Features
- **Hamburger Menü**: < 768px'de görünür
- **Grid Collapse**: 
  - Desktop: 3-4 sütun
  - Tablet: 2 sütun
  - Mobile: 1 sütun
- **Font Scaling**: clamp() ile fluid typography
- **Touch Targets**: Min 44px × 44px

---

## 🚀 Başlatma

### Lokal Sunucu
```bash
cd "c:\Users\user\Desktop\tarih çalıştay site"
python -m http.server 8000
```
Tarayıcıda: **http://localhost:8000**

### Dosyaları Düzenleme
- **Komiteler**: `data/committees.json` değiştir (name, description, moderator, assistant_moderator)
- **Sponsorlar**: `index.html`'deki SVG cardları düzenle
- **Mekan Fotoğrafı**: `venue.html`'deki placeholder linki replace et
- **Logo**: `images/logo.png`'yi değiştir (SVG veya PNG)

---

## ✅ Doğrulama Listesi

- [x] **Tasarım**: Editorial Magazine tarzı tutarlı (font pairing, renk paleti, spacing)
- [x] **Countdown**: 9 Mayıs 2026'ya kadar sağlıklı çalışıyor
- [x] **Navigation**: 5 link çalışıyor + hamburger mobile'de
- [x] **Komiteler**: Grid gösteriliyor, tıklama modal açıyor
- [x] **Modal**: ESC/backdrop kapatma çalışıyor
- [x] **Responsive**: 640px, 768px, 1024px, 1280px'de test
- [x] **Performance**: 
  - Lazy loading images
  - Font-display: swap
  - Inline SVG (glyph format)
  - CSS Variables minimal
- [x] **Accessibility**: 
  - Semantic HTML
  - Alt text (images)
  - Heading hierarchy (h1 > h2 > h3)
  - Hamburger aria-label

---

## 🔄 Güncellemeler & Bakım

### Komite Eklemek
1. `data/committees.json` açınıde komite nesnesini ekle:
```json
{
  "id": 7,
  "name": "Yeni Komite",
  "description": "Açıklama metni",
  "moderator": {"name": "Ad Soyad", "title": "Unvan"},
  "assistant_moderator": {"name": "Ad Soyad", "title": "Unvan"}
}
```

### Sponsorları Güncelle
`index.html`'de sponsor grid'ini edit et (SVG veya img tag)

### Mekan/Tarih Değiştir
- `index.html` countdown target date: `const targetDate = new Date('YYYY-MM-DDTHH:MM:SS+03:00')`
- Alt sayfalar, hedef tarihleri güncelle

---

## 📞 İletişim & Destek

- **Email**: info@validebagcalisay.org
- **Website**: validebagcalisay.org (kurulacak)

---

## 📋 Versiyon Bilgisi

- **Version**: 1.0
- **Date**: April 2026
- **Theme**: Editorial / Magazine
- **Responsive**: Mobile-first
- **Accessibility**: WCAG 2.1 Level A

---

**Created with ❤️ for Validebağ Historical Workshop 2026**
