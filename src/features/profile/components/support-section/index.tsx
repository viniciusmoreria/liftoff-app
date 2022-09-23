import { Linking, Share, Text, View } from 'react-native';

import { isAndroid } from '@libs/utilities';
import * as Application from 'expo-application';
import * as Device from 'expo-device';

import { MenuItem } from '../menu-item';

export const SupportSection = () => {
  async function sendEmail({ title }: { title: string }) {
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
    if (isAndroid) {
      await Linking.openURL(`market://details?id=${Application.applicationId}`);
    } else {
      await Linking.openURL(`itms-apps://itunes.apple.com/app/id=1645685152`);
    }
  }

  async function shareApp() {
    await Share.share({
      message: `Track and watch all upcoming rocket launches from agencies around the world with Liftoff.\n\nDownload Liftoff for iOS: https://apps.apple.com/us/app/liftoff/id1645685152 \n\nDownload Liftoff for Android: https://play.google.com/store/apps/details?id=${Application.applicationId}`,
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
