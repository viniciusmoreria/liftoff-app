import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { useQuery } from 'react-query';

const getDeviceInfo = async (): Promise<string | null> => {
  const reportInfo = {
    'App version': Constants.manifest?.version,
    Device: `${Device.manufacturer} ${Device.modelName}`,
    OS: `${Device.osName} ${Device.osVersion}`,
    Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  return Object.entries(reportInfo)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
};

export function useDevice() {
  return useQuery(['device'], getDeviceInfo);
}
