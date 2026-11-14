import { useEffect, useRef, useState } from "react";

/**
 * MTrade Academy — Brand v2.1: sichqoncha-kuzatiladigan "Aurora" yorug'ligi.
 * Barcha sahifalarda ishlaydi (bitta global mount), mobil/touch va
 * prefers-reduced-motion'da o'zi o'chadi (sahifaga ta'sir qilmaydi).
 *
 * Layers (brand palitrasidan, screen blend):
 *  A) Wine aurora — zich emas (430px), sekin;
 *  B) Qum (sand) shamcha — kichik, chaqqon.
 *
 * Nurlanishni o'chirish: kerakli elementga `data-glow-none` atributini qo'ying —
 * kursor o'sha element (yoki farzandlari) ustida turganda nur 0 opacity bo'ladi.
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
    let glowing = true;

    const setGlowOpacity = (on: boolean) => {
      if (glowing === on) return;
      glowing = on;
      if (glowA.current) glowA.current.style.opacity = on ? "1" : "0";
      if (glowB.current) glowB.current.style.opacity = on ? "1" : "0";
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        slow.x = target.x;
        slow.y = target.y;
        fast.x = target.x;
        fast.y = target.y;
        setGlowOpacity(true);
      }
      // data-glow-none (yoki iframe) ustida — nur o'chadi
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const overHalo =
        !!el && (el.closest?.("[data-glow-none]") != null || el.tagName === "IFRAME");
      setGlowOpacity(!overHalo);
    };

    const tick = () => {
      slow.x += (target.x - slow.x) * 0.055;
      slow.y += (target.y - slow.y) * 0.055;
      fast.x += (target.x - fast.x) * 0.22;
      fast.y += (target.y - fast.y) * 0.22;

      if (glowA.current) {
        glowA.current.style.transform = `translate3d(${slow.x - 215}px, ${slow.y - 215}px, 0)`;
      }
      if (glowB.current) {
        glowB.current.style.transform = `translate3d(${fast.x - 80}px, ${fast.y - 80}px, 0)`;
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
      {/* A) Wine aurora — o'rta masshtab, sekin */}
      <div
        ref={glowA}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[35] h-[430px] w-[430px] rounded-full opacity-0 blur-3xl will-change-transform mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(127,1,31,0.42) 0%, rgba(98,1,22,0.26) 40%, rgba(72,1,14,0.1) 64%, transparent 78%)",
          transition: "opacity 0.28s ease",
        }}
      />
      {/* B) Sand shamcha — kichik, chaqqon */}
      <div
        ref={glowB}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[36] h-[160px] w-[160px] rounded-full opacity-0 blur-2xl will-change-transform mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(245,235,208,0.28) 0%, rgba(245,235,208,0.09) 45%, transparent 75%)",
          transition: "opacity 0.28s ease",
        }}
      />
    </>
  );
}
