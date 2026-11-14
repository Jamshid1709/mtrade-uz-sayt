import { useState, useEffect } from "react";
import { storageService, type SavedWatchlistItem } from "../services/storageService";
import { TOP_STOCKS } from "./StockSphere3D";
import { Bookmark, Trash2, Plus, ExternalLink, Search, Star } from "lucide-react";
import { useI18n } from "../context/i18nContext";

export default function WatchlistWidget() {
  const { t } = useI18n();
  const [watchlist, setWatchlist] = useState<SavedWatchlistItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectTarget, setRedirectTarget] = useState<"finviz" | "stockanalysis">("finviz");

  useEffect(() => {
    setWatchlist(storageService.getWatchlist());
  }, []);

  const handleAddStock = (symbol: string, name: string, capFormatted?: string) => {
    const updated = storageService.addToWatchlist({ symbol, name, capFormatted });
    setWatchlist(updated);
    setSearchQuery("");
    setIsAdding(false);
  };

  const handleRemoveStock = (symbol: string) => {
    const updated = storageService.removeFromWatchlist(symbol);
    setWatchlist(updated);
  };

  const handleOpenStock = (symbol: string) => {
    const url =
      redirectTarget === "finviz"
        ? `https://finviz.com/quote.ashx?t=${symbol}`
        : `https://stockanalysis.com/stocks/${symbol.toLowerCase()}/`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const availableToAdd = TOP_STOCKS.filter(
    (s) =>
      !watchlist.some((w) => w.symbol === s.symbol) &&
      (s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 6);

  return (
    <div className="glass-card p-6 border border-mborder/50 rounded-3xl">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-mgold/10 text-mgold border border-mgold/30">
            <Bookmark size={20} />
          </div>
          <div>
            <h3 className="font-sora font-bold text-xl text-white">
              {t("watchlist_title")}
            </h3>
            <p className="text-xs text-mgray">
              Kuzatuvdagi aksiyalaringiz — LocalStorage'da xavfsiz saqlanadi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3 py-1.5 rounded-xl bg-mgold text-mblack font-sora font-bold text-xs flex items-center gap-1.5 hover:bg-mgoldlight transition-all"
          >
            <Plus size={14} /> Aksiya Qo'shish
          </button>
        </div>
      </div>

      {/* Add Stock Search Overlay */}
      {isAdding && (
        <div className="mb-6 p-4 rounded-2xl bg-mcard2 border border-mgold/40">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mgray" size={16} />
            <input
              type="text"
              placeholder="Aksiya kodi (masalan: AAPL, TSLA, NVDA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-mcard border border-mborder rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-mgold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableToAdd.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => handleAddStock(stock.symbol, stock.name, stock.capFormatted)}
                className="px-3 py-2 rounded-xl bg-mcard hover:bg-mgold/10 border border-mborder/40 flex items-center justify-between text-left transition-colors"
              >
                <div>
                  <span className="font-mono font-bold text-white text-xs">{stock.symbol}</span>
                  <span className="text-[11px] text-mgray ml-2 truncate">{stock.name}</span>
                </div>
                <Plus size={14} className="text-mgold" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Target Selector */}
      <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono">
        <span className="text-mgray">Tahlil qilish portali:</span>
        <div className="flex items-center bg-mcard border border-mborder p-1 rounded-xl">
          <button
            onClick={() => setRedirectTarget("finviz")}
            className={`px-3 py-1 rounded-lg transition-all ${
              redirectTarget === "finviz" ? "bg-mgold text-mblack font-bold" : "text-mgray"
            }`}
          >
            Finviz
          </button>
          <button
            onClick={() => setRedirectTarget("stockanalysis")}
            className={`px-3 py-1 rounded-lg transition-all ${
              redirectTarget === "stockanalysis" ? "bg-mgold text-mblack font-bold" : "text-mgray"
            }`}
          >
            StockAnalysis
          </button>
        </div>
      </div>

      {/* Watchlist Table / Grid */}
      {watchlist.length === 0 ? (
        <div className="text-center py-8 text-mgray text-xs font-mono">
          Watchlist bo'sh. Yuqoridagi "Aksiya Qo'shish" tugmasini bosing.
        </div>
      ) : (
        <div className="space-y-2.5">
          {watchlist.map((item) => (
            <div
              key={item.symbol}
              className="p-3.5 rounded-2xl bg-mcard/80 border border-mborder/40 hover:border-mgold/40 flex items-center justify-between transition-all group"
            >
              <div
                onClick={() => handleOpenStock(item.symbol)}
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <div className="w-8 h-8 rounded-xl bg-mgold/10 text-mgold flex items-center justify-center font-bold text-xs font-mono border border-mgold/20">
                  <Star size={14} className="fill-mgold/30" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">{item.symbol}</span>
                    <span className="text-xs text-mgold font-mono">{item.marketCap}</span>
                  </div>
                  <div className="text-[11px] text-mgray">{item.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenStock(item.symbol)}
                  className="p-2 rounded-xl bg-mgold/10 text-mgold hover:bg-mgold hover:text-mblack transition-colors"
                  title="Finviz/StockAnalysis tahlilini ochish"
                >
                  <ExternalLink size={14} />
                </button>
                <button
                  onClick={() => handleRemoveStock(item.symbol)}
                  className="p-2 rounded-xl bg-mred/10 text-mred hover:bg-mred hover:text-white transition-colors"
                  title="Watchlist dan o'chirish"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
