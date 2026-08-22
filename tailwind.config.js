/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        muted: '#5B6472',
        surface: '#FFFFFF',
        canvas: '#F7F8FB',
        line: '#E4E7EE',
        indigo: {
          50: '#EEF0FF',
          100: '#DEE2FF',
          400: '#6D6BF5',
          500: '#4F46E5',
          600: '#4038C7',
          700: '#332DA1',
        },
        mint: {
          400: '#2FBF8F',
          500: '#16A47A',
        },
        amber: {
          400: '#F5A524',
        },
        violet: {
          50: '#F5F0FF',
          100: '#EBE0FF',
          400: '#9D6BF5',
          500: '#8B5CF6',
          600: '#7440E0',
        },
        cyan: {
          50: '#EBFBFF',
          100: '#D3F5FC',
          400: '#22C7E8',
          500: '#0FB4D6',
        },
        rose: {
          50: '#FFF0F5',
          100: '#FFE1EC',
          400: '#FB6FA0',
          500: '#F2467E',
        },
        section: {
          blue: '#F0F5FF',
          purple: '#F7F1FF',
          cyan: '#EEFBFC',
          indigo: '#F5F4FF',
          peach: '#FFF6F0',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.10)',
        'card-hover': '0 4px 8px rgba(15, 23, 42, 0.06), 0 16px 40px -12px rgba(79, 70, 229, 0.20)',
        glow: '0 8px 30px -6px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 8px 30px -6px rgba(15, 180, 214, 0.30)',
        glass: '0 8px 32px -8px rgba(79, 70, 229, 0.18)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, #EEF0FF 1px, transparent 1px), linear-gradient(to bottom, #EEF0FF 1px, transparent 1px)',
        'gradient-brand': 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 50%, #0FB4D6 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, #EEF0FF 0%, #F5F0FF 50%, #EBFBFF 100%)',
        'gradient-hero': 'radial-gradient(circle at 15% 15%, #EEF0FF 0%, transparent 45%), radial-gradient(circle at 85% 10%, #F5F0FF 0%, transparent 45%), radial-gradient(circle at 50% 100%, #EBFBFF 0%, transparent 50%)',
        'gradient-cta': 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
        'gradient-warm': 'linear-gradient(135deg, #F5A524 0%, #F2467E 100%)',
      },
      keyframes: {
        blink: { '0%, 49%': { opacity: 1 }, '50%, 100%': { opacity: 0 } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        'float-slow': { '0%, 100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-14px) rotate(4deg)' } },
        'pulse-soft': { '0%, 100%': { opacity: 0.6 }, '50%': { opacity: 1 } },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
