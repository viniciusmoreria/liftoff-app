const configPlugins = require('@expo/config-plugins');
const generateCode = require('@expo/config-plugins/build/utils/generateCode');
const fs = require('fs');
const path = require('path');

const withReactNativeFirebase = (config) => {
  return configPlugins.withDangerousMod(config, [
    'ios',
    async (config) => {
      const file = path.join(config.modRequest.platformProjectRoot, 'Podfile');

      const contents = fs.readFileSync(file, 'utf-8');

      const addCode = generateCode.mergeContents({
        tag: 'withReactNativeFirebase',
        src: contents,
        newSrc: `  pod 'FirebaseFirestore', :git => 'https://github.com/invertase/firestore-ios-sdk-frameworks.git', :tag => '10.24.0'`,
        anchor: /use_native_modules/,
        offset: 0,
        comment: '#',
      });

      if (!addCode.didMerge) {
        console.error(
          "ERROR: Cannot add withReactNativeFirebase to the project's ios/Podfile because it's malformed."
        );
        return config;
      }

      fs.writeFileSync(file, addCode.contents);

      return config;
    },
  ]);
};

module.exports = withReactNativeFirebase;
