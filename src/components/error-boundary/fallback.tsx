import { Pressable, Text, View } from 'react-native';

import { SpaceManAnimation } from '@assets/animations';
import { RemoteConfig } from '@libs/firebase/remote-config';
import LottieView from 'lottie-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { FallbackProps } from '.';

export const Fallback = ({ resetErrorBoundary }: FallbackProps) => {
  const maintenance = JSON.parse(RemoteConfig.getRemoteValue('under_maintenance').asString());

  return (
    <View className="bg-dark flex-1 items-center justify-center">
      <LottieView source={SpaceManAnimation} autoPlay style={{ width: 100 }} />

      <Animated.View entering={FadeIn} className="items-center justify-center space-y-6">
        <Text className="text-lg text-white">{maintenance?.title ?? 'Something is wrong'}</Text>

        <Pressable className="bg-white py-3 px-4 rounded items-center" onPress={resetErrorBoundary}>
          <Text className="text-base text-dark">Try again</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};
