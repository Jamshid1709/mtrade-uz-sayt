// import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Bot } from 'lucide-react';

interface StatProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const Stat = ({ label, value, icon }: StatProps) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-dark-lighter border border-dark-border flex items-center justify-center text-gold">
      {icon}
    </div>
    <div>
      <p className="text-2xl font-mono font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </div>
);

export default function Hero() {
  const scrollToCourses = () => {
    const element = document.getElementById('courses');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-dark overflow-hidden">
      {/* Background pattern with candles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="candles" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
              <rect x="10" y="10" width="4" height="20" fill="#D6C3A1" opacity="0.3" />
              <rect x="30" y="5" width="4" height="30" fill="#8D7B63" opacity="0.3" />
              <rect x="50" y="15" width="4" height="15" fill="#D6C3A1" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#candles)" />
        </svg>
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-dark/10 rounded-full blur-[100px] animate-pulse-glow animation-delay-400" />
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
        {/* Left side - Text */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-lighter border border-dark-border text-gold text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Professional treyding ta'limi</span>
            </motion.div>
            
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              MTRADE Academy — <br />
              <span className="gold-gradient-text">
                0 dan PRO darajagacha
              </span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
            Real bozor misollari, tizimli risk-menedjment va daromadli treyding yo'li. 
            Professional treyderlar bilan birga o'rganing.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={scrollToCourses}
              className="btn-gold flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Bepul start darsi
            </button>
            <button 
              onClick={scrollToCourses}
              className="btn-outline"
            >
              Kurslarni ko'rish
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-dark-border">
            <Stat label="O'quvchilar" value="50+" icon={<Users className="w-5 h-5" />} />
            <Stat label="Kurslar" value="3" icon={<BookOpen className="w-5 h-5" />} />
            <Stat label="Qo'llab-quvvatlash" value="24/7" icon={<Bot className="w-5 h-5" />} />
          </div>
        </motion.div>

        {/* Right side - Video */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="aspect-video rounded-2xl overflow-hidden border border-dark-border bg-dark-card shadow-2xl relative">
            {/* Video placeholder with play button */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark-card to-dark">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full gold-gradient flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-gold">
                  <svg className="w-8 h-8 text-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Tanishtiruv videosi</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-gold to-gold-dark opacity-20 blur-3xl -z-10 rounded-full animate-pulse-glow" />
          
          {/* Floating stats card */}
          <motion.div 
            className="absolute -bottom-6 -left-6 bg-dark-card border border-dark-border rounded-xl p-4 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">O'quvchilar muvaffaqiyati</p>
                <p className="text-xl font-bold text-white">85%+</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}
