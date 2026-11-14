import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  BookOpen,
  ChevronRight,
  Wallet,
  BarChart3,
  MessageCircle,
  Users
} from '@/lib/icons';

// Telegram WebApp type declaration
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        initData?: string;
        themeParams?: { bg_color?: string };
        initDataUnsafe?: {
          user?: {
            first_name: string;
            last_name?: string;
            username?: string;
            id: number;
          };
        };
        MainButton: {
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
      };
    };
  }
}

interface TickerRowProps {
  symbol: string;
  name: string;
  price: string;
  change: string;
}

const TickerRow = ({ symbol, name, price, change }: TickerRowProps) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="flex justify-between items-center py-3 border-b border-border last:border-0">
      <div>
        <p className="font-bold text-foreground">{symbol}</p>
        <p className="text-xs text-muted">{name}</p>
      </div>
      <div className="text-right">
        <p className="font-mono text-foreground">{price}</p>
        <p className={`text-xs font-mono ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </p>
      </div>
    </div>
  );
};

const quickActions = [
  { icon: <BookOpen className="w-5 h-5" />, label: 'Kurslar', color: 'bg-blue-500/20 text-blue-500' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Bozor', color: 'bg-green-500/20 text-green-500' },
  { icon: <Wallet className="w-5 h-5" />, label: 'Hisob', color: 'bg-primary/20 text-accent' },
  { icon: <MessageCircle className="w-5 h-5" />, label: 'Yordam', color: 'bg-purple-500/20 text-purple-500' },
];

export default function MiniAppHome() {
  const [user, setUser] = useState<any>(null);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    // Check if running in Telegram
    if (window.Telegram?.WebApp) {
      setIsTelegram(true);
      const tg = window.Telegram.WebApp;
      const tgUser = tg.initDataUnsafe?.user;
      setUser(tgUser);

      // Initialize Telegram WebApp
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#0B0B0D');
      tg.setBackgroundColor('#0B0B0D');

      // Setup MainButton
      const MainButton = tg.MainButton;
      MainButton.setText("Kurslarni ko'rish");
      MainButton.onClick(() => {
        window.location.href = '/courses';
      });
      MainButton.show();
    }
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 text-foreground pb-24">
      {/* Header */}
      <motion.div 
        className="p-4 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full wine-gradient-bg flex items-center justify-center text-2xl font-bold text-sand-100">
            {user?.first_name?.[0] || 'M'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">MTRADE Academy</h1>
            <p className="text-muted">Mini App</p>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="wine-gradient-bg rounded-2xl p-6 text-sand-100">
          <h2 className="text-xl font-bold mb-2">
            Salom, {user?.first_name || 'Mehmon'}!
          </h2>
          <p className="text-sm opacity-90 mb-4">
            0 dan PRO darajagacha bo'lgan yo'lni biz bilan boshlang.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>Bugun 12 ta o'quvchi faol</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-muted text-sm">O'quvchilar</p>
            <p className="text-2xl font-bold text-accent">50+</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-muted text-sm">Kurslar</p>
            <p className="text-2xl font-bold text-foreground">3</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-bold text-lg mb-3">Tezkor aksiyalar</h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, idx) => (
              <button 
                key={idx} 
                className="flex flex-col items-center gap-2 p-3 bg-card rounded-xl border border-border hover:border-accent/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                  {action.icon}
                </div>
                <span className="text-xs text-muted">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Markets Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Bozorlar</h3>
            <button className="text-accent text-sm flex items-center gap-1">
              Hammasi
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 space-y-1">
            <TickerRow symbol="BTC" name="Bitcoin" price="$67,432" change="+2.4%" />
            <TickerRow symbol="ETH" name="Ethereum" price="$3,521" change="+1.8%" />
            <TickerRow symbol="GOLD" name="Gold" price="$2,340" change="-0.5%" />
            <TickerRow symbol="SPX" name="S&P 500" price="$5,234" change="+0.8%" />
          </div>
        </div>

        {/* Active Courses */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg">Faol kurslar</h3>
          <div className="space-y-3">
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl">
                  ðŸ“Š
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Premium Trading</h4>
                  <p className="text-sm text-muted">Progress: 65%</p>
                </div>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <div className="h-full wine-gradient-bg rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Support Banner */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-foreground">24/7 Qo'llab-quvvatlash</h4>
              <p className="text-sm text-muted">AI yordamchi sizga yordam beradi</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted" />
          </div>
        </div>
      </motion.div>

      {/* Quyi navigatsiya - faqat Telegram tashqarisida */}
      {!isTelegram && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3">
          <div className="flex justify-around">
            {[
              { icon: <TrendingUp className="w-5 h-5" />, label: 'Asosiy', active: true },
              { icon: <BookOpen className="w-5 h-5" />, label: 'Kurslar', active: false },
              { icon: <BarChart3 className="w-5 h-5" />, label: 'Bozor', active: false },
              { icon: <Users className="w-5 h-5" />, label: 'Profil', active: false },
            ].map((item, idx) => (
              <button key={idx} className={`flex flex-col items-center gap-1 ${item.active ? 'text-accent' : 'text-muted'}`}>
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
