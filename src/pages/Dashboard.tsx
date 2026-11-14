import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock, 
  MessageCircle, 
  Play, 
  CheckCircle,
  Lock,
  Bot,
  ChevronRight,
  Star,
  Calendar
} from '@/lib/icons';
// import { Progress } from '@/components/ui/progress';

interface Course {
  id: string;
  name: string;
  type: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  status: 'active' | 'completed' | 'pending';
  image: string;
  lastAccessed: string;
}

const enrolledCourses: Course[] = [
  {
    id: 'premium',
    name: 'Premium Trading Kursi',
    type: 'Online',
    progress: 65,
    totalLessons: 50,
    completedLessons: 32,
    status: 'active',
    image: 'ðŸ“Š',
    lastAccessed: '2 soat oldin'
  },
  {
    id: 'masofaviy',
    name: 'Gibrid Dastur',
    type: 'Masofaviy',
    progress: 30,
    totalLessons: 40,
    completedLessons: 12,
    status: 'active',
    image: 'ðŸŽ¯',
    lastAccessed: '1 kun oldin'
  }
];

const upcomingLessons = [
  { title: 'Risk Management asoslari', time: 'Bugun, 18:00', type: 'Jonli' },
  { title: 'Technical Analysis: Trendlar', time: 'Ertaga, 15:00', type: 'Video' },
  { title: 'Psychology of Trading', time: '15 Apr, 19:00', type: 'Jonli' },
];

const achievements = [
  { icon: '🏆', title: 'Birinchi dars', description: 'Birinchi darsni tamomladingiz' },
  { icon: 'ðŸ“ˆ', title: '10% progress', description: 'Kursning 10% ni tamomladingiz' },
  { icon: '⭐', title: 'Aktiv o\'quvchi', description: '7 kun ketma-ket dars' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'courses' | 'schedule' | 'achievements'>('courses');

  return (
    <div className="min-h-screen bg-ink-950 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Shaxsiy kabinet
              </h1>
              <p className="text-muted">
                O'qish jarayonini kuzatib boring va maqsadlaringizga erishing
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-card border border-border rounded-full flex items-center gap-2">
                <div className="w-8 h-8 rounded-full wine-gradient-bg flex items-center justify-center text-sand-100 font-bold">
                  A
                </div>
                <span className="text-foreground text-sm">Azizbek</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            { label: 'Faol kurslar', value: '2', icon: <BookOpen className="w-5 h-5" /> },
            { label: 'Umumiy progress', value: '48%', icon: <TrendingUp className="w-5 h-5" /> },
            { label: 'Tamomlangan', value: '44', icon: <CheckCircle className="w-5 h-5" /> },
            { label: 'Sertifikatlar', value: '0', icon: <Award className="w-5 h-5" /> },
          ].map((stat, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted text-sm">{stat.label}</span>
                <div className="text-accent">{stat.icon}</div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { id: 'courses', label: 'Mening kurslarim', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'schedule', label: 'Jadval', icon: <Calendar className="w-4 h-4" /> },
            { id: 'achievements', label: 'Yutuqlar', icon: <Star className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'wine-gradient-bg text-sand-100'
                  : 'bg-card border border-border text-muted hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content based on active tab */}
        {activeTab === 'courses' && (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-card rounded-2xl border border-border p-6 hover:border-accent/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-surface flex items-center justify-center text-3xl">
                      {course.image}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{course.name}</h3>
                      <p className="text-sm text-muted">{course.type}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full">
                    Faol
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted">Progress</span>
                    <span className="text-accent font-mono">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full wine-gradient-bg rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-ink-500 mt-2">
                    {course.completedLessons} / {course.totalLessons} dars
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Clock className="w-4 h-4" />
                    {course.lastAccessed}
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-border rounded-lg text-foreground text-sm transition-colors">
                    <Play className="w-4 h-4" />
                    Davom ettirish
                  </button>
                </div>
              </div>
            ))}

            {/* AI Bot Access Card */}
            <div className="bg-gradient-to-br from-wine-700/10 to-wine-800/10 rounded-2xl border border-accent/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">24/7 AI Yordamchi</h3>
                  <p className="text-sm text-muted">Maxsus o'qitilgan</p>
                </div>
              </div>
              <p className="text-muted text-sm mb-4">
                Savollaringizga javob beradi va tahlil qiladi. Istagan vaqtda murojaat qiling.
              </p>
              <button className="w-full py-2 bg-primary text-sand-100 rounded-lg font-semibold hover:shadow-gold transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Chatni boshlash
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'schedule' && (
          <motion.div 
            className="bg-card rounded-2xl border border-border p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Yaqin darslar</h3>
            <div className="space-y-4">
              {upcomingLessons.map((lesson, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-surface/50 rounded-xl hover:bg-surface transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center">
                      <Play className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{lesson.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Clock className="w-4 h-4" />
                        {lesson.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      lesson.type === 'Jonli' 
                        ? 'bg-red-500/20 text-red-500' 
                        : 'bg-blue-500/20 text-blue-500'
                    }`}>
                      {lesson.type}
                    </span>
                    <ChevronRight className="w-5 h-5 text-muted" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {achievements.map((achievement, idx) => (
              <div key={idx} className="bg-card rounded-2xl border border-border p-6 text-center hover:border-accent/30 transition-colors">
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h4 className="font-bold text-foreground mb-1">{achievement.title}</h4>
                <p className="text-sm text-muted">{achievement.description}</p>
              </div>
            ))}
            {/* Locked achievements */}
            {[1, 2, 3].map((_, idx) => (
              <div key={`locked-${idx}`} className="bg-card rounded-2xl border border-border p-6 text-center opacity-50">
                <div className="w-12 h-12 mx-auto rounded-full bg-surface flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5 text-ink-500" />
                </div>
                <h4 className="font-bold text-ink-500 mb-1">Yopiq</h4>
                <p className="text-sm text-ink-600">Progressni davom ettiring</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
