import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import { ChevronDown, BookOpen, Video, Users } from "lucide-react";

const premiumModules = [
  {
    num: "01",
    title: "KIRISH",
    topics: [
      "Kurs nima haqida? Taqdimot",
      "Darslik rejasi va yo'riqnoma",
      "Trading va Investitsiya farqlari",
    ],
  },
  {
    num: "02",
    title: "KIRISH VA ASOSLAR",
    topics: [
      "Savdo instrumentlari (Stock, BTC, Forex, XAU)",
      "Birja nima? Tarix va shakllanishi",
      "Fond birjasi — NYSE, NASDAQ, UZEX",
      "Halol savdo turlari (dalillar bilan)",
      "Treyding Joizmi? (Bu fatvo emas!)",
    ],
  },
  {
    num: "03",
    title: "BROKERLAR VA PLATFORMALAR",
    topics: [
      "Market Maker, Broker va savdo jarayoni",
      "TradingView — o'rnatish va interfeys",
      "IBKR (Interactive Brokers) tanishuv",
      "Webull — mobile-first platform",
      "Savdoni rejalashtirish",
    ],
  },
  {
    num: "04",
    title: "ACCOUNTLAR VA TO'LOV",
    topics: [
      "Brokerdan ro'yxatdan o'tish",
      "Cash akkaunt — qoidalar",
      "Margin akkaunt — afzallik va xavflar",
      "Qay biri joiz? Dalillar bilan tanlov",
      "IBKR pul chiqarish (Visa)",
    ],
  },
  {
    num: "05",
    title: "TEXNIK TAHLIL ASOSLARI",
    topics: [
      "Grafik turlari: Chiziqli, Bar, Candlestick",
      "Candlestick anatomiyasi (wick, body, gap)",
      "Talab va Taklif (Support / Resistance)",
      "Trend turlari va trend chizig'i",
      "Gap, Breakout va Break down",
      "Texnik tahlil. Patternlar",
    ],
  },
  {
    num: "06",
    title: "TEXNIK INDIKATOR",
    topics: [
      "Indikator nima va qanday ishlaydi",
      "Momentum: RSI, Stochastic",
      "Trend: EMA, SMA, WMA, Fibonacci",
      "Indikatorlar 2 — MACD, VWAP",
      "Volatillik: Bollinger Bands, ATR",
    ],
  },
  {
    num: "07",
    title: "AKSIYA QIDIRISH (SCREENING)",
    topics: [
      "Finviz.com — professional screener",
      "Yahoo Finance va StockAnalysis",
      "Webull built-in screener",
      "Sektor tahlili va lider aksiyalar",
      "Screening 2. Saytlar",
    ],
  },
  {
    num: "08",
    title: "FUNDAMENTAL TAHLIL",
    topics: [
      "Fundamental vs Texnik tahlil",
      "P/E, P/C, P/S, PEG ratiolar",
      "Margin, ROE, ROA, ROI",
      "Beta, Debt, Short ratio — risk",
      "Economic asoslari (GDP, CPI, PPI)",
      "Sentimental tahlil va yangiliklar",
      "Aksiya tahlili AI (Sun'iy intelekt)",
    ],
  },
  {
    num: "09",
    title: "AMALIY STRATEGIYALAR",
    topics: [
      "Savdo turlari (Scalping, Day, Swing)",
      "Savdo rejalashtirish va Risk Management",
      "Trend-follow strategiyasi (20/50 EMA)",
      "Breakout / Pullback (Volume + S/R)",
      "Penny stock (Swing trade)",
    ],
  },
  {
    num: "10",
    title: "QO'SHIMCHA",
    topics: [
      "Halol aksiyalar va fond bozori tushunchasi",
      "Treyding psixologiyasi (FOMO, revenge)",
      "AI bilan strategiya yaratish",
      "Savdo jurnali (Excel, Notion) + AI",
    ],
  },
];

