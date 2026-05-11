# Lessons — sehirsantiyeciligi.com (proje-spesifik)

> Bu dosya, bu projede yapılan hatalardan veya Yasin Bey'in geri bildirimlerinden çıkan **proje-spesifik kuralları** biriktirir.
>
> Cross-project skill kuralları (admin-module-generator, web-replicator, frontend-design vb.) için `~/.claude/skills/<skill>/lessons.md` ayrı tutulur. Buraya **sadece bu repo'ya özel** öğrenmeler yazılır.
>
> Format: tarih + kısa kural + **Neden:** + **Nasıl uygulanır:** satırları.

## Tasarım & Marka

### 2026-05-11 — Font stack: Saira Semi Condensed + Inter + JetBrains Mono
Faz 1 tipografi: **Saira Semi Condensed** (display 700/800) + **Inter** (body 400–700) + **JetBrains Mono** (overline 500). Önceki Fraunces + Instrument Sans önerisi atıldı.

**Neden:**
- Yasin Bey "inşaat ile alakalı renk kullanabilirsin" diyerek sektörel temayı onayladı; bu mantıkla sektörel font ailesi de meşrulaştı
- Tragrup (Dada İstanbul inşaat grup) Saira Semi Condensed kullanıyor → "Dada inşaat ailesi" tutarlılığı sağlanıyor
- Inter, Dada admin/business pattern'ı (Çaykaraspor business-panel, backend-lab admin) — Faz 2 admin geldiğinde tutarlı kalır
- Fraunces editorial/dergi hissi Yasin Bey'in "kurumsal bilgilendirme" beklentisine uymuyordu

**Nasıl uygulanır:**
- Yeni proje round'larında font seçerken önce **dada ailesi envanteri** (dada-teknik, caykaraspor, Tragrup, y2z, derik, backend-lab) kontrol edilir; akrabalık önceliklenir
- Editorial/lüks his vermeyen kurumsal-bilgilendirme tonu için Saira+Inter ikilisi referans olabilir
- "İçerikle tematik akrabalık" + "ailenin admin pattern'ı" iki vektör birlikte değerlendirilir

## İçerik & Copy

_(henüz item yok)_

## Teknik

### 2026-05-11 — Faz 1 implement edildi
Tek dosya kütüphane yok; saf vanilla CSS (4 dosya: tokens / base / layout / components) + ES modules JS (5 modül + main.js entry).

**Neden:**
- Build adımı yok → deploy basit (static FTP / CWP)
- jQuery yasak kuralına uyum
- CSS custom property mimarisi tema değişimini kolaylaştırır (Faz 2'de admin'den renk/tipografi değişebilir)

**Nasıl uygulanır:**
- Yeni komponent eklendiğinde `components.css` içine, mevcut design token'larını (`var(--c-amber)`, `var(--s-5)` vb.) kullanarak yaz
- JS modül eklendiğinde `assets/js/main.js`'ye import + init et
- SVG ikon eklendiğinde `index.html` üst kısmındaki `<symbol>` sprite'ına ekle, `<use href="#id"/>` ile referans ver

### 2026-05-11 — Revize Turu 1: 11 maddelik fix paketi
İlk implement turu sonrası tarayıcıda görsel doğrulamada tespit edilen ve giderilen sorunlar.

**Kritik:**
1. **Standartlar paneli görünmüyordu.** Sebep: `.section--ink` koyu zeminde panel H3/P metinleri `var(--c-ink)` ile siyah üstüne siyah kalıyordu. Çözüm: `.section--ink .standards__panel { h3 → var(--c-paper); p → rgba(250,247,242,0.88); overline → var(--c-amber) }` override eklendi
2. **Tab kontrastı çok düşüktü.** Sebep: tab text rengi `var(--c-text-soft)` (gri) koyu zeminde okunmuyordu. Çözüm: inactive → `rgba(250,247,242,0.55)`, hover → `0.85`, active → `var(--c-paper)`, active'in solunda 3px amber border-left
3. **Hero blueprint SVG hiç çizilmiyordu.** Sebep: SVG `<g>`'sine inline `stroke-dasharray="800" stroke-dashoffset="800"` verilmiş ama keyframe animasyonu yoktu — stroke sonsuza kadar gizli kalıyordu. Çözüm: inline attribute'lar kaldırıldı, `.blueprint-stroke` sınıfı CSS keyframe `drawStroke` ile (1.8s ease-out forwards) tanımlandı. `prefers-reduced-motion` ise animation: none + dashoffset: 0

