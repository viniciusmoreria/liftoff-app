import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';

type Sizes = keyof typeof sizeStyles;
type Weights = keyof typeof typography.primary;
type Presets = keyof typeof presets;

export interface TextProps extends RNTextProps {
  text?: string | number;
  style?: StyleProp<TextStyle>;
  preset?: Presets;
  weight?: Weights;
  size?: Sizes;
  children?: React.ReactNode;
  textAlign?: 'center' | 'left' | 'right';
  color?: TextStyle['color'];
}

export const Text = (props: TextProps) => {
  const { weight, size, text, children, style: styleOverride, textAlign, color, ...rest } = props;

  const content = text || children;

  const preset: Presets = props.preset ?? 'default';
  const styles: StyleProp<TextStyle> = [
    presets[preset],
    weight && fontWeightStyles[weight],
    size && sizeStyles[size],
    textAlign && { textAlign },
    color ? { color } : { color: colors.text },
    styleOverride,
  ];

  return (
    <RNText {...rest} style={styles} allowFontScaling={false}>
      {content}
    </RNText>
  );
};

const sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } satisfies TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } satisfies TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } satisfies TextStyle,
  md: { fontSize: 18, lineHeight: 26 } satisfies TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } satisfies TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } satisfies TextStyle,
  xxs: { fontSize: 12, lineHeight: 18 } satisfies TextStyle,
};

const fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } };
}, {}) as Record<Weights, TextStyle>;

const baseStyle: StyleProp<TextStyle> = [sizeStyles.sm, fontWeightStyles.regular];

const presets = {
  default: baseStyle,
  bold: [baseStyle, fontWeightStyles.regular] as StyleProp<TextStyle>,
  heading: [baseStyle, sizeStyles.xxl, fontWeightStyles.regular] as StyleProp<TextStyle>,
  subheading: [baseStyle, sizeStyles.lg, fontWeightStyles.medium] as StyleProp<TextStyle>,
  formLabel: [baseStyle, fontWeightStyles.medium] as StyleProp<TextStyle>,
  formHelper: [baseStyle, sizeStyles.sm, fontWeightStyles.regular] as StyleProp<TextStyle>,
};
