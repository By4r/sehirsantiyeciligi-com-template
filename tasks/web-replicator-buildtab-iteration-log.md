# Web Replicator — Buildtab MODE B Iteration Log
**Slug:** buildtab-header-infostack
**Mode:** B (Adapt — mevcut sehirsantiyeciligi.com içerik korunarak görsel dil hizalanır)
**Referans:** https://html-demo.themetechmount.com/buildtab/header-infostack.html

---

## R1 (2026-05-11) — Bölüm-bölüm alignment ahenk fix paketi

**Patron raporu:** "görsel ağırlıkta olsun fakat bölümlerde ahenk yok, alignmentlar bozuk".

### SIDE-BY-SIDE DIFF (R0 → R1 hedef)
- Bölüm 04 Kazanımlar: card 01 image-bg full overlay; card 02–05 plain paper card → **TUTARSIZ**. Buildtab'da tüm grid kartları aynı pattern. Hedef: tüm 5 kart `image-top + nr + icon overlay + body` proj-card pattern; layout 2-col, card 01 span-2 horizontal split (image-left + body-right).
- Bölüm 06 Standartlar: sağ panel sticky + grid-row span 6 → sağda dikey boşluk. Hedef: her panel başına photo-slot 16:10, panel doğal olarak uzar, vertikal denge.
- Bölüm 07 Süreç: timeline tek başına, görsel ağırlık yok. Hedef: timeline üstüne wide panoramic photo banner (16:5).
- Bölüm 12 İletişim: contact-info HTML'inde `__photo` var ama CSS yok → render olmuyor → sol kolon kısa, sağ form uzun → asimetri. Hedef: `.contact-info__photo`/`__panel`/`__icon`/`__label`/`__bracket`/`__caption` CSS eklenir. Form input'ları line-style → BuildTab dialect için full-border boxed input.

### Iterasyon planı
1. components.css — wins-grid + card--win refactor (proj-card pattern); standards__panel-photo eklendi; process__visual banner; contact-info-* eklendi; form input boxed varyant
2. index.html — Bölüm 04 5 kart yeniden yazıldı; Bölüm 06 her panel'e photo-slot eklendi; Bölüm 07 banner eklendi; (Bölüm 12 HTML zaten doğru, sadece CSS gerekti)

### Doğrulama (R1 sonrası)
- [ ] Bölüm 04 5 kart aynı oran (image-top + body), 2-col, card 01 horizontal split
- [ ] Bölüm 06 sağ panel artık dikey boş değil (photo 16:10 fill)
- [ ] Bölüm 07 timeline öncesi wide banner var
- [ ] Bölüm 12 sol kolon foto + panel görünür; form boxed
- [ ] Mobile (375px) tüm bölümler bozulmamış

### Notlar
- Photo URL'leri tematik Unsplash; Yasin Bey foto gönderince swap (~5 dk işi).
- Form input ailesi: line-bottom → boxed (full border, paper bg, focus amber outline). KVKK checkbox custom kalır.
