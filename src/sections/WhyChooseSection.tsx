import ScrollReveal from "../components/ScrollReveal";
import { TrendingUp, Shield, Target } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: TrendingUp,
    title: "0 dan Professional darajagacha",
    description:
      "Siz oldin treydingni bilmaysizmi? Hech qisi yo'q. Kurslarimizni boshlab, 0 dan professional treyder darajasiga yetishingiz mumkin.",
  },
  {
    icon: Shield,
    title: "Halol treyding tamoyillari",
    description:
      "Biz faqat halol va shariatga muvofiq treyding strategiyalarini o'rgatamiz. Moliyaviy savodxonlik va ishonchli vositalar bilan.",
  },
  {
    icon: Target,
    title: "Amaliy tajriba",
    description:
      "Nafaqat nazariya, balki real bozorda amaliy savdo qilishni o'rganasiz. Shaxsiy mentorlik va jonli sessiyalar bilan.",
  },
];

function Feature3DCard({ icon: Icon, title, description, delay }: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 250, damping: 25 });
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
  };

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
        className="group glass-card p-8 h-full transition-colors duration-300 hover:border-accent/40"
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(214,195,161,0.08) 0%, transparent 70%)" }}
        />
        <motion.div
          style={{ translateZ: 30 }}
          className="w-14 h-14 rounded-xl gold-gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-gold"
        >
          <Icon size={24} className="text-ink-950" />
        </motion.div>
        <motion.h3
          style={{ translateZ: 20 }}
          className="font-display font-bold text-xl text-white mb-3"
        >
          {title}
        </motion.h3>
        <motion.p
          style={{ translateZ: 10 }}
          className="text-muted leading-relaxed text-sm"
        >
          {description}
        </motion.p>
      </motion.div>
    </ScrollReveal>
  );
}

export default function WhyChooseSection() {
  return (
    <section className="py-24 bg-ink-950">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Nima uchun aynan{" "}
              <span className="gold-text">MTrade Academy</span>?
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Biz sizga nafaqat nazariy bilim, balki real bozorda ishlatiladigan
              amaliy ko'nikmalarni beramiz.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Feature3DCard key={feature.title} {...feature} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
