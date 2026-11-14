import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  BarChart3,
  Globe,
  AlertCircle,
  Play,
  Zap,
  Shield,
  Bot
} from 'lucide-react';

const BOT_LINK = 'https://t.me/mtrade_obuna_bot';

// ─── App_2 dan: Bozor kartalari ───────────────────────────────────────────────
const marketData = [
  { symbol: 'BTC', name: 'Bitcoin',  price: '$67,432', change: '+2.4%', positive: true  },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,521',  change: '+1.8%', positive: true  },
  { symbol: 'GOLD', name: 'Gold',    price: '$2,340',  change: '-0.5%', positive: false },
  { symbol: 'SPX', name: 'S&P 500', price: '$5,234',  change: '+0.8%', positive: true  },
];

const YOUTUBE_ANALYSIS = [
  { title: "Bugungi bozor sharhi",      url: "https://www.youtube.com/watch?v=qPst70A95rM" },
  { title: "Bitcoin texnik tahlili",    url: "https://www.youtube.com/watch?v=sYvsKsEHC8c" },
  { title: "Xalqaro yangiliklar ta'siri", url: "https://www.youtube.com/watch?v=qPst70A95rM" },
];

const advantages = [
  { icon: <Zap    className="w-6 h-6" />, title: 'Real vaqt',      description: "Jonli bozor ma'lumotlari"    },
  { icon: <BarChart3 className="w-6 h-6" />, title: 'Mentor sharhlari', description: 'Professional tahlillar'    },
  { icon: <Bot    className="w-6 h-6" />, title: 'AI yordami',     description: "Sun'iy intellekt tavsiyalari" },
  { icon: <Shield className="w-6 h-6" />, title: 'Ishonchli',      description: 'TradingView manbalari'        },
];

// ─── App dan: TradingView widget'lari ─────────────────────────────────────────
const TradingViewWidget = ({ type }: { type: 'market-overview' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.type = 'text/javascript';

    if (type === 'market-overview') {
      script.innerHTML = JSON.stringify({
        colorTheme: 'dark', dateRange: '1D', showChart: true, locale: 'en',
        width: '100%', height: '100%', largeChartUrl: '', isTransparent: true,
        showSymbolLogo: true, showFloatingTooltip: true,
        plotLineColorGrowing: '#10B981', plotLineColorFalling: '#EF4444',
        gridLineColor: '#2A2A2A', scaleFontColor: '#6B7280',
        belowLineFillColorGrowing: 'rgba(16,185,129,0.1)',
        belowLineFillColorFalling: 'rgba(239,68,68,0.1)',
        belowLineFillColorGrowingBottom: 'rgba(16,185,129,0.05)',
        belowLineFillColorFallingBottom: 'rgba(239,68,68,0.05)',
        symbolActiveColor: 'rgba(214,195,161,0.2)',
        tabs: [
          { title: 'Indices', symbols: [
            { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' }, { s: 'FOREXCOM:NSXUSD', d: 'Nasdaq 100' },
            { s: 'FOREXCOM:DJI', d: 'Dow Jones' },  { s: 'INDEX:NKY', d: 'Nikkei 225' },
            { s: 'INDEX:DAX', d: 'DAX' },
          ]},
          { title: 'Crypto', symbols: [
            { s: 'BINANCE:BTCUSDT', d: 'Bitcoin' }, { s: 'BINANCE:ETHUSDT', d: 'Ethereum' },
            { s: 'BINANCE:SOLUSDT', d: 'Solana' },  { s: 'BINANCE:BNBUSDT', d: 'BNB' },
            { s: 'BINANCE:XRPUSDT', d: 'XRP' },
          ]},
          { title: 'Forex', symbols: [
            { s: 'FX:EURUSD', d: 'EUR/USD' }, { s: 'FX:GBPUSD', d: 'GBP/USD' },
            { s: 'FX:USDJPY', d: 'USD/JPY' }, { s: 'FX:AUDUSD', d: 'AUD/USD' },
            { s: 'FX:USDCAD', d: 'USD/CAD' },
          ]},
          { title: 'Commodities', symbols: [
            { s: 'TVC:GOLD', d: 'Gold' }, { s: 'TVC:SILVER', d: 'Silver' },
            { s: 'TVC:USOIL', d: 'Crude Oil' }, { s: 'TVC:NATURALGAS', d: 'Natural Gas' },
          ]},
        ],
      });
    }

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(script);
    return () => { if (containerRef.current) containerRef.current.innerHTML = ''; };
  }, [type]);

  return <div ref={containerRef} className="w-full h-full" />;
};

const StockHeatmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify({
      exchanges: [], dataSource: 'SPX500', grouping: 'sector',
      blockSize: 'market_cap_basic', blockColor: 'change', locale: 'en',
      symbolUrl: '', colorTheme: 'dark', hasTopBar: true,
      isDataSetEnabled: true, isZoomEnabled: true, hasSymbolTooltip: true,
      width: '100%', height: '100%',
    });

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(script);
    return () => { if (containerRef.current) containerRef.current.innerHTML = ''; };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