const hybridModules = [
  {
    num: "B1",
    title: "BOSQICH 1: ASOSIY AMALIYOT (3 hafta)",
    weeks: [
      {
        w: "Hafta 01",
        title: "Asoslar va Platformalar",
        topics: [
          "NYSE · NASDAQ, TradingView, IBKR · Webull",
          "Market / Limit / Stop buyurtmalar",
          "Candlestick, Support / Resistance",
        ],
      },
      {
        w: "Hafta 02",
        title: "Fundamental va Strategik Asoslar",
        topics: [
          "GDP / CPI / PPI, AI tahlil, Finviz screener",
          "Risk / Reward, Treyd jurnal",
        ],
      },
      {
        w: "Hafta 03",
        title: "Strategiyalar, Psixologiya va Shaxsiy Kapital",
        topics: [
          "Trend-follow, Breakout, Penny stock",
          "FOMO / Revenge, AI prompt, Risk boshqaruvi",
        ],
      },
    ],
  },
  {
    num: "B2",
    title: "BOSQICH 2: REAL BOZOR SESSIYALARI (3 hafta)",
    weeks: [
      {
        w: "Hafta 04",
        title: "TradingView Live Amaliyot",
        topics: [
          "Paper trading, Chart setup, Pattern recognition",
          "TradingView Replay, Drawing tools",
        ],
      },
      {
        w: "Hafta 05",
        title: "Webull va IBKR — Real Platformalarda",
        topics: [
          "Real order placement, Level 2 data",
          "Bracket orders, Cash vs Margin, Withdraw (Visa)",
        ],
      },
      {
        w: "Hafta 06",
        title: "Fundamental Tahlil Amaliyoti",
        topics: [
          "Live screening, AI company review",
          "TSLA / NVDA / HIMS, Portfel, News analysis",
        ],
      },
    ],
  },
  {
    num: "B3",
    title: "BOSQICH 3: AMALIY STRATEGIYALAR (2 hafta)",
    weeks: [
      {
        w: "Hafta 07",
        title: "Strategiya Amaliyoti — Real Setup'lar",
        topics: [
          "Live setup, Entry / Exit, Stop Loss / TP",
          "Position sizing, Daily P/L",
        ],
      },
      {
        w: "Hafta 08",
        title: "Shaxsiy Kapital va Portfolio Boshqaruvi",
        topics: [
          "Portfel shakllantirish va kapitalni saqlash",
          "Risk-reward balansi, Drawdown rules, Scale-up plan",
        ],
      },
    ],
  },
  {
    num: "B4",
    title: "BOSQICH 4: PROFESSIONAL DARAJA (1 hafta)",
    weeks: [
      {
        w: "Hafta 09",
        title: "Shaxsiy Savdo Plani va Sertifikat",
        topics: [
          "1:1 mentor sessiya, Shaxsiy plan",
          "Advanced AI prompts, Premium kommyuniti",
          "Final test, Sertifikat",
        ],
      },
    ],
  },
];

const offlineModules = [
  {
    num: "OFF-1",
    title: "BOSQICH 1: INTENSIV ASOSLAR VA PLATFORMALAR (2 Hafta)",
    weeks: [
      {
        w: "Hafta 01-02",
        title: "Offlayn Yuzma-yuz Darslar & Platforma Sozlamalari",
        topics: [
          "10 kishilik mini guruhda jonli muloqot hamda 1:1 mentorlik",
          "Noutbukda TradingView, Webull va IBKR platformalarini sozlash",
          "NYSE, NASDAQ va Halol aksiyalar filtratsiyasi (Shaxsiy noutbuk shart)",
          "Darslar jadvali: Kun ora (Haftada 3 kun: Dush-Chor-Jum / Ses-Pay-Shan)",
        ],
      },
    ],
  },
  {
    num: "OFF-2",
    title: "BOSQICH 2: REAL BOZORDA JONLI SESSIYALAR (3 Hafta)",
    weeks: [
      {
        w: "Hafta 03-05",
        title: "Toshkent Coworkingda Real Savdo Sessiyalari",
        topics: [
          "Toshkent shahri markazidagi zamonaviy Coworking zalida jonli savdo",
          "Real vaqtda orderlar joylashtirish (Level 2 data, Cash vs Margin)",
          "Aksiya tahlili: NVDA, AAPL, TSLA, MSFT amaliy tahlillari",
          "Sektorlar va fundamental yangiliklar oqimini tahlil qilish",
        ],
      },
    ],
  },
  {
    num: "OFF-3",
    title: "BOSQICH 3: STRATEGIYA VA SHAXSIY JURNAL (2 Hafta)",
    weeks: [
      {
        w: "Hafta 06-07",
        title: "Strategiyalar va Risk-Menedjment",
        topics: [
          "Trend-follow, Breakout va Pullback intensiv strategiyalari",
          "Position sizing va qat'iy risk boshqaruvi qoidalari",
          "Har bir o'quvchining savdo jurnalini mentor bilan 1:1 tahlili",
        ],
      },
    ],
  },
  {
    num: "OFF-4",
    title: "BOSQICH 4: SHAXSIY PLAN HIMOYASI VA SERTIFIKAT (1 Hafta)",
    weeks: [
      {
        w: "Hafta 08",
        title: "Yakuniy Test, Plan Himoyasi va Sertifikat",
        topics: [
          "Shaxsiy savdo rejasini (Trading Plan) taqdim etish va himoya qilish",
          "Fond bozori va mustaqil treyding bo'yicha yakuniy tavsiyalar",
          "MTrade Academy rasmiy Sertifikatini topshirish marosimi",
        ],
      },
    ],
  },
];

