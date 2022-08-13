import { Image, ScrollView, Text, View } from 'react-native';

import { PlaceholderUserPicture } from '@assets/images';
import { useUser } from '@hooks/use-user';
import { HEADER_HEIGHT } from '@libs/utilities';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { username } = useUser();

  function timeOfTheDay() {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'morning';
    }
    if (hour < 18) {
      return 'afternoon';
    }
    return 'evening';
  }

  return (
    <ScrollView
      className="flex-1 bg-dark px-8"
      style={{
        paddingTop: insets.top + HEADER_HEIGHT,
      }}
    >
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text className="text-xl text-white font-regular">Good {timeOfTheDay()},</Text>
          <Text className="text-xl text-white font-semibold">{username ?? 'crew member'}</Text>
        </View>

        <Image className="h-14 w-14 rounded-full" source={PlaceholderUserPicture} />
      </View>
    </ScrollView>
  );
};

export { HomeScreen };
