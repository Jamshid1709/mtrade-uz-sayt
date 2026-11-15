import ScrollReveal from "../components/ScrollReveal";
import { motion } from "framer-motion";
import HangingBadges from "../components/HangingBadges";
import { mentors } from "../data/mentors";

export default function MentorsSection() {
  return (
    <section className="py-24 bg-ink-950 overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Bizning <span className="sand-text">mentorlarimiz</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Tajribali professional treyderlar sizga yo&apos;l boshlaydi.
            </p>
          </div>
        </ScrollReveal>

        {/* Osiluvchi ID badges — brand v2.1 uslubida */}
        <HangingBadges mentors={mentors} />

        {/* Mentors duo image */}
        <ScrollReveal delay={0.3}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mt-14 rounded-2xl overflow-hidden border border-border hover:border-accent/30 transition-colors duration-300"
          >
            <img width="512" height="512" loading="lazy" decoding="async"
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
