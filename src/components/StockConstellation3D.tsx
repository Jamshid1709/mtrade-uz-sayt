import React, { useEffect, useRef, useState, useMemo } from "react";
import { ExternalLink, Search, Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { TOP_STOCKS, type StockData } from "./StockSphere3D";

// Sector Colors Palette
export const SECTOR_COLORS: Record<string, string> = {
  Technology: "#3B82F6", // Bright Blue
  "Consumer Cyclical": "#F59E0B", // Amber Gold
  Communication: "#8B5CF6", // Purple
  Healthcare: "#10B981", // Emerald Green
  "Financial Services": "#EC4899", // Pink Cyan
  Energy: "#EF4444", // Bright Red
  "Consumer Defensive": "#06B6D4", // Cyan
  Industrials: "#F97316", // Orange
};

interface ConstellationNode {
  stock: StockData;
  x: number;
  y: number;
  z: number;
  projX: number;
  projY: number;
  projScale: number;
  radius: number;
}

interface ConstellationEdge {
  sourceIdx: number;
  targetIdx: number;
  distance: number;
  sameSector: boolean;
}

export default function StockConstellation3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedSector, setSelectedSector] = useState<string>("ALL");
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  // 3D rotation state
  const anglesRef = useRef({ x: 0.2, y: 0.4 });
  const rotationVelRef = useRef({ rx: 0.002, ry: 0.003 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef<ConstellationNode[]>([]);
  const edgesRef = useRef<ConstellationEdge[]>([]);

  // Unique Sectors list
  const sectors = useMemo(() => {
    const set = new Set(TOP_STOCKS.map((s) => s.sector));
    return ["ALL", ...Array.from(set)];
  }, []);

  // Initialize 3D Constellation Nodes and Network Edges
  useEffect(() => {
    const numNodes = TOP_STOCKS.length;
    const nodes: ConstellationNode[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    // Group stocks by sector for clustered distribution
    const sectorGroups: Record<string, number> = {};
    let sectorCount = 0;
    TOP_STOCKS.forEach((s) => {
      if (sectorGroups[s.sector] === undefined) {
        sectorGroups[s.sector] = sectorCount++;
      }
    });

    for (let i = 0; i < numNodes; i++) {
      const stock = TOP_STOCKS[i];
      const sectorIdx = sectorGroups[stock.sector];
      const sectorAngle = (sectorIdx / sectorCount) * Math.PI * 2;

      // Position in 3D space with sector clustering
      const y = (1 - (i / (numNodes - 1)) * 2) * 260;
      const r = Math.sqrt(Math.max(0, 260 * 260 - y * y));
      const theta = phi * i + sectorAngle * 0.4;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const minCap = 10;
      const maxCap = 3500;
      const normCap = Math.log(stock.marketCap / minCap) / Math.log(maxCap / minCap);
      const nodeRadius = 4 + normCap * 13;

      nodes.push({
        stock,
        x,
        y,
        z,
        projX: 0,
        projY: 0,
        projScale: 1,
        radius: nodeRadius,
      });
    }

    // Build Edges between nodes in the same sector & close distance
    const edges: ConstellationEdge[] = [];
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.hypot(dx, dy, dz);

        const sameSector = nodes[i].stock.sector === nodes[j].stock.sector;
        if (sameSector && dist < 220) {
          edges.push({ sourceIdx: i, targetIdx: j, distance: dist, sameSector: true });
        } else if (dist < 120) {
          edges.push({ sourceIdx: i, targetIdx: j, distance: dist, sameSector: false });
        }
      }
    }

    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, []);

  // Render 3D Constellation Canvas Loop
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
        const height = Math.min(width * 0.75, 600);
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
      const focalLength = 450 * zoomLevel;

      ctx.clearRect(0, 0, width, height);

      // Rotate 3D
      if (!isDraggingRef.current) {
        anglesRef.current.x += rotationVelRef.current.rx;
        anglesRef.current.y += rotationVelRef.current.ry;
      }

      const cosX = Math.cos(anglesRef.current.x);
      const sinX = Math.sin(anglesRef.current.x);
      const cosY = Math.cos(anglesRef.current.y);
      const sinY = Math.sin(anglesRef.current.y);

      // Project Nodes
      const projected = nodesRef.current.map((pt) => {
        let x1 = pt.x * cosY - pt.z * sinY;
        let z1 = pt.z * cosY + pt.x * sinY;

        let y1 = pt.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + pt.y * sinX;

        const scale = focalLength / (focalLength + z2 + 120);
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

      // Draw Constellation Edges (Constellation Web Lines)
      edgesRef.current.forEach((edge) => {
        const p1 = projected[edge.sourceIdx];
        const p2 = projected[edge.targetIdx];

        // Filter check
        if (selectedSector !== "ALL") {
          if (p1.stock.sector !== selectedSector && p2.stock.sector !== selectedSector) {
            return;
          }
        }

        const avgZ = (p1.currentZ + p2.currentZ) / 2;
        const alpha = Math.max(0.04, Math.min(0.45, (avgZ + 300) / 600));

        const sectorColor = SECTOR_COLORS[p1.stock.sector] || "#D6C3A1";

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.projX, p1.projY);
        ctx.lineTo(p2.projX, p2.projY);
        ctx.strokeStyle = edge.sameSector ? sectorColor : "rgba(214, 195, 161, 0.2)";
        ctx.lineWidth = edge.sameSector ? 0.9 * p1.projScale : 0.4 * p1.projScale;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.restore();
      });

      // Sort nodes by Z depth
      projected.sort((a, b) => a.currentZ - b.currentZ);

      // Draw Star Nodes & Glows
      projected.forEach((pt) => {
        const isMatchedSector = selectedSector === "ALL" || pt.stock.sector === selectedSector;
        const isHovered = hoveredNode?.stock.symbol === pt.stock.symbol;

        const alpha = isMatchedSector
          ? Math.max(0.2, Math.min(1, (pt.currentZ + 320) / 500))
          : 0.08;

        const nodeRadius = pt.radius * pt.projScale * (isHovered ? 1.6 : 1);
        const sectorColor = SECTOR_COLORS[pt.stock.sector] || "#D6C3A1";

        ctx.save();
        ctx.globalAlpha = alpha;

        // Outer Glowing Halo for Top/Hovered Stocks
        if (isHovered || pt.stock.marketCap > 1000) {
          ctx.beginPath();
          ctx.arc(pt.projX, pt.projY, nodeRadius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = sectorColor;
          ctx.globalAlpha = alpha * 0.25;
          ctx.fill();
        }

        // Inner Glowing Node
        ctx.beginPath();
        ctx.arc(pt.projX, pt.projY, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#FFFFFF" : sectorColor;
        ctx.globalAlpha = alpha;
        ctx.fill();

        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = isHovered ? 2 : 0.6;
        ctx.stroke();

        // Stock Ticker Symbol Label
        if (isMatchedSector && (isHovered || pt.projScale > 0.85 || pt.stock.marketCap > 500)) {
          const fontSize = Math.max(9, Math.min(16, pt.radius * pt.projScale * 0.85));
          ctx.font = `${isHovered ? "bold" : "600"} ${fontSize}px Sora, sans-serif`;
          ctx.fillStyle = isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.85)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(pt.stock.symbol, pt.projX, pt.projY - nodeRadius - fontSize * 0.6);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedSector, hoveredNode, zoomLevel]);

  // Pointer Handlers
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

    if (isDraggingRef.current) {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;

      anglesRef.current.y += dx * 0.004;
      anglesRef.current.x += dy * 0.004;

      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    }

    // Check hover
    let found: ConstellationNode | null = null;
    let minDist = 25;

    nodesRef.current.forEach((pt) => {
      const dist = Math.hypot(pt.projX - x, pt.projY - y);
      if (dist < minDist) {
        minDist = dist;
        found = pt;
      }
    });

    setHoveredNode(found);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoomLevel((prev) => Math.max(0.6, Math.min(2.0, prev + zoomDelta)));
  };

  const handleOpenExternal = (symbol: string, target: "finviz" | "stockanalysis") => {
    const url =
      target === "finviz"
        ? `https://finviz.com/quote.ashx?t=${symbol}`
        : `https://stockanalysis.com/stocks/${symbol.toLowerCase()}/`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const filteredStocks = searchQuery.trim()
    ? TOP_STOCKS.filter(
        (s) =>
          s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-mblack via-[#0B0C10] to-mblack py-12 px-4 rounded-3xl border border-mgold/30 shadow-2xl">
      {/* Gargantua Cosmic Header & HUD Stats */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mgold/10 border border-mgold/30 text-mgold text-xs font-mono mb-4 shadow-lg shadow-mgold/5">
          <Sparkles size={14} /> 3D Stock Constellation Galaxy Network
        </div>
        <h2 className="font-sora font-extrabold text-3xl sm:text-5xl text-white mb-4">
          Aksiyalar <span className="gold-text">Yulduzlar Turqumi</span>
        </h2>
        <p className="text-mgray text-sm sm:text-base max-w-2xl mx-auto">
          100 ta eng yirik halol aksiyalarning 3D tarmoq grafigi. Sektorlar va bog'liqliklar yulduz turqumlari shaklida o'zaro bog me'yorida joylashgan.
        </p>

        {/* Sector Filter Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {sectors.map((sec) => {
            const isSelected = selectedSector === sec;
            const secColor = sec === "ALL" ? "#D6C3A1" : SECTOR_COLORS[sec] || "#D6C3A1";

            return (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                style={{
                  borderColor: isSelected ? secColor : "rgba(255,255,255,0.1)",
                  backgroundColor: isSelected ? `${secColor}22` : "rgba(17, 17, 19, 0.7)",
                  color: isSelected ? secColor : "#A0A0A8",
                }}
                className="px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all hover:scale-105"
              >
                {sec === "ALL" ? "Barcha Sektorlar (100+)" : sec}
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="mt-5 flex justify-center">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mgray" size={16} />
            <input
              type="text"
              placeholder="Aksiya qidiruvi (AAPL, NVDA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-mcard border border-mborder rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-mgold"
            />
            {filteredStocks.length > 0 && (
              <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-mcard2 border border-mborder rounded-xl shadow-2xl overflow-hidden text-left">
                {filteredStocks.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => {
                      setSelectedStock(stock);
                      setSearchQuery("");
                    }}
                    className="w-full px-4 py-2 hover:bg-mgold/10 flex items-center justify-between border-b border-mborder/30 last:border-0"
                  >
                    <span className="font-mono font-bold text-white text-xs">{stock.symbol}</span>
                    <span className="text-xs text-mgold font-mono">{stock.capFormatted}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3D Constellation Canvas Area */}
      <div className="relative w-full flex justify-center items-center touch-none">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
          onClick={() => {
            if (hoveredNode) {
              setSelectedStock(hoveredNode.stock);
            }
          }}
          className="cursor-grab active:cursor-grabbing max-w-full"
        />

        {/* Floating Tooltip */}
        {hoveredNode && (
          <div
            style={{
              position: "fixed",
              left: Math.min(mousePos.x + 15, window.innerWidth - 240),
              top: Math.max(15, Math.min(mousePos.y - 15, window.innerHeight - 130)),
              pointerEvents: "none",
            }}
            className="z-50 bg-mcard2/95 backdrop-blur-xl border border-mgold/60 p-3.5 rounded-2xl shadow-2xl text-left transform scale-105"
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="font-mono font-extrabold text-lg text-white">
                {hoveredNode.stock.symbol}
              </span>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  hoveredNode.stock.change >= 0
                    ? "bg-mgreen/20 text-mgreen"
                    : "bg-mred/20 text-mred"
                }`}
              >
                {hoveredNode.stock.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {hoveredNode.stock.change >= 0 ? "+" : ""}
                {hoveredNode.stock.change}%
              </span>
            </div>
            <div className="text-xs text-mgray mb-2">{hoveredNode.stock.name}</div>
            <div className="flex items-center justify-between gap-4 text-xs font-mono pt-2 border-t border-mborder/40">
              <span className="text-mgray">Sektor:</span>
              <span style={{ color: SECTOR_COLORS[hoveredNode.stock.sector] || "#D6C3A1" }} className="font-bold">
                {hoveredNode.stock.sector}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs font-mono mt-1">
              <span className="text-mgray">Market Cap:</span>
              <span className="text-mgold font-bold">{hoveredNode.stock.capFormatted}</span>
            </div>
          </div>
        )}
      </div>

      {/* Selected Stock Modal Popup */}
      {selectedStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mblack/80 backdrop-blur-md">
          <div className="bg-mcard2 border border-mgold/50 p-6 rounded-3xl max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedStock(null)}
              className="absolute top-4 right-4 text-mgray hover:text-white font-mono font-bold text-sm"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono font-extrabold text-2xl text-white">
                {selectedStock.symbol}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-mgold/10 text-mgold font-mono text-xs font-bold border border-mgold/30">
                {selectedStock.sector}
              </span>
            </div>
            <div className="text-sm text-mgray mb-4">{selectedStock.name}</div>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-mcard border border-mborder/40 mb-6 font-mono text-xs">
              <div>
                <span className="text-mgray block text-[11px]">Bozor Kapitali:</span>
                <span className="text-mgold font-bold text-sm">{selectedStock.capFormatted}</span>
              </div>
              <div>
                <span className="text-mgray block text-[11px]">24s O'zgarishi:</span>
                <span className={`font-bold text-sm ${selectedStock.change >= 0 ? "text-mgreen" : "text-mred"}`}>
                  {selectedStock.change >= 0 ? "+" : ""}{selectedStock.change}%
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleOpenExternal(selectedStock.symbol, "finviz")}
                className="w-full py-2.5 rounded-xl bg-mgold text-mblack font-sora font-bold text-xs flex items-center justify-center gap-2 hover:bg-mgoldlight transition-all"
              >
                Finviz Portalida Tahlil Qilish <ExternalLink size={14} />
              </button>
              <button
                onClick={() => handleOpenExternal(selectedStock.symbol, "stockanalysis")}
                className="w-full py-2.5 rounded-xl bg-mcard border border-mborder text-white font-sora font-bold text-xs flex items-center justify-center gap-2 hover:border-mgold transition-all"
              >
                StockAnalysis'da Ko'rish <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cinematic HUD Metrics Footer */}
      <div className="mt-8 pt-6 border-t border-mborder/40 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
        <div className="p-3 rounded-2xl bg-mcard/60 border border-mborder/30">
          <div className="font-mono text-lg font-bold text-mgold">$24.5 Trillion</div>
          <div className="font-mono text-[10px] text-mgray uppercase">Jami Bozor Kapitali</div>
        </div>
        <div className="p-3 rounded-2xl bg-mcard/60 border border-mborder/30">
          <div className="font-mono text-lg font-bold text-mgreen">+1.84%</div>
          <div className="font-mono text-[10px] text-mgray uppercase">O'rtacha Sektor Indeksi</div>
        </div>
        <div className="p-3 rounded-2xl bg-mcard/60 border border-mborder/30">
          <div className="font-mono text-lg font-bold text-white">100 Halal Stocks</div>
          <div className="font-mono text-[10px] text-mgray uppercase">Yulduzlar Turqumi</div>
        </div>
        <div className="p-3 rounded-2xl bg-mcard/60 border border-mborder/30">
          <div className="font-mono text-lg font-bold text-mgold">0.84 Modularity</div>
          <div className="font-mono text-[10px] text-mgray uppercase">Tarmoq Zichligi</div>
        </div>
      </div>
    </div>
  );
}
