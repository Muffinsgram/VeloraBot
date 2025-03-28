/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#121212',
        secondary: '#1E1E1E',
        accent: {
          1: '#7B2CBF',
          2: '#3A0CA3',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(123, 44, 191, 0.2)',
        'glow-lg': '0 0 30px rgba(123, 44, 191, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'floatSlow 20s ease-in-out infinite',
        'float-slower': 'floatSlower 25s ease-in-out infinite',
      },
      transitionDuration: {
        '800': '800ms',
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};