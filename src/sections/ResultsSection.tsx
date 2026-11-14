import ScrollReveal from "../components/ScrollReveal";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { useRef } from "react";

const results = [
  { src: "/images/Natija_1.webp", alt: "Trading natija - 53% daromad", label: "+53%" },
  { src: "/images/Natija_2.webp", alt: "TSLA pozitsiyasi - take profit", label: "TSLA TP" },
  { src: "/images/Natija_3.webp", alt: "PR permian resources - 15.39", label: "+15.39%" },
  { src: "/images/Natija_4.webp", alt: "Trading natija 4", label: "Real natija" },
  { src: "/images/Natija_5.webp", alt: "Trading natija 5", label: "Real natija" },
];

function TiltCard({ src, alt, label, delay }: { src: string; alt: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
        className="relative rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-colors duration-300 cursor-pointer group"
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full gold-gradient-bg flex items-center justify-center">
              <TrendingUp size={14} className="text-ink-950" />
            </div>
            <span className="font-mono font-bold text-accent text-sm">{label}</span>
          </div>
        </div>
        {/* Shine effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{ background: "linear-gradient(135deg, #D6C3A1 0%, transparent 60%)" }}
        />
      </motion.div>
    </ScrollReveal>
  );
}

export default function ResultsSection() {
  return (
    <section className="py-24 bg-ink-950">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              <span className="gold-text">Natijalar</span>imiz
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              O'quvchilarimizning real bozorda erishgan natijalari.
            </p>
          </div>
        </ScrollReveal>

        {/* First row: 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {results.slice(0, 3).map((result, i) => (
            <TiltCard key={result.src} {...result} delay={i * 0.1} />
          ))}
        </div>
        {/* Second row: 2 cards centered */}
        <div className="grid md:grid-cols-2 gap-6 md:max-w-2xl mx-auto mb-8">
          {results.slice(3).map((result, i) => (
            <TiltCard key={result.src} {...result} delay={(i + 3) * 0.1} />
          ))}
        </div>

        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 text-ink-500 text-xs">
            <AlertTriangle size={14} />
            <span>
              O'tgan natija kelajak kafolati emas. Investitsiya maslahati emas.
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
