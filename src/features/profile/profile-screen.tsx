import { Image, Pressable, Text, View } from 'react-native';

import { PlaceholderUserPicture } from '@assets/images';
import { Container } from '@components/container';
import { Feather } from '@expo/vector-icons';
import { useBottomSheet } from '@hooks/use-bottom-sheet';
import { isIOS } from '@libs/utilities';
import { useUserStore } from '@store/userStore';
import * as Application from 'expo-application';

import { LegalSection } from './components/legal-section';
import { NotificationSection } from './components/notification-section';
import { UserProfileSheet } from './components/profile-sheet';
import { SupportSection } from './components/support-section';

export const ProfileScreen = () => {
  const { username, profilePicture } = useUserStore();
  const { setSheetContent } = useBottomSheet();

  return (
    <Container useScrollView>
      <View className={`flex-1 px-8 mt-${[isIOS ? '12' : '4']}`}>
        <View className="flex-1">
          <Pressable
            className="items-center"
            onPress={() => {
              setSheetContent({
                content: <UserProfileSheet />,
              });
            }}
          >
            <View>
              <Image
                className="h-20 w-20 rounded-full"
                source={profilePicture ? { uri: profilePicture } : PlaceholderUserPicture}
              />
              <View className="absolute w-9 h-9 rounded-full bg-[#7c7c7cc1] items-center justify-center right-0 -bottom-2">
                <Feather name="edit-2" color="white" size={16} />
              </View>
            </View>
            <View className="flex-1 justify-items-center mt-4">
              <Text numberOfLines={2} className="text-xl text-white font-semibold">
                {username ?? 'crew member'}
              </Text>
            </View>
          </Pressable>
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
