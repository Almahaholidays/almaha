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
      },
      animation: {
        'text-fill': 'text-fill 1.5s ease-out forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}