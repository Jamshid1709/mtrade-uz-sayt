import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "@/lib/icons";

export default function ExitModal() {
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShow(true);
        setHasShown(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setShow(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative glass-card p-6 sm:p-8 max-w-lg w-full"
          >
            {/* Gold border glow */}
            <div className="absolute inset-0 gold-border rounded-2xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/50 transition-all z-10"
            >
              <X size={16} />
            </button>

            <div className="relative z-10">
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                Bepul <span className="gold-text">kirish darsini ko'ring</span>
              </h3>
              <p className="text-muted mb-6">
                Treydingni qanday boshlash kerakligini shu videoda tushuntirdik.
                Bir marta ko'ring — ko'p narsaga oydinlik kiritadi!
              </p>

              {/* Video placeholder */}
              <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/FBNSwsygb1c?rel=0"
                  title="3 kunlik bepul intensiv"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/quiz"
                  onClick={() => setShow(false)}
                  className="wine-gradient-bg text-sand-100 font-semibold px-6 py-3 rounded-full text-center flex items-center justify-center gap-2 hover:shadow-gold transition-all"
                >
                  <Play size={16} />
                  Quiz — qaysi kurs mos?
                </a>
                <a
                  href="https://t.me/mtrade_obuna_bot?start=course_starter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-accent/30 text-accent px-6 py-3 rounded-full text-center hover:bg-primary/10 transition-all"
                >
                  To'g'ridan botga
                </a>
                <button
                  onClick={() => setShow(false)}
                  className="border border-border text-muted px-6 py-3 rounded-full hover:border-accent/50 hover:text-foreground transition-all"
                >
                  Hozir emas
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
