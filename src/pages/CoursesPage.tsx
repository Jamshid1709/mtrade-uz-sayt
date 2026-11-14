import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import {
  Check,
  Zap,
  Crown,
  Users,
  ArrowRight,
  ChevronRight,
  HelpCircle,
} from "@/lib/icons";
import { motion } from "framer-motion";

const courses = [
  {
    name: "Online Premium",
    price: "$250",
    period: "4 oy (3 oy + 1 bonus)",
    icon: Crown,
    popular: true,
    features: [
      "10 bo'lim, 51 ta mavzu",
      "Shaxsiy mentor nazorati",
      "24/7 maxsus o'qitilgan AI bot",
      "Yopiq kommyuniti",
      "Sertifikat",
    ],
    cta: "Obuna bo'lish",
    link: "https://t.me/mtrade_obuna_bot?start=course_premium",
  },
  {
    name: "Masofaviy Gibrid",
    price: "$600",
    period: "9 hafta",
    icon: Zap,
    popular: false,
    features: [
      "Live + Online format",
      "Real bozorda jonli sessiyalar",
      "5 kishilik intensiv guruh",
      "Bepul signal kanali (2 oy)",
      "1:1 Mentor sessiyalari",
      "Sertifikat",
    ],
    cta: "Ro'yxatdan o'tish",
    link: "https://t.me/mtrade_obuna_bot?start=course_hybrid",
  },
  {
    name: "Offline Akademiya",
    price: "$1000",
    period: "8 hafta (2 oy)",
    icon: Users,
    popular: false,
    comingSoon: false,
    features: [
      "10 kishilik intensiv mini guruh",
      "Shaxsiy noutbuk bo'lishi shart (shaxsiy yoki vaqtinchalik)",
      "Toshkent shahridagi zamonaviy Coworking",
      "Haftada 3 kun kun ora darslar (Dush-Chor-Jum / Ses-Pay-Shan)",
      "Yuzma-yuz darslar va real bozor tahlili",
      "1:1 Shaxsiy mentorlik va Sertifikat",
    ],
    cta: "Ro'yxatdan o'tish",
    link: "https://t.me/mtrade_obuna_bot?start=course_offline",
  },
];

const quizQuestions = [
  {
    q: "Qancha vaqtingiz bor?",
    options: [
      { text: "Kuniga 1-2 soat", type: "premium" },
      { text: "Haftada 3-5 kun", type: "hybrid" },
    ],
  },
  {
    q: "Qancha kapital bilan boshlaysiz?",
    options: [
      { text: "$0 (Paper trading)", type: "both" },
      { text: "$100-500", type: "premium" },
      { text: "$500+", type: "hybrid" },
    ],
  },
  {
    q: "Maqsadingiz?",
    options: [
      { text: "O'zim mustaqil o'rganmoqchiman", type: "premium" },
      { text: "Tez va jadal natija olmoqchiman", type: "hybrid" },
    ],
  },
  {
    q: "Qaysi format qulay?",
    options: [
      { text: "Video darslar — o'z vaqtimda", type: "premium" },
      { text: "Jonli sessiyalar — mentor bilan", type: "hybrid" },
    ],
  },
  {
    q: "Professional treyding va risk boshqaruvini o'rganmoqchimisiz?",
    options: [
      { text: "Ha, real aksiyalar bozorida", type: "hybrid" },
      { text: "Shaxsiy kapital bilan mustaqil", type: "premium" },
    ],
  },
];

