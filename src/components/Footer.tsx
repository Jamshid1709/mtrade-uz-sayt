import {
  Send,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from '@/lib/icons';

const footerLinks = {
  courses: [
    { label: 'Quiz — qaysi kurs mos?', href: '/quiz' },
    { label: 'Premium kurs', href: '/courses' },
    { label: 'Dastur (Syllabus)', href: '/syllabus' },
    { label: 'Kalkulyator', href: '/calculator' },
  ],
  company: [
    { label: 'Biz haqimizda', href: '/about' },
    { label: 'Bozorlar', href: '/markets' },
    { label: 'Asboblar', href: '/tools' },
    { label: 'Halol tekshirish', href: 'https://musaffa.com' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Telegram bot', href: 'https://t.me/mtrade_obuna_bot' },
    { label: "Bog'lanish: +998 77 373 12 48", href: 'tel:+998773731248' },
    { label: 'info@mtrade.uz', href: 'mailto:info@mtrade.uz' },
  ],
};

const socialLinks = [
  { icon: <Send size={20} weight="duotone" />, href: 'https://t.me/mtrade_academy', label: 'Telegram' },
  { icon: <Instagram size={20} weight="duotone" />, href: 'https://www.instagram.com/mtrade_uz', label: 'Instagram' },
  { icon: <Youtube size={20} weight="duotone" />, href: 'https://youtube.com/@mtrade_academy', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img loading="eager" decoding="async"
                src="/brand/logo/MTrade_icon_reverse.svg"
                alt="MTrade Academy belgisi"
                className="h-14 w-12 object-contain"
              />
              <div className="leading-tight">
                <div className="font-display font-extrabold text-2xl tracking-tight text-foreground">
                  MTrade
                </div>
                <div className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-sand-100">
                  Academy
                </div>
              </div>
            </div>
            <p className="text-muted mb-6 max-w-sm leading-relaxed">
              AQSh fond bozorini halol, tizimli o&apos;rganish.
              0 dan PRO darajagacha — risk management bilan.
            </p>

            {/* Aloqa */}
            <div className="space-y-3 mb-6">
              <a href="mailto:info@mtrade.uz" className="flex items-center gap-3 text-muted hover:text-foreground transition-colors">
                <Mail size={18} weight="duotone" className="text-accent" />
                <span>info@mtrade.uz</span>
              </a>
              <a href="tel:+998773731248" className="flex items-center gap-3 text-muted hover:text-foreground transition-colors">
                <Phone size={18} weight="duotone" className="text-accent" />
                <span>+998 77 373 12 48</span>
              </a>
              <div className="flex items-center gap-3 text-muted">
                <MapPin size={18} weight="duotone" className="text-accent" />
                <span>Jizzax, Uzbekistan</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/60 transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Havolalar */}
          {[['Kurslar', footerLinks.courses], ['Kompaniya', footerLinks.company], ["Qo'llab-quvvatlash", footerLinks.support]].map(([title, links]) => (
            <div key={title as string}>
              <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-sand-100 mb-4">
                {title as string}
              </h4>
              <ul className="space-y-3">
                {(links as typeof footerLinks.courses).map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-muted hover:text-foreground transition-colors text-sm"
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pastki panel */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-muted text-xs">
          <div className="space-y-1">
            <p>© 2026 MTRADE Academy. Barcha huquqlar himoyalangan.</p>
            <p className="text-[11px] text-ink-500">
              Ma&apos;lumotlar TradingView asosida. Investitsiya maslahati emas.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Maxfiylik siyosati
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Foydalanish shartlari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
