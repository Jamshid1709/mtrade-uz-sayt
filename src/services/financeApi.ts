const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_KEY as string | undefined;
const WISE_KEY = import.meta.env.VITE_WISESHETS_KEY as string | undefined;
const FMP_KEY = import.meta.env.VITE_FMP_KEY as string | undefined;

export interface Quote {
  symbol: string;
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

export interface Fundamental {
  symbol: string;
  pe?: number;
  roe?: number;
  marketCap?: number;
  revenue?: number;
}

export function getMusaffaUrl(symbol: string) {
  return `https://musaffa.com/stocks/${symbol.toLowerCase()}`;
}

export const financeApi = {
  async getQuote(symbol: string): Promise<Quote | null> {
    if (!FINNHUB_KEY) return null;
    try {
      const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`);
      if (!res.ok) return null;
      const data = await res.json();
      return { symbol, ...data };
    } catch {
      return null;
    }
  },

  async getCompanyProfile(symbol: string) {
    if (!FINNHUB_KEY) return null;
    try {
      const res = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_KEY}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async getWisesheetsRatios(symbol: string) {
    if (!WISE_KEY) return null;
    try {
      const res = await fetch(`https://api.wisesheets.io/v1/stocks/${symbol}/ratios`, {
        headers: { Authorization: `Bearer ${WISE_KEY}` },
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async searchFMP(query: string) {
    if (!FMP_KEY) return [];
    try {
      const res = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=${FMP_KEY}`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  async getFMPScreener(marketCapMoreThan = 1000000000, limit = 20) {
    if (!FMP_KEY) return [];
    try {
      const res = await fetch(
        `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=${marketCapMoreThan}&limit=${limit}&apikey=${FMP_KEY}`
      );
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },
};
