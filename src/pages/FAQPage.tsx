import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import { ChevronDown, HelpCircle } from "@/lib/icons";

const faqs = [
  {
    q: "Treyding haqida hech narsa bilmayman. Boshlay olamanmi?",
    a: "Ha, bizning kurslarimiz 0 dan boshlab o'rganish uchun mo'ljallangan. Siz oldin hech qanday tajribaga ega bo'lmasangiz ham, tizimli dasturimiz orqali professional darajaga yetishingiz mumkin.",
  },
  {
    q: "Online Premium va Masofaviy Gibrid — farqi nima?",
    a: "Online Premium — videodarslar asosida, mustaqil o'rganish uchun. Masofaviy Gibrid — jonli sessiyalar, 5 kishilik intensiv guruh va shaxsiy mentorlik bilan. Gibrid kurs tezroq natija beradi, lekin ko'proq vaqt talab qiladi.",
  },
  {
    q: "Fond bozorida savdo qilish haqiqatan halolmi?",
    a: "Biz faqat halol va shariatga muvofiq savdo turlarini o'rgatamiz. Kursimizda bu mavzu batafsil yoritilgan. Eslatma: bu diniy fatvo emas, balki ma'lumotli tahlil.",
  },
  {
    q: "Qancha pul bilan treydingni boshlash mumkin?",
    a: "Minimum $100-500 dan boshlash tavsiya etiladi. Siz yuqoriroq kapital bilan asosiy ishga o'zgartira olasiz. Asosiy kapitalingizni himoya qilish — birinchi qoidamiz.",
  },
  {
    q: "Qaysi platformalardan foydalaniladi?",
    a: "TradingView (chart tahlil) va Interactive Brokers (IBKR) platformalaridan foydalanamiz. Barchasi bo'yicha batafsil qo'llanmalar mavjud.",
  },
  {
    q: "Offline Akademiya kursi qanday va qayerda o'tkaziladi?",
    a: "Offline Akademiya kursi Toshkent shahri markazidagi zamonaviy Coworking zalida 8 hafta (2 oy) davomida o'tkaziladi. Guruh atigi 10 kishilik intensiv mini guruhdan iborat bo'lib, o'quvchilarda shaxsiy noutbuk bo'lishi shart (shaxsiy yoki vaqtinchalik). Darslar kun ora — haftada 3 kun (Dush-Chor-Jum yoki Ses-Pay-Shan) tartibida o'tkaziladi. Narxi: $1000.",
  },
  {
    q: "Kursni tugatgandan keyin sertifikat beriladimi?",
    a: "Ha, kursni muvaffaqiyatli tugatgan o'quvchilarga MTrade Academy tomonidan rasmiylashtirilgan sertifikat beriladi.",
  },
  {
    q: "Chet elda (Rossiya, Qozog'iston va boshqa mamlakatlarda) yashovchilar o'qiy oladimi?",
    a: "Ha, albatta. Online Premium va Masofaviy Gibrid kurslari to'liq masofaviy formatda bo'lgani uchun dunyoning istalgan nuqtasidan qo'shilishingiz mumkin. Internet bor joyda o'qishingiz mumkin.",
  },
  {
    q: "Kurs tugagandan keyin ham mentorlar bilan aloqa davom etadimi?",
    a: "Ha, kurs tugagandan keyin ham savollaringizni berishingiz va yordam olishingiz mumkin. Yopiq kommyuniti orqali mentorlar muammolaringizni hal qilishda ko'maklashadi.",
  },
  {
    q: "Broker hisob ochish uchun minimal yosh bor?",
    a: "Interactive Brokers (IBKR) da hisob ochish uchun 18 yoshdan katta bo'lishingiz shart. Biz asosan IBKR bilan ishlaymiz — bu xavfsiz va professional broker.",
  },
  {
    q: "Signal kanali pullikmi?",
    a: "Ha, VIP signal kanali pullik. Ammo bizni kurslarni sotib olgan o'quvchilar kursni tugatganidan so'ng 2 oylik bepul obunaga ega bo'ladi.",
  },
  {
    q: "Kurs qaysi tilda o'tiladi?",
    a: "Hozirda barcha kurslar o'zbek tilida olib boriladi. Yaqin kelajakda qozoq, qirg'iz, tojik va boshqa qardosh tillarga ham moslashtirilishi rejalashtirilgan.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-ink-950 to-surface">
        <div className="section-container text-center">
          <ScrollReveal>
            <HelpCircle
              size={48}
              className="text-accent mx-auto mb-4"
            />
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-foreground mb-4">
              Ko'p so'raladigan{" "}
              <span className="gold-text">savollar</span>
            </h1>
            <p className="text-muted max-w-2xl mx-auto">
              Eng ko'p beriladigan savollarga batafsil javoblar.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-ink-950">
        <div className="section-container max-w-4xl">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="glass-card overflow-hidden">
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    }
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-display font-medium text-foreground pr-4 text-lg">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown
                        size={24}
                        className="text-accent shrink-0"
                      />
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
                        <div className="px-6 pb-6 text-muted leading-relaxed border-t border-border/50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center glass-card p-8">
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                Savolingiz qoldimi?
              </h3>
              <p className="text-muted mb-6">
                Telegram botimizga murojaat qiling — javob berishdan mamnun
                bo'lamiz.
              </p>
              <a
                href="https://t.me/mtrade_obuna_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="wine-gradient-bg text-sand-100 font-semibold px-8 py-3 rounded-full inline-flex items-center gap-2 hover:shadow-gold transition-all"
              >
                Telegramga yozish
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
