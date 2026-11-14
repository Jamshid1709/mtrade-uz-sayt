import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, TrendingUp, BarChart3, BookOpen, User, MessageCircle } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Asosiy', icon: <TrendingUp className="w-5 h-5" /> },
  { id: 'markets', label: 'Bozorlar', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'courses', label: 'Kurslar', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'dashboard', label: 'Kabinet', icon: <User className="w-5 h-5" /> },
];

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
    
    // Scroll to top for page changes
    if (pageId !== 'courses') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to courses section
      const element = document.getElementById('courses');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-dark/90 backdrop-blur-lg border-b border-dark-border' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
                <span className="text-dark font-bold text-lg">M</span>
              </div>
              <span className="font-heading font-bold text-white text-lg hidden sm:block">
                MTRADE Academy
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'gold-gradient text-dark'
                      : 'text-gray-400 hover:text-white hover:bg-dark-lighter'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => window.open('https://t.me/mtrade_academy_bot', '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-full text-gold hover:border-gold transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Telegram
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-dark pt-20 md:hidden"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all ${
                      currentPage === item.id
                        ? 'gold-gradient text-dark'
                        : 'bg-dark-card border border-dark-border text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-dark-border">
                <button 
                  onClick={() => window.open('https://t.me/mtrade_academy_bot', '_blank')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-4 gold-gradient text-dark rounded-xl font-medium"
                >
                  <MessageCircle className="w-5 h-5" />
                  Telegram botga o'tish
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