**Yüksek öncelik:**
4. **Form çok generic / "WP Contact Form 7" hissi.** Çözüm: form'a 1px border + paper container, top-aligned label + amber bottom-border accent (focus'ta amber), custom select chevron, custom KVKK checkbox (amber check), grouped label'lar (İletişim Bilgileri / Proje Detayları), submit zone (full-width mobile + hint metni), placeholder'lar eklendi
5. **Hero H1 4 satır kırılıyordu.** Çözüm: font-size clamp(38px, 5.8vw, **72px**) — eski 80px'den indirildi. line-height 1.04
6. **Bölüm 2 sağdaki 5 kart sıkışıktı.** Çözüm: 2-1 grid kaldırıldı; tam genişlik editorial metin (üstte, max 760px) + altta 5-sütun ikon strip (`.icon-strip`, 48x48 amber-soft icon + JetBrains Mono micro label)
7. **Bölüm 8 reklam banner gibi durdu.** Çözüm: `.ext-block` (4px amber sol bar + dark visual blok) atıldı; yerine `.ext-editorial` (1.6fr metin + 1fr sticky `.ext-card`) editorial layout — Dada Teknik mini-card: outline, hover'da amber border, "DT" wordmark + h3 + 14px açıklama + uppercase mono link, sticky positioning

**Orta öncelik:**
8. Bölüm 11 başlık eksikti → section-header'a "Şehir Şantiyeciliği Rehberi" H2 + alt başlık eklendi
9. Footer üstü `barrier-stripe--thin` (6px) → tam `barrier-stripe` (14px) — brand signature güçlendi
10. Kazanım büyük kartı (Bölüm 4) padding artırıldı (s-8), H3 boyut/satır artırıldı (30/1.15), p renk %88 opacity, icon 52px
11. Hero secondary buton (outline) çok kayboluyordu → border 2px + ink-soft hover bg + mobile <480px stack düzeni

**Nasıl uygulanır:**
- Yeni koyu (`section--ink`) section eklerken içindeki TÜM komponentlerin text rengi explicit override'la beyazlatılmalı. Default `var(--c-text)` siyahtır
- SVG path animasyonlarında inline `stroke-dashoffset` kullanılırsa **mutlaka** keyframe ile beraber. Sadece attribute bırakmak SVG'yi görünmez yapar
- Form alanlarında "kurumsal" his için: 1px border container + amber bottom-line + custom checkbox + group label divider pattern'ı kullanılabilir
- Dış kaynak yönlendirmesi (partner/sponsor link) için `.ext-editorial` + sticky `.ext-card` pattern'ı reklam hissini azaltır
- Hero H1 boyutlandırırken Saira condensed nedeniyle char-width'lere göre değil, breakpoint clamp ile düşürmek daha güvenli

### 2026-05-11 — Revize Turu 2: SVG sprite → FontAwesome 6 refactor
İkon stratejisi tamamen değişti. Custom SVG sprite (42 `<symbol>`) atıldı; tüm ikonlar **FontAwesome 6.5.2 Free CDN** (cdnjs) ile değiştirildi.

**Neden:**
- Envanter: 6/6 Dada projesi FA kullanıyor (dada-teknik FA 5.15, caykaraspor FA 5.15, y2z FA 6.5 Pro, tragrup FA 5.8 Pro, backend-lab FA local, **derik FA 6.5.1 cdnjs Free** — en yakın akraba, birebir aynı pattern)
- Derik admin'de "FontAwesome class girin (ör: `fa-solid fa-truck`)" pattern'ı var → marka konvansiyonu admin'e bile bind edilmiş
- Yasin Bey gözünde "diğer Dada siteleriyle aynı ikon dili" tutarlılığı

**Mapping tablosu (eski sprite ID → FA 6 class):**

