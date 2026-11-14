import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, BookOpen, Users, User } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Asosiy', icon: TrendingUp },
  { id: 'markets', label: 'Bozorlar', icon: BarChart3 },
  { id: 'courses', label: 'Kurslar', icon: BookOpen },
  { id: 'about', label: 'Haqimizda', icon: Users },
  { id: 'dashboard', label: 'Kabinet', icon: User },
];

export default function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-dark-card/95 backdrop-blur-lg border-t border-dark-border md:hidden"
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all ${
                isActive ? 'text-gold' : 'text-gray-400'
              }`}
            >
              <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                  />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
