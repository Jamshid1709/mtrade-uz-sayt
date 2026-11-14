/** @type {import('tailwindcss').Config} */
// MTrade Academy — Brand v2.1 tokenlari (docs/brand/mtrade.tokens.json manbasidan, dark-first)
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primitives — Wine (brand 700 #7F011F = asosiy aksent)
        wine: {
          50: '#FFF4F3', 100: '#FDE2E2', 200: '#FCC4C3', 300: '#F79C9D', 400: '#F06A72',
          500: '#DC374D', 600: '#B30E32', 700: '#7F011F', 800: '#620116', 900: '#48010E', 950: '#2F0107',
        },
        // Primitives — Ink (oklch-hisoblangan shkala; ink-100 = Powder White, ink-950 = Rich Black)
        ink: {
          50: '#F8FBFC', 100: '#EBF1F5', 200: '#D9E1E6', 300: '#BFC9CF', 400: '#94A0A8',
          500: '#6E7B84', 600: '#4D5C65', 700: '#31414A', 800: '#1B2A33', 900: '#0A1922', 950: '#010B13',
        },
        // Primitives — Sand (sand-100 #F5EBD0 = Light Sand)
        sand: {
          50: '#FCF7EC', 100: '#F5EBD0', 200: '#EADBB7', 300: '#D8C69B', 400: '#BCA97B',
          500: '#9C8A5F', 600: '#7D6D47', 700: '#5E5132', 800: '#443920', 900: '#2D2614', 950: '#1A150A',
        },
        // Trading grafik ranglari — FAQAT grafiklarda, ▲▼ bilan (brand p.20)
        bull: '#56DC85',
        bear: '#FD7E49',
        info: '#55AEE8',
        warn: '#F7B83D',
        // Semantik tokenlar (dark — asosiy rejim, brand p.14)
        background: '#010B13',
        surface: '#05131C',
        card: '#0C1B24',
        border: '#213039',
        foreground: '#EBF1F5',
        muted: '#94A0A8',
        primary: {
          DEFAULT: '#7F011F',
          foreground: '#F5EBD0',
        },
        accent: {
          DEFAULT: '#F06A72',
          foreground: '#010B13',
        },
        highlight: '#F5EBD0',
        ring: '#F06A72',
        input: '#213039',
        // shadcn ui moslik
        destructive: {
          DEFAULT: '#FD7E49',
          foreground: '#010B13',
        },
        secondary: {
          DEFAULT: '#05131C',
          foreground: '#EBF1F5',
        },
        popover: {
          DEFAULT: '#0C1B24',
          foreground: '#EBF1F5',
        },
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '28px',
        xl: '28px',
        lg: '20px',
        md: '12px',
        sm: '8px',
        xs: '6px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        wine: '0 0 24px rgba(127,1,31,0.35), 0 0 64px rgba(240,106,114,0.12)',
        'wine-lg': '0 0 40px rgba(127,1,31,0.45), 0 0 96px rgba(240,106,114,0.18)',
        gold: '0 0 24px rgba(127,1,31,0.35), 0 0 64px rgba(240,106,114,0.12)',
        'gold-lg': '0 0 40px rgba(127,1,31,0.45), 0 0 96px rgba(240,106,114,0.18)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'candle-up': {
          '0%': { transform: 'translateY(100vh) scaleY(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) scaleY(1)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        aurora: {
          '0%, 100%': { opacity: '0.75' },
          '50%': { opacity: '1' },
        },
        pulseWine: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(240,106,114,0)' },
          '50%': { boxShadow: '0 0 20px 6px rgba(240,106,114,0.25)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'candle-up': 'candle-up 8s ease-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        aurora: 'aurora 6s ease-in-out infinite',
        'pulse-gold': 'pulseWine 2.5s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
