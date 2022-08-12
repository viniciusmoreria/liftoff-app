/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.{js,jsx,ts,tsx}', './src/features/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      inter: 'Inter_400Regular',
      'inter-medium': 'Inter_500Medium',
      'inter-semibold': 'Inter_600SemiBold',
      'inter-bold': 'Inter_700Bold',
    },
    extend: {
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
