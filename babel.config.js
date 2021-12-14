module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
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
            '@pages': './src/pages',
            '@types': './src/@types',
            '@config': './src/config',
            '@hooks': './src/hooks',
            '@assets': './src/assets',
            '@utils': './src/utils',
            '@components': './src/components',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
