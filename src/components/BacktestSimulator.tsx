import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, RotateCcw, TrendingUp, TrendingDown, Award, Zap, DollarSign } from "lucide-react";
import { useI18n } from "../context/i18nContext";

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface SimulatedTrade {
  id: number;
  type: "BUY" | "SELL";
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  exitPrice?: number;
  pnl: number;
  result: "WIN" | "LOSS" | "OPEN";
}

// Historical sample candles generator
function generateSampleData(symbol: string): Candle[] {
  let basePrice = symbol === "BTC/USD" ? 65000 : symbol === "NVDA" ? 120 : symbol === "AAPL" ? 220 : 1.085;
  const volatility = basePrice * 0.015;
  const candles: Candle[] = [];

  let currentPrice = basePrice;
  const startDate = new Date(2026, 0, 1);

  for (let i = 0; i < 60; i++) {
    const change = (Math.random() - 0.48) * volatility;
    const open = currentPrice;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * (volatility * 0.5);
    const low = Math.min(open, close) - Math.random() * (volatility * 0.5);

    currentPrice = close;
    const time = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    candles.push({
      time,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });
  }

  return candles;
}

export default function BacktestSimulator() {
  const { t } = useI18n();
  const [selectedAsset, setSelectedAsset] = useState("EUR/USD");
  const [fullCandles, setFullCandles] = useState<Candle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trades, setTrades] = useState<SimulatedTrade[]>([]);
  const [activeTrade, setActiveTrade] = useState<SimulatedTrade | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize data
  useEffect(() => {
    const data = generateSampleData(selectedAsset);
    setFullCandles(data);
    setCurrentIndex(20);
    setTrades([]);
    setActiveTrade(null);
    setIsPlaying(false);
  }, [selectedAsset]);

  // Auto Play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNextCandle();
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, fullCandles, activeTrade]);

  // Step next candle & evaluate open position
  const handleNextCandle = () => {
    if (currentIndex >= fullCandles.length - 1) {
      setIsPlaying(false);
      return;
    }

    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    const currentCandle = fullCandles[nextIdx];

    // Check active trade hit TP or SL
    if (activeTrade && activeTrade.result === "OPEN") {
      let resolved = false;
      let exitPrice = currentCandle.close;
      let pnl = 0;
      let result: "WIN" | "LOSS" = "LOSS";

      if (activeTrade.type === "BUY") {
        if (currentCandle.high >= activeTrade.takeProfit) {
          exitPrice = activeTrade.takeProfit;
          pnl = activeTrade.takeProfit - activeTrade.entryPrice;
          result = "WIN";
          resolved = true;
        } else if (currentCandle.low <= activeTrade.stopLoss) {
          exitPrice = activeTrade.stopLoss;
          pnl = activeTrade.stopLoss - activeTrade.entryPrice;
          result = "LOSS";
          resolved = true;
        }
      } else if (activeTrade.type === "SELL") {
        if (currentCandle.low <= activeTrade.takeProfit) {
          exitPrice = activeTrade.takeProfit;
          pnl = activeTrade.entryPrice - activeTrade.takeProfit;
          result = "WIN";
          resolved = true;
        } else if (currentCandle.high >= activeTrade.stopLoss) {
          exitPrice = activeTrade.stopLoss;
          pnl = activeTrade.entryPrice - activeTrade.stopLoss;
          result = "LOSS";
          resolved = true;
        }
      }

      if (resolved) {
        const closedTrade: SimulatedTrade = {
          ...activeTrade,
          exitPrice,
          pnl: parseFloat(pnl.toFixed(2)),
          result,
        };
        setTrades((prev) => [closedTrade, ...prev]);
        setActiveTrade(null);
      }
    }
  };

  // Trigger BUY / SELL order
  const handleOpenTrade = (type: "BUY" | "SELL") => {
    if (activeTrade) return; // Only 1 active trade at a time
    const candle = fullCandles[currentIndex];
    if (!candle) return;

    const entry = candle.close;
    const atr = Math.abs(candle.high - candle.low) * 1.8 || 2;
    const stopLoss = type === "BUY" ? entry - atr : entry + atr;
    const takeProfit = type === "BUY" ? entry + atr * 2.5 : entry - atr * 2.5;

    const newTrade: SimulatedTrade = {
      id: Date.now(),
      type,
      entryPrice: entry,
      stopLoss: parseFloat(stopLoss.toFixed(2)),
      takeProfit: parseFloat(takeProfit.toFixed(2)),
      pnl: 0,
      result: "OPEN",
    };

    setActiveTrade(newTrade);
  };

  // Render Canvas Chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const visibleCandles = fullCandles.slice(0, currentIndex + 1);
    if (visibleCandles.length === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement?.clientWidth || 700;
    const height = 400;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Min & Max prices for scaling
    let minP = Math.min(...visibleCandles.map((c) => c.low));
    let maxP = Math.max(...visibleCandles.map((c) => c.high));
    const padding = (maxP - minP) * 0.1 || 1;
    minP -= padding;
    maxP += padding;

    const candleWidth = Math.max(4, (width - 60) / Math.max(30, visibleCandles.length));

    // Draw candles
    visibleCandles.forEach((c, idx) => {
      const x = 40 + idx * (candleWidth + 2);
      const isBull = c.close >= c.open;

      const yOpen = height - 30 - ((c.open - minP) / (maxP - minP)) * (height - 60);
      const yClose = height - 30 - ((c.close - minP) / (maxP - minP)) * (height - 60);
      const yHigh = height - 30 - ((c.high - minP) / (maxP - minP)) * (height - 60);
      const yLow = height - 30 - ((c.low - minP) / (maxP - minP)) * (height - 60);

      // Wick
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, yHigh);
      ctx.lineTo(x + candleWidth / 2, yLow);
      ctx.strokeStyle = isBull ? "#14C784" : "#F6465D";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Body
      const bodyY = Math.min(yOpen, yClose);
      const bodyH = Math.max(2, Math.abs(yClose - yOpen));
      ctx.fillStyle = isBull ? "#14C784" : "#F6465D";
      ctx.fillRect(x, bodyY, candleWidth, bodyH);
    });

    // Draw active trade lines (Entry, TP, SL)
    if (activeTrade) {
      const yEntry = height - 30 - ((activeTrade.entryPrice - minP) / (maxP - minP)) * (height - 60);
      const yTP = height - 30 - ((activeTrade.takeProfit - minP) / (maxP - minP)) * (height - 60);
      const ySL = height - 30 - ((activeTrade.stopLoss - minP) / (maxP - minP)) * (height - 60);

      // Entry line (Gold)
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(40, yEntry);
      ctx.lineTo(width - 20, yEntry);
      ctx.strokeStyle = "#D6C3A1";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // TP line (Green)
      ctx.beginPath();
      ctx.moveTo(40, yTP);
      ctx.lineTo(width - 20, yTP);
      ctx.strokeStyle = "#14C784";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // SL line (Red)
      ctx.beginPath();
      ctx.moveTo(40, ySL);
      ctx.lineTo(width - 20, ySL);
      ctx.strokeStyle = "#F6465D";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.setLineDash([]);
    }
  }, [currentIndex, fullCandles, activeTrade]);

  // Performance metrics
  const closedTrades = trades.filter((t) => t.result !== "OPEN");
  const wins = closedTrades.filter((t) => t.result === "WIN").length;
  const winRate = closedTrades.length > 0 ? Math.round((wins / closedTrades.length) * 100) : 0;
  const totalPnL = closedTrades.reduce((acc, t) => acc + t.pnl, 0);

  return (
    <div className="w-full bg-gradient-to-b from-mdark via-mblack to-mdark py-10 px-4 sm:px-6 rounded-3xl border border-mborder/40 shadow-2xl">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mgold/10 border border-mgold/30 text-mgold text-xs font-mono mb-3">
          <Zap size={14} /> MTrade Backtest & Replay Simulator
        </div>
        <h2 className="font-sora font-extrabold text-3xl sm:text-4xl text-white mb-3">
          {t("backtest_title")}
        </h2>
        <p className="text-mgray text-sm sm:text-base max-w-xl mx-auto">
          Tarixiy grafikda bar-by-bar simulyatsiya qiling, Buy/Sell buyruqlarini joylashtiring va o'z win-rate statistikangizni aniqlang.
        </p>

        {/* Asset Selector */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
          {["EUR/USD", "BTC/USD", "NVDA", "AAPL"].map((asset) => (
            <button
              key={asset}
              onClick={() => setSelectedAsset(asset)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedAsset === asset
                  ? "bg-mgold text-mblack font-bold shadow-md"
                  : "bg-mcard border border-mborder text-mgray hover:text-white"
              }`}
            >
              {asset}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Controls & Stats Grid */}
      <div className="grid lg:grid-cols-4 gap-6 mb-6">
        {/* Stats Summary Cards */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-4 flex items-center justify-between border-mborder/40">
            <div>
              <div className="text-[11px] text-mgray font-mono">{t("win_rate")}</div>
              <div className="text-2xl font-extrabold font-mono text-mgreen">{winRate}%</div>
            </div>
            <Award className="text-mgreen" size={28} />
          </div>

          <div className="glass-card p-4 flex items-center justify-between border-mborder/40">
            <div>
              <div className="text-[11px] text-mgray font-mono">{t("total_trades")}</div>
              <div className="text-2xl font-extrabold font-mono text-white">{closedTrades.length}</div>
            </div>
            <DollarSign className="text-mgold" size={28} />
          </div>

          <div className="glass-card p-4 flex items-center justify-between border-mborder/40">
            <div>
              <div className="text-[11px] text-mgray font-mono">Umumiy PnL</div>
              <div
                className={`text-xl font-extrabold font-mono ${
                  totalPnL >= 0 ? "text-mgreen" : "text-mred"
                }`}
              >
                {totalPnL >= 0 ? "+" : ""}
                {totalPnL.toFixed(2)}
              </div>
            </div>
            {totalPnL >= 0 ? (
              <TrendingUp className="text-mgreen" size={28} />
            ) : (
              <TrendingDown className="text-mred" size={28} />
            )}
          </div>
        </div>

        {/* Canvas & Replay Controls */}
        <div className="lg:col-span-3 glass-card p-4 border-mborder/40 flex flex-col justify-between">
          <div className="relative w-full h-[380px] flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          {/* Replay Controls & Buy/Sell Actions */}
          <div className="mt-4 pt-4 border-t border-mborder/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-xl bg-mgold text-mblack hover:bg-mgoldlight transition-colors font-bold text-xs flex items-center gap-1"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? "Pauza" : "Avto O'ynash"}
              </button>
              <button
                onClick={handleNextCandle}
                className="p-2.5 rounded-xl bg-mcard border border-mborder text-white hover:border-mgold transition-colors font-mono text-xs flex items-center gap-1"
              >
                <SkipForward size={16} /> {t("step_next")}
              </button>
              <button
                onClick={() => {
                  setCurrentIndex(20);
                  setTrades([]);
                  setActiveTrade(null);
                  setIsPlaying(false);
                }}
                className="p-2.5 rounded-xl bg-mcard border border-mborder text-mgray hover:text-white transition-colors"
                title={t("reset_simulation")}
              >
                <RotateCcw size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleOpenTrade("BUY")}
                disabled={activeTrade !== null}
                className={`px-5 py-2.5 rounded-xl font-sora font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                  activeTrade !== null
                    ? "opacity-40 cursor-not-allowed bg-mgreen/20 text-mgreen"
                    : "bg-mgreen text-mblack hover:bg-emerald-400"
                }`}
              >
                <TrendingUp size={16} /> {t("buy_order")}
              </button>

              <button
                onClick={() => handleOpenTrade("SELL")}
                disabled={activeTrade !== null}
                className={`px-5 py-2.5 rounded-xl font-sora font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                  activeTrade !== null
                    ? "opacity-40 cursor-not-allowed bg-mred/20 text-mred"
                    : "bg-mred text-white hover:bg-rose-600"
                }`}
              >
                <TrendingDown size={16} /> {t("sell_order")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
