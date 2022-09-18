const plugin = require('tailwindcss/plugin');
const { textSizes } = require('./src/styles/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.tsx',
    './src/{features,components,providers,styles,navigation,hooks}/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        regular: 'Inter',
        medium: 'Inter-Medium',
        semibold: 'Inter-SemiBold',
        bold: 'Inter-Bold',
        light: 'Inter-Light',
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#d83545',
        secondary: '#242529',
        darkGray: '#252525c1',
        dark: '#16171B',
        gray: '#c0c0c0',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        'text-xs': textSizes['text-xs'],
        'text-sm': textSizes['text-sm'],
        'text-base': textSizes['text-base'],
        'text-lg': textSizes['text-lg'],
        'text-xl': textSizes['text-xl'],
        'text-2xl': textSizes['text-2xl'],
        'text-3xl': textSizes['text-3xl'],
        'text-4xl': textSizes['text-4xl'],
      });
    }),
  ],
};
