import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { BarChart2, Calendar, Newspaper, Sparkles } from "lucide-react";
import { useI18n } from "../context/i18nContext";

export default function LiveChartSection() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"chart" | "calendar" | "news">("chart");
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const newsContainerRef = useRef<HTMLDivElement>(null);

  // TradingView Advanced Chart Widget (Fixed 600px Full Height, No Squishing)
  useEffect(() => {
    if (activeTab !== "chart") return;
    const container = chartContainerRef.current;
    if (!container) return;

    container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 620,
      symbol: "NASDAQ:AAPL",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
      hide_side_toolbar: false,
      withdateranges: true,
      save_image: false,
      show_popup_button: true,
      popup_width: "1000",
      popup_height: "650",
    });
    container.appendChild(script);

    return () => {
      if (chartContainerRef.current) chartContainerRef.current.innerHTML = "";
    };
  }, [activeTab]);

  // TradingView Economic Calendar Widget (Stock & Macro)
  useEffect(() => {
    if (activeTab !== "calendar") return;
    const container = calendarContainerRef.current;
    if (!container) return;

    container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      isTransparent: true,
      width: "100%",
      height: 620,
      locale: "en",
      importanceFilter: "-1,0,1",
      countryFilter: "us,eu",
    });
    container.appendChild(script);

    return () => {
      if (calendarContainerRef.current) calendarContainerRef.current.innerHTML = "";
    };
  }, [activeTab]);

  // TradingView Financial News Widget (Stock Market News)
  useEffect(() => {
    if (activeTab !== "news") return;
    const container = newsContainerRef.current;
    if (!container) return;

    container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      feedMode: "market",
      market: "stock",
      isTransparent: true,
      displayMode: "regular",
      width: "100%",
      height: 620,
      colorTheme: "dark",
      locale: "en",
    });
    container.appendChild(script);

    return () => {
      if (newsContainerRef.current) newsContainerRef.current.innerHTML = "";
    };
  }, [activeTab]);

  return (
    <div className="w-full">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-accent/30 text-accent text-xs font-mono mb-2">
            <Sparkles size={14} /> TradingView Stock Pro Engine
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {t("live_chart_title")}
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-card border border-border p-1 rounded-2xl text-xs font-mono">
          <button
            onClick={() => setActiveTab("chart")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === "chart"
                ? "bg-primary text-ink-950 font-bold shadow-lg"
                : "text-muted hover:text-white"
            }`}
          >
            <BarChart2 size={16} /> Interaktiv Aksiya Grafigi
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === "calendar"
                ? "bg-primary text-ink-950 font-bold shadow-lg"
                : "text-muted hover:text-white"
            }`}
          >
            <Calendar size={16} /> {t("economic_calendar")}
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === "news"
                ? "bg-primary text-ink-950 font-bold shadow-lg"
                : "text-muted hover:text-white"
            }`}
          >
            <Newspaper size={16} /> {t("financial_news")}
          </button>
        </div>
      </div>

      {/* Display Area */}
      <ScrollReveal>
        <div className="glass-card overflow-hidden border border-border/50 rounded-3xl min-h-[620px] w-full">
          {activeTab === "chart" && (
            <div
              ref={chartContainerRef}
              className="w-full h-[620px] tradingview-widget-container"
            />
          )}

          {activeTab === "calendar" && (
            <div
              ref={calendarContainerRef}
              className="w-full h-[620px] p-2 tradingview-widget-container"
            />
          )}

          {activeTab === "news" && (
            <div
              ref={newsContainerRef}
              className="w-full h-[620px] p-2 tradingview-widget-container"
            />
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
