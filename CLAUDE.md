# sehirsantiyeciligi.com — Proje Notları (Claude için)

## Proje Kimliği

- **Site:** sehirsantiyeciligi.com
- **Sahip:** Yasin Yavuz (Yasin Bey) — Dada İstanbul
- **Operatör:** Beyar Güneş
- **Tip:** Kamu yararı / bilgilendirme sitesi — one page + 1 blog yazısı
- **Amaç:** Şehir içi şantiye standartlarını anlatan, doküman paylaşan, iletişim/başvuru toplayan bir bilgi bankası
- **Sunucu (Faz 2):** CWP 188.125.160.157, port 6161
- **Dış kaynak yönlendirmesi:** Dada Teknik (https://dadatechnic.com) — 2 doğal dış link (ana sayfa Bölüm 8 + blog Bölüm 9)

## Faz Mantığı

Bu proje **iki ayrı fazda** ilerler. Fazlar karışmaz.

### Faz 1 — Static Mockup (ŞU AN)
- Saf HTML/CSS/vanilla JS mockup
- Yasin Bey'e sunulacak, onay alınacak
- **Bu fazda Laravel/PHP/Blade/admin kodu YAZILMAZ**
- Template üretimi `frontend-design` skill'i ile yapılır

### Faz 2 — Laravel + Deploy (Yasin Bey onayı sonrası)
- Dada Teknik miras (composer, paketler, layout pattern)
- Blade'e dönüşüm (`html-to-blade` skill)
- Admin panel (`admin-module-generator` skill): blog, dokümanlar, iletişim mesajları, FAQ, site ayarları
- Form submit + KVKK kaydı + spam guard (honeypot/recaptcha)
- CWP deploy
- E2E test (`e2e-tester` skill)

## İçerik Kaynağı

- **Tek doğruluk kaynağı:** `source-materials/content.md` (12 bölümlü one page haritası + blog yapısı)
- **İçerik uydurma YASAK.** Eksik metin gerekirse Yasin Bey'e sor
- Blog detay içeriği `source-materials/blog-content.md` Yasin Bey'den gelecek (henüz yok)

## Karar Mercii

- **Yasin Bey** — her renk, copy, yapısal karar onun onayından geçer
- **Beyar** — operatör; gündelik teknik kararları verir ama tasarım/içerik son sözü Yasin Bey'in
- Karar gerektiren noktada implement etme, sor

## Cross-Project Kurallar

- **Stock görsel YOK.** Placeholder: `div + bg-color/bg-pattern + aspect-ratio`. Proje görselleri Yasin Bey'den gelecek
- **Line icon set:** Lucide veya Heroicons SVG inline. Emoji ikon DEĞİL
- **Kare/oran gösterimi:** `<img>` ile boyutlandırma yerine `div + background-image + background-size: cover + aspect-ratio`. Çerçeveleme bozulmasın
- **jQuery YOK.** Vanilla JS
- **TempusDominus:** Faz 2 admin'de datepicker standardı (Faz 1'de yok)
- **Encoding:** UTF-8. Türkçe karakter (ş, ı, ğ, ü, ö, ç) korunur. Mojibake YASAK

## Skill Kullanımı

- **frontend-design** — Faz 1 template üretiminin ana driver'ı. Generic AI aesthetic (gradient hero + glassmorphism + emoji yığını) **YASAK**
- **web-replicator** (`~/.claude/skills/web-replicator/`) — referans site verilirse devreye girer. Default DEĞİL
- **admin-module-generator** (`~/.claude/skills/admin-module-generator/`) — Faz 1'de **DEVRE DIŞI**. Faz 2'de admin için
- **html-to-blade** — Faz 2 Blade dönüşümü için
- **admin-frontend-consistency** — Faz 2 admin view denetimi için
- **e2e-tester** — Faz 2 release öncesi smoke

## Bilinen Sınırlar (Faz 1)

- Proje görselleri yok → placeholder div + accent
- 6 doküman PDF'i hazır değil → "Yakında" badge veya disabled link
- Sosyal medya hesap linkleri yok → Yasin Bey'den alınacak
- Dada Teknik final URL'leri kesinleşmedi → placeholder `https://dadatechnic.com`
- İletişim formu Faz 1'de submit no-op veya `mailto:` (gerçek submit Faz 2'de)

## Git Disiplini

- **Otomatik commit / push YASAK**
- Beyar açık onay verince commit yapılır
- "Commit etmek ister misin?" şeklinde hatırlatma uygun
- `--no-verify` kullanma; hook hatasını fix et
- Main'e force push asla

## Klasör Yapısı

```
sehirsantiyeciligi-com/
├── .claude/
│   ├── agents/
│   └── commands/
├── source-materials/
│   ├── content.md            # İçerik haritası (HAZIR)
│   ├── brand-guidelines.md   # Marka rehberi
│   └── blog-content.md       # (gelecek)
├── tasks/
│   ├── plan.md               # aktif round planı
│   ├── todo.md               # yol haritası
│   └── lessons.md            # proje-spesifik öğrenmeler
├── CLAUDE.md
├── README.md
└── .gitignore
```

Faz 1 çıktısı kök `index.html` + `blog/sehir-santiyeciligi-nedir.html` + `assets/` olarak konumlanacak (frontend-design skill turunda netleşir).
