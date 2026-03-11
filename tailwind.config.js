/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lato', 'sans-serif'],
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        primary: {
          orange: '#FF9D00',
          dark: '#1a1a1a',
          sage: '#9CA777',
        },
        accent: {
          purple: '#4e3779',
          red:    '#e3261d',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      backgroundImage: {
        'gradient-dark':   'linear-gradient(135deg, #0d091f 0%, #1a1530 50%, #0a0a0a 100%)',
        'gradient-accent': 'linear-gradient(90deg, #4e3779 0%, #e3261d 50%, #FF9D00 100%)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      transitionDuration: {
        '250': '250ms',
      },
      keyframes: {
        'text-fill': {
          '0%': {
            backgroundPosition: '100% 0',
          },
          '100%': {
            backgroundPosition: '0% 0',
          },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.05)' },
        },
        'rotate-slow': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        'corner-tl': {
          '0%': { opacity: '0', transform: 'translate(-10px, -10px)' },
          '100%': { opacity: '1', transform: 'translate(0, 0)' },
        },
        'corner-tr': {
          '0%': { opacity: '0', transform: 'translate(10px, -10px)' },
          '100%': { opacity: '1', transform: 'translate(0, 0)' },
        },
        'corner-bl': {
          '0%': { opacity: '0', transform: 'translate(-10px, 10px)' },
          '100%': { opacity: '1', transform: 'translate(0, 0)' },
        },
        'corner-br': {
          '0%': { opacity: '0', transform: 'translate(10px, 10px)' },
          '100%': { opacity: '1', transform: 'translate(0, 0)' },
        },
        'side-ornament-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px) translateY(-50%)' },
          '100%': { opacity: '1', transform: 'translateX(0) translateY(-50%)' },
        },
        'side-ornament-right': {
          '0%': { opacity: '0', transform: 'translateX(20px) translateY(-50%)' },
          '100%': { opacity: '1', transform: 'translateX(0) translateY(-50%)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'line-grow': {
          '0%': { width: '0' },
          '100%': { width: '80px' },
        },
        'fade-delayed': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'icon-appear': {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'logo-scale': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bounce-dots': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'blur-in': {
          '0%': { opacity: '0', filter: 'blur(20px)', transform: 'scale(0.92)' },
          '100%': { opacity: '1', filter: 'blur(0px)', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'rotate-slow-reverse': {
          '0%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
        },
        'ring-breathe': {
          '0%, 100%': { opacity: '0.08', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '0.18', transform: 'translate(-50%, -50%) scale(1.04)' },
        },
      },
      animation: {
        'text-fill': 'text-fill 1.5s ease-out forwards',
        'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'rotate-slow-reverse': 'rotate-slow-reverse 28s linear infinite',
        'ring-breathe': 'ring-breathe 4s ease-in-out infinite',
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'corner-tl': 'corner-tl 0.8s ease-out 0.2s forwards',
        'corner-tr': 'corner-tr 0.8s ease-out 0.3s forwards',
        'corner-bl': 'corner-bl 0.8s ease-out 0.4s forwards',
        'corner-br': 'corner-br 0.8s ease-out 0.5s forwards',
        'side-ornament-left': 'side-ornament-left 0.8s ease-out 0.6s forwards',
        'side-ornament-right': 'side-ornament-right 0.8s ease-out 0.7s forwards',
        'slide-up': 'slide-up 0.8s ease-out 0.3s forwards',
        'line-grow': 'line-grow 0.8s ease-out 1s forwards',
        'fade-delayed': 'fade-delayed 0.6s ease-out 1.2s forwards',
        'icon-appear': 'icon-appear 0.6s ease-out 1.5s forwards',
        'logo-scale': 'logo-scale 0.8s ease-out 0.3s forwards',
        'bounce-dots': 'bounce-dots 0.8s ease-in-out infinite',
        'blur-in': 'blur-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
        'shimmer': 'shimmer 2.8s ease-in-out 1s infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}