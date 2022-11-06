const { precomputeValues } = require('@capsizecss/core');

const roundToNearestPixel = (layoutSize) => {
  const ratio = 1;
  return Math.round(layoutSize * ratio) / ratio;
};

const capsize = (options) => {
  const values = precomputeValues(options);
  const fontSize = parseFloat(values.fontSize);
  const baselineTrimEm = parseFloat(values.baselineTrim);
  const capHeightTrimEm = parseFloat(values.capHeightTrim);
  const fontScale = 1;

  return {
    fontSize,
    lineHeight: values.lineHeight !== 'normal' ? parseFloat(values.lineHeight) : undefined,
    marginBottom: roundToNearestPixel(baselineTrimEm * fontSize * fontScale),
    marginTop: roundToNearestPixel(capHeightTrimEm * fontSize * fontScale),
  };
};

const createTextSize = ({
  fontSize,
  lineHeight: leading,
  letterSpacing,
  marginCorrection,
  fontMetrics,
}) => {
  const styles = {
    letterSpacing,
    ...capsize({
      fontMetrics,
      fontSize,
      leading,
    }),
  };

  const marginCorrectionForPlatform = 1;

  const newStyle = {
    fontSize: styles.fontSize,
    lineHeight: `${styles.lineHeight}px`,
    letterSpacing: styles.letterSpacing,
    marginTop: roundToNearestPixel(styles.marginTop + marginCorrectionForPlatform),
    marginBottom: roundToNearestPixel(styles.marginBottom - marginCorrectionForPlatform),
  };

  return newStyle;
};

// Sourced from @capsizecss/metrics
const fontMetricsInter = {
  familyName: 'Inter',
  capHeight: 2048,
  ascent: 2728,
  descent: -680,
  lineGap: 20,
  unitsPerEm: 2816,
  xHeight: 1536,
};

const textSizes = {
  'text-xs': createTextSize({
    fontSize: 11,
    lineHeight: 15,
    marginCorrection: {
      android: -0.1,
      ios: -0.3,
    },
    fontMetrics: fontMetricsInter,
  }),
  'text-sm': createTextSize({
    fontSize: 12,
    lineHeight: 17,
    marginCorrection: {
      android: -0.1,
      ios: -0.3,
    },
    fontMetrics: fontMetricsInter,
  }),
  'text-base': createTextSize({
    fontSize: 14,
    lineHeight: 19,
    marginCorrection: {
      android: -0.1,
      ios: -0.5,
    },
    fontMetrics: fontMetricsInter,
  }),
  'text-lg': createTextSize({
    fontSize: 16,
    lineHeight: 21,
    marginCorrection: {
      android: 0.2,
      ios: 0,
    },
    fontMetrics: fontMetricsInter,
  }),
  'text-xl': createTextSize({
    fontSize: 18,
    lineHeight: 23,
    marginCorrection: {
      android: 0,
      ios: -0.5,
    },
    fontMetrics: fontMetricsInter,
  }),
  'text-2xl': createTextSize({
    fontSize: 20,
    lineHeight: 27,
    marginCorrection: {
      android: -0.3,
      ios: -0.3,
    },
    fontMetrics: fontMetricsInter,
  }),
  'text-3xl': createTextSize({
    fontSize: 24,
    lineHeight: 33,
    marginCorrection: {
      android: -0.3,
      ios: -0.3,
    },
    fontMetrics: fontMetricsInter,
  }),
  'text-4xl': createTextSize({
    fontSize: 30,
    lineHeight: 41,
    marginCorrection: {
      android: -0.3,
      ios: -0.3,
    },
    fontMetrics: fontMetricsInter,
  }),
};

module.exports = { capsize, createTextSize, textSizes };
