import { useEffect, useRef } from "react";
import ScrollReveal from "../components/ScrollReveal";
import StockSphere3D from "../components/StockSphere3D";
import StockConstellation3D from "../components/StockConstellation3D";
import SpaciousGmtTerminal from "../components/SpaciousGmtTerminal";
import LiveChartSection from "../components/LiveChartSection";
import { AlertTriangle } from "lucide-react";

// TradingView widget wrapper
function TVWidget({
  widgetSrc,
  config,
  containerId,
  className = "",
}: {
  widgetSrc: string;
  config: object;
  containerId: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';

    const script = document.createElement("script");
    script.src = widgetSrc;
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);

    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [widgetSrc, JSON.stringify(config)]);

  return (
    <div
      ref={ref}
      id={containerId}
      className={`tradingview-widget-container ${className}`}
    >
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}

// Top Halal Stocks for quotes
const topStocksQuote = [
  { name: "NVIDIA Corp", symbol: "NASDAQ:NVDA" },
  { name: "Apple Inc", symbol: "NASDAQ:AAPL" },
  { name: "Microsoft", symbol: "NASDAQ:MSFT" },
  { name: "Amazon.com", symbol: "NASDAQ:AMZN" },
];

export default function MarketsPage() {
  return (
    <div className="pt-20 bg-ink-950 text-white">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-ink-950 to-surface">
        <div className="section-container text-center">
          <ScrollReveal>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
              Aksiya <span className="gold-text">Bozori va 3D Galaxy</span>
            </h1>
            <p className="text-muted max-w-2xl mx-auto">
              Real vaqt ma'lumotlari â€” 100+ Halal aksiyalar yulduz turqumi, 3D shari va GMT Terminali.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 1. 3D Stock Constellation Galaxy Network (Connectome Style) */}
      <section className="py-8 bg-ink-950">
        <div className="section-container">
          <ScrollReveal>
            <StockConstellation3D />
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Spacious GMT Market Terminal Hub */}
      <section className="py-10 bg-surface border-t border-border/30">
        <div className="section-container">
          <ScrollReveal>
            <SpaciousGmtTerminal />
          </ScrollReveal>
        </div>
      </section>

      {/* 3. 3D Interactive Stock Sphere */}
      <section className="py-8 bg-ink-950">
        <div className="section-container">
          <ScrollReveal>
            <StockSphere3D />
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Live Chart & Economic Calendar Section */}
      <section className="py-10 bg-surface border-t border-border/30">
        <div className="section-container">
          <LiveChartSection />
        </div>
      </section>

      {/* 5. Ticker Tape â€” Stocks Only (Fixed Symbols, No Red Dots) */}
      <section className="bg-ink-950 border-y border-border/30">
        <TVWidget
          containerId="tv-ticker"
          widgetSrc="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
          config={{
            symbols: [
              { proName: "NASDAQ:NVDA", title: "NVIDIA" },
              { proName: "NASDAQ:AAPL", title: "Apple" },
              { proName: "NASDAQ:MSFT", title: "Microsoft" },
              { proName: "NASDAQ:AMZN", title: "Amazon" },
              { proName: "NASDAQ:GOOGL", title: "Alphabet" },
              { proName: "NASDAQ:META", title: "Meta" },
              { proName: "NYSE:TSLA", title: "Tesla" },
              { proName: "NASDAQ:AVGO", title: "Broadcom" },
              { proName: "NYSE:WMT", title: "Walmart" },
              { proName: "NYSE:LLY", title: "Eli Lilly" },
              { proName: "NYSE:JPM", title: "JPMorgan" },
              { proName: "NASDAQ:AMD", title: "AMD" },
            ],
            showSymbolLogo: true,
            isTransparent: false,
            displayMode: "adaptive",
            colorTheme: "dark",
            locale: "en",
          }}
        />
      </section>

      {/* 6. Top Stock Quotes Grid */}
      <section className="py-12 bg-ink-950">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="font-display font-bold text-2xl text-white mb-8">
              Top <span className="gold-text">Aksiyalar Kotirovkalari</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topStocksQuote.map((st, i) => (
              <ScrollReveal key={st.symbol} delay={i * 0.1}>
                <div className="glass-card p-4">
                  <p className="text-muted text-xs font-mono mb-2">{st.name}</p>
                  <TVWidget
                    containerId={`tv-quote-${i}`}
                    widgetSrc="https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js"
                    config={{
                      symbol: st.symbol,
                      width: "100%",
                      colorTheme: "dark",
                      isTransparent: true,
                      locale: "en",
                    }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Stock Screener Table */}
      <section className="py-12 bg-surface">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="font-display font-bold text-2xl text-white mb-8">
              AQSh Aksiyalar <span className="gold-text">Skanneri</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card overflow-hidden">
              <TVWidget
                containerId="tv-screener"
                widgetSrc="https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
                config={{
                  width: "100%",
                  height: 520,
                  defaultColumn: "overview",
                  defaultScreen: "most_capitalized",
                  market: "america",
                  showToolbar: true,
                  colorTheme: "dark",
                  locale: "en",
                  isTransparent: true,
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. Sector Heatmap */}
      <section className="py-12 bg-ink-950">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="font-display font-bold text-2xl text-white mb-8">
              Aksiyalar <span className="gold-text">Sektorlar Issiqlik Xaritasi</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card p-2">
              <TVWidget
                containerId="tv-heatmap"
                widgetSrc="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
                config={{
                  exchanges: [],
                  dataSource: "SPX500",
                  grouping: "sector",
                  blockSize: "market_cap_basic",
                  blockColor: "change",
                  locale: "en",
                  symbolUrl: "",
                  colorTheme: "dark",
                  hasTopBar: true,
                  isDataSetEnabled: false,
                  isZoomEnabled: true,
                  hasSymbolTooltip: true,
                  isMonoSize: false,
                  width: "100%",
                  height: 600,
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Musaffa Halol Disclaimer */}
      <section className="py-6 bg-surface border-t border-border/30">
        <div className="section-container text-center">
          <p className="text-muted text-xs max-w-2xl mx-auto mb-3">
            Halol yoki Not halal ekanligini aniqlash katta mas'uliyat. Biz to'g'ridan-to'g'ri hukm chiqarmaymiz â€” tekshirish uchun ishonchli manbaga yo'naltiramiz.
          </p>
          <a
            href="https://musaffa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-bull/10 hover:bg-bull/20 border border-bull/30 rounded-xl text-bull text-xs font-mono transition-colors"
          >
            Musaffa da halol aksiyalarni tekshirish â†—
          </a>
          <p className="text-ink-500 text-[10px] mt-2">Eslatma: bu diniy fatvo emas. O'z ustozingizdan so'rang.</p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-ink-950 border-t border-border/30">
        <div className="section-container">
          <div className="flex items-center justify-center gap-2 text-ink-500 text-xs">
            <AlertTriangle size={14} />
            <span>
              Ma'lumotlar TradingViewâ„¢ va Finnhub/Wisesheets/FMP manbalari asosida. Faqat Halol aksiyalar tahlili uchun. Investitsiya maslahati emas.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
