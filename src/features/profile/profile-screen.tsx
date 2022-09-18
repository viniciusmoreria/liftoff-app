import { Image, Text, View } from 'react-native';

import { PlaceholderUserPicture } from '@assets/images';
import { Container } from '@components/container';
import { useUserStore } from '@store/userStore';
import * as Application from 'expo-application';

import { NotificationSection } from './components/notification-section';
import { SupportSection } from './components/support-section';

export const ProfileScreen = () => {
  const { username } = useUserStore();

  return (
    <Container useScrollView>
      <View className="flex-1 px-8">
        <View className="flex-1">
          <View className="items-center">
            <Image className="h-20 w-20 rounded-full" source={PlaceholderUserPicture} />
            <View className="flex-1 justify-items-center mt-4">
              <Text numberOfLines={2} className="text-xl text-white font-semibold">
                {username ?? 'crew member'}
              </Text>
            </View>
          </View>
          <View className="border-[1px] border-secondary my-8 rounded" />
          <NotificationSection />
          <SupportSection />
        </View>

        <Text className="text-xs text-white font-medium text-center">
          Version {Application.nativeApplicationVersion}
        </Text>
      </View>
    </Container>
  );
};
