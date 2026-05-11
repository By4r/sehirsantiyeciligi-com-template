# Aktif Round Planı — Faz 1 Template Üretimi

> Bu plan, `frontend-design` skill'i ile Faz 1 static mockup için aesthetic direction ve üretim sırasını sabitler. Beyar onayı + Yasin Bey onayı sonrası implement edilir.

---

## 1. Aesthetic Direction (committed)

**"Civic Editorial Modern" — Şehir Bülteni Tonu**

Hedef his: bir belediye planlama belgesi ile New York Times city desk arasında bir nokta. Mühendislik manueli ciddiyetinde ama 2026 editorial diliyle. Şantiye bariyerinden alınan accent rengi, kurumsal ağırlığı kırıp dikkat çeker.

**Referans hisleri (kopyalanmayacak, his alınacak):**
- TfL (Transport for London) bilgilendirme tonu — net, sakin, otoriter
- Editorial dergi grid'i — büyük başlık, generous whitespace, numaralandırılmış bölümler
- DIN / endüstri manuel'i — monospace micro-label'lar, ince yatay çizgiler
- Bauhaus mühendislik — geometrik netlik, dürüst form

**Bir şey hatırlanacaksa:** Her bölümün "**01 — BÖLÜM ADI**" formatında numaralı editorial başlık ile açılması, hero'daki custom SVG "şehir blueprint" wireframe ve bariyer-stripe accent çubuğunun anlatımı taşıması.

**Yasak (skill + brand kuralları):**
- Inter / Roboto / Space Grotesk (generic), Arial
- Çoklu renk gradient, glassmorphism, purple-blue mesh
- Stock fotoğraf, emoji ikon, çocukça illustration (Storyset/unDraw)
- Parallax scroll-jacking
- "✨ AI-powered" tonu

---

## 2. Typography Stack

> **REVİZE 2026-05-11:** Yasin Bey "inşaat ile alakalı renk" onayı verdi → sektörel tema meşru → Tragrup (Dada İstanbul inşaat grup) hattıyla uyum için font değişti. Önceki Fraunces + Instrument Sans atıldı; editorial/dergi hissi Yasin Bey'in "kurumsal bilgilendirme" beklentisine uymadı.

| Rol | Font | Kaynak | Türkçe Desteği | Neden |
|---|---|---|---|---|
| Display (h1, h2, büyük başlık) | **Saira Semi Condensed** (600/700/800) | Google Fonts | ✓ tam (latin-ext) | Condensed grotesque; inşaat/yapı sektörü görsel dili. Tragrup'taki `--thm-font` ile birebir → "Dada inşaat ailesi" tutarlılığı. Daraltılmış yapı civic-engineering hissi verir. |
| Body (paragraf, kart metni) | **Inter** (400/500/600/700) | Google Fonts | ✓ tam (latin-ext) | Dada admin/business pattern'ı (Çaykaraspor business-panel, backend-lab admin). Faz 2 admin geldiğinde tutarlı kalır. Türkçe karakter destek standardı. |
| Micro / Overline / Kod-his | **JetBrains Mono** (500) | Google Fonts | ✓ tam (latin-ext) | Editorial overline + mühendislik dokunuşu. Tragrup'ta yok → fark yaratır. |

