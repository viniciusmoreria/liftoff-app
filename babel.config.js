module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      ['nativewind/babel'],
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
            '.png',
          ],
          alias: {
            '@assets': './assets',
            '@constants': './constants',
            '@hooks': './hooks',
            '@libs': './src/libs',
            '@navigation': './src/navigation',
            '@features': './src/features',
            '@providers': './src/providers',
            '@styles': './src/styles',
          },
        },
      ],
      'inline-dotenv',
      'react-native-reanimated/plugin',
    ],
  };
};
