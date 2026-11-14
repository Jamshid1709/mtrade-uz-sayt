# MTRADE Content Rules — Qat'iy Amal Qilinadigan Kontent Qo'llanma

> Har bir yangi matn, rasm, video, indikator ushbu qoidalardan o'tishi SHART.

## 1. HALOL FILTER (Majburiy)

- Faqat halol aksiyalar: Finviz `shariah` / StockAnalysis halol screener dan o'tgan.
- Har bir aksiya kartasi: Ticker, Narx, Sektor, Halol belgisi (✓)
- Taqiqlangan sektorlar ro'yxati hech qachon qo'shilmaydi: Alcohol, Gambling, Tobacco, Adult, Conventional Banks (riba), Weapons
- Savol `Halolmi?` bo'lsa javob: `Biz faqat halol aksiyalar bilan ishlaymiz. Eslatma: bu fatvo emas.`

## 2. FAQAT AQSh BOZORI

- Ruxsat: NASDAQ, NYSE, NYSE American, S&P500, Dow, ETF (halol)
- Taqiq: UZEX, MOEX, Forex lot, Crypto spot/futures (faqat taqqoslash uchun tilga olinadi)
- Barcha chartlar `NASDAQ:AAPL` kabi AQSh tickerlari

## 3. MATN QOIDALARI

- Asosiy til `uz`, keyin `ru/en`. Har yangi section uchun `i18nContext.tsx` TRANSLATIONS ga kalit qo'sh.
- Uslub: `Halol treydingni 0 dan o'rganing. Real bozor tahlillari, 3D vositalar va professional mentorlar.`
- CTA matnlari: `Bepul start darsi` → `t.me/mtrade_obuna_bot?start=course_starter`, `Obuna bo'lish` → `course_{premium|hybrid|offline}`
- Hech qachon: `100% foyda`, `bir kunda boy bo'ling`, `risk yo'q` — bularni yozish TAQIQLANADI
- Har natija yonida: `O'tgan natija kelajak kafolati emas.`

## 4. SAHIFA MATNLARI MANBASI (o'rganildi)

- Home: Hero `Kelajak treyderlarini...` + 4 stat + 3 kurs + 4 mentor + Results 5 rasm + Testimonials 3
- Courses: 3 tarif qiyoslash + Quiz 5 savol
- Syllabus: 10 modul Premium (51 mavzu) + Gibrid 4 bosqich + Offline 4 bosqich
- Markets: `Aksiya Bozori va 3D Galaxy — 100+ Halal aksiyalar` + 3 widget
- Tools: 3 Pine Script (SMC, Liquidity, Trend) + 3 strategiya + Finviz presets
- Calculator: 5 kalkulyator (Position/Risk/Fundamental/Portfolio/Compound)
- About: Maqsad/Missiya + Roadmap 7 qadam
- FAQ: 12 Q&A — har biri halol va kurs farqi haqida

## 5. DIZAYN TEKSHIRUVI

- Yangi bo'lim `ScrollReveal` + `Framer Motion whileInView` bilan bo'lsin
- GoldButton faqat CTA uchun, boshqa tugma `variant=outline`
- Rasm qo'shilsa `public/images/` ga WebP, 500KB dan kichik, alt matn uz

## 6. TEXNIK TEKSHIRUV

- Yangi sahifa → `App.tsx` da `lazy()` + `Suspense`
- Tashqi link → `rel=noopener noreferrer`
- Forma → `Zod + React Hook Form`, telefon `+998 (XX) XXX-XX-XX` maska
- TradingView script → `useEffect` ichida dinamik yuklash, cleanup bor

## 7. DEPLOY TEKSHIRUVI

- `npm run build` — 0 error
- `vercel pull` — env tekshir
- Preview da 7 tilda tekshir, mobil (375px) da tooltip clipping yo'qmi tekshir

---
*Qoidani buzgan PR — avtomatik rad etiladi.*