export default function SyllabusPage() {
  const [activeTab, setActiveTab] = useState<"premium" | "hybrid" | "offline">("premium");
  const [openModule, setOpenModule] = useState<number | null>(0);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-mblack to-mdark">
        <div className="section-container text-center">
          <ScrollReveal>
            <h1 className="font-sora font-extrabold text-4xl sm:text-5xl text-white mb-4">
              O'quv <span className="gold-text">dasturi</span>
            </h1>
            <p className="text-mgray max-w-2xl mx-auto">
              Tizimli va to'liq qamrovli dastur — 0 dan professional darajagacha.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 bg-mblack">
        <div className="section-container max-w-4xl">
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 rounded-xl bg-mcard border border-mborder flex-wrap justify-center gap-1">
              <button
                onClick={() => {
                  setActiveTab("premium");
                  setOpenModule(0);
                }}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  activeTab === "premium"
                    ? "gold-gradient-bg text-mblack font-bold"
                    : "text-mgray hover:text-white"
                }`}
              >
                <BookOpen size={16} />
                Online Premium
              </button>
              <button
                onClick={() => {
                  setActiveTab("hybrid");
                  setOpenModule(0);
                }}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  activeTab === "hybrid"
                    ? "gold-gradient-bg text-mblack font-bold"
                    : "text-mgray hover:text-white"
                }`}
              >
                <Video size={16} />
                Masofaviy Gibrid
              </button>
              <button
                onClick={() => {
                  setActiveTab("offline");
                  setOpenModule(0);
                }}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  activeTab === "offline"
                    ? "gold-gradient-bg text-mblack font-bold"
                    : "text-mgray hover:text-white"
                }`}
              >
                <Users size={16} />
                Offline Akademiya (8 hafta)
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === "premium" && (
            <div className="space-y-3">
              {premiumModules.map((mod, i) => (
                <ScrollReveal key={mod.num} delay={i * 0.05}>
                  <div className="glass-card overflow-hidden">
                    <button
                      onClick={() =>
                        setOpenModule(openModule === i ? null : i)
                      }
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono font-bold text-mgold text-lg">
                          {mod.num}
                        </span>
                        <span className="font-sora font-semibold text-white">
                          {mod.title}
                        </span>
                        <span className="text-mgray text-xs bg-mcard2 px-2 py-1 rounded-full hidden sm:inline">
                          {mod.topics.length} mavzu
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: openModule === i ? 180 : 0 }}
                      >
                        <ChevronDown
                          size={20}
                          className="text-mgold shrink-0"
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openModule === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 pb-5 border-t border-mborder/50 pt-4">
                            <ul className="space-y-2">
                              {mod.topics.map((topic, j) => (
                                <li
                                  key={topic}
                                  className="flex items-start gap-3 text-sm"
                                >
                                  <span className="text-mgold font-mono text-xs mt-0.5 shrink-0">
                                    {mod.num}.{j + 1}
                                  </span>
                                  <span className="text-mgray">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {activeTab === "hybrid" && (
            <div className="space-y-6">
              {hybridModules.map((block, bi) => (
                <div key={block.num}>
                  <ScrollReveal delay={bi * 0.1}>
                    <h3 className="font-sora font-bold text-xl text-mgold mb-4">
                      {block.title}
                    </h3>
                  </ScrollReveal>
                  <div className="space-y-3">
                    {block.weeks.map((week, wi) => (
                      <ScrollReveal
                        key={week.w}
                        delay={bi * 0.1 + wi * 0.05}
                      >
                        <div className="glass-card p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-mgold font-mono text-sm font-bold">
                              {week.w}
                            </span>
                            <span className="font-sora font-medium text-white">
                              {week.title}
                            </span>
                          </div>
                          <ul className="space-y-1 ml-16">
                            {week.topics.map((t) => (
                              <li
                                key={t}
                                className="text-mgray text-sm flex items-start gap-2"
                              >
                                <span className="text-mgold mt-1.5 w-1 h-1 rounded-full bg-mgold shrink-0" />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "offline" && (
            <div className="space-y-6">
              {offlineModules.map((block, bi) => (
                <div key={block.num}>
                  <ScrollReveal delay={bi * 0.1}>
                    <h3 className="font-sora font-bold text-xl text-mgold mb-4">
                      {block.title}
                    </h3>
                  </ScrollReveal>
                  <div className="space-y-3">
                    {block.weeks.map((week, wi) => (
                      <ScrollReveal
                        key={week.w}
                        delay={bi * 0.1 + wi * 0.05}
                      >
                        <div className="glass-card p-5 border border-mgold/30">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-mgold font-mono text-sm font-bold">
                              {week.w}
                            </span>
                            <span className="font-sora font-medium text-white">
                              {week.title}
                            </span>
                          </div>
                          <ul className="space-y-1.5 ml-4 sm:ml-12">
                            {week.topics.map((t) => (
                              <li
                                key={t}
                                className="text-mgray text-sm flex items-start gap-2"
                              >
                                <span className="text-mgold mt-1.5 w-1.5 h-1.5 rounded-full bg-mgold shrink-0" />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
