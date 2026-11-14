import CountUp from "react-countup";
import ScrollReveal from "../components/ScrollReveal";

const stats = [
  { value: 66, suffix: "%", label: "Muvaffaqiyatli treyderlik foizi" },
  { value: 100, suffix: "+", label: "O'quvchilar soni" },
  { value: 5, suffix: "+", label: "Yillik tajriba" },
  { value: 50, suffix: "+", label: "Video darslar soni" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-mblack">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center glass-card py-10 px-4">
                <div className="font-mono font-bold text-4xl sm:text-5xl gold-text mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <p className="text-mgray text-sm">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