const TickerRow = ({ symbol, name, price, change }: {
  symbol: string; name: string; price: string; change: string;
}) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="flex justify-between items-center py-3 border-b border-dark-border last:border-0 hover:bg-dark-lighter/50 px-2 rounded transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-dark-lighter flex items-center justify-center font-mono font-bold text-gold text-sm">
          {symbol.slice(0, 2)}
        </div>
        <div>
          <p className="font-bold text-white">{symbol}</p>
          <p className="text-xs text-gray-400">{name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-mono font-medium text-white">{price}</p>
        <p className={`text-xs font-mono ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
      </div>
    </div>
  );
};

const topMovers = [
  { symbol: 'BTC',  name: 'Bitcoin',  price: '$67,432', change: '+2.4%' },
  { symbol: 'ETH',  name: 'Ethereum', price: '$3,521',  change: '+1.8%' },
  { symbol: 'GOLD', name: 'Gold',     price: '$2,340',  change: '-0.5%' },
  { symbol: 'SPX',  name: 'S&P 500',  price: '$5,234',  change: '+0.8%' },
  { symbol: 'NVDA', name: 'NVIDIA',   price: '$892',    change: '+3.2%' },
];

// ─── Asosiy komponent ─────────────────────────────────────────────────────────
export default function Markets() {
  const openYoutube = (url: string) => window.open(url, '_blank');
  const handleBotClick = () => window.open(BOT_LINK, '_blank');

  return (
    <div className="min-h-screen bg-dark pt-24 pb-12">
      <div className="container mx-auto px-4">

        {/* ── Header ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
              <Globe className="w-6 h-6 text-dark" />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-bold text-white">Bozorlar</h1>
              <p className="text-gray-400">Real vaqtda dunyo bozorlarini kuzatib boring</p>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            APP_2 QISMI — yuqorida boshlanadi
        ══════════════════════════════════════════════════════ */}

        {/* Bozor kartalari */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {marketData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-gold/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-dark-lighter flex items-center justify-center font-mono font-bold text-gold">
                  {item.symbol.slice(0, 2)}
                </div>
                <span className={`text-sm font-mono ${item.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {item.change}
                </span>
              </div>
              <p className="text-lg font-bold text-white">{item.symbol}</p>
              <p className="text-sm text-gray-400 mb-2">{item.name}</p>
              <p className="text-xl font-mono font-bold text-white">{item.price}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Nima uchun biz bilan kuzatish kerak */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
            <h2 className="text-2xl font-heading font-bold text-white mb-6 text-center">
              Nima uchun bozorlarni biz bilan kuzatish kerak?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {advantages.map((adv, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-gold/20 flex items-center justify-center text-gold mb-3">
                    {adv.icon}
                  </div>
                  <h3 className="font-bold text-white mb-1">{adv.title}</h3>
                  <p className="text-sm text-gray-400">{adv.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* YouTube video tahlillar */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-dark-lighter border border-dark-border text-gold text-sm mb-4">
              Video tahlillar
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Bozor tahlili videolari
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Professional mentorlar tomonidan tayyorlangan bozor tahlili videolari
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {YOUTUBE_ANALYSIS.map((video, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => openYoutube(video.url)}
                className="group relative bg-dark-card border border-dark-border rounded-2xl p-6 text-left hover:border-gold/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-dark ml-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">YouTube'da ko'rish →</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            APP (HOZIRGI) QISMI — pastda davom etadi
        ══════════════════════════════════════════════════════ */}

        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-1 bg-dark-card border border-dark-border rounded-full text-gold text-sm">
              Jonli bozor ma'lumotlari
            </span>
          </div>
        </div>

        {/* Top Movers + TradingView */}
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-dark-card rounded-2xl border border-dark-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  <h3 className="text-xl font-bold text-white">Top Movers</h3>
                </div>
                <span className="text-xs text-gray-400">24 soat</span>
              </div>
              <div className="space-y-1">
                {topMovers.map((item, idx) => <TickerRow key={idx} {...item} />)}
              </div>
            </div>

            <div className="bg-dark-card rounded-2xl border border-dark-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-bold text-white">Bozor statistikasi</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">24s hajm</span>
                  <span className="text-white font-mono">$245B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dominansiya</span>
                  <span className="text-white font-mono">BTC 52%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fear & Greed</span>
                  <span className="text-green-500 font-mono">72 (Ochko'zlik)</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-dark-card rounded-2xl border border-dark-border p-6 h-[600px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Bozor ko'rik</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Jonli
                </div>
              </div>
              <div className="h-[520px]">
                <TradingViewWidget type="market-overview" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Heatmap */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-dark-card rounded-2xl border border-dark-border p-6 h-[500px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Sektorlar issiqlik xaritasi</h3>
              <span className="text-xs text-gray-400">S&P 500</span>
            </div>
            <div className="h-[420px]">
              <StockHeatmap />
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-8 bg-gradient-to-br from-gold/10 to-gold-dark/10 rounded-2xl border border-gold/30 p-8 text-center"
        >
          <h2 className="text-2xl font-heading font-bold text-white mb-4">
            Professional treyderlar bilan o'rganing
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Bozorlarni to'g'ri tahlil qilishni o'rganing va professional treyderga aylaning
          </p>
          <button onClick={handleBotClick} className="btn-gold">
            <TrendingUp className="w-5 h-5 inline mr-2" />
            Bepul konsultatsiya
          </button>
        </motion.section>

        {/* Disclaimer */}
        <motion.div
          className="mt-8 flex items-start gap-3 p-4 bg-dark-lighter/50 rounded-xl border border-dark-border"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <p className="text-sm text-gray-400">
            Ma'lumotlar 15 daqiqa kechikish bilan taqdim etiladi. TradingView™ manbalari asosida.
            Ushbu ma'lumotlar faqat ma'lumot uchun mo'ljallangan va investitsiya maslahati emas.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
