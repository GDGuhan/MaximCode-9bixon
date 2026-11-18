import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          950: '#020817',
          900: '#0a1628',
          800: '#0d1f3c',
          700: '#112952',
          600: '#1a3a6b',
          500: '#1e4d8c',
          400: '#2563eb',
          300: '#3b82f6',
          200: '#60a5fa',
          100: '#bfdbfe',
          50:  '#eff6ff',
        },
        neon: {
          blue:  '#00d4ff',
          green: '#00ff94',
          gold:  '#ffd700',
        },
        glass: {
          light: 'rgba(255,255,255,0.05)',
          mid:   'rgba(255,255,255,0.08)',
          heavy: 'rgba(255,255,255,0.12)',
          border:'rgba(255,255,255,0.10)',
        },
      },
      backgroundImage: {
        'hero-gradient':     'linear-gradient(135deg, #020817 0%, #0a1628 40%, #112952 70%, #020817 100%)',
        'card-gradient':     'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        'neon-gradient':     'linear-gradient(90deg, #00d4ff, #2563eb)',
        'success-gradient':  'linear-gradient(135deg, #065f46, #047857)',
        'danger-gradient':   'linear-gradient(135deg, #7f1d1d, #991b1b)',
        'gold-gradient':     'linear-gradient(135deg, #92400e, #d97706)',
      },
      boxShadow: {
        'neon-blue':  '0 0 20px rgba(0,212,255,0.35), 0 0 60px rgba(0,212,255,0.15)',
        'neon-green': '0 0 20px rgba(0,255,148,0.35), 0 0 60px rgba(0,255,148,0.15)',
        'neon-gold':  '0 0 20px rgba(255,215,0,0.35)',
        'glass':      '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glass-lg':   '0 16px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card':       '0 4px 24px rgba(0,0,0,0.3)',
      },
      animation: {
        'spin-slow':     'spin 3s linear infinite',
        'pulse-neon':    'pulseNeon 2s ease-in-out infinite',
        'slide-up':      'slideUp 0.6s ease-out forwards',
        'slide-down':    'slideDown 0.4s ease-out forwards',
        'fade-in':       'fadeIn 0.5s ease-out forwards',
        'scale-in':      'scaleIn 0.4s ease-out forwards',
        'bounce-in':     'bounceIn 0.6s cubic-bezier(0.175,0.885,0.32,1.275) forwards',
        'shimmer':       'shimmer 2s linear infinite',
        'float':         'float 3s ease-in-out infinite',
        'check-draw':    'checkDraw 0.6s ease-out 0.3s forwards',
      },
      keyframes: {
        pulseNeon: {
          '0%,100%': { boxShadow: '0 0 20px rgba(0,212,255,0.35)' },
          '50%':     { boxShadow: '0 0 40px rgba(0,212,255,0.7), 0 0 80px rgba(0,212,255,0.3)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          from: { opacity: '0', transform: 'scale(0.5)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        checkDraw: {
          from: { strokeDashoffset: '100' },
          to:   { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
