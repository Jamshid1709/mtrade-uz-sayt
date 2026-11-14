import ScrollReveal from "../components/ScrollReveal";
import {
  Target,
  Eye,
  TrendingUp,
  Shield,
  BarChart3,
  Cpu,
  Gamepad2,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const mentors = [
  {
    name: "Odilbek",
    role: "CEO & Asoschisi, Professional treyder",
    image: "/images/odilbek.webp",
    bio: "5 yillik tajriba, halol treyding yoÊ»nalishi asoschisi. Professional treyder va investor.",
    experience: "5+ yil tajriba",
  },
  {
    name: "Bunyodbek",
    role: "Professional treyder & Mentor",
    image: "/images/bunyodbek.webp",
    bio: "3+ yillik tajriba, 50+ dan ortiq o'quvchilarga ta'lim bergan professional mentor.",
    experience: "50+ o'quvchi",
  },
  {
    name: "Jamshid",
    role: "Signal analitik",
    image: "/images/jamshid.webp",
    bio: "Texnik tahlil mutaxassisi, signal xizmati yetakchisi. Bozor tahlili va strategiyalar.",
    experience: "Teknik analiz",
  },
  {
    name: "Azizbek",
    role: "Tahlilchi",
    image: "/images/azizbek.webp",
    bio: "Texnik tahlil mutaxassisi, signal xizmati yetakchisi.",
    experience: "Teknik analiz",
  },
];

const roadmap = [
  { icon: Target, title: "Asoslar", desc: "Bozor tushunchalari" },
  { icon: BarChart3, title: "Texnik tahlil", desc: "Grafik va indikatorlar" },
  { icon: Cpu, title: "AI Fundamental", desc: "AI yordamida tahlil" },
  { icon: Shield, title: "Risk boshqaruvi", desc: "Kapitalni muhofaza" },
  { icon: Gamepad2, title: "Demo savdo", desc: "Virtual mashq" },
  { icon: Zap, title: "Strategiyalar", desc: "Shaxsiy strategiya" },
  { icon: TrendingUp, title: "Real savdo", desc: "Professional daraja" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-ink-950 to-surface">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-6">
                Biz â€” kelajak treyderlarini{" "}
                <span className="gold-text">yetishtiruvchi akademiya</span>
              </h1>
              <p className="text-muted text-lg leading-relaxed mb-8">
                MTrade Academy 2024 yilda tashkil etilgan va o'shandan buyon
                100+ dan ortiq o'quvchiga halol treyding sirlarini o'rgatdi.
                Bizning maqsadimiz â€” O'zbekiston yoshlarini professional
                moliyaviy savodxonlik bilan ta'minlash.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://t.me/mtrade_obuna_bot?start=course_premium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-gradient-bg text-ink-950 font-semibold px-8 py-3 rounded-full inline-flex items-center gap-2 hover:shadow-gold transition-all"
                >
                  Kursga yozilish
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden border border-accent/30">
                <img
                  src="/images/odilbek.webp"
                  alt="Odilbek - CEO"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Maqsad & Missiya */}
      <section className="py-20 bg-ink-950">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="glass-card p-8 h-full">
                <div className="w-14 h-14 rounded-xl gold-gradient-bg flex items-center justify-center mb-6">
                  <Eye size={24} className="text-ink-950" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-4">
                  Maqsadimiz
                </h3>
                <p className="text-muted leading-relaxed">
                  Butun mamlakat bo'ylab moliyaviy muvaffaqiyatga intiluvchan
                  yoshlarni aniqlab, ularga bepul va pulli ta'lim berish
                  orqali professional treyderlar yetishtirish.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass-card p-8 h-full">
                <div className="w-14 h-14 rounded-xl gold-gradient-bg flex items-center justify-center mb-6">
                  <Target size={24} className="text-ink-950" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-4">
                  Missiyamiz
                </h3>
                <p className="text-muted leading-relaxed">
                  Professional treyderlar yetishtirish orqali O'zbekiston
                  moliyaviy savodxonligini oshirish va har bir o'quvchimizni
                  mustaqil savdo qila oladigan darajaga yetkazish.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-surface">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl text-white mb-4">
                MTrade <span className="gold-text">Yo'li</span>
              </h2>
              <p className="text-muted">
                7 bosqichdan iborat tizimli o'quv dasturi.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {roadmap.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card p-5 text-center h-full"
                >
                  <div className="w-10 h-10 rounded-lg gold-gradient-bg flex items-center justify-center mx-auto mb-3">
                    <step.icon size={18} className="text-ink-950" />
                  </div>
                  <p className="font-display font-semibold text-white text-sm mb-1">
                    {step.title}
                  </p>
                  <p className="text-muted text-xs">{step.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-20 bg-ink-950">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl text-white mb-4">
                Bizning <span className="gold-text">jamoa</span>
              </h2>
              <p className="text-muted">
                Tajribali mentorlar va analitiklar sizga yo'l boshlaydi.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {mentors.map((mentor, i) => (
              <ScrollReveal key={mentor.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="glass-card p-6 text-center flex flex-col justify-between h-full border border-border/50 hover:border-accent/50 transition-all"
                >
                  <div>
                    {/* Uniform White Photo Frame */}
                    <div className="w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden bg-white p-1 shadow-lg border border-accent/40 flex items-center justify-center">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-full h-full object-cover object-top rounded-xl"
                      />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-1">
                      {mentor.name}
                    </h3>
                    <p className="text-accent text-xs font-mono font-bold mb-3">
                      {mentor.role}
                    </p>
                    <p className="text-muted text-xs leading-relaxed mb-4">{mentor.bio}</p>
                  </div>
                  {mentor.experience && (
                    <div className="mt-auto">
                      <span className="inline-block text-[11px] font-mono text-muted bg-ink-900 px-3 py-1 rounded-full border border-border/40">
                        {mentor.experience}
                      </span>
                    </div>
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Duo image */}
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-border">
              <img
                src="/images/mentors-duo.webp"
                alt="MTrade Academy mentorlari"
                className="w-full h-auto object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
