import { Text, View } from 'react-native';

import { SpaceManAnimation } from '@assets/animations';
import { RemoteConfig } from '@libs/firebase/remote-config';
import LottieView from 'lottie-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export const MaintenanceScreen = () => {
  const maintenance = JSON.parse(RemoteConfig.getRemoteValue('under_maintenance').asString());

  return (
    <View className="bg-dark flex-1 items-center justify-center">
      <LottieView source={SpaceManAnimation} autoPlay style={{ width: 100 }} />

      <Animated.View entering={FadeIn} className="items-center justify-center space-y-2">
        <Text className="text-lg text-white">{maintenance.title}</Text>
        <Text className="text-lg text-white">{maintenance.description}</Text>
      </Animated.View>
    </View>
  );
};
