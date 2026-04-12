/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        f1red: '#E10600',
        f1dark: '#0A0A0A',
        f1gray: '#1A1A1A',
        f1steel: '#2A2A2A',
        f1silver: '#C0C0C0',
        f1white: '#F5F5F5',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        'pulse-red': 'pulseRed 2s ease-in-out infinite',
        'streak': 'streak 2s ease-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 10px #E10600, 0 0 20px #E10600' },
          '50%': { boxShadow: '0 0 20px #E10600, 0 0 40px #E10600, 0 0 60px #E10600' },
        },
        streak: {
          '0%': { transform: 'translateX(-200px)', opacity: '0', width: '40px' },
          '20%': { opacity: '1', width: '200px' },
          '80%': { opacity: '1', width: '200px' },
          '100%': { transform: 'translateX(110vw)', opacity: '0', width: '40px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
