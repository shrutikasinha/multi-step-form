/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fef3e7',
          100: '#fde0c3',
          200: '#fbcc9b',
          300: '#f9b873',
          400: '#f7a855',
          500: '#f59837',
          600: '#f39031',
          700: '#f1832a',
          800: '#ef7623',
          900: '#ec6216',
        },
        dark: {
          50: '#f5f5f7',
          100: '#e7e7ea',
          200: '#cfcfd4',
          300: '#acacb5',
          400: '#87878f',
          500: '#6c6c74',
          600: '#58585f',
          700: '#48484e',
          800: '#3e3e43',
          900: '#1a1a1d',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
