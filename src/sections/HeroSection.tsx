import { motion } from "framer-motion";
import { Star, ArrowRight, Play } from "lucide-react";

const stats = [
  { value: "66%", label: "Muvaffaqiyat" },
  { value: "100+", label: "O'quvchi" },
  { value: "5+", label: "Yillik tajriba" },
  { value: "50+", label: "Sertifikat" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-surface to-ink-950" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [-10, 30, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/3 rounded-full blur-3xl"
        />

        {/* Candlestick shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-20vh", opacity: [0, 0.3, 0.3, 0] }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
            className="absolute w-1 bg-gradient-to-t from-wine-700/40 to-sand-100/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${40 + Math.random() * 80}px`,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-accent/20 mb-6"
            >
              <Star size={14} className="text-accent fill-accent" />
              <span className="text-accent text-sm font-medium">
                5 yillik tajriba Â· 100+ o'quvchi
              </span>
            </motion.div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              <span className="text-white">Kelajak treyderlarini</span>
              <br />
              <span className="shimmer-text">shu yerdan yetishtiramiz</span>
            </h1>

            <p className="text-muted text-lg leading-relaxed mb-8 max-w-lg">
              Halol treydingni 0 dan o'rganing. 5 yillik tajriba, 100+ o'quvchi aksiya treyderi bo'lishdi.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="https://t.me/mtrade_obuna_bot?start=course_premium"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient-bg text-ink-950 font-semibold px-8 py-4 rounded-full flex items-center gap-2 hover:shadow-gold-lg transition-all"
              >
                Bepul start darsi
                <ArrowRight size={18} />
              </a>
              <a
                href="#courses"
                className="border border-ink-800 text-white font-medium px-8 py-4 rounded-full flex items-center gap-2 hover:border-accent/50 hover:bg-primary/5 transition-all"
              >
                <Play size={18} />
                Kurslarni ko'rish
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-card px-5 py-3"
                >
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={10}
                        className="text-accent fill-accent"
                      />
                    ))}
                  </div>
                  <div className="font-mono font-bold text-xl text-accent">
                    {stat.value}
                  </div>
                  <div className="text-muted text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D Card / Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="card-3d hidden lg:block"
          >
            <div className="card-3d-inner glass-card p-8 relative overflow-hidden">
              {/* Glow border */}
              <div className="absolute inset-0 gold-border rounded-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center">
                    <Play size={20} className="text-ink-950 ml-1" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">
                      MTrade Academy
                    </h3>
                    <p className="text-muted text-sm">
                      Professional treyding kursi
                    </p>
                  </div>
                </div>

                <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border mb-6">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/FBNSwsygb1c?rel=0"
                    title="MTrade Academy"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-wine-700 to-sand-100dark border-2 border-card flex items-center justify-center text-ink-950 text-xs font-bold"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="text-muted text-sm">
                    <span className="text-accent font-semibold">100+</span>{" "}
                    o'quvchi qo'shildi
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
