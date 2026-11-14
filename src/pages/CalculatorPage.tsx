import { useState, useMemo } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { motion } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  BarChart3,
  PieChart,
  Percent,
} from "lucide-react";

// A) Position Size Calculator
function PositionSizeCalc() {
  const [balance, setBalance] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [entry, setEntry] = useState(150);
  const [stopLoss, setStopLoss] = useState(145);

  const result = useMemo(() => {
    if (entry <= stopLoss) return null;
    const riskAmount = balance * (riskPercent / 100);
    const riskPerShare = entry - stopLoss;
    const shares = Math.floor(riskAmount / riskPerShare);
    const totalRisk = shares * riskPerShare;
    return { shares, totalRisk, riskPerShare };
  }, [balance, riskPercent, entry, stopLoss]);

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
        <Calculator size={20} className="text-accent" />
        Position Size Kalkulyatori
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-muted text-sm block mb-1">
            Hisob balansi ($)
          </label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-muted text-sm block mb-1">Risk (%)</label>
          <input
            type="number"
            value={riskPercent}
            onChange={(e) => setRiskPercent(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-muted text-sm block mb-1">
            Entry narxi ($)
          </label>
          <input
            type="number"
            value={entry}
            onChange={(e) => setEntry(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-muted text-sm block mb-1">
            Stop Loss ($)
          </label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>
      </div>
      {result && (
        <div className="bg-ink-900 rounded-xl p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted text-sm">Aksiyalar soni:</span>
            <span className="font-mono font-bold text-accent">
              {result.shares}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted text-sm">Dollar risk:</span>
            <span className="font-mono font-bold text-bear">
              ${result.totalRisk.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted text-sm">Risk/Share:</span>
            <span className="font-mono text-white">
              ${result.riskPerShare.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// B) Risk/Reward Ratio
function RRRcalc() {
  const [entry, setEntry] = useState(150);
  const [stopLoss, setStopLoss] = useState(145);
  const [takeProfit, setTakeProfit] = useState(160);

  const result = useMemo(() => {
    if (entry <= stopLoss || takeProfit <= entry) return null;
    const risk = entry - stopLoss;
    const reward = takeProfit - entry;
    const rrr = reward / risk;
    return { risk, reward, rrr };
  }, [entry, stopLoss, takeProfit]);

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
        <TrendingUp size={20} className="text-accent" />
        Risk/Reward Ratio
      </h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-muted text-sm block mb-1">Entry ($)</label>
          <input
            type="number"
            value={entry}
            onChange={(e) => setEntry(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-muted text-sm block mb-1">
            Stop Loss ($)
          </label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-muted text-sm block mb-1">
            Take Profit ($)
          </label>
          <input
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>
      </div>
      {result && (
        <div className="bg-ink-900 rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-muted text-sm">Risk/Reward:</span>
            <span
              className={`font-mono font-bold text-2xl ${
                result.rrr >= 2 ? "text-bull" : "text-accent"
              }`}
            >
              1:{result.rrr.toFixed(2)}
            </span>
          </div>
          {/* Visual bar */}
          <div className="w-full h-3 bg-border rounded-full overflow-hidden flex">
            <div
              className="h-full bg-bear transition-all"
              style={{
                width: `${Math.min((1 / (result.rrr + 1)) * 100, 50)}%`,
              }}
            />
            <div
              className="h-full bg-bull transition-all"
              style={{
                width: `${Math.min((result.rrr / (result.rrr + 1)) * 100, 80)}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-bear text-xs">Risk ${result.risk}</span>
            <span className="text-bull text-xs">
              Reward ${result.reward}
            </span>
          </div>
          {result.rrr < 2 && (
            <p className="text-accent text-xs mt-2">
              Tavsiya: Minimum 1:2 RRR maqsad qiling.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// C) Fundamental Ratio Calculator
function FundamentalCalc() {
  const [marketCap, setMarketCap] = useState(1000);
  const [revenue, setRevenue] = useState(500);
  const [netIncome, setNetIncome] = useState(100);
  const [debt, setDebt] = useState(200);
  const [equity, setEquity] = useState(800);

  const result = useMemo(() => {
    const shares = marketCap / 50; // assumed price $50
    const eps = netIncome / shares;
    const pe = shares > 0 ? 50 / eps : 0;
    const ps = revenue > 0 ? marketCap / revenue : 0;
    const roe = equity > 0 ? (netIncome / equity) * 100 : 0;
    const de = equity > 0 ? debt / equity : 0;
    const margin = revenue > 0 ? (netIncome / revenue) * 100 : 0;
    return { pe, ps, roe, de, margin };
  }, [marketCap, revenue, netIncome, debt, equity]);

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
        <BarChart3 size={20} className="text-accent" />
        Fundamental Ratio Kalkulyatori
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {[
          ["Market Cap ($B)", marketCap, setMarketCap],
          ["Revenue ($B)", revenue, setRevenue],
          ["Net Income ($B)", netIncome, setNetIncome],
          ["Debt ($B)", debt, setDebt],
          ["Equity ($B)", equity, setEquity],
        ].map(([label, value, setter]) => (
          <div key={label as string}>
            <label className="text-muted text-sm block mb-1">
              {label as string}
            </label>
            <input
              type="number"
              value={value as number}
              onChange={(e) =>
                (setter as (v: number) => void)(Number(e.target.value))
              }
              className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "P/E", value: result.pe.toFixed(2) },
          { label: "P/S", value: result.ps.toFixed(2) },
          { label: "ROE", value: `${result.roe.toFixed(1)}%` },
          { label: "D/E", value: result.de.toFixed(2) },
          { label: "Margin", value: `${result.margin.toFixed(1)}%` },
        ].map((item) => (
          <div key={item.label} className="bg-ink-900 rounded-lg p-3 text-center">
            <p className="text-muted text-xs">{item.label}</p>
            <p className="font-mono font-bold text-accent text-lg">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// D) Portfolio Allocation
function PortfolioCalc() {
  const [total, setTotal] = useState(10000);
  const [allocations, setAllocations] = useState([
    { name: "AAPL", percent: 30 },
    { name: "TSLA", percent: 25 },
    { name: "NVDA", percent: 25 },
    { name: "Cash", percent: 20 },
  ]);

  const remaining = 100 - allocations.reduce((s, a) => s + a.percent, 0);

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
        <PieChart size={20} className="text-accent" />
        Portfolio Taqsimoti
      </h3>
      <div className="mb-4">
        <label className="text-muted text-sm block mb-1">
          Umumiy kapital ($)
        </label>
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none mb-4"
        />
        <div className="space-y-3">
          {allocations.map((a, i) => (
            <div key={a.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={a.name}
                  onChange={(e) => {
                    const na = [...allocations];
                    na[i].name = e.target.value;
                    setAllocations(na);
                  }}
                  className="w-16 sm:w-20 bg-card border border-border rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-white text-xs sm:text-sm focus:border-accent outline-none"
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={a.percent}
                  onChange={(e) => {
                    const na = [...allocations];
                    na[i].percent = Number(e.target.value);
                    setAllocations(na);
                  }}
                  className="flex-1 accent-wine-500"
                />
              </div>
              <div className="flex items-center gap-2 sm:gap-1 ml-2 sm:ml-0">
                <span className="font-mono text-white text-xs sm:text-sm w-8 sm:w-12 text-right">
                  {a.percent}%
                </span>
                <span className="font-mono text-accent text-xs sm:text-sm w-16 sm:w-20 text-right">
                  ${((total * a.percent) / 100).toFixed(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <span
            className={remaining === 0 ? "text-bull" : "text-bear"}
          >
            Qoldiq: {remaining}%
          </span>
          <span className="text-muted">
            Ajratildi: ${(
              allocations.reduce((s, a) => s + (total * a.percent) / 100, 0)
            ).toFixed(0)}
          </span>
        </div>
      </div>

      {/* Pie chart visual (CSS) */}
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full relative"
          style={{
            background: `conic-gradient(
              #D6C3A1 0deg ${allocations[0].percent * 3.6}deg,
              #8D7B63 ${allocations[0].percent * 3.6}deg ${(allocations[0].percent + allocations[1].percent) * 3.6}deg,
              #E8D5B5 ${(allocations[0].percent + allocations[1].percent) * 3.6}deg ${(allocations[0].percent + allocations[1].percent + allocations[2].percent) * 3.6}deg,
              #3A3A40 ${(allocations[0].percent + allocations[1].percent + allocations[2].percent) * 3.6}deg 360deg
            )`,
          }}
        >
          <div className="absolute inset-4 rounded-full bg-card" />
        </div>
      </div>
    </div>
  );
}

// E) Compound Interest
function CompoundCalc() {
  const [principal, setPrincipal] = useState(1000);
  const [monthly, setMonthly] = useState(100);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);

  const data = useMemo(() => {
    const r = [];
    let total = principal;
    for (let y = 0; y <= years; y++) {
      r.push({ year: y, total: Math.round(total) });
      total = total * (1 + rate / 100) + monthly * 12;
    }
    return r;
  }, [principal, monthly, rate, years]);

  const maxVal = data[data.length - 1]?.total || 1;

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
        <Percent size={20} className="text-accent" />
        Daromad Kalkulyatori (Compound)
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-muted text-sm block mb-1">
            Boshlang'ich ($)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-muted text-sm block mb-1">
            Oylik qo'shimcha ($)
          </label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-muted text-sm block mb-1">
            Yillik foiz (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-muted text-sm block mb-1">Yillar</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-px sm:gap-1 h-36 overflow-x-auto pb-1">
        {data.map((d) => (
          <motion.div
            key={d.year}
            title={`$${d.total.toLocaleString()}`}
            className="flex-1 min-w-[20px] sm:min-w-0 bg-gradient-to-t from-wine-700dark to-sand-100 rounded-t cursor-pointer relative group"
            initial={{ height: 0 }}
            animate={{ height: `${(d.total / maxVal) * 144}px` }}
            transition={{ duration: 0.6, delay: d.year * 0.04, ease: "easeOut" }}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-accent text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              ${d.total.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-px sm:gap-1 overflow-x-auto">
        {data.map((d) => (
          <div key={d.year} className="flex-1 min-w-[20px] sm:min-w-0 text-center">
            <span className="text-muted text-[10px] sm:text-xs">{d.year}y</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-ink-950 to-surface">
        <div className="section-container text-center">
          <ScrollReveal>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
              Treyding <span className="gold-text">Kalkulyatori</span>
            </h1>
            <p className="text-muted max-w-2xl mx-auto">
              Professional treyding uchun 5 ta foydali kalkulyator.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-ink-950">
        <div className="section-container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-6">
            <ScrollReveal>
              <PositionSizeCalc />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <RRRcalc />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <FundamentalCalc />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <PortfolioCalc />
            </ScrollReveal>
            <ScrollReveal delay={0.4} className="lg:col-span-2">
              <CompoundCalc />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
