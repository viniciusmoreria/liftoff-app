const { plugin } = require('twrnc');
const { colors } = require('./colors');
const { textSizes } = require('./typography');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
        gray: colors.gray,
      },
      fontSize: {},
      fontFamily: {
        inter: 'Inter_400Regular',
        'inter-medium': 'Inter_500Medium',
        'inter-semibold': 'Inter_600SemiBold',
        'inter-bold': 'Inter_700Bold',
      },
      zIndex: {
        1: 1,
        2: 2,
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        'text-xs': textSizes['text-xs'],
        'text-sm': textSizes['text-sm'],
        'text-base': textSizes['text-base'],
        'text-lg': {
          ...textSizes['text-lg'],
          fontFamily: 'Inter_400Regular',
        },
        'text-xl': textSizes['text-xl'],
        'text-2xl': {
          ...textSizes['text-2xl'],
          fontFamily: 'Inter_400Regular',
        },
        'text-3xl': textSizes['text-3xl'],
        'text-4xl': textSizes['text-4xl'],
      });
    }),
  ],
};
