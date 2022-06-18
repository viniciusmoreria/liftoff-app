module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
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
