import { makeTheme } from 'dripsy';

import { textSizes } from './typography';

const fontName = 'Inter_400Regular';

const theme = makeTheme({
  colors: {
    primary: '#c0c0c0',
    secondary: '#242529',
    background: '#16171B',
    accent: '#d83545',
  },
  customFonts: {
    [fontName]: {
      default: 'Inter_400Regular',
      normal: 'Inter_400Regular',
      regular: 'Inter_400Regular',
      bold: 'Inter_700Bold',
      100: 'Inter_100Thin',
      300: 'Inter_300Light',
      400: 'Inter_400Regular',
      500: 'Inter_500Medium',
      700: 'Inter_700Bold',
      900: 'Inter_900Black',
    },
  },
  fonts: {
    root: fontName,
    inter: fontName,
  },
  fontSizes: [],
  text: {
    heading: {
      fontSize: 24,
    },
    'text-xs': {
      fontWeight: 'default',
      ...textSizes['text-xs'],
    },
    'text-sm': {
      fontWeight: 'default',
      ...textSizes['text-sm'],
    },
    body: {
      fontWeight: 'default',
      ...textSizes['text-base'],
    },
    'text-base': {
      fontWeight: 'default',
      ...textSizes['text-base'],
    },
    'text-lg': {
      fontWeight: 'default',
      ...textSizes['text-lg'],
    },
    'text-xl': {
      fontWeight: 'default',
      ...textSizes['text-xl'],
    },
    'text-2xl': {
      fontWeight: 'default',
      ...textSizes['text-2xl'],
    },
    'text-3xl': {
      fontWeight: 'default',
      ...textSizes['text-3xl'],
    },
    'text-4xl': {
      fontWeight: 'default',
      ...textSizes['text-4xl'],
    },
  },
  space: {
    none: 0,
    '3px': 3,
    '4px': 4,
    '6px': 6,
    '8px': 8,
    '10px': 10,
    '12px': 12,
    '15px': 15,
    '16px': 16,
    '19px': 19,
    '24px': 24,
    '30px': 30,
    '36px': 36,
    '42px': 42,
    '48px': 48,
    '60px': 60,
    '72px': 72,
  },
  shadows: {
    sm: {
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      shadowColor: 'background',
    },
  },
});

type MyTheme = typeof theme;

declare module 'dripsy' {
  interface DripsyCustomTheme extends MyTheme {}
}

export { theme };
