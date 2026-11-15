import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "@/lib/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n, LANGUAGES, type LanguageCode } from "../context/i18nContext";

export default function Navbar() {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t("nav_home"), path: "/" },
    { name: "Quiz", path: "/quiz" },
    { name: t("nav_courses"), path: "/courses" },
    { name: t("nav_syllabus"), path: "/syllabus" },
    { name: t("nav_markets"), path: "/markets" },
    { name: t("nav_tools"), path: "/tools" },
    { name: t("nav_about"), path: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-950/90 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo — Brand v2.1: BIR QATOR (inline reverse), brand p.7 "Bir qator (web)" */}
          <Link to="/" className="flex items-center gap-3 py-1">
            <img loading="eager" decoding="async"
              src="/brand/logo/MTrade_inline_reverse.svg"
              alt="MTrade Academy — Halol trading — ilm bilan"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-accent bg-primary/10"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Language Switcher + CTA */}
          <div className="flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border/60 text-xs font-mono text-foreground hover:border-accent transition-all"
              >
                <span>{currentLangObj.flag}</span>
                <span className="uppercase">{currentLangObj.code}</span>
                <ChevronDown size={14} className="text-muted" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-ink-900 border border-border rounded-2xl shadow-2xl overflow-hidden z-50 py-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as LanguageCode);
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-mono flex items-center justify-between hover:bg-primary/10 transition-colors ${
                        language === lang.code ? "text-accent font-bold bg-primary/5" : "text-muted"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://t.me/mtrade_obuna_bot?start=course_premium"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex wine-gradient-bg text-sand-100 font-semibold px-5 py-2 rounded-full text-sm hover:shadow-gold transition-shadow"
            >
              {t("free_lesson")}
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-ink-950/95 backdrop-blur-xl border-t border-border/50"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-accent bg-primary/10"
                      : "text-muted hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://t.me/mtrade_obuna_bot?start=course_premium"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden wine-gradient-bg text-sand-100 font-semibold px-5 py-3 rounded-full text-center mt-2"
              >
                {t("free_lesson")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
