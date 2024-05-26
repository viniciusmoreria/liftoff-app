import { analyticsService } from '@libs/amplitude';
import * as WebBrowser from 'expo-web-browser';
import { Alert } from 'react-native';

export const handleOpenExternalLink = async (url: string) => {
  Alert.alert('Open in browser?', '', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Open',
      onPress: async () => {
        analyticsService.logEvent('open_external_link', { url });
        await WebBrowser.openBrowserAsync(encodeURI(url), {
          readerMode: true,
        });
      },
    },
  ]);
};

const domainRegex = /www\.(.*?)\./;

export const extractPageDomain = (url: string) => {
  const match = url.match(domainRegex);
  return match && match[1];
};
