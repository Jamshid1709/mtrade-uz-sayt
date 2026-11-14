import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import WatchlistWidget from "../components/WatchlistWidget";
import {
  Code,
  Copy,
  Check,
  Zap,
  BookOpen,
  Filter,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Layers,
  ArrowUpRight,
} from "lucide-react";

// Pine Script Templates
const PINE_SCRIPT_INDICATORS = [
  {
    id: "smc-ob",
    title: "MTrade Smart Money Concepts (SMC) Order Blocks",
    description:
      "Institutional order block bo'lmalarini, liquidity sweep hamda Fair Value Gap (FVG) zonalarini avtomatik aniqlovchi Pine Script v5 indikatori.",
    version: "v5.2",
    code: `//@version=5
indicator("MTrade SMC Order Blocks & FVG [Halal/US Stocks]", overlay=true, max_boxes_count=500, max_lines_count=500)

// â€” Sozlamalar (AQSh aksiyalari uchun)
showOB  = input.bool(true,  "Order Blocks")
showFVG = input.bool(true,  "Fair Value Gap (FVG)")
displacementLen = input.int(5, "Displacement uzunligi", minval=2)
volMult = input.float(1.5, "Volume tasdiq (x SMA20)", minval=1.0)
mitigateOnTouch = input.bool(true, "Mitigatsiya bo'lganda rangni xiralashtirish")

var box[]  obBoxes  = array.new_box(0)
var box[]  fvgBoxes = array.new_box(0)

// â€” Trend / Displacement (MTrade: faqat AQSh halol aksiyalar, Musaffa da tekshiring)
volSMA = ta.sma(volume, 20)
volOk  = not na(volSMA) and volume > volSMA * volMult
bullDisp = close > open and close[1] < open[1] and close > high[1] and volOk
bearDisp = close < open and close[1] > open[1] and close < low[1]  and volOk

// Bullish OB: oxirgi qizil shamning high/low
if bullDisp and showOB
    b = box.new(bar_index-1, high[1], bar_index+15, low[1], border_color=color.rgb(20,199,132,60), bgcolor=color.rgb(20,199,132,75))
    box.set_extend(b, extend.right)
    array.push(obBoxes, b)
    if array.size(obBoxes) > 30
        box.delete(array.shift(obBoxes))

// Bearish OB: oxirgi yashil shamning high/low
if bearDisp and showOB
    b = box.new(bar_index-1, high[1], bar_index+15, low[1], border_color=color.rgb(246,70,93,60), bgcolor=color.rgb(246,70,93,75))
    box.set_extend(b, extend.right)
    array.push(obBoxes, b)
    if array.size(obBoxes) > 30
        box.delete(array.shift(obBoxes))

// FVG: 3 bar gap â€” bullish (low > high[2]) va bearish (high < low[2])
bullFVG = low > high[2] and close[1] > high[2]
bearFVG = high < low[2] and close[1] < low[2]

if bullFVG and showFVG
    f = box.new(bar_index-2, low, bar_index+10, high[2], border_color=color.rgb(214,195,161,50), bgcolor=color.rgb(214,195,161,70))
    box.set_extend(f, extend.right)
    array.push(fvgBoxes, f)
    if array.size(fvgBoxes) > 30
        box.delete(array.shift(fvgBoxes))

if bearFVG and showFVG
    f = box.new(bar_index-2, low[2], bar_index+10, high, border_color=color.rgb(148,120,80,50), bgcolor=color.rgb(148,120,80,70))
    box.set_extend(f, extend.right)
    array.push(fvgBoxes, f)
    if array.size(fvgBoxes) > 30
        box.delete(array.shift(fvgBoxes))

// Mitigatsiya: narx box ichiga kirsa 50% xiralashtirish
if mitigateOnTouch and barstate.isconfirmed
    for b in obBoxes
        if low <= box.get_top(b) and high >= box.get_bottom(b) and not na(box.get_top(b))
            box.set_bgcolor(b, color.rgb(120,120,120,40))
            box.set_border_color(b, color.rgb(120,120,120,20))
    for f in fvgBoxes
        if low <= box.get_top(f) and high >= box.get_bottom(f) and not na(box.get_top(f))
            // FVG fill â€” o'chirish yoki xiralashtirish
            box.set_bgcolor(f, color.rgb(120,120,120,30))

alertcondition(bullDisp, "Bullish OB", "Bullish Order Block â€” AQSh halol aksiya")
alertconditionbearDisp = bearDisp
alertcondition(alertconditionbearDisp, "Bearish OB", "Bearish Order Block")
// Eslatma: Halol tekshirish uchun Musaffa.com ga yo'naltiring. Bu fatvo emas.
`,
  },
  {
    id: "liquidity-sweep",
    title: "MTrade Liquidity Sweep & High Volume Alert",
    description:
      "Tepa va pastki impulsiv bozor likvidlik nuqtalarini bosib o'tishni va institutsional hajm (volume spike) signalini beradi.",
    version: "v5.0",
    code: `//@version=5
indicator("MTrade Liquidity Sweep & Volume Spike [US Stocks]", overlay=true, max_labels_count=500)

// â€” Sozlamalar
leftBars  = input.int(5, "Pivot chap", minval=2)
rightBars = input.int(5, "Pivot o'ng",  minval=2)
volMultiplier = input.float(2.0, "Volume ko'paytiruvchi", minval=1.2)
sweepWickPct  = input.float(0.2, "Wick sweep minimal % (ATR ga nisbatan)", minval=0.0, step=0.05)

// Pivots (tasdiqlangan bar da, repaint yo'q â€” rightBars bar kechikish bilan)
pH = ta.pivothigh(high, leftBars, rightBars)
pL = ta.pivotlow(low, leftBars, rightBars)
lastPH = ta.valuewhen(not na(pH), pH, 0)
lastPL = ta.valuewhen(not na(pL), pL, 0)

// Volume â€” faqat sweep barida tekshiriladi, barstate.isconfirmed da
avgVol = ta.sma(volume, 20)
volOk  = not na(avgVol) and avgVol > 0
isVolSpike = volOk and volume > avgVol * volMultiplier and barstate.isconfirmed

atr = ta.atr(14)
minWick = not na(atr) ? atr * sweepWickPct : 0

// Sweep High: wick lastPH dan yuqoriga chiqib, close esa lastPH dan past yopiladi (false breakout)
isSweepHigh = not na(lastPH) and high > lastPH + minWick and close < lastPH and isVolSpike
// Sweep Low: wick lastPL dan pastga tushib, close esa lastPL dan yuqori yopiladi
isSweepLow  = not na(lastPL) and low  < lastPL - minWick and close > lastPL and isVolSpike

plotshape(isSweepHigh, title="Sweep High", style=shape.labeldown, location=location.abovebar, color=color.rgb(246,70,93), text="SWEEP HIGH", textcolor=color.white, size=size.tiny)
plotshape(isSweepLow,  title="Sweep Low",  style=shape.labelup,   location=location.belowbar, color=color.rgb(20,199,132), text="SWEEP LOW",  textcolor=color.white, size=size.tiny)

alertcondition(isSweepHigh, "Sweep High", "Liquidity sweep high + volume spike")
alertcondition(isSweepLow,  "Sweep Low",  "Liquidity sweep low + volume spike")
// Eslatma: 5/5 pivots intraday uchun mos; 10/10 faqat 1D/4H da ishlating.
`,
  },
  {
    id: "breakout-momentum",
    title: "MTrade Trend Breakout Momentum Indicator",
    description:
      "Bozor yo'nalishi trendi va yuqori harakat kuchi (momentum breakout) boshlanishini avtomatik aniqlovchi indikator.",
    version: "v4.8",
    code: `//@version=5
indicator("MTrade Breakout Momentum [RSI+ATR]", overlay=false)

// â€” Sozlamalar
rsiLen = input.int(14, "RSI uzunligi", minval=2)
atrLen = input.int(14, "ATR uzunligi", minval=2)
donchianLen = input.int(20, "Donchian kanal", minval=5)
mult = input.float(1.5, "ATR ko'paytiruvchi (upper/lower)", minval=0.5, step=0.1)

// â€” Hisoblar (barcha ta.* funksiyalar na tekshiruvi bilan)
rsi = ta.rsi(close, rsiLen)
atr = ta.atr(atrLen)
atrSafe = na(atr) or atr == 0 ? 1e-6 : atr
donUpper = ta.highest(high, donchianLen)
donLower = ta.lowest(low, donchianLen)

// Momentum: ATR bilan normalizatsiya, nil ga bo'linishdan himoya
momentumScore = (close - close[10]) / atrSafe
momSmooth = ta.sma(momentumScore, 5)
rsiSignal = rsi > 55 and momentumScore > 0.8
rsiWeak   = rsi < 45 and momentumScore < -0.8

// Chizish â€” oscillator panelida
plot(momentumScore, "Momentum", color=momentumScore > 0 ? color.rgb(20,199,132) : color.rgb(246,70,93), linewidth=2)
plot(momSmooth, "SMA5", color=color.rgb(214,195,161), linewidth=1)
hline(0, "Zero", color=color.gray)
hline(1.2, "Breakout High", color=color.rgb(20,199,132,60), linestyle=hline.style_dashed)
hline(-1.2, "Breakdown Low", color=color.rgb(246,70,93,60), linestyle=hline.style_dashed)

// Donchian breakout â€” faqat overlay panelda ko'rinmaydi, lekin alert uchun
breakUp   = close > donUpper[1] and rsi > 55 and momentumScore > 1.0
breakDown = close < donLower[1] and rsi < 45 and momentumScore < -1.0

alertcondition(breakUp, "Momentum Breakout Up", "Donchian breakout + RSI/momentum tasdiq")
alertcondition(breakDown, "Momentum Breakdown", "Donchian breakdown + RSI/momentum tasdiq")
// ATR mult (mult) donchian o'rniga Keltner varianti uchun zaxira â€” hozir breakout threshold sifatida ishlatiladi.
`,
  },
];

