import { extendTheme } from 'native-base';

const theme = extendTheme({
  fontConfig: {
    Inter: {
      100: {
        normal: 'Inter_100Thin',
      },
      300: {
        normal: 'Inter_300Light',
      },
      400: {
        normal: 'Inter_400Regular',
      },
      500: {
        normal: 'Inter_500Medium',
      },
      700: {
        normal: 'Inter_700Bold',
      },

      900: {
        normal: 'Inter_900Black',
      },
    },
  },

  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Inter',
  },

  colors: {
    background: '#05050B',
    primary: '#c0c0c0',
    secondary: '#111424',
    accent: '#d83545',
  },
});

export default theme;
