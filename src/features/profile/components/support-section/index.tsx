import { Linking, Share, Text, View } from 'react-native';

import { useAnalytics } from '@libs/firebase/analytics/use-analytics';
import { isAndroid } from '@libs/utilities';
import * as Application from 'expo-application';
import * as Device from 'expo-device';

import { MenuItem } from '../menu-item';

export const SupportSection = () => {
  const { logEvent } = useAnalytics();

  async function sendEmail({ title }: { title: string }) {
    logEvent('send_email', { title });

    const reportInfo = {
      Version: Application.nativeApplicationVersion,
      Device: `${Device.manufacturer} ${Device.modelName}`,
      OS: `${Device.osName} ${Device.osVersion}`,
      Timezone: new Date().toTimeString().slice(9, 17),
    };
    const deviceData = Object.entries(reportInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    await Linking.openURL(
      `mailto:appliftoff@gmail.com?subject=Liftoff ${title} Request (v${Application.nativeApplicationVersion})&body=\n\n\n\n${deviceData}`
    );
  }

  async function rateApp() {
    logEvent('rate_app');

    if (isAndroid) {
      await Linking.openURL(`market://details?id=${Application.applicationId}`);
    } else {
      await Linking.openURL(
        `https://apps.apple.com/app/apple-store/id1645685152?action=write-review`
      );
    }
  }

  async function shareApp() {
    logEvent('share_app');

    await Share.share({
      message: `Track and watch all upcoming rocket launches from agencies around the world with Liftoff.\n\nDownload Liftoff for iOS: https://apple.co/3CHM9YO \n\nDownload Liftoff for Android: https://play.google.com/store/apps/details?id=${Application.applicationId}`,
    });
  }

  return (
    <View className="mt-6">
      <Text className="text-lg text-white font-bold">Support</Text>
      <View className="justify-items-center space-y-6 bg-secondary p-4 rounded-lg mt-4">
        <View>
          <MenuItem title="Bug Report" onPress={() => sendEmail({ title: 'Support' })} />
        </View>
        <View>
          <MenuItem title="Feature Request" onPress={() => sendEmail({ title: 'Feature' })} />
        </View>
        <View>
          <MenuItem title="Rate Our App" onPress={rateApp} />
        </View>
        <View>
          <MenuItem title="Share" onPress={shareApp} />
        </View>
      </View>
    </View>
  );
};