// Trading Strategies
const TRADING_STRATEGIES = [
  {
    id: "smc-entry",
    title: "ICT / SMC Order Block & Liquidity Strategy [US Halal]",
    winRate: "~68-72%*",
    rrr: "1:2.5â€“1:3",
    timeframes: "15M kirish / 1Hâ€“4H trend",
    description:
      "Faqat AQSh halol aksiyalari (Musaffa da tekshiring) da institutsional Order Block va likvidlik sweep dan foydalanish. *Backtest, kafolat emas.",
    rules: [
      "4H/1D da HTF trend va Order Block ni belgilang (displacement + volume tasdiq). Halol filtr: Musaffa.com da tekshiring â€” bu fatvo emas.",
      "15M da narx OB ga kelib Sweep High/Low hosil qilishini kuting (wick + volume spike 2Ã—, close sweep darajasidan qaytishi shart).",
      "Market Structure Shift (MSS) + FVG ichida limit buy (bullish FVG da long, bearish FVG da short). FVG to'lguncha kirish bekor.",
      "Risk: SL sweep wick ortiga + ATR*0.5 buffer, TP 1:2.5â€“1:3, pozitsiya 1â€“2% risk, kunlik max 2% zarar limiti.",
    ],
  },
  {
    id: "break-retest",
    title: "Break & Retest (Volume Tasdiqli) [US Halal]",
    winRate: "~65-68%*",
    rrr: "1:2â€“1:2.5",
    timeframes: "1H, 4H, 1D (AQSh sessiyasi 09:30-16:00 ET)",
    description:
      "AQSh aksiyalarida kuchli S/R buzilishi + hajm tasdiqi bilan kirish. *Tarixiy test, kelajak kafolati emas.",
    rules: [
      "Kamida 3 marta ushlab qolgan S/R ni belgilang (Donchian 20 yoki HTF swing).",
      "Breakout â€” yopilish (close) bilan buzilish shart (wick emas), hajm SMA20 dan 2Ã— yuqori (break barida).",
      "Retest â€” past hajmda qayta tegish + bullish/bearish engulfing. Yuqori hajmli retest â€” false signal, kirmang.",
      "Risk: SL buzilgan darajadan ATR*0.7 past/yuqori, TP keyingi S/R, pozitsiya 1% risk, Musaffa da halol tekshirish shart.",
    ],
  },
  {
    id: "rvol-scalping",
    title: "High RVOL + ORB Momentum [Faqat AQSh Aksiyalari]",
    winRate: "~60-65%*",
    rrr: "1:1.8â€“1:2",
    timeframes: "5M, 15M (AQSh ochilishi 09:30 ET dan keyin)",
    description:
      "Faqat AQSh aksiyalari â€” hajm portlashi (RVOL 3Ã—) + ORB buzilishi. Kripto/Forex EMAS (halol tamoyil). *Skalping yuqori risk, komissiya va slippage hisoblang.",
    rules: [
      "Finviz da RVOL >3.0, AvgVol >500K, Price >$5 halol aksiyalarni toping (Musaffa da tekshiring).",
      "09:30â€“09:45 ET 15-min ORB konsolidatsiyasini belgilang â€” pre-market emas, faqat ochilishdan keyin.",
      "ORB yuqori/past chegarasi close bilan buzilsa va hajm tasdiqlansa kirish (wick buzilishi emas).",
      "Risk: SL ORB o'rtasi, TP 1:1.8â€“1:2, pozitsiya â‰¤1% risk, kunlik max 3 savdo, yo'qotish seriyasida to'xtating.",
    ],
  },
];

