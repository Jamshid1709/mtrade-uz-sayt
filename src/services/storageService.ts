const WATCHLIST_KEY = "mtrade_user_watchlist";
const LANGUAGE_KEY = "mtrade_user_language";

export interface SavedWatchlistItem {
  symbol: string;
  name: string;
  marketCap?: string;
  addedAt: string;
}

// Initial default stocks for new users
const DEFAULT_WATCHLIST: SavedWatchlistItem[] = [
  { symbol: "NVDA", name: "NVIDIA Corp", marketCap: "$3.45T", addedAt: new Date().toISOString() },
  { symbol: "AAPL", name: "Apple Inc", marketCap: "$3.38T", addedAt: new Date().toISOString() },
  { symbol: "MSFT", name: "Microsoft Corp", marketCap: "$3.12T", addedAt: new Date().toISOString() },
  { symbol: "TSLA", name: "Tesla Inc", marketCap: "$890B", addedAt: new Date().toISOString() },
];

export const storageService = {
  // Watchlist methods
  getWatchlist(): SavedWatchlistItem[] {
    try {
      const data = localStorage.getItem(WATCHLIST_KEY);
      if (!data) {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(DEFAULT_WATCHLIST));
        return DEFAULT_WATCHLIST;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_WATCHLIST;
    }
  },

  addToWatchlist(stock: { symbol: string; name: string; capFormatted?: string }): SavedWatchlistItem[] {
    const current = this.getWatchlist();
    if (current.some((item) => item.symbol === stock.symbol)) {
      return current;
    }
    const updated = [
      {
        symbol: stock.symbol,
        name: stock.name,
        marketCap: stock.capFormatted || "",
        addedAt: new Date().toISOString(),
      },
      ...current,
    ];
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save watchlist to localStorage", e);
    }
    return updated;
  },

  removeFromWatchlist(symbol: string): SavedWatchlistItem[] {
    const current = this.getWatchlist();
    const updated = current.filter((item) => item.symbol !== symbol);
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save watchlist to localStorage", e);
    }
    return updated;
  },

  isInWatchlist(symbol: string): boolean {
    const current = this.getWatchlist();
    return current.some((item) => item.symbol === symbol);
  },

  // Language Preference methods
  getSavedLanguage(): string {
    try {
      return localStorage.getItem(LANGUAGE_KEY) || "uz";
    } catch {
      return "uz";
    }
  },

  saveLanguage(lang: string): void {
    try {
      localStorage.setItem(LANGUAGE_KEY, lang);
    } catch (e) {
      console.error("Failed to save language to localStorage", e);
    }
  },
};
