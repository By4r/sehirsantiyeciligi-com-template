# sehirsantiyeciligi.com — Yol Haritası

## Faz 1 — Static Mockup (şu an)

- [x] Repo bootstrap (CLAUDE.md, brand-guidelines.md, todo.md, lessons.md, .gitignore zenginleştirme)
- [x] `tasks/plan.md` — frontend-design skill ile template üretim planı
- [x] Font kararı: Saira Semi Condensed + Inter + JetBrains Mono (Türkçe karakter testi geçti)
- [x] One page `index.html` üretimi (Header + 12 bölüm + Footer, SVG sprite 40+ ikon, hero blueprint SVG)
- [x] FAQ accordion vanilla JS (ARIA, klavye Ok/Home/End)
- [x] Standartlar dikey tab (desktop) + accordion (mobile) hibrit
- [x] Sticky header + scroll-spy active state + mobile hamburger
- [x] İletişim formu client-side validation (KVKK zorunlu, error state, mailto fallback)
- [x] Schema.org FAQPage + Organization JSON-LD
- [x] Blog sayfası iskelet `blog/sehir-santiyeciligi-nedir.html` (placeholder içerik, içerik `blog-content.md` Yasin Bey'den gelince)
- [x] Responsive CSS (320 / 768 / 1024 / 1280+ breakpoint'lerde grid kırılımları, mobile menu)
- [x] Erişilebilirlik temelleri (skip link, focus-visible, `prefers-reduced-motion`, ARIA roller)
- [x] Tarayıcıda görsel doğrulama — REVİZE TURU 1 (11 fix maddesi)
- [ ] Tarayıcıda görsel doğrulama — REVİZE TURU 2 (yeni SS bekleniyor)
- [ ] Yasin Bey sunumu — geri bildirim turu

## Faz 2 — Laravel + Deploy (Yasin Bey onayı sonrası)

- [ ] Dada Teknik miras (composer, paketler, base layout)
- [ ] HTML → Blade dönüşümü (`html-to-blade` skill)
- [ ] Admin panel (`admin-module-generator` skill)
  - [ ] Blog yazıları modülü
  - [ ] Dokümanlar modülü (PDF upload)
  - [ ] İletişim mesajları modülü (KVKK kayıt)
  - [ ] FAQ modülü
  - [ ] Site ayarları (sosyal medya, iletişim bilgileri, Dada Teknik URL'leri)
- [ ] Form submit + KVKK kaydı + spam guard (honeypot/recaptcha)
- [ ] robots.txt + sitemap.xml + OG image
- [ ] CWP deploy (188.125.160.157:6161)
- [ ] E2E test (`e2e-tester` skill)
- [ ] `admin-frontend-consistency` denetimi
