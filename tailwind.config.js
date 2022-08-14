/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/App.{js,jsx,ts,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        regular: 'Inter_400Regular',
        medium: 'Inter_500Medium',
        semibold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
      },
      boxShadow: {
        dropdown:
          '0px 16px 48px 0px #0000001A, 0px 12px 16px 0px #0000001A, 0px 1px 3px 0px #0000000D',
        modal:
          '0px 16px 48px 0px #00000033, 0px 12px 16px 0px #00000066, 0px 0px 2px 0px #FFFFFF80',
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
};
