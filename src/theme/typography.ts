import {
  Inter_700Bold as interBold,
  Inter_300Light as interLight,
  Inter_500Medium as interMedium,
  Inter_400Regular as interRegular,
  Inter_600SemiBold as interSemiBold,
} from '@expo-google-fonts/inter';
import { Platform } from 'react-native';

export const customFontsToLoad = {
  interLight,
  interRegular,
  interMedium,
  interSemiBold,
  interBold,
};

const fonts = {
  inter: {
    light: 'interLight',
    regular: 'interRegular',
    medium: 'interMedium',
    semiBold: 'interSemiBold',
    bold: 'interBold',
  },
  helveticaNeue: {
    // iOS only font.
    thin: 'HelveticaNeue-Thin',
    light: 'HelveticaNeue-Light',
    normal: 'Helvetica Neue',
    medium: 'HelveticaNeue-Medium',
  },
  sansSerif: {
    // Android only font.
    thin: 'sans-serif-thin',
    light: 'sans-serif-light',
    normal: 'sans-serif',
    medium: 'sans-serif-medium',
  },
};

export const typography = {
  fonts,
  primary: fonts.inter,
  secondary: Platform.select({
    ios: fonts.helveticaNeue,
    android: fonts.sansSerif,
  }),
};
