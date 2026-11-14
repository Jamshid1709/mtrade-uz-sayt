import ScrollReveal from "../components/ScrollReveal";
import { ArrowRight, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 bg-mblack">
      <div className="section-container">
        <ScrollReveal>
          <div className="relative glass-card p-10 sm:p-16 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mgold/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-sora font-bold text-3xl sm:text-4xl text-white mb-4">
                Bugun boshlang —{" "}
                <span className="gold-text">halol treyding yo'lida</span>
              </h2>
              <p className="text-mgray max-w-xl mx-auto mb-8">
                Professional treyderlar safiga qo'shiling. 100+ o'quvchi allaqachon
                boshladilar. Siz navbatchimisiz?
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="https://t.me/mtrade_obuna_bot?start=course_premium"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="gold-gradient-bg text-mblack font-semibold px-8 py-4 rounded-full flex items-center gap-2 hover:shadow-gold-lg transition-all"
                >
                  Ro'yxatdan o'tish
                  <ArrowRight size={18} />
                </motion.a>
                <motion.a
                  href="https://t.me/mtrade_academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-mborder2 text-white font-medium px-8 py-4 rounded-full flex items-center gap-2 hover:border-mgold/50 hover:bg-mgold/5 transition-all"
                >
                  <Send size={18} />
                  Telegram orqali bog'lanish
                </motion.a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
