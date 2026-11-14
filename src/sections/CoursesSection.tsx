import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import { Check, Zap, Crown, Users } from "lucide-react";
import { motion } from "framer-motion";

const courses = [
  {
    name: "Online Premium",
    price: "$250",
    badge: "ENG MASHHUR",
    badgeColor: "bg-mgold text-mblack",
    icon: Crown,
    duration: "4 oy (3 oy + 1 bonus)",
    features: [
      "10 bo'lim, 51 ta mavzu",
      "Shaxsiy mentor nazorati",
      "24/7 maxsus o'qitilgan AI bot",
      "Sertifikat (online)",
      "Zakrit kommyuniti",
    ],
    cta: "Dasturni ko'rish",
    link: "/syllabus",
    popular: true,
  },
  {
    name: "Masofaviy Gibrid",
    price: "$600",
    badge: "INTENSIV",
    badgeColor: "bg-mblue text-white",
    icon: Zap,
    duration: "9 hafta",
    features: [
      "Live + Online format",
      "Real bozorda jonli sessiyalar",
      "5 kishilik intensiv guruh",
      "Bepul signal kanali (2 oy)",
      "Final test + sertifikat",
      "1:1 mentor sessiyasi",
    ],
    cta: "Jadvalni ko'rish",
    link: "/syllabus",
    popular: false,
  },
  {
    name: "Offline Akademiya",
    price: "$1000",
    badge: "OFFLINE AKADEMIYA",
    badgeColor: "bg-mgold text-mblack font-bold",
    icon: Users,
    duration: "8 hafta (2 oy)",
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
    popular: false,
    external: true,
  },
];

export default function CoursesSection() {
  return (
    <section id="courses" className="py-24 bg-mblack">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-sora font-bold text-3xl sm:text-4xl text-white mb-4">
              Kurslarimiz
            </h2>
            <p className="text-mgray max-w-2xl mx-auto">
              O'zingizga mos kursni tanlang va halol treyding yo'lida birinchi
              qadamni qo'ying.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {courses.map((course, i) => (
            <ScrollReveal key={course.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative h-full rounded-2xl p-8 flex flex-col ${
                  course.popular
                    ? "gold-border bg-gradient-to-b from-mcard to-mcard2"
                    : "border border-mborder bg-mcard"
                }`}
              >
                {/* Badge */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 ${course.badgeColor} px-4 py-1 rounded-full text-xs font-bold`}
                >
                  {course.badge}
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    course.popular
                      ? "gold-gradient-bg"
                      : "bg-mcard2 border border-mborder"
                  }`}
                >
                  <course.icon
                    size={24}
                    className={course.popular ? "text-mblack" : "text-mgold"}
                  />
                </div>

                <h3 className="font-sora font-bold text-2xl text-white mb-2">
                  {course.name}
                </h3>
                <div className="font-mono font-bold text-3xl text-mgold mb-1">
                  {course.price}
                </div>
                <p className="text-mgray text-sm mb-6">{course.duration}</p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {course.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check
                        size={16}
                        className="text-mgreen mt-0.5 shrink-0"
                      />
                      <span className="text-mgray">{feature}</span>
                    </li>
                  ))}
                </ul>

                {course.external ? (
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3 rounded-full font-semibold transition-all border border-mborder text-mgray hover:border-mgold/50 hover:text-white"
                  >
                    {course.cta}
                  </a>
                ) : (
                  <Link
                    to={course.link}
                    className={`block text-center py-3 rounded-full font-semibold transition-all ${
                      course.popular
                        ? "gold-gradient-bg text-mblack hover:shadow-gold"
                        : "border border-mborder text-mgray hover:border-mgold/50 hover:text-white"
                    }`}
                  >
                    {course.cta}
                  </Link>
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
