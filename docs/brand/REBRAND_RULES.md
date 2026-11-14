# MTrade Academy — Rebrand v2.1 Amaliy Qoidalari (kod uchun)

> Manba: Brand Book 2.1 (`docs/brand/MTrade_Brand_Book_2.1.pdf`), DTCG tokenlar (`docs/brand/mtrade.tokens.json`).
> Brand kit vs bu hujjat ziddiyatda → **brand kit ustun**.
> Yangi sahifa/komponent qurishdan oldin shu faylni o'qing.

## 1. Ranglar (faqat shu shkala, boshqa rang YO'Q)

**Asosiy 4 (60 / 25 / 10 / 5 nisbat, dark-first):**

| Rang | Hex | Roli | Ulushi |
|------|-----|------|--------|
| Rich Black | `#010B13` | Fon (background) | 60% |
| Powder White | `#EBF1F5` | Asosiy matn / yorug' yuzalar | 25% |
| Wine Red | `#7F011F` | **Brend aksenti: belgi + CTA + kalit so'z** | ≤10% |
| Light Sand | `#F5EBD0` | Iliq urg'u (chip, highlight) + on-primary matn | ~5% |

**Oilalar:** `wine-50..950` (Wine 400 `#F06A72` = qorong'ida aksent matn; Wine 500 `#DC374D` = aurora nur; Wine 700 = CTA zamini) · `ink-50..950` (ink-100 = Powder White, ink-950 = Rich Black) · `sand-50..950` · **Trading**: `bull #56DC85` ▲, `bear #FD7E49` ▼, neytral `ink-600`.

**Dark semantik (`tailwind.config.js` da import qilingan):**
`background #010B13 · surface #05131C · card #0C1B24 · border #213039 · foreground #EBF1F5 · muted #94A0A8 · primary #7F011F (+ sand-100 matn) · accent #F06A72 · highlight #F5EBD0 · bull #56DC85 · bear #FD7E49`

**Taqiqlar:**
- ❌ Wine Red matnni Rich Black ustiga (1.8:1 — o'tmaydi)
- ❌ Wine Red = zarar/pasayish signali (u FAQAT brend rangi; pasayish = bear orange ▼)
- ❌ Bir sahifada 3+ rang kontseptsiyasi; Wine Red yuzasining 10%dan oshmasligi
- ❌ Boshqa hex qo'shish (`#1a1a1a`, `#d6c3a1` va h. — TAQIQ). Yangi rang kerak → brand kit'dan oling
- ✅ Kontrast ≥ 4.5:1 (AA) — semantik juftliklar allaqachon o'tadi (asosiy matn 17.4:1 AAA)

## 2. CTA (yagona)

`bg-primary text-primary-foreground` (= Wine 700 + `#F5EBD0` matn). Hover: `bg-wine-600`. Boshqa CTA rangi (yashil, ko'k) YO'Q. Wine 500+ faqat nurlarda; Wine 400 faqat qorong'ida aksent **matn**.

## 3. Tipografiya

| Rol | Shrift | O'lcham/tracking |
|-----|--------|-------------------|
| Sarlavha (display) | **Inter Tight** 700/800 | display 61 → h4 25px, tracking −3…−4% |
| Matn / interfeys | **Inter** 400/500/600 | 16–18px, qator 150% |
| Data / yorliq / raqam | **JetBrains Mono** 500/700 | UPPERCASE +12% tracking |

❌ Sora TAQIQ (olib tashlandi). ✅ Mono: `font-mono` + `uppercase tracking-[0.12em]`. Sarlavhalar: `font-display`.

## 4. Logo ishlatish

| Joy | Fayl | Eslatma |
|-----|------|---------|
| Navbar | `/brand/logo/MTrade_inline_reverse.svg` | BIR QATOR — brand p.7 "Bir qator (web)" |
| Footer | `/brand/logo/MTrade_icon_reverse.svg` | belgi + matn (SVG) |
| Favicon | `/brand/logo/favicon/*` (svg+ico+png 16..512) | `index.html` da bog'langan |
| OG / Twitter image | `/brand/og-image.png` | 1200×630 kompozitsiya |
| Avatar / PWA | `/brand/MTrade_avatar_1080.png` | kerak bo'lganda |

**Taqiqlar (brand p.10):** cho'zmang/siqmang/aylantirmang · boshqa rang · soya/effect · gradiyent to'ldirish · kontur · himoya maydoni (belgi balandligining yarmi) buzilishi · minimal o'lchamdan kichik (belgi 24px).

## 5. Ikonkalar (brand p.19)

- ✅ **Faqat** `@phosphor-icons/react`, `weight="duotone"` (butun ilova uchun `main.tsx` dagi `IconContext`)
- Import yo'li: `@/lib/icons` (obunachi qatlam; lucide-react o'chirilgan — qayta install qilinMASIN)
- Yangi ikonka kerak → Phosphor nomiga `@/lib/icons` da alias qo'shing
- Brendning o'z 24 ta ikonkasi: `/brand/icons/{light,dark}-bg/*.svg` — marketing bo'limlarida SVG
- Emoji ikonkalarni UI da ishlatish TAQIQ

## 6. Trading grafiklari (brand p.20)

- Faqat `market: america`, TradingView `s3.tradingview.com` widgetlar (`SPX500`, `NASDAQ:AAPL`)
- Candle o'sish/pasayish: `bull` / `bear` tokenlari + ▲ ▼ belgilari majburiy
- Wine Red — bozor signali emas; hajm = `ink-600` pillar ustunlar

## 7. Radiuslar va glass

`sm 8 · md 12 · lg 20 · xl 28 · pill 9999` → Tailwind: `rounded-sm|md|lg|xl|card|full`
`glass-card` = 5% oq fon + 12% chegara + 28px radius + blur (brand p.18) — **shu klassdan foydalaning**, custom glass yozilMASIN.

## 8. Harakat

`150 / 220 / 320ms`, easing `cubic-bezier(.2,0,0,1)`. `prefers-reduced-motion` hurmat qilinadi (`index.css` da o'rnatilgan). `will-change` faqat kerak bo'lganda.

## 9. Matn / kontent qoidalari

- Natija va'dalari YO'Q; har natija yonida: `O'tgan natija kelajak kafolati emas.`
- Har bozor matnida: `Investitsiya maslahati emas.` + (diniy savollarda) `Eslatma: bu diniy fatvo emas.`
- FAQAT AQSh fond bozori (NASDAQ/NYSE/NYSE American) + HALOL aksiyalar
- Fayllar **UTF-8**; mojibake TAQIQ (`â€`, `Â·`, `Ã`, `ðŸ` — scan: `fix_moji` usuli)
- CTA yagona: `t.me/mtrade_obuna_bot?start=course_*`; kontakt: `info@mtrade.uz | +998 77 373 12 48 | Jizzax`

## 10. Eski va yangi klasslar (TAQIQ ro'yxati)

| Eski (YO'Q) | Yangi (BOR) |
|---|---|
| `mgold`, `gold-text` (standalone), `text-gold` | `accent` / `sand-100` / `primary` (matnga qarab) |
| `mblack`, `mdark` | `ink-950`, `surface` |
| `mcard`, `mcard2`, `mborder` | `card`, `ink-900`, `border` |
| `mgray`, `mdim` | `muted`, `ink-500` |
| `mgreen`, `mred`, `mblue` | `bull`, `bear`, `info` |
| `font-sora`, `Sora` | `font-display` |
| `dark-card`, `dark-border`, `dark-lighter` | `card`, `border`, `surface` |
| `gold-gradient` (standalone) | `wine-gradient-bg` |
| `text-dark` (wine fonida) | `text-sand-100` |

## 11. Fayl joylashuvi

- `public/brand/**` — veb asset'lar (logo, ikonkalar, favicon, OG) — deployga KIRADI
- `docs/brand/` — brand kit hujjatlari (kit PDF, tokenlar) — git'da, deployga KIRMAYDI
- `public/images/` — rasmlar (WebP); yangi brand rasmlari `public/brand/` ga

## 12. Har sahifa publish yakuniy checklist (brand p.27)

1. Logo: tasdiqlangan versiya, himoya maydoni, fonga mos
2. Rang: faqat palitra; kontrast ≥ 4.5:1; Wine ≤ 10%; bull/bear faqat grafikda
3. Tipografiya: ≤ 2 shrift + mono; body ≥ 16px; `o'` belgisi to'g'ri
4. Kontent: natija/foyda va'dasi yo'q; halol nuqtai nazar; CTA bitta va aniq
5. Texnik: build 0 error · browser console 0 error · `/brand/*` 200 · Vercel preview → tasdiq

## 13. Ish jarayoni (majburiy zanjir)

```
BRAND v2.1 → ui-ux-pro-max search (qaror) → shadcn pattern →
implement → build 0 error → browser console 0 error →
screenshot tasdig'i (siz) → git commit → (deploy faqat ruxsat bilan)
```
