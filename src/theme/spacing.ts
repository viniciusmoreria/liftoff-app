import { initialWindowMetrics } from 'react-native-safe-area-context';

export const spacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  safeAreaTop: initialWindowMetrics?.insets.top || 24,
  safeAreaBottom: initialWindowMetrics?.insets.bottom || 24,
} as const;

export type Spacing = keyof typeof spacing;
