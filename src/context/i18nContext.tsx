import React, { createContext, useContext, useState } from "react";
import { storageService } from "../services/storageService";

export type LanguageCode = "uz" | "tg" | "kk" | "ky" | "tk" | "en" | "ru";

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
  { code: "tg", name: "Тоҷикӣ", flag: "🇹🇯" },
  { code: "kk", name: "Қазақша", flag: "🇰🇿" },
  { code: "ky", name: "Кыргызча", flag: "🇰🇬" },
  { code: "tk", name: "Türkmençe", flag: "🇹🇲" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  uz: {
    nav_home: "Asosiy",
    nav_courses: "Kurslar",
    nav_syllabus: "Dastur",
    nav_markets: "3D Bozorlar",
    nav_tools: "Indikator & Asboblar",
    nav_about: "Biz haqimizda",
    nav_calculator: "Kalkulyator",
    nav_faq: "FAQ",
    free_lesson: "Bepul dars",
    watchlist_title: "Mening Watchlistim",
    live_chart_title: "Interaktiv Real-Vaqt Grafigi",
    economic_calendar: "Iqtisodiy Taqvim (FOMC, CPI, NFP)",
    financial_news: "Moliyaviy Yangiliklar",
    backtest_title: "Savdo Strategiyasi Simulyatori (Bar Replay)",
    win_rate: "G'alaba Ulushi",
    total_trades: "Jami Savdolar",
    profit_factor: "Profit Factor",
    buy_order: "BUY (Xarid)",
    sell_order: "SELL (Sotuv)",
    step_next: "Keyingi Sham",
    reset_simulation: "Qayta Boshlash",
  },
  tg: {
    nav_home: "Асосӣ",
    nav_courses: "Курсҳо",
    nav_syllabus: "Барнома",
    nav_markets: "Бозорҳои 3D",
    nav_tools: "Индикатор ва Асбобҳо",
    nav_about: "Дар бораи мо",
    nav_calculator: "Калкулятор",
    nav_faq: "Саволҳо",
    free_lesson: "Дарси ройгон",
    watchlist_title: "Watchlist-и ман",
    live_chart_title: "Графикаи интерактивӣ",
    economic_calendar: "Тақвими иқтисодӣ (FOMC, CPI)",
    financial_news: "Навидҳои молиявӣ",
    backtest_title: "Симулятори стратегияи савдо",
    win_rate: "Сатҳи ғалаба",
    total_trades: "Ҷамъи савдоҳо",
    profit_factor: "Коэффитсиенти фоида",
    buy_order: "BUY (Харид)",
    sell_order: "SELL (Фурӯш)",
    step_next: "Шамъи баъдӣ",
    reset_simulation: "Аз нав оғоз кардан",
  },
  kk: {
    nav_home: "Басты бет",
    nav_courses: "Курстар",
    nav_syllabus: "Бағдарлама",
    nav_markets: "3D Нарықтар",
    nav_tools: "Индикаторлар мен Құралдар",
    nav_about: "Біз туралы",
    nav_calculator: "Калькулятор",
    nav_faq: "Сұрақтар",
    free_lesson: "Тегін сабақ",
    watchlist_title: "Менің Watchlist-ім",
    live_chart_title: "Интерактивті тікелей график",
    economic_calendar: "Экономикалық күнтізбе (FOMC, CPI)",
    financial_news: "Қаржылық жаңалықтар",
    backtest_title: "Сауда стратегиясының симуляторы",
    win_rate: "Жеңіс үлесі",
    total_trades: "Жалпы мәмілелер",
    profit_factor: "Пайда коэффициенті",
    buy_order: "BUY (Сатып алу)",
    sell_order: "SELL (Сату)",
    step_next: "Келесі шам",
    reset_simulation: "Қайта бастау",
  },
  ky: {
    nav_home: "Башкы бет",
    nav_courses: "Курстар",
    nav_syllabus: "Программа",
    nav_markets: "3D Базарлар",
    nav_tools: "Индикаторлор жана Куралдар",
    nav_about: "Биз жөнүндө",
    nav_calculator: "Калькулятор",
    nav_faq: "Суроолор",
    free_lesson: "Акысыз сабак",
    watchlist_title: "Менин Watchlist-им",
    live_chart_title: "Интерактивдүү график",
    economic_calendar: "Экономикалык календарь (FOMC, CPI)",
    financial_news: "Финансылык жаңылыктар",
    backtest_title: "Соода стратегиясынын симулятору",
    win_rate: "Утуу пайызы",
    total_trades: "Жалпы соодалар",
    profit_factor: "Пайда коэффициенти",
    buy_order: "BUY (Сатып алуу)",
    sell_order: "SELL (Сатуу)",
    step_next: "Кийинки шам",
    reset_simulation: "Кайра баштоо",
  },
  tk: {
    nav_home: "Esasy",
    nav_courses: "Kurslar",
    nav_syllabus: "Maksatnama",
    nav_markets: "3D Bazarlar",
    nav_tools: "Indikatorlar we Gurallar",
    nav_about: "Biz barada",
    nav_calculator: "Kalkulýator",
    nav_faq: "Soraglar",
    free_lesson: "Mugt sapak",
    watchlist_title: "Menim Watchlist-im",
    live_chart_title: "Interaktiw göni grafik",
    economic_calendar: "Ykdysady kalendar (FOMC, CPI)",
    financial_news: "Maliýe täzelikleri",
    backtest_title: "Söwda strategiýa simulýatory",
    win_rate: "Üstünlik derejesi",
    total_trades: "Jemi söwdalar",
    profit_factor: "Peyda koeffisiýenti",
    buy_order: "BUY (Satyn almak)",
    sell_order: "SELL (Satmak)",
    step_next: "Indiki şam",
    reset_simulation: "Täzeden başlamak",
  },
  en: {
    nav_home: "Home",
    nav_courses: "Courses",
    nav_syllabus: "Syllabus",
    nav_markets: "3D Markets",
    nav_tools: "Indicators & Tools",
    nav_about: "About Us",
    nav_calculator: "Calculator",
    nav_faq: "FAQ",
    free_lesson: "Free Lesson",
    watchlist_title: "My Watchlist",
    live_chart_title: "Interactive Live Chart",
    economic_calendar: "Economic Calendar (FOMC, CPI)",
    financial_news: "Financial News",
    backtest_title: "Trading Strategy Backtest Simulator",
    win_rate: "Win Rate",
    total_trades: "Total Trades",
    profit_factor: "Profit Factor",
    buy_order: "BUY Order",
    sell_order: "SELL Order",
    step_next: "Next Candle",
    reset_simulation: "Reset Simulation",
  },
  ru: {
    nav_home: "Главная",
    nav_courses: "Курсы",
    nav_syllabus: "Программа",
    nav_markets: "3D Рынки",
    nav_tools: "Индикаторы и Инструменты",
    nav_about: "О нас",
    nav_calculator: "Калькулятор",
    nav_faq: "FAQ",
    free_lesson: "Бесплатный урок",
    watchlist_title: "Мой Watchlist",
    live_chart_title: "Интерактивный Онлайн График",
    economic_calendar: "Экономический Календарь (FOMC, CPI)",
    financial_news: "Финансовые Новости",
    backtest_title: "Симулятор торговой стратегии",
    win_rate: "Винрейт",
    total_trades: "Всего сделок",
    profit_factor: "Профит фактор",
    buy_order: "BUY (Покупка)",
    sell_order: "SELL (Продажа)",
    step_next: "Следующая свеча",
    reset_simulation: "Сбросить симуляцию",
  },
};

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = storageService.getSavedLanguage() as LanguageCode;
    return LANGUAGES.some((l) => l.code === saved) ? saved : "uz";
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    storageService.saveLanguage(lang);
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.uz;
    return langDict[key] || TRANSLATIONS.uz[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
