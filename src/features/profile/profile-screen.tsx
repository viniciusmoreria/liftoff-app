import { Image, Text, View } from 'react-native';

import { PlaceholderUserPicture } from '@assets/images';
import { Container } from '@components/container';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '@store/userStore';
import * as Application from 'expo-application';

import { LegalSection } from './components/legal-section';
import { NotificationSection } from './components/notification-section';
import { SupportSection } from './components/support-section';

export const ProfileScreen = () => {
  const { username } = useUserStore();

  return (
    <Container useScrollView>
      <View className="flex-1 px-8 mt-4">
        <View className="flex-1">
          <View className="items-center">
            <View>
              <Image className="h-20 w-20 rounded-full" source={PlaceholderUserPicture} />
              <View className="absolute w-10 h-10 rounded-full bg-[#7c7c7cc1] items-center justify-center right-0 -bottom-2">
                <Ionicons name="camera" color="white" size={20} />
              </View>
            </View>
            <View className="flex-1 justify-items-center mt-4">
              <Text numberOfLines={2} className="text-xl text-white font-semibold">
                {username ?? 'crew member'}
              </Text>
            </View>
          </View>
          <View className="border-[1px] border-secondary my-8 rounded" />
          <NotificationSection />
          <SupportSection />
          <LegalSection />
        </View>

        <Text className="text-xs text-white font-medium text-center mt-12">
          Version {Application.nativeApplicationVersion}
        </Text>
      </View>
    </Container>
  );
};
