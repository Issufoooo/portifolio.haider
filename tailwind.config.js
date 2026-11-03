import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Paleta original (mantida) ─────────────────────────
        canvas: '#081225',
        'canvas-light': '#0B1A30',
        'canvas-card': '#0F1B34',
        'primary-dark': '#2563EB',
        'primary-glow': 'rgba(59,130,246,0.15)',

        // ── Tokens shadcn/ui mapeados para a tua paleta ────────
        // (primary/secondary/accent mantêm o valor antigo em DEFAULT,
        //  por isso `bg-primary`, `text-secondary` etc. continuam iguais)
        primary: { DEFAULT: '#3B82F6', foreground: '#FFFFFF' },
        secondary: { DEFAULT: '#60A5FA', foreground: '#081225' },
        accent: { DEFAULT: '#93C5FD', foreground: '#081225' },
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
          foreground: '#FFFFFF',
        },
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--border) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-right': 'slideRight 0.5s ease forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        // Aceternity — Spotlight
        spotlight: 'spotlight 2s ease 0.75s 1 forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [animate],
};
