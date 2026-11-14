import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Treydingni noldan o'rganish mumkinmi?",
    a: "Ha, bizning kurslar 0 dan boshlab o'rganish uchun mo'ljallangan. Siz oldin hech qanday tajribaga ega bo'lmasangiz ham, bizning tizimli dasturimiz orqali professional treyder darajasiga yetishingiz mumkin.",
  },
  {
    q: "Qancha kapital bilan boshlash mumkin?",
    a: "Minimum $100-500 dan boshlash tavsiya etiladi. Siz yuqoriroq kapital bilan asosiy ishga o'zgartira olasiz.",
  },
  {
    q: "Kurslar online yoki offline?",
    a: "Ikkala formatda ham mavjud. Online Premium â€” to'liq online, Masofaviy Gibrid â€” Live + Online aralash format.",
  },
  {
    q: "Sertifikat beriladimi?",
    a: "Ha, kursni muvaffaqiyatli tugatgan o'quvchilarga MTrade Academy sertifikati beriladi. Bu sizning professional treyder sifatidagi tajribangizni tasdiqlovchi hujjat.",
  },
  {
    q: "Qanday qo'llab-quvvatlash tizimi bor?",
    a: "Shaxsiy mentor nazorati, 24/7 maxsus AI bot, yopiq Telegram kommyuniti, va haftalik jonli sessiyalar orqali to'liq qo'llab-quvvatlash.",
  },
  {
    q: "Kurs davomiyligi?",
    a: "Online Premium â€” 4 oy (3 oy + 1 bonus), Masofaviy Gibrid â€” 9 hafta. Siz o'z tezligingizda o'rganishingiz mumkin.",
  },
  {
    q: "Online Premium va Masofaviy Gibrid â€” farqi nima?",
    a: "Online Premium â€” videodarslar asosida, mustaqil o'rganish uchun. Masofaviy Gibrid â€” jonli sessiyalar, 5 kishilik intensiv guruh va shaxsiy mentorlik bilan. Gibrid kurs tezroq natija beradi, lekin ko'proq vaqt talab qiladi.",
  },
  {
    q: "Fond bozorida savdo qilish haqiqatan halolmi?",
    a: "Biz faqat halol va shariatga muvofiq savdo turlarini o'rgatamiz. Kursimizda bu mavzu batafsil yoritilgan. Eslatma: bu diniy fatvo emas, balki ma'lumotli tahlil.",
  },
  {
    q: "Chet elda yashovchilar o'qiy oladimi?",
    a: "Ha, albatta. Online Premium va Masofaviy Gibrid kurslari to'liq masofaviy formatda bo'lgani uchun dunyoning istalgan nuqtasidan qo'shilishingiz mumkin.",
  },
  {
    q: "Kurs tugagandan keyin ham mentorlar bilan aloqa davom etadimi?",
    a: "Ha, kurs tugagandan keyin ham savollaringizni berishingiz va yordam olishingiz mumkin. Yopiq kommyuniti orqali mentorlar muammolaringizni hal qilishda ko'maklashadi.",
  },
  {
    q: "Broker hisob ochish uchun minimal yosh bormi?",
    a: "Interactive Brokers (IBKR) da hisob ochish uchun 18 yoshdan katta bo'lishingiz shart. Biz asosan IBKR bilan ishlaymiz â€” bu xavfsiz va professional broker.",
  },
  {
    q: "Signal kanali pullikmi?",
    a: "Ha, VIP signal kanali pullik. Ammo bizni kurslarni sotib olgan o'quvchilar kursni tugatganidan so'ng 2 oylik bepul obunaga ega bo'ladi.",
  },
  {
    q: "Kurs qaysi tilda o'tiladi?",
    a: "Hozirda barcha kurslar o'zbek tilida olib boriladi. Yaqin kelajakda qozoq, qirg'iz, tojik va boshqa qardosh tillarga ham moslashtirilishi rejalashtirilgan.",
  },
  {
    q: "Kursni tugatgandan keyin sertifikat beriladimi?",
    a: "Ha, kursni muvaffaqiyatli tugatgan o'quvchilarga MTrade Academy tomonidan rasmiylashtirilgan sertifikat beriladi.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-ink-950">
      <div className="section-container max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Ko'p so'raladigan{" "}
              <span className="gold-text">savollar</span>
            </h2>
            <p className="text-muted">
              Eng ko'p beriladigan savollarga javoblar.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.03}>
              <div className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-display font-medium text-white pr-4">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-accent shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="px-5 pb-5 text-muted text-sm leading-relaxed border-t border-border/50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
