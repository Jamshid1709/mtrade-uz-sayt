import { useEffect, useRef } from "react";

export default function TickerTape() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "NASDAQ" },
        { proName: "TVC:GOLD", title: "GOLD" },
        { proName: "BINANCE:BTCUSDT", title: "BTC" },
        { proName: "NASDAQ:TSLA", title: "TSLA" },
        { proName: "NASDAQ:NVDA", title: "NVDA" },
        { proName: "NASDAQ:AAPL", title: "AAPL" },
        { proName: "NASDAQ:MSFT", title: "MSFT" },
        { proName: "NASDAQ:GOOGL", title: "GOOGL" },
        { proName: "NASDAQ:META", title: "META" },
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en",
    });
    containerRef.current.appendChild(script);
    return () => {
      if (containerRef.current) {
        const s = containerRef.current.querySelector("script");
        if (s) s.remove();
      }
    };
  }, []);

  return (
    <div className="w-full bg-mblack border-y border-mborder/30 py-1">
      <div ref={containerRef} className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget" />
      </div>
    </div>
  );
}