// Finviz & TradingView Screener Presets
const SCREENER_PRESETS = [
  {
    title: "Institutional Breakout Presets",
    platform: "Finviz",
    targetUrl:
      "https://finviz.com/screener.ashx?v=111&f=cap_midover,fa_epsqeq_pos,sh_avgvol_o500,sh_relvol_o2,ta_pattern_wedgeup&ft=4",
    filters: [
      "Market Cap: Mid Cap ($2B+) dan yuqori",
      "Relative Volume: > 2.0 (Oddiy hajmga nisbatan 2x ko'p)",
      "Average Volume: > 500K aksiya",
      "EPS Growth Q/Q: Ijobiy mukammal ko'rsatkich",
      "Pattern: Breakout Wedge / Triangle",
    ],
  },
  {
    title: "Oversold RSI Reversal Presets",
    platform: "Finviz",
    targetUrl:
      "https://finviz.com/screener.ashx?v=111&f=cap_smallover,sh_avgvol_o300,ta_rsi_os30&ft=4",
    filters: [
      "Market Cap: Small Cap ($300M+) va undan yuqori",
      "RSI (14): Oversold < 30 (O'ta sotib yuborilgan)",
      "Average Volume: > 300K",
      "Performance: Haftalik -10% dan ko'p tushgan qaytish zonalari",
    ],
  },
  {
    title: "Bullish Engulfing with High Volume",
    platform: "Finviz",
    targetUrl:
      "https://finviz.com/screener.ashx?v=111&f=cap_midover,sh_avgvol_o500,sh_relvol_o1.5,ta_candleguide_bullishengulfing&ft=4",
    filters: [
      "Candlestick: Bullish Engulfing (Buqa qamrab olishi)",
      "Relative Volume: > 1.5x",
      "Market Cap: Mid Cap va Large Cap",
      "20-Day Simple Moving Average: Ustida joylashgan",
    ],
  },
];