export default function CoursesPage() {
  const [quizStep, setQuizStep] = useState(0);
  const [quizResult, setQuizResult] = useState<"premium" | "hybrid" | null>(null);

  const handleQuizAnswer = (type: string) => {
    if (quizStep === quizQuestions.length - 1) {
      if (type === "hybrid") {
        setQuizResult("hybrid");
      } else {
        setQuizResult("premium");
      }
    } else {
      setQuizStep(quizStep + 1);
    }
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-ink-950 to-surface">
        <div className="section-container text-center">
          <ScrollReveal>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-foreground mb-4">
              Kurslarimizni <span className="gold-text">tanlang</span>
            </h1>
            <p className="text-muted max-w-2xl mx-auto">
              O'zingizga mos kursni toping va halol treyding yo'lida birinchi
              qadamni qo'ying.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-20 bg-ink-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {courses.map((course, i) => (
              <ScrollReveal key={course.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative h-full rounded-2xl p-8 flex flex-col ${
                    course.popular
                      ? "gold-border bg-gradient-to-b from-card to-ink-900"
                      : "border border-border bg-card"
                  } ${course.comingSoon ? "opacity-70" : ""}`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                      course.popular
                        ? "wine-gradient-bg"
                        : "bg-ink-900 border border-border"
                    }`}
                  >
                    <course.icon
                      size={24}
                      className={course.popular ? "text-ink-950" : "text-accent"}
                    />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                    {course.name}
                  </h3>
                  <div className="font-mono font-bold text-3xl text-accent mb-1">
                    {course.price}
                  </div>
                  <p className="text-muted text-sm mb-6">{course.period}</p>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {course.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="text-bull mt-0.5 shrink-0" />
                        <span className="text-muted">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-3 rounded-full font-semibold transition-all ${
                      course.popular
                        ? "wine-gradient-bg text-sand-100 hover:shadow-gold"
                        : "border border-border text-muted hover:border-accent/50 hover:text-foreground"
                    }`}
                  >
                    {course.cta}
                  </a>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-surface">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="font-display font-bold text-3xl text-foreground text-center mb-12">
              Kurslarni <span className="gold-text">taqqoslang</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 pr-4 text-muted font-medium">Xususiyat</th>
                    <th className="py-4 px-4 text-foreground font-display">Online Premium</th>
                    <th className="py-4 px-4 text-foreground font-display">Masofaviy Gibrid</th>
                    <th className="py-4 px-4 text-highlight font-display">Offline Akademiya</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ["Narx", "$250", "$600", "$1000"],
                    ["Format", "Online (Video)", "Masofaviy Gibrid", "Offline (Toshkent Coworking)"],
                    ["Davomiylik", "4 oy", "9 hafta", "8 hafta (2 oy)"],
                    ["Dars jadvali", "Erkin vaqtda", "Haftada 2-3 kun", "Kun ora (Haftada 3 kun)"],
                    ["Shaxsiy noutbuk", "Kerak", "Kerak", "Shart (Shaxsiy / Vaqtincha)"],
                    ["Guruh hajmi", "—", "5 kishi", "10 kishi mini guruh"],
                    ["Shaxsiy mentor", "✓", "✓", "✓ (Yuzma-yuz)"],
                    ["AI Bot 24/7", "✓", "✓", "✓"],
                    ["Sertifikat", "✓", "✓", "✓"],
                  ].map(([feature, premium, hybrid, offline]) => (
                    <tr key={feature} className="border-b border-border/50">
                      <td className="py-3 pr-4 text-muted">{feature}</td>
                      <td className="py-3 px-4 text-foreground">{premium}</td>
                      <td className="py-3 px-4 text-foreground">{hybrid}</td>
                      <td className="py-3 px-4 text-highlight font-semibold">{offline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-20 bg-ink-950">
        <div className="section-container max-w-2xl">
          <ScrollReveal>
            <div className="text-center mb-10">
              <HelpCircle size={32} className="text-accent mx-auto mb-4" />
              <h2 className="font-display font-bold text-3xl text-foreground mb-4">
                Qaysi kurs <span className="gold-text">sizga mos</span>?
              </h2>
              <p className="text-muted">
                5 ta oddiy savolga javob bering va sizga eng mos kursni tavsiya qilamiz.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card p-8">
              {quizResult ? (
                <div className="text-center">
                  <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                    Sizga{" "}
                    <span className="gold-text">
                      {quizResult === "premium" ? "Online Premium" : "Masofaviy Gibrid"}
                    </span>{" "}
                    mos keladi!
                  </h3>
                  <p className="text-muted mb-6">
                    {quizResult === "premium"
                      ? "Siz mustaqil o'rganishni va video darslarni afzal ko'rasiz. Online Premium siz uchun eng yaxshi tanlov."
                      : "Siz jonli muloqot va intensiv o'rganishni afzal ko'rasiz. Masofaviy Gibrid siz uchun eng yaxshi tanlov."}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href={`https://t.me/mtrade_obuna_bot?start=course_${quizResult}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wine-gradient-bg text-sand-100 font-semibold px-6 py-3 rounded-full flex items-center gap-2"
                    >
                      Kursga yozilish
                      <ArrowRight size={16} />
                    </a>
                    <button
                      onClick={() => { setQuizStep(0); setQuizResult(null); }}
                      className="border border-border text-muted px-6 py-3 rounded-full hover:border-accent/50 hover:text-foreground transition-all"
                    >
                      Qayta topshirish
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-muted text-sm">
                      Savol {quizStep + 1} / {quizQuestions.length}
                    </span>
                    <div className="flex gap-1">
                      {quizQuestions.map((_, i) => (
                        <div
                          key={i}
                          className={`w-8 h-1 rounded-full ${
                            i <= quizStep ? "wine-gradient-bg" : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-xl text-foreground mb-6">
                    {quizQuestions[quizStep].q}
                  </h3>

                  <div className="space-y-3">
                    {quizQuestions[quizStep].options.map((option) => (
                      <button
                        key={option.text}
                        onClick={() => handleQuizAnswer(option.type)}
                        className="w-full text-left p-4 rounded-xl border border-border hover:border-accent/50 hover:bg-primary/5 transition-all flex items-center justify-between group"
                      >
                        <span className="text-foreground group-hover:text-accent transition-colors">
                          {option.text}
                        </span>
                        <ChevronRight
                          size={18}
                          className="text-muted group-hover:text-accent transition-colors"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
