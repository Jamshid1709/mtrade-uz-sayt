import { 
  TrendingUp, 
  Instagram, 
  Youtube, 
  Send,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

const footerLinks = {
  courses: [
    { label: 'Quiz — qaysi kurs mos?', href: '/quiz' },
    { label: 'Premium kurs', href: '/courses' },
    { label: 'Dastur (Syllabus)', href: '/syllabus' },
    { label: 'Kalkulyator', href: '/calculator' },
  ],
  company: [
    { label: 'Biz haqimizda', href: '/about' },
    { label: 'Bozorlar (3D)', href: '/markets' },
    { label: 'Asboblar', href: '/tools' },
    { label: 'Halol tekshirish', href: 'https://musaffa.com' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Telegram bot', href: 'https://t.me/mtrade_obuna_bot' },
    { label: 'Bog\'lanish: +998773731248', href: 'tel:+998773731248' },
    { label: 'info@mtrade.uz', href: 'mailto:info@mtrade.uz' },
  ],
};

const socialLinks = [
  { icon: <Send className="w-5 h-5" />, href: 'https://t.me/mtrade_academy', label: 'Telegram' },
  { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/mtrade_uz', label: 'Instagram' },
  { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com/@mtrade_academy', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-dark" />
              </div>
              <span className="font-heading font-bold text-white text-xl">
                MTRADE Academy
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Professional treyding ta'limi. 0 dan PRO darajagacha. 
              Real bozor misollari va tizimli o'qish dasturi.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-gold" />
                <span>info@mtrade.uz</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-gold" />
                <span>+998 77 373 12 48</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Jizzax, Uzbekistan</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-lighter border border-dark-border flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Kurslar</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Kompaniya</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Qo'llab-quvvatlash</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 MTRADE Academy. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-gold text-sm transition-colors">
              Maxfiylik siyosati
            </a>
            <a href="#" className="text-gray-500 hover:text-gold text-sm transition-colors">
              Foydalanish shartlari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
