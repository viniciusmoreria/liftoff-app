module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@assets": "./assets",
            "@hooks": "./hooks",
            "@libs": "./src/libs",
            "@navigation": "./src/navigation",
            "@pages": "./src/pages",
            "@providers": "./src/providers",
            "@screens": "./src/screens",
          },
        },
      ],
      "inline-dotenv",
      "react-native-reanimated/plugin",
    ],
  };
};
