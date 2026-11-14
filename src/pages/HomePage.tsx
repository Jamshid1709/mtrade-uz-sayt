import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StockConstellation3D from '../components/StockConstellation3D';
import SpaciousGmtTerminal from '../components/SpaciousGmtTerminal';
import {
  TrendingUp,
  BookOpen,
  Play,
  Star,
  Zap,
  Award,
  MessageCircle,
  BarChart3,
  CheckCircle,
  X,
  Sparkles,
} from 'lucide-react';

const BOT_LINK = 'https://t.me/mtrade_obuna_bot';
const MAIN_YOUTUBE_URL = 'https://youtube.com/live/0mz8sjfSJeo?feature=share';

const YOUTUBE_VIDEOS = [
  { title: "Tradingda Real daromad o'zi nima?", url: MAIN_YOUTUBE_URL },
  { title: "Real bozor va Halol aksiyalar tahlili", url: MAIN_YOUTUBE_URL },
];

// Mentors array with clean white frames
const mentors = [
  {
    name: "Odilbek",
    role: "CEO & Asoschisi, Professional treyder",
    image: "/images/odilbek.webp",
    bio: "5 yillik tajriba, halol treyding yoʻnalishi asoschisi. Professional treyder va investor.",
    badge: "5+ yil tajriba",
  },
  {
    name: "Bunyodbek",
    role: "Professional treyder & Mentor",
    image: "/images/bunyodbek.webp",
    bio: "3+ yillik tajriba, 50+ dan ortiq o'quvchilarga ta'lim bergan professional mentor.",
    badge: "50+ o'quvchi",
  },
  {
    name: "Jamshid",
    role: "Signal analitik",
    image: "/images/jamshid.webp",
    bio: "Texnik tahlil mutaxassisi, signal xizmati yetakchisi. Bozor tahlili va strategiyalar.",
    badge: "Teknik analiz",
  },
  {
    name: "Azizbek",
    role: "Tahlilchi",
    image: "/images/azizbek.webp",
    bio: "Texnik tahlil mutaxassisi, signal xizmati yetakchisi.",
    badge: "Teknik analiz",
  },
];

// All 10 Natija Images
const natijaImages = [
  "/images/Natija_1.webp",
  "/images/Natija_2.webp",
  "/images/Natija_3.webp",
  "/images/Natija_4.webp",
  "/images/Natija_5.webp",
  "/images/natija_6.webp",
  "/images/natija_7.webp",
  "/images/natija_8.webp",
  "/images/natija_9.webp",
  "/images/natija_10.webp",
];

// All 12 Tashakkur Images
const tashakkurImages = [
  { src: "/images/Tashakkur_1.webp", name: "Azizbekjon", text: "Menga juda yoqdi. Bot signalini olaman va ishlaydi!" },
  { src: "/images/Tashakkur_2.webp", name: "Mironshoh Mirzayev", text: "Rahmat katta ustoz. Gap yo'q, aytilganidek o'rgandim." },
  { src: "/images/Tashakkur_3.webp", name: "Alijon Valiyev", text: "Hammaga tavsiya qilaman! MTrade Academy eng yaxshi tanlov." },
  { src: "/images/Tashakkur_4.webp", name: "Javohir K.", text: "Real bozordagi jonli sessiyalar menga katta tajriba berdi." },
  { src: "/images/Tashakkur_5.webp", name: "Sardor M.", text: "AI Bot 24/7 yordam beradi, darslar o'ta tushunarli." },
  { src: "/images/Tashakkur_6.webp", name: "Bobur T.", text: "Signal kanali orqali ilk foydamni topdim. Rahmat!" },
  { src: "/images/Tashakkur_7.webp", name: "Doston R.", text: "SMC va Breakout strategiyalari juda aniq ishlar ekan." },
  { src: "/images/Tashakkur_8.webp", name: "Umrbek S.", text: "Mentorlar 1:1 yordam berishadi. Akadamiya o'ta professional!" },
  { src: "/images/Tashakkur_9.webp", name: "Shaxzod N.", text: "Halol aksiyalar tahlili va risk boshqaruvi ajoyib o'rgatilgan." },
  { src: "/images/Tashakkur_10.webp", name: "Otabek G.", text: "Real aksiyalar bozori va risk boshqaruvini to'liq o'rgandim." },
  { src: "/images/Tashakkur_11.webp", name: "Nodirbek H.", text: "O'quv dasturi va 3D vositalar juda zo'r qilingan." },
  { src: "/images/Tashakkur_12.webp", name: "Farrux B.", text: "MTrade bilan moliyaviy bilmim 10 barobar oshdi!" },
];

const features = [
  { icon: '📚', title: '50+ Video darslar', description: 'Batafsil qo\'llanmalar va real misollar' },
  { icon: '👨‍🏫', title: 'Mentor nazorati', description: '4 oy davomida jonli qo\'llab-quvvatlash' },
  { icon: '🤖', title: '24/7 AI Bot', description: 'Maxsus o\'qitilgan yordamchi' },
  { icon: '📊', title: 'Real bozor tahlili', description: 'Jonli savdo sessiyalari' },
  { icon: '🎓', title: 'Sertifikat', description: 'Kursni tamomlaganligingizni tasdiqlovchi' },
  { icon: '💬', title: 'Jamoa chat', description: 'Boshqa o\'quvchilar bilan aloqa' },
];

