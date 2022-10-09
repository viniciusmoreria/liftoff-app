import { Platform } from 'react-native';

import { registerRootComponent } from 'expo';
import 'expo-dev-client';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import App from './src/App';

if (Platform.OS === 'ios') {
  require('@formatjs/intl-getcanonicallocales/polyfill').default;
  require('@formatjs/intl-locale/polyfill').default;
  require('@formatjs/intl-pluralrules/polyfill').default;
  require('@formatjs/intl-pluralrules/locale-data/en').default;
  require('@formatjs/intl-numberformat/polyfill').default;
  require('@formatjs/intl-numberformat/locale-data/en').default;
  require('@formatjs/intl-datetimeformat/polyfill').default;
  require('@formatjs/intl-datetimeformat/locale-data/en').default;
  require('@formatjs/intl-datetimeformat/add-all-tz').default;
}

registerRootComponent(App);
