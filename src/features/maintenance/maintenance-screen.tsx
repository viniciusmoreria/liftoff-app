import { Pressable, Text, View } from 'react-native';

import { SpaceManAnimation } from '@assets/animations';
import { useAnalytics } from '@libs/firebase/analytics/use-analytics';
import { RemoteConfig } from '@libs/firebase/remote-config';
import { Logger } from '@libs/logger';
import * as Updates from 'expo-updates';
import LottieView from 'lottie-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export const MaintenanceScreen = () => {
  const { logEvent } = useAnalytics();
  const maintenance = JSON.parse(RemoteConfig.getRemoteValue('under_maintenance').asString());

  async function reloadApp() {
    try {
      logEvent('reload_app');
      await Updates.reloadAsync();
    } catch (e) {
      Logger.error(e);
    }
  }

  return (
    <View className="bg-dark flex-1 items-center justify-center">
      <LottieView source={SpaceManAnimation} autoPlay style={{ width: 100 }} />

      <Animated.View entering={FadeIn} className="items-center justify-center space-y-2">
        <Text className="text-lg text-white">{maintenance?.title ?? 'Something is wrong'}</Text>
        <Text className="text-lg text-white">
          {maintenance?.description ?? 'We are already working on it'}
        </Text>
      </Animated.View>

      {maintenance?.showButton && (
        <Pressable className="bg-white py-3 px-4 rounded items-center mt-6" onPress={reloadApp}>
          <Text className="text-base text-dark">{maintenance?.button?.title}</Text>
        </Pressable>
      )}
    </View>
  );
};
