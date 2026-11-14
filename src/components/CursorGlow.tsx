import { useEffect, useRef, useState } from "react";

/**
 * MTrade Academy — Brand v2.1: sichqoncha-kuzatiladigan "Aurora" yorug'ligi.
 * Barcha sahifalarda ishlaydi (bitta global mount), mobil/touch va
 * prefers-reduced-motion'da o'zi o'chadi (sahifaga ta'sir qilmaydi).
 *
 * Layers (brand palitrasidan, screen blend — qora matnga tegmaydi):
 *  A) Wine aurora — katta, sekin, orqada;
 *  B) Qum (sand) shamcha — kichik, chaqqon.
 */
export default function CursorGlow() {
  const [active, setActive] = useState(false);
  const glowA = useRef<HTMLDivElement>(null);
  const glowB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setActive(true);

    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 };
    const slow = { ...target };
    const fast = { ...target };
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        slow.x = target.x;
        slow.y = target.y;
        fast.x = target.x;
        fast.y = target.y;
        if (glowA.current) glowA.current.style.opacity = "1";
        if (glowB.current) glowB.current.style.opacity = "1";
      }
    };

    const tick = () => {
      slow.x += (target.x - slow.x) * 0.055;
      slow.y += (target.y - slow.y) * 0.055;
      fast.x += (target.x - fast.x) * 0.22;
      fast.y += (target.y - fast.y) * 0.22;

      if (glowA.current) {
        glowA.current.style.transform = `translate3d(${slow.x - 320}px, ${slow.y - 320}px, 0)`;
      }
      if (glowB.current) {
        glowB.current.style.transform = `translate3d(${fast.x - 90}px, ${fast.y - 90}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      {/* A) Wine aurora — katta, sekin */}
      <div
        ref={glowA}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[35] h-[640px] w-[640px] rounded-full opacity-0 blur-3xl transition-opacity duration-700 will-change-transform mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(127,1,31,0.5) 0%, rgba(98,1,22,0.32) 38%, rgba(72,1,14,0.12) 62%, transparent 75%)",
          transition: "opacity 0.7s ease",
        }}
      />
      {/* B) Sand shamcha — kichik, chaqqon */}
      <div
        ref={glowB}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[36] h-[180px] w-[180px] rounded-full opacity-0 blur-2xl transition-opacity duration-500 will-change-transform mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(245,235,208,0.3) 0%, rgba(245,235,208,0.1) 45%, transparent 75%)",
          transition: "opacity 0.5s ease",
        }}
      />
    </>
  );
}
