# Marka Rehberi — sehirsantiyeciligi.com

> Bu rehber **yön çizicidir**. Kesin renk kodları, fontlar ve final tercihler Yasin Bey onayından sonra netleşir. Frontend-design skill bu sınırlar içinde karar verir.

## Marka & Ton

- **Marka kimliği:** Dada İstanbul — kamu yararı + teknik bilgi bankası
- **Ton:** "Kurumsala yakın yenilikçi"
  - Devlet dairesi DEĞİL — modern, çağdaş
  - Trendy DEĞİL — ciddi, güven veren
  - Soğuk DEĞİL — vatandaşa yakın, anlaşılır
- **Kelime havuzu:** güvenli, düzenli, estetik, standart, denetlenebilir, planlı, öngörülebilir, çevreyle uyumlu
- **Anlatım:** kısa, net, didaktik. Akademik blok metin yığını YASAK; whitespace ve hiyerarşi anlatımı taşır

## Renk Paleti (yön çizici)

| Rol | Renk | Aday Kod | Notu |
|---|---|---|---|
| Ana koyu | Lacivert / antrasit | `#0F1A2E` veya `#1B2838` | Başlık, header, footer, koyu zeminler |
| Accent uyarı | Şantiye-turuncusu / kehribar | `#E76F2C` veya `#F59E0B` | Bariyer çağrışımı; CTA, vurgu |
| Nötr açık | Beyaz | `#FFFFFF` | Ana zemin |
| Nötr gri açık | Açık gri | `#F4F5F7` | Section ayırıcı, kart zemini |
| Nötr metin | Koyu gri | `#1F2937` | Gövde metni |
| Nötr metin (soft) | Orta gri | `#6B7280` | Açıklama, alt başlık |

**YASAK paletler:** neon, fluo, çoklu renkli gradient (pembe-mor-mavi), pastel cıvıl, mor/pembe ana renk, çocukça renkler.

**İzin verilen gradient:** sadece koyu ana renk içinde tonal geçiş (örn. `#0F1A2E → #1B2838`). Renkler arası gradient yok.

## Tipografi

- **Aile:** Modern geometric sans-serif
- **Aday fontlar (öncelik sırası):**
  1. **Inter** (default tercih, Türkçe tam destek)
  2. Manrope
  3. Space Grotesk
- **Ağırlıklar:**
  - Heading (h1–h3): 700–800
  - Subheading (h4–h6): 600
  - Body: 400–500
  - Caption / overline: 500
- **Sistem fontu fallback:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Türkçe karakter desteği şart** (ş, ı, ğ, ü, ö, ç)
- **Boyut skalası (öneri):** h1 48–64, h2 32–40, h3 24–28, body 16–18, caption 13–14 (desktop)

## Görsel Stratejisi

- **Stock fotoğraf YOK** (Pexels, Unsplash, Adobe Stock — hiçbiri)
- **Placeholder:** `div + bg-color (accent-soft veya nötr gri) + aspect-ratio + inline SVG ikon`
- **İkon set:** Lucide veya Heroicons SVG inline. Emoji ikon yok
- **Proje görselleri:** Yasin Bey'den gelecek. Geldiğinde `div + background-image + background-size: cover + aspect-ratio` ile yerleştirilir; `<img>` ile çerçeveleme YASAK
- **Şantiye çağrışım pattern'ı:** ince diagonal stripe, çubuk pattern, blueprint grid — sadece accent olarak, dominant değil

## Layout & Spacing

- **Mobile-first:** 320 → 768 → 1280 → 1920 → 4K
- **Container max:** ~1200px (1280 padded da olur)
- **Section dikey padding:** mobile 48–64px, desktop 80–120px
- **Whitespace bol** — sıkışık layout YASAK
- **Sticky header** smooth scroll ile
- **One page anchor'lar:** `#nedir`, `#standartlar`, `#surec`, `#dokumanlar`, `#sss`, `#iletisim` (header nav ile eşleşir)
- **Grid sistemi:** CSS Grid + Flexbox; floats yok

## Etkileşim & Animasyon

- **Subtle hover:** renk shift + 1–2px translateY veya scale(1.01)
- **Transition:** 150–250ms ease-out
- **`prefers-reduced-motion` saygısı zorunlu** — bu media query'de tüm animasyonlar disable
- **FAQ accordion:** vanilla JS, ARIA expanded, klavye erişimi
- **Smooth scroll:** vanilla JS (`behavior: 'smooth'`) veya CSS `scroll-behavior: smooth`
- **Form validation:** client-side, KVKK checkbox zorunlu
- **Parallax / lottie / scroll-jacking YASAK** (performans + erişilebilirlik)

## Bileşen Tonu

- **Buton:**
  - Primary: solid accent (turuncu/kehribar), beyaz metin, radius 8–10px
  - Secondary: outline (koyu border, koyu metin)
  - Tertiary: ghost / text link with underline-on-hover
- **Kart:** hafif border (`1px solid #E5E7EB`) veya soft shadow (`0 1px 3px rgba(0,0,0,0.06)`), radius 10–12px, padding 24–32px
- **Badge:** "Yakında" için outline soft accent (örn. accent border + accent-light fill)
- **Form input:** border 1px, radius 8px, focus accent ring, error state accent-red değil koyu uyarı tonu
- **Accordion:** sınır çizgisi alt, açıkken accent vurgu

## Stack & Kod Standartları

- **CSS framework seçimi:** Vanilla CSS (custom properties) **veya** Tailwind CDN — final tercih frontend-design skill turunda
- **CSS değişkenleri** zorunlu (`--color-primary`, `--space-md`, vb.) — kolay revize için
- **JavaScript:** Vanilla. jQuery YASAK. Module pattern veya IIFE
- **HTML semantic:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- **Schema.org markup:** FAQ bölümü için `FAQPage` zorunlu; Organization markup footer'da
- **Erişilebilirlik:** WCAG AA hedef; kontrast oranı kontrol edilir, ARIA label nerede gerekirse, klavye nav
- **Performans:** font-display swap, kritik CSS inline değerlendir, görsel lazy load

## SEO & Meta

- **Title / description:** `source-materials/content.md` META bölümünden birebir alınır
- **OG image:** Faz 1'de placeholder, Faz 2'de gerçek tasarım
- **Canonical URL** her sayfada
- **robots.txt + sitemap.xml** Faz 2'de
- **Anahtar kelimeler** content.md sonundaki listeden organik dağılır; keyword stuffing YASAK

## Yasak Listesi (özet)

- Generic AI aesthetic: çoklu renk gradient hero + glassmorphism + emoji başlık + "✨ AI-powered" tonu
- Neon, fluo, pastel cıvıl renkler
- jQuery, Bootstrap (default — özellikle istenirse hariç)
- Stock fotoğraf
- `<img>` ile çerçeveleme bozan boyutlandırma
- Akademik blok metin yığını (paragraflar 4 satırı geçmeyecek şekilde kırılır)
- Parallax, scroll-jacking, otomatik oynayan video
- Çocukça illustration (Storyset, unDraw, vb.)
- Emoji ikon (📌 🚧 vb. — gerçek SVG ikon kullanılır)
