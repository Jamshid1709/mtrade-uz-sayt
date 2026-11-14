import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import { ChevronRight, HelpCircle, ArrowRight, RotateCcw } from "lucide-react";


const quizQuestions = [
  {
    q: "Treyding tajribangiz qanday?",
    options: [
      { text: "0 â€” umuman bilmayman", type: "premium" },
      { text: "Biroz ko'rganman, demo qilganman", type: "premium" },
      { text: "1+ yil real savdo qilganman", type: "hybrid" },
    ],
  },
  {
    q: "Qancha kapital bilan boshlaysiz?",
    options: [
      { text: "$0 â€” avval o'rganaman (Paper)", type: "premium" },
      { text: "$100-500", type: "premium" },
      { text: "$500-1000+", type: "hybrid" },
    ],
  },
  {
    q: "Qancha vaqtingiz bor?",
    options: [
      { text: "Kuniga 1-2 soat", type: "premium" },
      { text: "Haftada 3-5 kun, jonli qatnasha olaman", type: "hybrid" },
    ],
  },
  {
    q: "Qaysi format qulay?",
    options: [
      { text: "Video darslar â€” o'z vaqtimda", type: "premium" },
      { text: "Jonli sessiyalar â€” mentor bilan", type: "hybrid" },
    ],
  },
  {
    q: "Maqsadingiz?",
    options: [
      { text: "Mustaqil o'rganib sekin o'sish", type: "premium" },
      { text: "Tez, intensiv natija (mentor nazorati)", type: "hybrid" },
    ],
  },
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<"premium" | "hybrid" | "offline" | null>(null);

  const handleAnswer = (type: string) => {
    const nextAnswers = [...answers, type];
    setAnswers(nextAnswers);
    if (step === quizQuestions.length - 1) {
      const hybridCount = nextAnswers.filter((a) => a === "hybrid").length;
      const res = hybridCount >= 3 ? "hybrid" : "premium";
      setResult(res as "premium" | "hybrid");
      try {
        localStorage.setItem("mtrade_quiz_result", res);
        localStorage.setItem("mtrade_quiz_answers", JSON.stringify(nextAnswers));
      } catch {}
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    const isHybrid = result === "hybrid";
    return (
      <div className="pt-20 min-h-screen bg-ink-950 flex items-center">
        <div className="section-container max-w-2xl w-full py-12">
          <ScrollReveal>
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gold-gradient-bg flex items-center justify-center">âœ“</div>
              <h2 className="font-display font-bold text-2xl text-white mb-2">
                Sizga <span className="gold-text">{isHybrid ? "Masofaviy Gibrid" : "Online Premium"}</span> mos!
              </h2>
              <p className="text-muted text-sm mb-6">
                {isHybrid
                  ? "Siz jonli muloqot va intensiv mentor nazoratini afzal ko'rasiz. 5 kishilik Gibrid guruh â€” tez natija uchun."
                  : "Siz mustaqil vaqtda o'rganishni afzal ko'rasiz. 51 darsli Premium â€” 0 dan PRO gacha."}
              </p>
              <div className="bg-surface rounded-xl p-4 mb-6 text-left text-sm">
                <p className="text-muted mb-2">Keyingi qadam:</p>
                <ol className="list-decimal list-inside text-white space-y-1">
                  <li>Kurslar sahifasida taqqoslang</li>
                  <li>Dastur bilan tanishing</li>
                  <li>Bot orqali yoziling â€” joyingizni band qiling</li>
                </ol>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={`https://t.me/mtrade_obuna_bot?start=course_${result}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-gradient-bg text-ink-950 font-semibold px-6 py-3 rounded-full flex items-center gap-2"
                >
                  Bot orqali yozilish <ArrowRight size={16} />
                </a>
                <button
                  onClick={() => navigate("/courses")}
                  className="border border-accent/30 text-accent px-6 py-3 rounded-full hover:bg-primary/10 transition-all"
                >
                  Kurslarni ko'rish
                </button>
                <button
                  onClick={reset}
                  className="border border-border text-muted px-6 py-3 rounded-full flex items-center gap-2 hover:border-accent/30"
                >
                  <RotateCcw size={16} /> Qayta topshirish
                </button>
              </div>
              <p className="text-ink-500 text-[11px] mt-4">Eslatma: bu tavsiya, majburiyat emas. To'liq sayohat: Kurslar â†’ Dastur â†’ Bozorlar</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-ink-950">
      <section className="py-12 bg-gradient-to-b from-ink-950 to-surface">
        <div className="section-container text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-accent/30 text-accent text-xs font-mono mb-4">
              <HelpCircle size={14} /> 1 daqiqa Â· 5 savol
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3">
              Qaysi kurs <span className="gold-text">sizga mos?</span>
            </h1>
            <p className="text-muted max-w-xl mx-auto text-sm">Javob bering â€” sizga mos yo'lni tavsiya qilamiz. Oxirida botga o'tasiz.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-8 bg-ink-950">
        <div className="section-container max-w-2xl">
          <ScrollReveal>
            <div className="glass-card p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-muted text-sm font-mono">Savol {step + 1} / {quizQuestions.length}</span>
                <div className="flex gap-1">
                  {quizQuestions.map((_, i) => (
                    <div key={i} className={`w-8 h-1.5 rounded-full ${i <= step ? "gold-gradient-bg" : "bg-border"}`} />
                  ))}
                </div>
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-6">{quizQuestions[step].q}</h3>
              <div className="space-y-3">
                {quizQuestions[step].options.map((opt) => (
                  <button
                    key={opt.text}
                    onClick={() => handleAnswer(opt.type)}
                    className="w-full text-left p-4 rounded-xl border border-border hover:border-accent/50 hover:bg-primary/5 transition-all flex items-center justify-between group"
                  >
                    <span className="text-white group-hover:text-accent transition-colors">{opt.text}</span>
                    <ChevronRight size={18} className="text-muted group-hover:text-accent" />
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => navigate("/courses")} className="text-muted text-sm hover:text-white">â† Kurslarni ko'rish</button>
                {step > 0 && <button onClick={() => setStep(step - 1)} className="text-muted text-sm hover:text-white">Ortga</button>}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
