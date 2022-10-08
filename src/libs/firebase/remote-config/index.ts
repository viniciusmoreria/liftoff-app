import auth from '@react-native-firebase/auth';
import rnRemoteConfig from '@react-native-firebase/remote-config';

export const RemoteConfig = {
  initialize: async () => {
    await rnRemoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 300,
    });
    await rnRemoteConfig().fetchAndActivate();
    await auth().signInAnonymously();
  },
  getRemoteValue: (key: string) => rnRemoteConfig().getValue(key),
};
