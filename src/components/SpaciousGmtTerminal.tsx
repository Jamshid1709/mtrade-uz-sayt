import { useState } from "react";
import { TOP_STOCKS } from "./StockSphere3D";
import { SECTOR_COLORS } from "./StockConstellation3D";
import { Activity, TrendingUp, TrendingDown, Newspaper, ArrowUpRight, Flame, BarChart3, ExternalLink } from "lucide-react";

export default function SpaciousGmtTerminal() {
  const [activeTab, setActiveTab] = useState<"overview" | "gainers" | "news">("overview");
  const [selectedNewsSector, setSelectedNewsSector] = useState<string>("ALL");

  // Filter top gainers & top losers
  const sortedByChange = [...TOP_STOCKS].sort((a, b) => b.change - a.change);
  const topGainers = sortedByChange.slice(0, 6);
  const topLosers = [...sortedByChange].reverse().slice(0, 6);

  // Market Breadth calculation
  const totalStocks = TOP_STOCKS.length;
  const advancersCount = TOP_STOCKS.filter((s) => s.change > 0).length;
  const declinersCount = TOP_STOCKS.filter((s) => s.change < 0).length;
  const unchangedCount = totalStocks - advancersCount - declinersCount;
  const advancerRatio = ((advancersCount / totalStocks) * 100).toFixed(1);

  // Sample Stock Market News Wire
  const NEWS_ITEMS = [
    {
      time: "16:45",
      sector: "Technology",
      headline: "NVIDIA hamda TSMC yarimo'tkazgichlar ishlab chiqarish hajmida yangi rekord ko'rsatkichni qayd etdi",
      tickers: ["NVDA", "TSM"],
    },
    {
      time: "15:30",
      sector: "Consumer Cyclical",
      headline: "Amazon va Walmart choraklik moliyaviy daromad hisobotida kutilgandan 12% yuqori o'sish ko'rsatdi",
      tickers: ["AMZN", "WMT"],
    },
    {
      time: "14:15",
      sector: "Communication",
      headline: "Meta Platforms AI infratuzilmasiga qo'shimcha $10B sarflashini va yangi model ishga tushganini bildirdi",
      tickers: ["META"],
    },
    {
      time: "12:00",
      sector: "Healthcare",
      headline: "Eli Lilly va AbbVie yangi dori vositalari sinovidan muvaffaqiyatli o'tib, aksiyalari ko'tarildi",
      tickers: ["LLY", "ABBV"],
    },
    {
      time: "10:30",
      sector: "Financial Services",
      headline: "JPMorgan va Bank of America dividendlar miqdorini oshirishini hamda balans barqarorligini e'lon qildi",
      tickers: ["JPM", "BAC"],
    },
  ];

  const filteredNews =
    selectedNewsSector === "ALL"
      ? NEWS_ITEMS
      : NEWS_ITEMS.filter((n) => n.sector === selectedNewsSector);

  const handleOpenExternal = (symbol: string) => {
    window.open(`https://finviz.com/quote.ashx?t=${symbol}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#0B0C10] via-mblack to-[#0B0C10] py-12 px-4 sm:px-6 rounded-3xl border border-mborder/50 shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mgold/10 border border-mgold/30 text-mgold text-xs font-mono mb-2">
            <Activity size={14} /> Spacious GMT Market Terminal
          </div>
          <h2 className="font-sora font-extrabold text-2xl sm:text-3xl text-white">
            Institutional <span className="gold-text">Aksiya Bozorlari Monitori</span>
          </h2>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center bg-mcard border border-mborder p-1 rounded-2xl text-xs font-mono">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === "overview" ? "bg-mgold text-mblack font-bold shadow-lg" : "text-mgray hover:text-white"
            }`}
          >
            <BarChart3 size={15} /> Bozor Umumiy Tahlili
          </button>
          <button
            onClick={() => setActiveTab("gainers")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === "gainers" ? "bg-mgold text-mblack font-bold shadow-lg" : "text-mgray hover:text-white"
            }`}
          >
            <Flame size={15} /> Top Gainers & Losers
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === "news" ? "bg-mgold text-mblack font-bold shadow-lg" : "text-mgray hover:text-white"
            }`}
          >
            <Newspaper size={15} /> Aksiya Yangiliklari
          </button>
        </div>
      </div>

      {/* 1. Market Breadth Banner */}
      <div className="mb-8 p-5 rounded-2xl bg-mcard/70 border border-mborder/40">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">MARKET BREADTH:</span>
            <span className="text-mgreen font-bold">{advancersCount} O'sayotgan</span>
            <span className="text-mgray">|</span>
            <span className="text-mred font-bold">{declinersCount} Tushayotgan</span>
            <span className="text-mgray">|</span>
            <span className="text-mgray">{unchangedCount} O'zgarmagan</span>
          </div>
          <div className="text-mgold font-bold">Advancers Ratio: {advancerRatio}%</div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-3 rounded-full bg-mcard2 overflow-hidden flex">
          <div style={{ width: `${advancerRatio}%` }} className="bg-mgreen h-full transition-all duration-500" />
          <div style={{ width: `${100 - Number(advancerRatio)}%` }} className="bg-mred h-full transition-all duration-500" />
        </div>
      </div>

      {/* TAB CONTENT 1: Overview (Spacious Sector Cards) */}
      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Technology", "Consumer Cyclical", "Healthcare", "Financial Services", "Communication", "Energy"].map((sec) => {
            const secStocks = TOP_STOCKS.filter((s) => s.sector === sec).slice(0, 4);
            const secColor = SECTOR_COLORS[sec] || "#D6C3A1";

            return (
              <div
                key={sec}
                className="glass-card p-5 border border-mborder/50 hover:border-mgold/40 transition-all rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-mborder/40">
                    <span className="font-sora font-bold text-base text-white flex items-center gap-2">
                      <span style={{ backgroundColor: secColor }} className="w-2.5 h-2.5 rounded-full" />
                      {sec}
                    </span>
                    <span style={{ color: secColor }} className="font-mono text-xs font-bold">
                      {secStocks.length} Top Stocks
                    </span>
                  </div>

                  {/* Stock items list */}
                  <div className="space-y-3">
                    {secStocks.map((st) => (
                      <div
                        key={st.symbol}
                        onClick={() => handleOpenExternal(st.symbol)}
                        className="p-2.5 rounded-xl bg-mcard/60 hover:bg-mgold/10 border border-mborder/30 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <span className="font-mono font-bold text-white text-xs">{st.symbol}</span>
                          <span className="text-[11px] text-mgray ml-2">{st.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-xs font-bold ${
                              st.change >= 0 ? "text-mgreen" : "text-mred"
                            }`}
                          >
                            {st.change >= 0 ? "+" : ""}{st.change}%
                          </span>
                          <ArrowUpRight size={12} className="text-mgray" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB CONTENT 2: Top Gainers & Losers */}
      {activeTab === "gainers" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Gainers */}
          <div className="glass-card p-6 border border-mgreen/30 rounded-2xl">
            <div className="flex items-center gap-2 font-sora font-bold text-lg text-mgreen mb-4">
              <TrendingUp size={20} /> Eng ko'p o'sayotgan aksiyalar (Top Gainers)
            </div>
            <div className="space-y-3">
              {topGainers.map((st) => (
                <div
                  key={st.symbol}
                  onClick={() => handleOpenExternal(st.symbol)}
                  className="p-3 rounded-xl bg-mcard/80 hover:bg-mgreen/10 border border-mborder/40 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <span className="font-mono font-bold text-white text-sm">{st.symbol}</span>
                    <span className="text-xs text-mgray ml-2 font-sans">{st.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-mgold font-mono font-bold">{st.capFormatted}</span>
                    <span className="font-mono text-sm font-bold text-mgreen bg-mgreen/10 px-2 py-0.5 rounded-md">
                      +{st.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Losers */}
          <div className="glass-card p-6 border border-mred/30 rounded-2xl">
            <div className="flex items-center gap-2 font-sora font-bold text-lg text-mred mb-4">
              <TrendingDown size={20} /> Eng ko'p tushayotgan aksiyalar (Top Losers)
            </div>
            <div className="space-y-3">
              {topLosers.map((st) => (
                <div
                  key={st.symbol}
                  onClick={() => handleOpenExternal(st.symbol)}
                  className="p-3 rounded-xl bg-mcard/80 hover:bg-mred/10 border border-mborder/40 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <span className="font-mono font-bold text-white text-sm">{st.symbol}</span>
                    <span className="text-xs text-mgray ml-2 font-sans">{st.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-mgold font-mono font-bold">{st.capFormatted}</span>
                    <span className="font-mono text-sm font-bold text-mred bg-mred/10 px-2 py-0.5 rounded-md">
                      {st.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: News Wire */}
      {activeTab === "news" && (
        <div>
          {/* News Sector Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-xs">
            {["ALL", "Technology", "Consumer Cyclical", "Communication", "Healthcare", "Financial Services"].map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedNewsSector(sec)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedNewsSector === sec
                    ? "bg-mgold text-mblack font-bold border-mgold"
                    : "bg-mcard border-mborder text-mgray hover:text-white"
                }`}
              >
                {sec === "ALL" ? "Barcha Yangiliklar" : sec}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredNews.map((news, idx) => (
              <div
                key={idx}
                className="glass-card p-4 border border-mborder/40 hover:border-mgold/40 transition-all rounded-2xl flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="font-mono text-xs text-mgold font-bold bg-mgold/10 px-2.5 py-1 rounded-lg border border-mgold/20 shrink-0">
                    {news.time}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1 leading-snug">{news.headline}</div>
                    <div className="text-[11px] text-mgray font-mono flex items-center gap-2">
                      <span>Sektor: {news.sector}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {news.tickers.map((sym) => (
                    <button
                      key={sym}
                      onClick={() => handleOpenExternal(sym)}
                      className="px-2.5 py-1 rounded-lg bg-mcard2 border border-mborder text-xs font-mono font-bold text-mgold hover:border-mgold transition-colors flex items-center gap-1"
                    >
                      {sym} <ExternalLink size={10} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