const quickActions = [
  { icon: <BookOpen className="w-5 h-5" />, label: 'Kurslar', color: 'bg-blue-500/20 text-blue-500' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Bozor', color: 'bg-green-500/20 text-green-500' },
  { icon: <Award className="w-5 h-5" />, label: 'Sertifikat', color: 'bg-gold/20 text-gold' },
  { icon: <MessageCircle className="w-5 h-5" />, label: 'Yordam', color: 'bg-purple-500/20 text-purple-500' },
];

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleBotClick = () => {
    window.open(BOT_LINK, '_blank');
  };

  const openYoutube = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-mblack text-white">
      {/* Lightbox Modal for Full Image View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-mblack/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-mgold/50 shadow-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-mblack/80 text-white flex items-center justify-center border border-mborder hover:bg-mgold hover:text-mblack transition-all"
              >
                <X size={20} />
              </button>
              <img src={selectedImage} alt="Natija screenshot" className="w-full h-full object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background glow decorations */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mgold/20 via-transparent to-transparent" />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mgold/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mgold/10 rounded-full blur-[100px] animate-pulse" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mcard border border-mborder text-mgold text-sm font-mono"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>5 yillik tajriba · 100+ o'quvchi</span>
                </motion.div>

                <h1 className="font-sora text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                  Kelajak treyderlarini{' '}
                  <span className="gold-text">shu yerdan yetishtiramiz</span>
                </h1>
              </div>

              <p className="text-lg text-mgray max-w-lg leading-relaxed">
                Halol treydingni 0 dan o'rganing. Real bozor tahlillari, 3D vositalar va professional mentorlar bilan birga daromadga chiqing.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleBotClick}
                  className="gold-gradient-bg text-mblack font-sora font-bold px-8 py-3.5 rounded-full flex items-center gap-2 hover:shadow-gold transition-all"
                >
                  <Zap className="w-5 h-5" />
                  Bepul start darsi
                </button>
                <button
                  onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3.5 rounded-full border border-mborder text-white font-sora font-bold hover:border-mgold transition-all"
                >
                  Kurslarni ko'rish
                </button>
              </div>

              {/* Statistika Grid */}
              <div className="grid grid-cols-4 gap-3 pt-6 border-t border-mborder/40">
                {[
                  { title: "66%", desc: "Muvaffaqiyat" },
                  { title: "100+", desc: "O'quvchi" },
                  { title: "5+", desc: "Yillik tajriba" },
                  { title: "50+", desc: "Sertifikat" },
                ].map((st, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-mcard/60 border border-mborder/30 text-center">
                    <p className="text-lg font-mono font-bold text-mgold">{st.title}</p>
                    <p className="text-[11px] text-mgray font-sans">{st.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Real Clickable Embedded YouTube Player */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden border-2 border-mgold/40 bg-mcard shadow-2xl relative group">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/0mz8sjfSJeo?autoplay=0&rel=0"
                  title="Tradingda Real daromad o'zi nima? MTrade Academy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Glow Behind */}
              <div className="absolute -inset-4 bg-gradient-to-r from-mgold to-mgold-dark opacity-20 blur-3xl -z-10 rounded-full animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3D Stock Constellation Galaxy Network Section */}
      <section className="py-12 bg-mblack border-t border-mborder/30">
        <div className="container mx-auto px-4">
          <StockConstellation3D />
        </div>
      </section>

      {/* Spacious GMT Market Terminal Hub Section */}
      <section className="py-12 bg-mdark border-t border-mborder/30">
        <div className="container mx-auto px-4">
          <SpaciousGmtTerminal />
        </div>
      </section>

      {/* Bizning Mentorlarimiz Section */}
      <section className="py-20 bg-mblack border-t border-mborder/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-mgold/10 border border-mgold/30 text-mgold text-xs font-mono mb-3">
              <Sparkles size={14} className="inline mr-1" /> Professional Jamoa
            </span>
            <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white mb-4">
              Bizning <span className="gold-text">mentorlarimiz</span>
            </h2>
            <p className="text-mgray max-w-2xl mx-auto">
              Tajribali professional treyderlar va analitiklar sizga yo'l boshlaydi.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((mentor, i) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card p-6 text-center flex flex-col justify-between h-full border border-mborder/50 hover:border-mgold/50 transition-all rounded-3xl"
              >
                <div>
                  {/* Uniform White Photo Frame */}
                  <div className="w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden bg-white p-1 shadow-lg border border-mgold/40 flex items-center justify-center">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover object-top rounded-xl"
                    />
                  </div>
                  <h3 className="font-sora font-bold text-xl text-white mb-1">
                    {mentor.name}
                  </h3>
                  <p className="text-mgold text-xs font-mono font-bold mb-3">
                    {mentor.role}
                  </p>
                  <p className="text-mgray text-xs leading-relaxed mb-4">{mentor.bio}</p>
                </div>
                <div className="mt-auto">
                  <span className="inline-block text-[11px] font-mono text-mgray bg-mcard2 px-3 py-1 rounded-full border border-mborder/40">
                    {mentor.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Natijalarimiz Gallery Section (All 10 Natija Screenshots) */}
      <section className="py-20 bg-mdark border-t border-mborder/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-mgreen/10 border border-mgreen/30 text-mgreen text-xs font-mono mb-3">
              Real Bozor Isbotlari
            </span>
            <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white mb-4">
              Natijalarimiz
            </h2>
            <p className="text-mgray max-w-2xl mx-auto">
              O'quvchilarimizning real bozorda erishgan natijalari hamda signal kanali bitimlari.
            </p>
          </motion.div>

          {/* 10 Natija Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {natijaImages.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(src)}
                className="glass-card overflow-hidden rounded-2xl border border-mborder/40 cursor-pointer hover:border-mgold transition-all group"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-mcard">
                  <img src={src} alt={`Natija ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-mblack/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-mono bg-mgold text-mblack font-bold px-2.5 py-1 rounded-full">
                      Kattalashtirish 🔍
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* O'quvchilarimiz Fikri Section (All 12 Tashakkur Screenshots) */}
      <section className="py-20 bg-mblack border-t border-mborder/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-mgold/10 border border-mgold/30 text-mgold text-xs font-mono mb-3">
              Haqiqiy Fikrlar
            </span>
            <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white mb-4">
              O'quvchilarimiz fikri
            </h2>
            <p className="text-mgray max-w-2xl mx-auto">
              Bizning o'quvchilarimizning haqiqiy fikrlari, tajribalari va tashakkurnomalari.
            </p>
          </motion.div>

          {/* 12 Tashakkur Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tashakkurImages.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card p-5 rounded-3xl border border-mborder/50 hover:border-mgold/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-mgold fill-mgold" />
                    ))}
                  </div>

                  {/* Screenshot Thumbnail */}
                  <div
                    onClick={() => setSelectedImage(item.src)}
                    className="rounded-2xl overflow-hidden border border-mborder/40 mb-4 cursor-pointer relative group h-44 bg-mcard flex items-center justify-center"
                  >
                    <img src={item.src} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-mblack/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-mono bg-mgold text-mblack font-bold px-2 py-1 rounded-full">
                        Ko'rish 🔍
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-mgray italic leading-relaxed mb-4">"{item.text}"</p>
                </div>

                <div className="pt-3 border-t border-mborder/30 flex items-center justify-between">
                  <div>
                    <h4 className="font-sora font-bold text-sm text-white">{item.name}</h4>
                    <p className="text-[11px] text-mgold font-mono">MTrade Academy o'quvchisi</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section className="py-20 bg-mdark border-t border-mborder/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-mgold/10 border border-mgold/30 text-mgold text-xs font-mono mb-3">
              Video Darslar Namunasi
            </span>
            <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white mb-4">
              Bizning darslarimizdan namunalar
            </h2>
            <p className="text-mgray max-w-2xl mx-auto">
              Professional mentorlar tomonidan tayyorlangan sifatli video darslar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {YOUTUBE_VIDEOS.map((video, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => openYoutube(video.url)}
                className="group relative glass-card p-6 text-left hover:border-mgold/60 transition-all rounded-3xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl gold-gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Play className="w-6 h-6 text-mblack ml-0.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-sora font-bold text-white group-hover:text-mgold transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-mgray text-xs font-mono mt-1">YouTube'da tomosha qilish →</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-mblack border-t border-mborder/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-mgold/10 border border-mgold/30 text-mgold text-xs font-mono mb-3">
              Nima uchun biz?
            </span>
            <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white mb-4">
              Afzalliklarimiz
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-6 rounded-3xl hover:border-mgold/40 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-sora font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-mgray text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions & CTA */}
      <section id="courses-section" className="py-20 bg-mdark border-t border-mborder/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white mb-4">
              Tezkor harakatlar
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-16">
            {quickActions.map((action, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={handleBotClick}
                className="flex flex-col items-center gap-2 p-4 glass-card rounded-2xl hover:border-mgold/50 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}>
                  {action.icon}
                </div>
                <span className="text-xs font-mono text-mgray">{action.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-3xl font-sora font-bold text-white mb-4">
              Bugun o'rganishni boshlang
            </h3>
            <p className="text-mgray mb-8">
              Professional treyderlar safiga qo'shiling. Birinchi qadamni qo'ying va kelajagingizni o'zgartiring.
            </p>
            <button 
              onClick={handleBotClick}
              className="gold-gradient-bg text-mblack font-sora font-bold px-8 py-4 rounded-full flex items-center gap-2 mx-auto hover:shadow-gold transition-all text-base"
            >
              <CheckCircle className="w-5 h-5" />
              Ro'yxatdan o'tish
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