**Türkçe karakter test seti:** "Şehir Şantiyeciliği — Yaya güvenliği, çevre düzeni, üst yapı çalışmaları, ığ-ş-ç-ü-ö testi." (`test.html`'de manuel kontrol)

**Ağırlık skalası:**
- Saira Semi Condensed: 700 (display H1/H2), 800 (hero accent / uppercase vurgu), 600 (H3/H4)
- Inter: 400 (body), 500 (emphasis), 600 (button/badge), 700 (form label)
- JetBrains Mono: 500 (overline), tek ağırlık

**Boyut skalası (desktop / mobile):**
- Hero H1: 80 / 44 px, Saira 700, letter-spacing -0.01em
- Section H2 (numaralı): 56 / 32 px, Saira 700
- Hero accent / uppercase vurgu: 64 px, Saira 800, letter-spacing 0.01em, uppercase
- Card H3: 22 / 20 px, Saira 600
- Body: 17 / 16 px, Inter 400, line-height 1.6
- Overline: 12 / 11 px, JetBrains Mono 500, letter-spacing 0.12em, uppercase

---

## 3. Color Tokens (CSS custom properties)

```css
:root {
  /* Ana */
  --c-ink:        #0E1A2B;   /* deep navy, başlık + footer */
  --c-ink-soft:   #1B2838;   /* tonal koyu */
  --c-paper:      #FAF7F2;   /* bone white, ana zemin */
  --c-paper-2:    #F1ECE3;   /* warm gray, section ayırıcı */

  /* Accent — şantiye bariyeri */
  --c-amber:      #E76F2C;   /* primary CTA, accent */
  --c-amber-dark: #BF5A22;   /* hover */
  --c-amber-soft: #FBE5D2;   /* soft fill, badge */

  /* Metin */
  --c-text:       #1F2937;   /* body */
  --c-text-soft:  #5B6573;   /* secondary */
  --c-rule:       #D9D3C6;   /* horizontal rule, border */

  /* State (form) */
  --c-error:      #B43A1E;
  --c-success:    #1E6F4A;
}
```

Brand-guidelines'taki yön korunuyor; bone white zemin (#FAF7F2) klasik #FFFFFF yerine seçildi — editorial / civic his katar, gözü yormaz.

---

## 4. Layout Sistemi

- **Grid:** CSS Grid + Flexbox, 12-col underlying mental grid (Tailwind veya vanilla — vanilla CSS tercih ediyorum; daha az bağımlılık, daha az build adımı)
- **Container max:** 1280px outer, 1120px content max, asymmetric section padding (sol 96px, sağ 64px desktop — editorial his)
- **Spacing scale (CSS var):** `--s-1: 4px, --s-2: 8px, --s-3: 12px, --s-4: 16px, --s-5: 24px, --s-6: 32px, --s-7: 48px, --s-8: 64px, --s-9: 96px, --s-10: 128px`
- **Section dikey ritim:** desktop 120–160px, mobile 64–80px
- **Bölüm açılış pattern'ı:**
  ```
  [JetBrains Mono micro-label: "STANDART 01"]  ── ince yatay çizgi ──
  [Fraunces H2: "Bölüm başlığı"]
  [Instrument Sans alt başlık, 2 satır max]
  ```
- **Asymmetry:** her section'da bir element grid'i kırar (örn. hero'daki blueprint SVG container'ın sağına taşar)

---

## 5. Bölüm-Bölüm Komponent Envanteri

| # | Bölüm | Anchor | Layout | Özel komponent |
|---|---|---|---|---|
| - | Header | — | Sticky, blur arka plan, sol logo, ortada nav, sağda primary CTA | Sticky shrink, active anchor highlight |
| 1 | Hero | top | 2-col: sol metin + büyük H1, sağ custom SVG "city blueprint" wireframe (animasyonlu inceltme) | Animated SVG, bariyer-stripe accent çubuğu |
| 2 | Nedir? | #nedir | 1-col editorial, generous indent, 5 ikon strip altta | 5 custom SVG line icon (şantiye, yaya, trafik, güvenlik, estetik) |
| 3 | Neden Gereklidir? | — | 2-col problem grid (8 kart, 4×2) | Numara + line icon + kısa metin kart |
| 4 | Amaç ve Kazanımlar | — | 5 kazanım kartı — 1 büyük + 4 küçük asymmetric grid | Kazanım kartı (numara, başlık, açıklama) |
| 5 | Hangi Projeleri Kapsar? | — | 6 kart 3×2 grid | Proje türü kartı (line icon + başlık + açıklama) |
| 6 | Standartlar (EN ÖNEMLİ) | #standartlar | 6 standart, **dikey tab** (sol vertical list + sağ aktif içerik panel) — desktop. Mobile: accordion | Tab/accordion hibrit, large standart numarası display olarak |
| 7 | Yükleniciler İçin Süreç | #surec | 6 adımlı yatay infografik (desktop) → dikey timeline (mobile) | Numbered step connector, ince çizgi |
| 8 | Uygulama ve Teknik Destek (Dış link #1) | — | Editorial wide block, Dada Teknik anchor doğal akışta | "Şehir Şantiyeciliği Yönetimi Eğitimi" anchor → https://dadatechnic.com |
| 9 | Dokümanlar | #dokumanlar | 6 doküman kartı 3×2 grid, PDF download ikon + "Yakında" badge | Disabled state kartı (badge: "Yakında") |
| 10 | FAQ | #sss | Accordion, 7 soru, Schema.org FAQPage markup | Vanilla JS accordion, ARIA, klavye |
| 11 | Blog Yönlendirme | — | Wide editorial kart, büyük başlık + CTA → /blog/sehir-santiyeciligi-nedir | Yön ok ikonlu CTA |
| 12 | İletişim Formu | #iletisim | 2-col: sol başlık + iletişim bilgisi, sağ form | KVKK checkbox zorunlu, client-side validation, submit Faz 1'de `mailto:` veya no-op |
| - | Footer | — | 4-col: logo+desc, hızlı linkler, dokümanlar, iletişim | Sosyal medya placeholder, KVKK link placeholder |

---

## 6. Asset Stratejisi

**Stock görsel YOK.** Üretilecek custom SVG'ler (inline, line-art, tek renk + accent):

1. **Hero blueprint wireframe** — şantiye + bariyer + yaya geçişi içeren stilize teknik çizim, animated stroke-dashoffset reveal
2. **Bariyer-stripe accent component** — 45° amber/dark çubuk pattern, header altı + section sınırlarında ince accent
3. **5 ikon (Bölüm 2):** şantiye, yaya, trafik, güvenlik, estetik
4. **8 ikon (Bölüm 3):** kaldırım, bariyer, trafik, depolama, kirlilik, gürültü, şikâyet, riskli geçiş
5. **5 ikon (Bölüm 4 — kazanımlar):** kalkan/yaya, ok/trafik, paragraf/estetik, megafon/bilgilendirme, checklist/denetim
6. **6 ikon (Bölüm 5 — proje türleri):** dönüşüm, konut, altyapı, üstyapı, yıkım, cephe
7. **6 step ikon (Bölüm 7):** ruhsat, analiz, plan, kapama, bilgilendirme, kontrol
8. **6 doküman ikonu (Bölüm 9):** PDF + içerik tipi göstergesi
9. **Logo placeholder** — "Şehir Şantiyeciliği" wordmark Fraunces ile, monogram opsiyonu

İkon stili: **Lucide tabanlı** ama özelleştirilmiş — 1.5px stroke, line-cap round, 24×24 viewport. Aynı stroke ağırlığı tüm setlerde tutarlı olacak.

**Doküman PDF'leri:** yok → "Yakında" badge + disabled visual (opacity 0.65, cursor not-allowed).

---

## 7. JS Etkileşim Envanteri (vanilla, modüler)

- `nav.js` — sticky shrink, scroll-spy active anchor highlight, mobile hamburger
- `smooth-scroll.js` — anchor click → smooth scroll (CSS `scroll-behavior: smooth` fallback)
- `standartlar-tabs.js` — Bölüm 6 desktop tab + mobile accordion responsive davranış
- `faq-accordion.js` — Bölüm 10, ARIA expanded, klavye (Enter/Space/Arrow), prefers-reduced-motion saygısı
- `form.js` — Bölüm 12, KVKK zorunlu validation, error state, submit Faz 1'de no-op / mailto
- `reveal.js` (opsiyonel) — IntersectionObserver ile staggered fade-up; `prefers-reduced-motion` ise skip

Tüm JS modüler IIFE veya `<script type="module">`. jQuery yok.

---

## 8. Animasyon Stratejisi

- **Page load:** hero'da Fraunces H1 staggered word reveal (60ms delay each), blueprint SVG stroke-dashoffset 1.2s ease-out reveal
- **Scroll:** her section başında micro-label + ince çizgi fade-in (IntersectionObserver)
- **Hover:** buton 150ms transform translateY(-1px) + amber-dark shift; kart border accent shift
- **Tab/accordion:** 250ms ease-out height transition
- **`prefers-reduced-motion: reduce`:** tüm transition durations → 0.01ms (animasyon disable)

Parallax yok, scroll-jacking yok, lottie yok.

---

## 9. Dosya Yapısı (Faz 1)

```
sehirsantiyeciligi-com/
├── index.html
├── blog/
│   └── sehir-santiyeciligi-nedir.html   # iskelet, içerik blog-content.md gelince
├── assets/
│   ├── css/
│   │   ├── tokens.css        # CSS custom properties (renk, spacing, type)
│   │   ├── base.css          # reset + tipografi + body
│   │   ├── layout.css        # container, grid, section ritim
│   │   ├── components.css    # button, card, badge, form, accordion, tab
│   │   └── main.css          # @import zinciri
│   ├── js/
│   │   ├── nav.js
│   │   ├── smooth-scroll.js
│   │   ├── standartlar-tabs.js
│   │   ├── faq-accordion.js
│   │   ├── form.js
│   │   └── reveal.js
│   ├── img/
│   │   └── og-placeholder.svg
│   └── svg/                  # inline-edilecek custom ikonlar
│       ├── icons/
│       └── hero-blueprint.svg
└── (CLAUDE.md, source-materials/, tasks/, .gitignore)
```

---

## 10. Üretim Sırası (implement edilecek sıralama)

1. **Token + base CSS** — `tokens.css`, `base.css`, font @import (Google Fonts), reset, body
2. **Layout + container + section ritim** — `layout.css`
3. **Komponent kütüphanesi** — buton, kart, badge, overline, form input, accordion, tab → tek bir `components.css`
4. **`index.html` iskelet** — semantic HTML, tüm 12 bölüm + header + footer, içerik `content.md`'den birebir
5. **Hero blueprint SVG** + bariyer-stripe component
6. **Custom ikon seti** (40+ ikon, tek bir SVG sprite veya inline)
7. **JS modülleri** — nav, smooth-scroll, tabs, accordion, form, reveal
8. **Schema.org markup** — FAQPage + Organization JSON-LD
9. **Responsive doğrulama** — 320 / 768 / 1280 / 1920
10. **Erişilebilirlik geçişi** — kontrast (WCAG AA), klavye nav, ARIA, focus-visible
11. **Blog sayfası iskelet** (içerik bekleyecek)
12. **Yasin Bey sunumu**

---

## 11. Doğrulama (verification)

- [ ] Türkçe karakter testi (ş, ı, ğ, ü, ö, ç) her fontta görsel kontrol
- [ ] Hero, section başlıkları, kartlar 320 / 768 / 1280 / 1920'de bozulmamış
- [ ] FAQ accordion klavye ile çalışıyor (Tab, Enter, Space, Ok tuşları)
- [ ] Form: KVKK işaretsiz iken submit blokeli, hata mesajı erişilebilir
- [ ] `prefers-reduced-motion: reduce` ile animasyonlar disable
- [ ] Lighthouse: Performance > 90, Accessibility > 95, SEO > 95
- [ ] Schema.org FAQPage Rich Results Test'i geçer
- [ ] Smooth scroll + sticky header active state çalışıyor
- [ ] Tüm bölümler `content.md` ile birebir eşleşiyor (metin kopya-yapıştırma değil, manuel kontrol)
- [ ] Local browser: `file://` ile açıldığında çalışıyor (relative path)

---

## 12. Sunum Akışı (Yasin Bey'e)

1. `index.html`'i CWP test domain veya local sunucudan göster
2. 12 bölümü sırayla anlat (5 dk içinde)
3. Renk + tipografi rationale (Fraunces'in editorial his, amber'in bariyer çağrışımı)
4. Mobile preview (responsive mode)
5. Bilinen sınırlar listesi: görseller yok, dokümanlar "Yakında", Dada Teknik final URL bekleniyor, sosyal medya placeholder
6. Geri bildirim turu → revize → Faz 2 onayı

---

## Açık Sorular (Beyar onayı için)

1. **Tipografi kabul:** Fraunces (display) + Instrument Sans (body) + JetBrains Mono (overline) — brand-guidelines'taki Inter/Manrope yerine bu üçlü. OK mi?
2. **Zemin rengi:** #FAF7F2 (bone white) vs saf #FFFFFF — bone white tercih ettim. OK mi?
3. **CSS stack:** Vanilla CSS (CSS custom properties) — Tailwind CDN yerine. OK mi?
4. **Standartlar bölümü:** dikey tab (desktop) + accordion (mobile) hibrit — yoksa her ikisinde de accordion mu?
5. **Hero görseli:** custom SVG blueprint (statik tasarım gerektirir) — yoksa daha basit geometric pattern mi?

Bu sorulara cevap geldikten sonra implement etmeye başlayacağım. "Sorulara cevap vermeden direkt implement et" denirse defaultlar (Fraunces+InstrumentSans+Mono, #FAF7F2, Vanilla CSS, hibrit tab/accordion, custom SVG blueprint) ile devam ederim.
