import { motion } from 'framer-motion';
import { Check, Star, Zap, Users } from '@/lib/icons';

interface Course {
  id: string;
  type: string;
  name: string;
  price: string;
  period: string | null;
  features: string[];
  popular: boolean;
  comingSoon?: boolean;
  icon: React.ReactNode;
}

const courses: Course[] = [
  {
    id: 'premium',
    type: 'Online',
    name: 'Premium',
    price: '$250',
    period: '90 kun',
    features: [
      'Dastur muddati: 90 kun',
      'Video va qo\'llanmalar (+50)',
      '4 oy Mentor Nazorati (jonli)',
      '24/7 maxsusu o\'qitilgan AI bot',
      'Sertifikat (online)'
    ],
    popular: true,
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 'masofaviy',
    type: 'Masofaviy',
    name: 'Gibrid',
    price: '$600',
    period: '60 kun',
    features: [
      'Onlinedagi hammasi',
      'Dastur muddati: 60 kun',
      'Jonli efirda dars',
      '5 kishilik intensiv guruh',
      'Bepul signal kanal (2oy)'
    ],
    popular: false,
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 'offline',
    type: 'Offline',
    name: 'Gibrid',
    price: 'Tez kunda!',
    period: null,
    features: [
      '???',
      '???',
      '???',
      '???',
      '???'
    ],
    popular: false,
    comingSoon: true,
    icon: <Star className="w-5 h-5" />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

export default function CourseCards() {
  const handlePayment = (courseId: string) => {
    // Telegram botga o'tish
    const botLink = `https://t.me/mtrade_academy_bot?start=course_${courseId}`;
    window.open(botLink, '_blank');
  };

  return (
    <section className="py-24 bg-ink-950 relative" id="courses">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-surface border border-border text-accent text-sm mb-4">
            Ta'lim dasturlari
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Kurslarimiz
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            O'z maqsadlaringizga mos kursni tanlang va professional treyderga aylaning
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {courses.map((course) => (
            <motion.div 
              key={course.id}
              variants={cardVariants}
              className={`
                relative rounded-2xl p-8 bg-card border border-border
                transition-all duration-300 hover:-translate-y-2 hover:border-accent/50
                ${course.popular ? 'md:-mt-4 md:mb-4 border-accent/30' : ''}
                ${course.comingSoon ? 'opacity-80' : ''}
              `}
            >
              {/* Popular badge */}
              {course.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 wine-gradient-bg text-sand-100 text-sm font-bold rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  ENG MASHHUR
                </div>
              )}

              {/* Type badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-accent text-sm mb-6">
                {course.icon}
                {course.type}
              </div>

              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                {course.name}
              </h3>
              
              {course.period && (
                <p className="text-muted mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {course.period}
                </p>
              )}

              <ul className="space-y-4 mb-8">
                {course.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-ink-200">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-border">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-muted text-sm">Narx</span>
                  <span className={`
                    text-3xl font-mono font-bold
                    ${course.comingSoon ? 'text-ink-500' : 'sand-text'}
                  `}>
                    {course.price}
                  </span>
                </div>

                {!course.comingSoon ? (
                  <button 
                    onClick={() => handlePayment(course.id)}
                    className="w-full py-3 rounded-full wine-gradient-bg text-sand-100 font-semibold hover:shadow-gold transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Bron qilish
                  </button>
                ) : (
                  <button 
                    disabled
                    className="w-full py-3 rounded-full bg-surface text-ink-500 font-semibold border border-border cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Star className="w-4 h-4" />
                    Tez kunda
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-muted text-sm">
            Barcha kurslarda 7 kunlik pul qaytarish kafolati mavjud
          </p>
        </motion.div>
      </div>
    </section>
  );
}
