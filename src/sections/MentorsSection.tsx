import ScrollReveal from "../components/ScrollReveal";
import { Award, TrendingUp, BarChart3 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const mentors = [
  {
    name: "Odilbek",
    role: "CEO & Asoschisi, Professional treyder",
    image: "/images/odilbek.webp",
    bio: "5 yillik tajriba, halol treyding yo'nalishi asoschisi. Professional treyder va investor.",
    icon: Award,
    stats: "5+ yil tajriba",
  },
  {
    name: "Bunyodbek",
    role: "Professional treyder & Mentor",
    image: "/images/bunyodbek.webp",
    bio: "3+ yillik tajriba, 50+ dan ortiq o'quvchilarga ta'lim bergan professional mentor.",
    icon: TrendingUp,
    stats: "50+ o'quvchi",
  },
  {
    name: "Jamshid",
    role: "Signal analitik",
    image: "/images/jamshid.webp",
    bio: "Texnik tahlil mutaxassisi, signal xizmati yetakchisi. Bozor tahlili va strategiyalar.",
    icon: BarChart3,
    stats: "Texnik analiz",
  },
  {
    name: "Azizbek",
    role: "Tahlilchi",
    image: "/images/azizbek.webp",
    bio: "Texnik tahlil mutaxassisi, signal xizmati yetakchisi.",
    icon: BarChart3,
    stats: "Texnik analiz",
  },
];

function MentorCard({ mentor, delay }: { mentor: typeof mentors[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
        className="glass-card p-6 text-center group hover:border-mgold/30 transition-colors duration-300"
      >
        {/* Avatar */}
        <motion.div
          style={{ translateZ: 40 }}
          className="w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden bg-white p-1 shadow-lg border border-mgold/40 flex items-center justify-center"
        >
          <img
            src={mentor.image}
            alt={mentor.name}
            className="w-full h-full object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        <motion.div
          style={{ translateZ: 30 }}
          className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
        >
          <mentor.icon size={20} className="text-mblack" />
        </motion.div>

        <motion.h3
          style={{ translateZ: 20 }}
          className="font-sora font-bold text-xl text-white mb-1"
        >
          {mentor.name}
        </motion.h3>
        <motion.p
          style={{ translateZ: 15 }}
          className="text-mgold text-sm font-medium mb-3"
        >
          {mentor.role}
        </motion.p>
        <motion.p
          style={{ translateZ: 10 }}
          className="text-mgray text-sm leading-relaxed mb-3"
        >
          {mentor.bio}
        </motion.p>
        <motion.span
          style={{ translateZ: 20 }}
          className="inline-block px-3 py-1 rounded-full bg-mgold/10 border border-mgold/20 text-mgold text-xs font-medium"
        >
          {mentor.stats}
        </motion.span>
      </motion.div>
    </ScrollReveal>
  );
}

export default function MentorsSection() {
  return (
    <section className="py-24 bg-mblack">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-sora font-bold text-3xl sm:text-4xl text-white mb-4">
              Bizning <span className="gold-text">mentorlarimiz</span>
            </h2>
            <p className="text-mgray max-w-2xl mx-auto">
              Tajribali professional treyderlar sizga yo'l boshlaydi.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-6">
          {mentors.map((mentor, i) => (
            <MentorCard key={mentor.name} mentor={mentor} delay={i * 0.12} />
          ))}
        </div>

        {/* Mentors duo image */}
        <ScrollReveal delay={0.3}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mt-12 rounded-2xl overflow-hidden border border-mborder hover:border-mgold/30 transition-colors duration-300"
          >
            <img
              src="/images/mentors-duo.webp"
              alt="MTrade Academy mentorlari"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