| Eski ID | FA Class | Bağlam |
|---|---|---|
| `i-arrow-right` | `fa-solid fa-arrow-right` | Buton ok |
| `i-arrow-down` | `fa-solid fa-arrow-down` | (kullanılmıyor, tanımdan kaldırıldı) |
| `i-chev-down` | `fa-solid fa-chevron-down` | FAQ/Standartlar chev |
| `i-menu` | `fa-solid fa-bars` | Mobile hamburger |
| `i-x` | `fa-solid fa-xmark` | Mobile close |
| `i-external` | `fa-solid fa-arrow-up-right-from-square` | Dış link |
| `i-phone` | `fa-solid fa-phone` | İletişim |
| `i-mail` | `fa-solid fa-envelope` | İletişim |
| `i-pin` | `fa-solid fa-location-dot` | İletişim |
| `i-site` | `fa-solid fa-helmet-safety` | Şantiye alanı |
| `i-pedestrian` | `fa-solid fa-person-walking` | Yaya erişimi |
| `i-traffic` | `fa-solid fa-traffic-light` | Trafik |
| `i-shield` | `fa-solid fa-shield-halved` | Güvenlik |
| `i-aesthetic` | `fa-solid fa-city` | Kent estetiği |
| `i-sidewalk` | `fa-solid fa-road` | Kaldırım işgali |
| `i-barrier` | `fa-solid fa-road-barrier` | Bariyer |
| `i-route` | `fa-solid fa-route` | Trafik yönlendirme |
| `i-storage` | `fa-solid fa-boxes-stacked` | Malzeme depolama |
| `i-pollution` | `fa-solid fa-smog` | Çevre kirliliği |
| `i-noise` | `fa-solid fa-volume-high` | Gürültü |
| `i-complaint` | `fa-solid fa-comment-dots` | Şikâyet |
| `i-risk` | `fa-solid fa-triangle-exclamation` | Risk alanı |
| `i-win-pedestrian` | `fa-solid fa-shield-heart` | Yaya güvenliği (kazanım) |
| `i-win-flow` | `fa-solid fa-arrow-right-arrow-left` | Trafik akışı |
| `i-win-city` | `fa-solid fa-tree-city` | Şehir estetiği |
| `i-win-inform` | `fa-solid fa-bullhorn` | Bilgilendirme |
| `i-win-audit` | `fa-solid fa-clipboard-check` | Denetim |
| `i-proj-transform` | `fa-solid fa-building-circle-arrow-right` | Kentsel dönüşüm |
| `i-proj-housing` | `fa-solid fa-house-chimney` | Konut |
| `i-proj-infra` | `fa-solid fa-network-wired` | Altyapı |
| `i-proj-super` | `fa-solid fa-bridge` | Üstyapı |
| `i-proj-demo` | `fa-solid fa-hammer` | Yıkım |
| `i-proj-facade` | `fa-solid fa-building` | Cephe/tadilat |
| `i-doc` | `fa-solid fa-file-pdf` | Doküman kartı |
| `i-linkedin` | `fa-brands fa-linkedin-in` | Sosyal |
| `i-instagram` | `fa-brands fa-instagram` | Sosyal |

**Nasıl uygulanır:**
- Yeni ikon ihtiyacında [fontawesome.com/search?o=r&m=free](https://fontawesome.com/search?o=r&m=free) Free filter ile ara
- Solid/brands ailesi yeterli; light/duotone Pro gerektirir, kullanma
- `<i class="fa-solid fa-XXX">` formatı; wrapper'a `.icon`, `.chev` gibi yardımcı sınıflar eklenebilir
- Boyut: wrapper'da `font-size` ile (örn. `.card__icon { font-size: 18px }`). FA `<i>` boyutu font-size'tan alır
- Hero blueprint SVG ve barrier-stripe gibi **özel illüstrasyonlar** FA değil — inline SVG kalır (FA'nın yapamayacağı şey)

**Sebep + Çözüm — `<i>` ve `.nav a` specificity:**
- FA `<i>` tag'leri buton içinde kullanıldığında `.nav a` gibi nested selector'lar (.0,1,1) `.btn--header` (0,1,0) override edebiliyor. Bu davranışın farkında ol — sticky header'da `a.btn--header` veya `.nav a.btn--header` ile specificity bump gerekli

## İş Akışı & Onay

_(henüz item yok)_
