import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, Search, Sparkles, TrendingUp, TrendingDown } from "lucide-react";

export interface StockData {
  symbol: string;
  name: string;
  marketCap: number; // in Billions USD
  capFormatted: string;
  change: number; // 24h %
  sector: string;
}

export const TOP_STOCKS: StockData[] = [
  { symbol: "NVDA", name: "NVIDIA Corp", marketCap: 3450, capFormatted: "$3.45T", change: 3.4, sector: "Technology" },
  { symbol: "AAPL", name: "Apple Inc", marketCap: 3380, capFormatted: "$3.38T", change: 1.2, sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft Corp", marketCap: 3120, capFormatted: "$3.12T", change: 0.8, sector: "Technology" },
  { symbol: "AMZN", name: "Amazon.com Inc", marketCap: 2180, capFormatted: "$2.18T", change: 2.1, sector: "Consumer Cyclical" },
  { symbol: "GOOGL", name: "Alphabet Inc", marketCap: 2050, capFormatted: "$2.05T", change: -0.5, sector: "Communication" },
  { symbol: "META", name: "Meta Platforms", marketCap: 1380, capFormatted: "$1.38T", change: 1.9, sector: "Communication" },
  { symbol: "TSLA", name: "Tesla Inc", marketCap: 890, capFormatted: "$890B", change: 4.2, sector: "Consumer Cyclical" },
  { symbol: "TSM", name: "Taiwan Semi", marketCap: 860, capFormatted: "$860B", change: 2.7, sector: "Technology" },
  { symbol: "AVGO", name: "Broadcom Inc", marketCap: 820, capFormatted: "$820B", change: 1.5, sector: "Technology" },
  { symbol: "LLY", name: "Eli Lilly & Co", marketCap: 780, capFormatted: "$780B", change: -1.1, sector: "Healthcare" },
  { symbol: "WMT", name: "Walmart Inc", marketCap: 690, capFormatted: "$690B", change: 0.4, sector: "Consumer Defensive" },
  { symbol: "JPM", name: "JPMorgan Chase", marketCap: 620, capFormatted: "$620B", change: 0.9, sector: "Financial Services" },
  { symbol: "V", name: "Visa Inc", marketCap: 580, capFormatted: "$580B", change: 0.3, sector: "Financial Services" },
  { symbol: "UNH", name: "UnitedHealth", marketCap: 530, capFormatted: "$530B", change: -0.8, sector: "Healthcare" },
  { symbol: "XOM", name: "Exxon Mobil", marketCap: 480, capFormatted: "$480B", change: 1.1, sector: "Energy" },
  { symbol: "MA", name: "Mastercard Inc", marketCap: 460, capFormatted: "$460B", change: 0.5, sector: "Financial Services" },
  { symbol: "ORCL", name: "Oracle Corp", marketCap: 410, capFormatted: "$410B", change: 2.3, sector: "Technology" },
  { symbol: "PG", name: "Procter & Gamble", marketCap: 400, capFormatted: "$400B", change: -0.2, sector: "Consumer Defensive" },
  { symbol: "COST", name: "Costco Wholesale", marketCap: 390, capFormatted: "$390B", change: 1.0, sector: "Consumer Defensive" },
  { symbol: "HD", name: "Home Depot Inc", marketCap: 380, capFormatted: "$380B", change: 0.6, sector: "Consumer Cyclical" },
  { symbol: "JNJ", name: "Johnson & Johnson", marketCap: 370, capFormatted: "$370B", change: -0.4, sector: "Healthcare" },
  { symbol: "BAC", name: "Bank of America", marketCap: 330, capFormatted: "$330B", change: 1.4, sector: "Financial Services" },
  { symbol: "CRM", name: "Salesforce Inc", marketCap: 310, capFormatted: "$310B", change: 1.8, sector: "Technology" },
  { symbol: "ABBV", name: "AbbVie Inc", marketCap: 305, capFormatted: "$305B", change: 0.7, sector: "Healthcare" },
  { symbol: "NFLX", name: "Netflix Inc", marketCap: 295, capFormatted: "$295B", change: 3.1, sector: "Communication" },
  { symbol: "KO", name: "Coca-Cola Co", marketCap: 275, capFormatted: "$275B", change: 0.1, sector: "Consumer Defensive" },
  { symbol: "AMD", name: "Adv Micro Devices", marketCap: 260, capFormatted: "$260B", change: 4.8, sector: "Technology" },
  { symbol: "PEP", name: "PepsiCo Inc", marketCap: 235, capFormatted: "$235B", change: -0.3, sector: "Consumer Defensive" },
  { symbol: "QCOM", name: "QUALCOMM Inc", marketCap: 225, capFormatted: "$225B", change: 2.0, sector: "Technology" },
  { symbol: "TMUS", name: "T-Mobile US", marketCap: 215, capFormatted: "$215B", change: 0.5, sector: "Communication" },
  { symbol: "DIS", name: "Walt Disney Co", marketCap: 210, capFormatted: "$210B", change: -1.2, sector: "Communication" },
  { symbol: "ADBE", name: "Adobe Inc", marketCap: 205, capFormatted: "$205B", change: 1.3, sector: "Technology" },
  { symbol: "GE", name: "GE Aerospace", marketCap: 195, capFormatted: "$195B", change: 2.5, sector: "Industrials" },
  { symbol: "CSCO", name: "Cisco Systems", marketCap: 190, capFormatted: "$190B", change: 0.4, sector: "Technology" },
  { symbol: "IBM", name: "IBM Corp", marketCap: 185, capFormatted: "$185B", change: 1.1, sector: "Technology" },
  { symbol: "ACN", name: "Accenture Plc", marketCap: 180, capFormatted: "$180B", change: 0.8, sector: "Technology" },
  { symbol: "INTU", name: "Intuit Inc", marketCap: 178, capFormatted: "$178B", change: 1.6, sector: "Technology" },
  { symbol: "TXN", name: "Texas Instruments", marketCap: 170, capFormatted: "$170B", change: 0.9, sector: "Technology" },
  { symbol: "CAT", name: "Caterpillar Inc", marketCap: 168, capFormatted: "$168B", change: 1.7, sector: "Industrials" },
  { symbol: "MS", name: "Morgan Stanley", marketCap: 165, capFormatted: "$165B", change: 1.2, sector: "Financial Services" },
  { symbol: "GS", name: "Goldman Sachs", marketCap: 160, capFormatted: "$160B", change: 1.5, sector: "Financial Services" },
  { symbol: "NOW", name: "ServiceNow Inc", marketCap: 160, capFormatted: "$160B", change: 2.8, sector: "Technology" },
  { symbol: "PLTR", name: "Palantir Tech", marketCap: 155, capFormatted: "$155B", change: 5.6, sector: "Technology" },
  { symbol: "UBER", name: "Uber Technologies", marketCap: 150, capFormatted: "$150B", change: 2.2, sector: "Technology" },
  { symbol: "PM", name: "Philip Morris", marketCap: 150, capFormatted: "$150B", change: -0.1, sector: "Consumer Defensive" },
  { symbol: "ARM", name: "Arm Holdings", marketCap: 145, capFormatted: "$145B", change: 3.9, sector: "Technology" },
  { symbol: "BKNG", name: "Booking Holdings", marketCap: 140, capFormatted: "$140B", change: 1.1, sector: "Consumer Cyclical" },
  { symbol: "RTX", name: "RTX Corp", marketCap: 140, capFormatted: "$140B", change: 0.5, sector: "Industrials" },
  { symbol: "COP", name: "ConocoPhillips", marketCap: 135, capFormatted: "$135B", change: 0.9, sector: "Energy" },
  { symbol: "AMAT", name: "Applied Materials", marketCap: 135, capFormatted: "$135B", change: 2.4, sector: "Technology" },
  { symbol: "BLK", name: "BlackRock Inc", marketCap: 130, capFormatted: "$130B", change: 1.0, sector: "Financial Services" },
  { symbol: "TJX", name: "TJX Companies", marketCap: 130, capFormatted: "$130B", change: 0.6, sector: "Consumer Cyclical" },
  { symbol: "DE", name: "Deere & Co", marketCap: 125, capFormatted: "$125B", change: 1.3, sector: "Industrials" },
  { symbol: "VRTX", name: "Vertex Pharma", marketCap: 120, capFormatted: "$120B", change: 0.4, sector: "Healthcare" },
  { symbol: "PANW", name: "Palo Alto Netw", marketCap: 115, capFormatted: "$115B", change: 3.2, sector: "Technology" },
  { symbol: "MU", name: "Micron Technology", marketCap: 115, capFormatted: "$115B", change: 4.1, sector: "Technology" },
  { symbol: "LRCX", name: "Lam Research", marketCap: 110, capFormatted: "$110B", change: 2.9, sector: "Technology" },
  { symbol: "BA", name: "Boeing Co", marketCap: 110, capFormatted: "$110B", change: -2.1, sector: "Industrials" },
  { symbol: "SBUX", name: "Starbucks Corp", marketCap: 110, capFormatted: "$110B", change: 0.8, sector: "Consumer Cyclical" },
  { symbol: "SHOP", name: "Shopify Inc", marketCap: 105, capFormatted: "$105B", change: 3.5, sector: "Technology" },
  { symbol: "MSTR", name: "MicroStrategy", marketCap: 95, capFormatted: "$95B", change: 8.4, sector: "Technology" },
  { symbol: "CRWD", name: "CrowdStrike", marketCap: 85, capFormatted: "$85B", change: 2.7, sector: "Technology" },
  { symbol: "COIN", name: "Coinbase Global", marketCap: 75, capFormatted: "$75B", change: 6.2, sector: "Financial Services" },
  { symbol: "PYPL", name: "PayPal Holdings", marketCap: 70, capFormatted: "$70B", change: 1.1, sector: "Financial Services" },
  { symbol: "SPOT", name: "Spotify Tech", marketCap: 70, capFormatted: "$70B", change: 2.0, sector: "Communication" },
  { symbol: "HOOD", name: "Robinhood Mkts", marketCap: 32, capFormatted: "$32B", change: 4.5, sector: "Financial Services" },
  { symbol: "RBLX", name: "Roblox Corp", marketCap: 30, capFormatted: "$30B", change: 1.8, sector: "Communication" },
  { symbol: "NET", name: "Cloudflare Inc", marketCap: 28, capFormatted: "$28B", change: 3.1, sector: "Technology" },
  { symbol: "SNOW", name: "Snowflake Inc", marketCap: 42, capFormatted: "$42B", change: -1.5, sector: "Technology" },
  { symbol: "SOFI", name: "SoFi Technologies", marketCap: 14, capFormatted: "$14B", change: 3.8, sector: "Financial Services" },
  { symbol: "RIVN", name: "Rivian Automotive", marketCap: 13, capFormatted: "$13B", change: -2.4, sector: "Consumer Cyclical" },
];

interface Point3D {
  stock: StockData;
  x: number;
  y: number;
  z: number;
  projX: number;
  projY: number;
  projScale: number;
  radius: number;
}

export default function StockSphere3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredStock, setHoveredStock] = useState<StockData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectTarget, setRedirectTarget] = useState<"finviz" | "stockanalysis" | "musaffa">("finviz");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D rotation state
  const rotationRef = useRef({ rx: 0.003, ry: 0.004 });
  const anglesRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point3D[]>([]);
  const hoveredPointRef = useRef<Point3D | null>(null);

  // Initialize Fibonacci sphere distribution
  useEffect(() => {
    const numPoints = TOP_STOCKS.length;
    const points: Point3D[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // Radius at y
      const theta = phi * i; // Golden ratio angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Calculate relative size based on log of market cap
      const minCap = 10;
      const maxCap = 3500;
      const normCap = Math.log(TOP_STOCKS[i].marketCap / minCap) / Math.log(maxCap / minCap);
      const nodeRadius = 4 + normCap * 13; // Node radius between 4px and 17px

      points.push({
        stock: TOP_STOCKS[i],
        x: x * 250,
        y: y * 250,
        z: z * 250,
        projX: 0,
        projY: 0,
        projScale: 1,
        radius: nodeRadius,
      });
    }

    pointsRef.current = points;
  }, []);

  // Animation render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        const width = parent.clientWidth;
        const height = Math.min(width * 0.75, 550);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 420;

      ctx.clearRect(0, 0, width, height);

      // Apply rotation angles
      if (!isDraggingRef.current) {
        anglesRef.current.x += rotationRef.current.rx;
        anglesRef.current.y += rotationRef.current.ry;
      }

      const cosX = Math.cos(anglesRef.current.x);
      const sinX = Math.sin(anglesRef.current.x);
      const cosY = Math.cos(anglesRef.current.y);
      const sinY = Math.sin(anglesRef.current.y);

      // Project points
      const projected = pointsRef.current.map((pt) => {
        // Rotate Y
        let x1 = pt.x * cosY - pt.z * sinY;
        let z1 = pt.z * cosY + pt.x * sinY;

        // Rotate X
        let y1 = pt.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + pt.y * sinX;

        const scale = focalLength / (focalLength + z2 + 100);
        const projX = cx + x1 * scale;
        const projY = cy + y1 * scale;

        return {
          ...pt,
          projX,
          projY,
          projScale: scale,
          currentZ: z2,
        };
      });

      // Sort points by Z depth so front nodes render over back nodes
      projected.sort((a, b) => a.currentZ - b.currentZ);

      // Draw faint background grid lines / sphere shadow
      ctx.beginPath();
      ctx.arc(cx, cy, 230 * (focalLength / (focalLength + 100)), 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(214, 195, 161, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Render nodes & text
      projected.forEach((pt) => {
        const isHovered = hoveredPointRef.current?.stock.symbol === pt.stock.symbol;
        const alpha = Math.max(0.15, Math.min(1, (pt.currentZ + 300) / 500));
        const finalRadius = pt.radius * pt.projScale * (isHovered ? 1.5 : 1);

        // Colors
        const isPositive = pt.stock.change >= 0;
        const baseColor = isPositive ? "20, 199, 132" : "246, 70, 93"; // Green or Red
        const accentGold = "214, 195, 161";

        ctx.save();
        ctx.globalAlpha = alpha;

        // Outer Glow if hovered
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(pt.projX, pt.projY, finalRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accentGold}, 0.35)`;
          ctx.fill();
        }

        // Main Node Circle
        ctx.beginPath();
        ctx.arc(pt.projX, pt.projY, finalRadius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered
          ? `rgb(${accentGold})`
          : `rgba(${baseColor}, ${alpha * 0.95})`;
        ctx.fill();
        ctx.strokeStyle = isHovered
          ? "#FFFFFF"
          : `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.lineWidth = isHovered ? 2 : 0.8;
        ctx.stroke();

        // Ticker Text Label (scale text with market cap & projection)
        const fontSize = Math.max(9, Math.min(17, pt.radius * pt.projScale * 0.9));
        ctx.font = `${isHovered ? "bold" : "500"} ${fontSize}px Inter Tight, Inter, sans-serif`;
        ctx.fillStyle = isHovered
          ? "#FFFFFF"
          : alpha > 0.4
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(200, 200, 210, 0.4)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Offset text slightly above node
        ctx.fillText(pt.stock.symbol, pt.projX, pt.projY - finalRadius - fontSize * 0.65);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse / Touch Interaction handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x: e.clientX, y: e.clientY });

    // Drag rotate
    if (isDraggingRef.current) {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;

      anglesRef.current.y += dx * 0.005;
      anglesRef.current.x += dy * 0.005;

      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    }

    // Check hover target
    let found: Point3D | null = null;
    let minDist = 30;

    pointsRef.current.forEach((pt) => {
      const dist = Math.hypot(pt.projX - x, pt.projY - y);
      if (dist < minDist) {
        minDist = dist;
        found = pt;
      }
    });

    hoveredPointRef.current = found;
    setHoveredStock(found ? (found as Point3D).stock : null);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleStockClick = (symbol: string) => {
    let targetUrl = "";
    if (redirectTarget === "finviz") targetUrl = `https://finviz.com/quote.ashx?t=${symbol}`;
    else if (redirectTarget === "stockanalysis") targetUrl = `https://stockanalysis.com/stocks/${symbol.toLowerCase()}/`;
    else targetUrl = `https://musaffa.com/stocks/${symbol.toLowerCase()}`;
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  // Filter stocks for quick search
  const filteredStocks = searchQuery.trim()
    ? TOP_STOCKS.filter(
        (s) =>
          s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-ink-950 via-surface to-ink-950 py-12 px-4 rounded-3xl border border-border/40 shadow-2xl">
      {/* Header Controls */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-accent/30 text-accent text-xs font-mono mb-3">
          <Sparkles size={14} /> 3D Market Cap Interactive Sphere
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3">
          Eng yirik <span className="gold-text">Aksiyalar 3D Shari</span>
        </h2>
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
          Shar har bir kompaniyaning bozor kapitalizatsiyasiga ko'ra o'lchanadi. Sichqoncha yoki barmog'ingiz bilan burang va aksiya ustiga bosing.
        </p>

        {/* Search & External Redirect Selector */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Aksiya nomini yozing (masalan, NVDA, AAPL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-accent transition-colors"
            />
            {filteredStocks.length > 0 && (
              <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-ink-900 border border-border rounded-xl shadow-2xl overflow-hidden text-left">
                {filteredStocks.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => handleStockClick(stock.symbol)}
                    className="w-full px-4 py-2.5 hover:bg-primary/10 flex items-center justify-between border-b border-border/30 last:border-0 transition-colors"
                  >
                    <div>
                      <span className="font-bold text-white font-mono">{stock.symbol}</span>
                      <span className="text-xs text-muted ml-2">{stock.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-accent">{stock.capFormatted}</span>
                      <ExternalLink size={12} className="text-muted" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center bg-card border border-border p-1 rounded-xl text-xs font-mono">
            <button
              onClick={() => setRedirectTarget("finviz")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                redirectTarget === "finviz"
                  ? "bg-primary text-ink-950 font-bold shadow-md"
                  : "text-muted hover:text-white"
              }`}
            >
              Finviz â†—
            </button>
            <button
              onClick={() => setRedirectTarget("stockanalysis")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                redirectTarget === "stockanalysis"
                  ? "bg-primary text-ink-950 font-bold shadow-md"
                  : "text-muted hover:text-white"
              }`}
            >
              StockAnalysis â†—
            </button>
            <button
              onClick={() => setRedirectTarget("musaffa")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                redirectTarget === "musaffa"
                  ? "bg-bull text-white font-bold shadow-md"
                  : "text-muted hover:text-white"
              }`}
            >
              Musaffa (Halol tekshirish) â†—
            </button>
          </div>
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div className="relative w-full flex justify-center items-center touch-none">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onClick={() => {
            if (hoveredStock) {
              handleStockClick(hoveredStock.symbol);
            }
          }}
          className="cursor-grab active:cursor-grabbing max-w-full"
        />

        {/* Hover Floating Tooltip */}
        {hoveredStock && (
          <div
            style={{
              position: "fixed",
              left: Math.min(mousePos.x + 15, window.innerWidth - 220),
              top: Math.max(15, Math.min(mousePos.y - 15, window.innerHeight - 120)),
              pointerEvents: "none",
            }}
            className="z-50 bg-ink-900/95 backdrop-blur-md border border-accent/50 p-3 rounded-2xl shadow-2xl text-left transition-all transform scale-105"
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="font-mono font-extrabold text-lg text-white">
                {hoveredStock.symbol}
              </span>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  hoveredStock.change >= 0
                    ? "bg-bull/20 text-bull"
                    : "bg-bear/20 text-bear"
                }`}
              >
                {hoveredStock.change >= 0 ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}
                {hoveredStock.change >= 0 ? "+" : ""}
                {hoveredStock.change}%
              </span>
            </div>
            <div className="text-xs text-muted mb-2 font-sans">{hoveredStock.name}</div>
            <div className="flex items-center justify-between gap-4 text-xs font-mono pt-2 border-t border-border/40">
              <span className="text-muted font-sans">Market Cap:</span>
              <span className="text-accent font-bold">{hoveredStock.capFormatted}</span>
            </div>
            <div className="mt-2 text-[10px] text-sand-200 flex items-center gap-1 font-mono">
              <ExternalLink size={10} /> {redirectTarget === "musaffa" ? "MUSAFFA orqali halol tekshirish" : redirectTarget.toUpperCase() + " orqali ko'rish"} uchun bosing
            </div>
            {redirectTarget !== "musaffa" && (
              <a
                href={`https://musaffa.com/stocks/${hoveredStock.symbol.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-2 block text-[10px] text-bull hover:text-white bg-bull/10 hover:bg-bull/20 border border-bull/30 rounded-lg px-2 py-1 text-center font-mono transition-colors"
                style={{ pointerEvents: "auto" }}
              >
                Musaffa da halol tekshirish â†—
              </a>
            )}
          </div>
        )}
      </div>

      {/* Footer Info Pill */}
      <div className="mt-6 text-center text-xs text-muted/70 font-mono">
        ðŸ’¡ Maslahat: Har bir aksiyaga bosib uning to'liq moliyaviy grafiklarini {redirectTarget === "finviz" ? "Finviz" : redirectTarget === "stockanalysis" ? "StockAnalysis" : "Musaffa"} portalida ochishingiz mumkin. Halol tekshirish uchun Musaffa ga yo'naltiriladi â€” bu fatvo emas.
      </div>
    </div>
  );
}
