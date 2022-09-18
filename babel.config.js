module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      ['nativewind/babel'],
      [
        'module-resolver',
        {
          root: ['./src'],
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
            '@assets': './src/assets',
            '@components': './src/components',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@libs': './src/libs',
            '@navigation': './src/navigation',
            '@features': './src/features',
            '@providers': './src/providers',
            '@store': './src/store',
            '@styles': './src/styles',
          },
        },
      ],
      'inline-dotenv',
      'react-native-reanimated/plugin',
    ],
  };
};
