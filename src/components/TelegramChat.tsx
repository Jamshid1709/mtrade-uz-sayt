import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles } from '@/lib/icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const quickReplies = [
  'Kurs narxlari',
  'Ro\'yxatdan o\'tish',
  'Halol treyding haqida',
  'Dars jadvali',
];

const botResponses: Record<string, string> = {
  'kurs narxlari': 'Bizning kurslarimiz:\n\n• Premium (Online): $250 - 90 kun\n• Gibrid (Masofaviy): $600 - 60 kun\n• Offline Akademiya: $1000 - 8 hafta (10 kishilik intensiv mini guruh, Toshkent Coworking, Shaxsiy noutbuk shart, Kun ora: Dush-Chor-Jum / Ses-Pay-Shan)\n\nBatafsil ma\'lumot uchun "Kurslarni ko\'rish" tugmasini bosing.',
  'ro\'yxatdan o\'tish': 'Ro\'yxatdan o\'tish uchun:\n1. @mtrade_academy_bot ga o\'ting\n2. /start buyrug\'ini yuboring\n3. Kerakli kursni tanlang\n\nYoki to\'g\'ridan-to\'g\'ri saytdan bron qilishingiz mumkin.',
  'halol treyding haqida': 'Halol treyding — bu faqat shariat mezonlariga mos keluvchi aksiyalar va ribosiz aktivlar bilan savdo qilishdir.\n\nKursimizda halol filtratsiyadan o\'tgan aksiyalar tahlil qilinadi.',
  'dars jadvali': 'Darslar haftada 3 marta o\'tkaziladi:\n\n• Dushanba - Technical Analysis\n• Chorshanba - Risk Management\n• Juma - Live Trading\n\nBarcha darslar 18:00 da (Tashkent vaqti).',
};

const defaultResponse = 'Rahmat savolingiz uchun! \n\nQuyidagi mavzularda yordam bera olaman:\n• Kurslar haqida\n• Narxlar\n• Ro\'yxatdan o\'tish\n• Dars jadvali\n\nYoki operatorga murojaat qiling: @mtrade_support';

export default function TelegramChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Salom! Men MTRADE Academy AI yordamchisiman. Qanday yordam bera olaman?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let responseText = defaultResponse;

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerInput.includes(key) || key.includes(lowerInput)) {
          responseText = value;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 wine-gradient-bg rounded-full flex items-center justify-center shadow-gold hover:shadow-gold-lg transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-sand-100" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-sand-100" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="wine-gradient-bg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ink-950/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-sand-100" />
                </div>
                <div>
                  <h3 className="font-bold text-sand-100">MTRADE AI Assistant</h3>
                  <div className="flex items-center gap-1 text-sand-100/70 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    24/7 onlayn
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 p-4 overflow-y-auto bg-ink-950 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                      message.isUser
                        ? 'wine-gradient-bg text-sand-100 rounded-br-md'
                        : 'bg-surface border border-border text-ink-200 rounded-bl-md'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? 'text-sand-100/60' : 'text-ink-500'}`}>
                      {message.timestamp.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-surface border border-border rounded-2xl rounded-bl-md p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 bg-ink-950 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 text-xs bg-surface border border-border rounded-full text-accent hover:border-accent transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Xabar yozing..."
                  className="flex-1 bg-ink-950 border border-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 wine-gradient-bg rounded-full flex items-center justify-center text-sand-100 hover:shadow-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