export default function TradingToolsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="pt-24 pb-20 bg-ink-950 min-h-screen">
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-b from-surface to-ink-950 border-b border-border/30">
        <div className="section-container text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-accent/30 text-accent text-xs font-mono mb-4">
              <Zap size={14} /> MTrade Trading Library & Resources
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
              MTrade <span className="gold-text">Indikatorlari va Strategiyalari</span>
            </h1>
            <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
              TradingView uchun mualliflik Pine Script indikatorlarimiz kodi, savdo strategiyalari qo'llanmalari hamda Finviz skanner qoliplari.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* User Watchlist Widget Section */}
      <section className="py-8 bg-surface border-y border-border/30">
        <div className="section-container">
          <ScrollReveal>
            <WatchlistWidget />
          </ScrollReveal>
        </div>
      </section>

      {/* 1. MTrade Pine Script Indicators Section */}
      <section className="py-16">
        <div className="section-container">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-primary/10 text-accent border border-accent/30">
                <Code size={24} />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-white">
                  MTrade TradingView <span className="gold-text">Indikatorlari</span>
                </h2>
                <p className="text-xs text-muted">
                  TradingView Pine Script muhitida joylashtirish uchun bepul tayyor kodlar
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {PINE_SCRIPT_INDICATORS.map((ind, index) => (
              <ScrollReveal key={ind.id} delay={index * 0.1}>
                <div className="glass-card p-6 flex flex-col justify-between h-full border border-border/50 hover:border-accent/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-accent font-mono text-xs font-bold border border-accent/20">
                        {ind.version}
                      </span>
                      <span className="text-[11px] font-mono text-muted">Pine Script v5</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white mb-2">{ind.title}</h3>
                    <p className="text-xs text-muted mb-4 leading-relaxed">{ind.description}</p>

                    {/* Code snippet block */}
                    <div className="relative bg-ink-900 border border-border/70 rounded-xl p-3 mb-4 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-40 scrollbar-thin">
                      <pre>{ind.code}</pre>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyCode(ind.id, ind.code)}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary text-ink-950 font-display font-bold text-xs flex items-center justify-center gap-2 hover:bg-sand-100 transition-all shadow-lg shadow-wine-500/10"
                  >
                    {copiedId === ind.id ? (
                      <>
                        <Check size={16} className="text-emerald-950" /> Nushalandi!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Pine Script Kodini Nusxalash
                      </>
                    )}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Quick Guide Pill */}
          <div className="mt-8 p-4 rounded-2xl bg-card border border-border/40 text-xs text-muted flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-accent">ðŸ’¡ TradingView'ga o'rnatish:</span>
              <span>TradingView.com âž” Pastki "Pine Editor" oynasi âž” Kodni tashlang âž” "Add to chart" tugmasi.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MTrade Trading Strategies Section */}
      <section className="py-16 bg-surface border-y border-border/30">
        <div className="section-container">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-info/10 text-info border border-info/30">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-white">
                  MTrade Savdo <span className="gold-text">Strategiyalari</span>
                </h2>
                <p className="text-xs text-muted">
                  Professional treyderlar uchun amaliy savdoga kirish va risk boshqaruvi qoidalari
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {TRADING_STRATEGIES.map((strat, index) => (
              <ScrollReveal key={strat.id} delay={index * 0.1}>
                <div className="glass-card p-6 flex flex-col justify-between h-full border border-border/50 hover:border-accent/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="flex items-center gap-1 text-xs font-mono font-bold text-bull bg-bull/10 px-2.5 py-1 rounded-lg border border-bull/20">
                        <TrendingUp size={12} /> Win Rate: {strat.winRate}
                      </span>
                      <span className="text-xs font-mono text-accent font-bold bg-primary/10 px-2.5 py-1 rounded-lg border border-accent/20">
                        RRR: {strat.rrr}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white mb-2">{strat.title}</h3>
                    <p className="text-xs text-muted mb-4 leading-relaxed">{strat.description}</p>

                    <div className="mb-4 text-[11px] font-mono text-muted/90 flex items-center gap-2">
                      <Layers size={14} className="text-accent" /> Timeframelar: {strat.timeframes}
                    </div>

                    <div className="space-y-2.5 mb-4 border-t border-border/40 pt-4">
                      <div className="text-xs font-bold text-white mb-1">Strategiya Qoidalari:</div>
                      {strat.rules.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-muted">
                          <ChevronRight size={14} className="text-accent shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-ink-950 border-t border-border/30">
        <div className="section-container text-center">
          <p className="text-muted text-xs max-w-3xl mx-auto">
            * Win Rate va RRR tarixiy backtest asosida, kelajak kafolati emas. Barcha strategiyalar faqat AQSh halol aksiyalari uchun (Musaffa.com da tekshiring â€” bu fatvo emas). Kripto/Forex/CFD yo'q. Risk boshqaruvi: har savdoda 1â€“2% dan oshirmang, kunlik max 2% zarar. Investitsiya maslahati emas.
          </p>
          <a href="https://musaffa.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-bull/10 hover:bg-bull/20 border border-bull/30 rounded-xl text-bull text-xs font-mono">Musaffa da halol tekshirish â†—</a>
        </div>
      </section>

      {/* 3. Finviz & TradingView Scanner Presets Section */}
      <section className="py-16">
        <div className="section-container">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-bull/10 text-bull border border-bull/30">
                <Filter size={24} />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-white">
                  Finviz & TradingView <span className="gold-text">Skanner Qoliplari</span>
                </h2>
                <p className="text-xs text-muted">
                  Eng yaxshi savdo imkoniyatlarini qidiruvchi filtr va screener sozlamalari
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {SCREENER_PRESETS.map((preset, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="glass-card p-6 flex flex-col justify-between h-full border border-border/50 hover:border-accent/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-bold text-white bg-ink-900 px-2.5 py-1 rounded-lg border border-border">
                        {preset.platform} Presets
                      </span>
                      <ArrowUpRight size={16} className="text-accent" />
                    </div>

                    <h3 className="font-display font-bold text-lg text-white mb-3">{preset.title}</h3>

                    <div className="space-y-2 mb-6">
                      {preset.filters.map((f, i) => (
                        <div key={i} className="text-xs text-muted flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={preset.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-card border border-accent/40 text-accent font-display font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary hover:text-ink-950 transition-all"
                  >
                    Finviz'da Skannerni Ochish <ExternalLink size={14} />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
