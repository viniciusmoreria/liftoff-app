import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Localization from 'expo-localization';
import { useQuery } from 'react-query';

const getDeviceInfo = async (): Promise<string | null> => {
  const reportInfo = {
    Version: Constants.manifest?.version,
    Device: `${Device.manufacturer} ${Device.modelName}`,
    OS: `${Device.osName} ${Device.osVersion}`,
    Timezone: Localization.timezone,
  };

  return Object.entries(reportInfo)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
};

export function useDevice() {
  return useQuery(['device'], getDeviceInfo);
}
