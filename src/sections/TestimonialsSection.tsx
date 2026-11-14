import ScrollReveal from "../components/ScrollReveal";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    image: "/images/Tashakkur_1.webp",
    name: "Azizbekjon",
    text: "Menga juda yoqdi. Bot signalini olaman va ishlaydi. Sizning botingizga ishonaman. Rahmat katta!",
  },
  {
    image: "/images/Tashakkur_2.webp",
    name: "Mironshoh Mirzayev",
    text: "Rahmat katta ustoz. Gap yo'q, aytilganidek. Menga juda yoqdi. Bu akademiya haqiqatan ham ajoyib.",
  },
  {
    image: "/images/Tashakkur_3.webp",
    name: "Alijon Valiyev",
    text: "Hammaga tavsiya qilaman! MTrade Academy eng yaxshi tanlov. O'quvchilar va mentorlar ajoyib.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-ink-950">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              O'quvchilarimiz <span className="gold-text">fikri</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Bizning o'quvchilarimizning haqiqiy fikrlari va tajribalari.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card p-6 h-full flex flex-col"
              >
                <Quote size={24} className="text-accent/40 mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="text-accent fill-accent"
                    />
                  ))}
                </div>

                <div className="mb-4 rounded-xl overflow-hidden border border-border">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <p className="text-muted text-sm leading-relaxed mb-4 flex-grow">
                  "{t.text}"
                </p>

                <div className="border-t border-border/50 pt-4">
                  <p className="font-display font-semibold text-white text-sm">
                    {t.name}
                  </p>
                  <p className="text-accent text-xs">MTrade Academy o'quvchisi</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
