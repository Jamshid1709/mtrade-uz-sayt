import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Mentor } from "../data/mentors";

// Brand lanyard palitrasi (tasdiqlangan): Wine 700 · Sand 300 · Wine 400 · Ink 700
const LANYARDS = [
  "linear-gradient(180deg, #B30E32 0%, #7F011F 100%)",
  "linear-gradient(180deg, #EADBB7 0%, #BCA97B 100%)",
  "linear-gradient(180deg, #F79C9D 0%, #B30E32 100%)",
  "linear-gradient(180deg, #4D5C65 0%, #213039 100%)",
];

interface HangingBadgesProps {
  mentors: Mentor[];
}

export default function HangingBadges({ mentors }: HangingBadgesProps) {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = useReducedMotion();

  // ESC — barcha badge'larni yopadi
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative mx-auto max-w-5xl select-none" aria-label="Jamoa badges">
      {/* Rail — temir zanjir */}
      <div
        aria-hidden
        className="relative h-[6px] mx-1 sm:mx-6 rounded-full"
        style={{
          background:
            "linear-gradient(180deg, #6E7B84 0%, #31414A 45%, #0A1922 100%)",
          boxShadow:
            "0 1px 0 rgba(235,241,245,0.28), 0 3px 8px rgba(0,0,0,0.55)",
        }}
      >
        <span className="absolute -left-2 -top-[4px] w-[10px] h-[14px] rounded-[2px] bg-ink-800 border border-ink-700" />
        <span className="absolute -right-2 -top-[4px] w-[10px] h-[14px] rounded-[2px] bg-ink-800 border border-ink-700" />
      </div>

      {/* Badges qatori */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 sm:gap-x-4 gap-y-6 px-1 sm:px-2">
        {mentors.map((m, i) => {
          const lanyard = LANYARDS[i % LANYARDS.length];
          const flipped = open === i;
          return (
            <motion.div
              key={m.name}
              className="flex flex-col items-center"
              style={{ transformOrigin: "50% 0%" }}
              animate={reduced ? undefined : { rotateZ: [-2.1, 2.1, -2.1] }}
              transition={{
                duration: 3.4 + i * 0.38,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              {/* Hook — raildagi halqa */}
              <div
                aria-hidden
                className="w-[13px] h-[13px] -mt-[7px] rounded-full border-2 border-ink-400 bg-[#0C1B24] relative z-10"
                style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)" }}
              />
              {/* Lanyard — shnur */}
              <div
                aria-hidden
                className="w-[10px] h-24 sm:h-28 rounded-b-[4px]"
                style={{
                  background: lanyard,
                  boxShadow:
                    "inset -2px 0 2px rgba(255,255,255,0.22), inset 2px 0 2px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.4)",
                }}
              />
              {/* Clip — metall qisqich */}
              <div
                aria-hidden
                className="w-7 h-[14px] -mt-[2px] rounded-[3px] border border-ink-300"
                style={{
                  background:
                    "linear-gradient(180deg, #BFC9CF 0%, #6E7B84 55%, #31414A 100%)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.6)",
                }}
              />

              {/* Badge — flip kartasi */}
              <button
                type="button"
                data-glow-none
                onClick={() => setOpen(flipped ? null : i)}
                aria-pressed={flipped}
                aria-label={
                  flipped
                    ? `${m.name}ning biosini yopish`
                    : `${m.name} haqida biosini ochish`
                }
                className="relative w-[132px] sm:w-40 md:w-44 h-52 sm:h-60 md:h-[248px] focus:outline-none focus-visible:ring-2 ring-accent rounded-2xl"
                style={{ perspective: 900 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 230, damping: 24 }}
                >
                  {/* OLD YUZ */}
                  <div
                    className="absolute inset-0 rounded-2xl border border-[#213039] bg-[#0C1B24] p-2.5 sm:p-3 flex flex-col items-center shadow-[0_20px_44px_rgba(0,0,0,0.6)]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Rasm doirasi */}
                    <div className="w-[72px] h-[72px] sm:w-20 sm:h-20 md:w-[88px] md:h-[88px] rounded-full overflow-hidden border-2 border-sand-100/70 bg-ink-900 mt-1">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-foreground mt-2 leading-tight">
                      {m.name}
                    </h3>
                    <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-sand-100 text-center leading-snug mt-1 px-1">
                      {m.role}
                    </p>
                    <span className="mt-2 inline-flex items-center rounded-full bg-primary text-sand-100 text-[9px] sm:text-[10px] font-mono font-medium uppercase tracking-[0.12em] px-2.5 py-1">
                      {m.experience}
                    </span>
                    {/* Barcode */}
                    <div className="mt-auto pt-2 flex flex-col items-center gap-1">
                      <div
                        aria-hidden
                        className="h-[18px] w-[96px] sm:w-[112px]"
                        style={{
                          background:
                            "repeating-linear-gradient(90deg,#EBF1F5 0 2px,transparent 2px 4px,#EBF1F5 4px 5px,transparent 5px 8px,#EBF1F5 8px 11px,transparent 11px 13px,#EBF1F5 13px 14px,transparent 14px 17px)",
                        }}
                      />
                      <span className="font-mono text-[8px] text-ink-500 tracking-[0.2em]">
                        {m.badgeId}
                      </span>
                    </div>
                  </div>

                  {/* ORQA YUZ — bio */}
                  <div
                    className="absolute inset-0 rounded-2xl border border-[#213039] bg-[#05131C] p-3 sm:p-4 flex flex-col items-center text-center shadow-[0_20px_44px_rgba(0,0,0,0.6)]"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-ink-500">
                      Bio
                    </span>
                    <div
                      aria-hidden
                      className="w-6 h-[2px] bg-primary rounded-full my-2"
                    />
                    <p className="text-muted text-[10px] sm:text-[11px] leading-relaxed">
                      {m.bio}
                    </p>
                    <img
                      src="/brand/logo/MTrade_icon_sand.svg"
                      alt=""
                      aria-hidden
                      className="mt-auto w-6 sm:w-7 opacity-80"
                    />
                  </div>
                </motion.div>
              </button>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-ink-500 mt-6">
        Bosing — bio ko&apos;ring
      </p>
    </div>
  );
}
