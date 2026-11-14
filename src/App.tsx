import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { I18nProvider } from "./context/i18nContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ExitModal from "./components/ExitModal";
import TelegramChat from "./components/TelegramChat";

const Home = lazy(() => import("./pages/Home"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const SyllabusPage = lazy(() => import("./pages/SyllabusPage"));
const MarketsPage = lazy(() => import("./pages/MarketsPage"));
const TradingToolsPage = lazy(() => import("./pages/TradingToolsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));

function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-4 border-accent/20 border-t-wine-500 rounded-full animate-spin" />
      <span className="text-xs font-mono text-accent font-medium">MTrade Academy yuklanmoqda...</span>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    // Telegram Mini App ichida to'liq ekranga yoyish
    const tg = (window as unknown as { Telegram?: { WebApp?: { ready: () => void; expand: () => void } } }).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <I18nProvider>
      <div className="min-h-screen bg-ink-950 text-foreground">
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/syllabus" element={<SyllabusPage />} />
              <Route path="/markets" element={<MarketsPage />} />
              <Route path="/tools" element={<TradingToolsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ExitModal />
        <TelegramChat />
      </div>
    </I18nProvider>
  );
}
