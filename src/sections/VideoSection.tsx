import ScrollReveal from "../components/ScrollReveal";
import { Play, BarChart3, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section className="py-24 bg-mblack">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Stats cards */}
          <div className="space-y-6">
            <ScrollReveal>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-mgreen/20 flex items-center justify-center">
                    <BarChart3 size={24} className="text-mgreen" />
                  </div>
                  <div>
                    <h3 className="font-sora font-bold text-white text-lg">
                      Savdoni to'g'ri tashkil qilish
                    </h3>
                    <p className="text-mgray text-sm">
                      natijani yarimi
                    </p>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <span className="font-mono font-bold text-3xl text-mgreen">
                    +53%
                  </span>
                  <span className="text-mgray text-sm mb-1">o'rtacha natija</span>
                </div>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-mgold/20 flex items-center justify-center">
                    <TrendingUp size={24} className="text-mgold" />
                  </div>
                  <div>
                    <h3 className="font-sora font-bold text-white text-lg">
                      Zarar qilish
                    </h3>
                    <p className="text-mgray text-sm">
                      o'sishning bir qismi
                    </p>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <span className="font-mono font-bold text-3xl text-mgold">
                    +12.8%
                  </span>
                  <span className="text-mgray text-sm mb-1">haftalik natija</span>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Right: Video */}
          <ScrollReveal delay={0.2}>
            <div className="glass-card p-2">
              <div className="aspect-video rounded-xl overflow-hidden bg-mcard relative group">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/FBNSwsygb1c?rel=0"
                  title="MTrade Academy treyding kursi"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-white font-medium text-sm flex items-center gap-2">
                  <Play size={14} className="text-mgold" />
                  Batafsil ma'lumot
                </span>
                <span className="text-mgray text-xs">15:24 daqiqa</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
