import { AlertTriangle, TrendingUp, CaretLeft, CaretRight } from "@/lib/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScrollReveal from "../components/ScrollReveal";

const results = [
  { src: "/images/Natija_1.webp", alt: "Trading natija — 53% daromad", label: "+53%" },
  { src: "/images/Natija_2.webp", alt: "TSLA pozitsiyasi — take profit", label: "TSLA TP" },
  { src: "/images/Natija_3.webp", alt: "PR permian resources — 15.39", label: "+15.39%" },
  { src: "/images/Natija_4.webp", alt: "Trading natija 4 — real pozitsiya", label: "Natija" },
  { src: "/images/Natija_5.webp", alt: "Trading natija 5 — real pozitsiya", label: "Natija" },
];

export default function ResultsSection() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const len = results.length;
  const total = len;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), 5500);
    return () => clearInterval(id);
  }, [paused, reducedMotion, total]);

  const go = (i: number) => setActive(((i % total) + total) % total);
  const next = () => go(active + 1);
  const prev = () => go(active - 1);

  // 5 elementdan offset va markaz ko'rinishini hisoblash
  const offsetOf = (i: number) => {
    let o = i - active;
    while (o > total / 2) o -= total;
    while (o < -total / 2) o += total;
    return o;
  };

  return (
    <section
      className="py-24 bg-ink-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Natijalar galereyasi"
    >
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              <span className="sand-text">Natijalar</span>imiz
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              O&apos;quvchilarimizning real bozorda erishgan natijalari.
            </p>
          </div>
        </ScrollReveal>

        {/* Coverflow — brand p.18 uslub: aurora nur + glass */}
        <div
          className="relative mx-auto w-full max-w-5xl h-[420px] sm:h-[460px] select-none"
          style={{ perspective: 1400 }}
        >
          {/* Orqa nur */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[380px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(240,106,114,0.16), transparent)" }}
          />

          {results.map((r, i) => {
            const o = offsetOf(i);
            const abs = Math.abs(o);
            const isCenter = o === 0;
            return (
              <motion.div
                key={r.src}
                role={isCenter ? "img" : "button"}
                data-glow-none
                tabIndex={isCenter ? -1 : 0}
                aria-label={isCenter ? r.alt : `${total - i}-rasmni markazga keltirish`}
                aria-current={isCenter}
                onClick={() => !isCenter && go(i)}
                onKeyDown={(e) => {
                  if (!isCenter && (e.key === "Enter" || e.key === " ")) go(i);
                }}
                className={`absolute left-1/2 top-1/2 cursor-pointer focus:outline-none focus-visible:ring-2 ring-accent rounded-3xl ${
                  isCenter ? "" : "hover:border-accent/60"
                }`}
                style={{
                  width: "min(280px, 62vw)",
                  height: "360px",
                  marginLeft: "max(-140px, -31vw)",
                  marginTop: "-180px",
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  x: o * 200,
                  z: -abs * 130,
                  rotateY: o * -26,
                  scale: 1 - abs * 0.16,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.36,
                }}
                transition={{ type: "spring", stiffness: 210, damping: 28, mass: 0.9 }}
              >
                <motion.div
                  className="relative w-full h-full rounded-3xl overflow-hidden border border-border bg-card shadow-2xl"
                >
                  <img loading="lazy" decoding="async"
                    src={r.src}
                    alt={r.alt}
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  {/* Pastki overlay: label */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(1,11,19,0.82) 0%, rgba(1,11,19,0.25) 38%, transparent 65%)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full wine-gradient-bg flex items-center justify-center">
                        <TrendingUp size={16} weight="duotone" className="text-sand-100" />
                      </div>
                      <span className="font-mono font-bold text-highlight text-sm uppercase tracking-wide">
                        {r.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Chap / o'ng tugmalar */}
          <button
            onClick={prev}
            aria-label="Oldingi natija"
            className="absolute z-20 left-1 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card border border-white/10 flex items-center justify-center text-sand-100 hover:text-accent hover:border-accent/50 transition-all"
          >
            <CaretLeft size={22} weight="bold" />
          </button>
          <button
            onClick={next}
            aria-label="Keyingi natija"
            className="absolute z-20 right-1 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card border border-white/10 flex items-center justify-center text-sand-100 hover:text-accent hover:border-accent/50 transition-all"
          >
            <CaretRight size={22} weight="bold" />
          </button>
        </div>

        {/* Nuqtalar */}
        <div className="flex items-center justify-center gap-2.5 mt-6" role="tablist" aria-label="Natija tanlash">
          {results.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              aria-label={`Natija ${i + 1}`}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 ring-accent ${
                active === i ? "w-7 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-ink-700 hover:bg-ink-600"
              }`}
            />
          ))}
        </div>

        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 text-ink-500 text-xs mt-8">
            <AlertTriangle size={14} />
            <span>O&apos;tgan natija kelajak kafolati emas. Investitsiya maslahati emas.</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
