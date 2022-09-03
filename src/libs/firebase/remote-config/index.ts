import rnRemoteConfig from '@react-native-firebase/remote-config';

export const RemoteConfig = {
  initialize: async () => {
    await rnRemoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 300,
    });
    await rnRemoteConfig().fetchAndActivate();
  },
  getRemoteValue: (key: string) => rnRemoteConfig().getValue(key),
};
