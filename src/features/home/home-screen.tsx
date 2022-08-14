import { Image, Pressable, Text, View } from 'react-native';

import { PlaceholderUserPicture } from '@assets/images';
import { Container } from '@components/container';
import { useUser } from '@hooks/use-user';
import { RootStackParams } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParams, 'profile'>;

const HomeScreen = ({ navigation }: Props) => {
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
    <Container useScrollView>
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text className="text-xl text-white font-regular">Good {timeOfTheDay()},</Text>
          <Text className="text-xl text-white font-semibold">{username ?? 'crew member'}</Text>
        </View>

        <Pressable onPress={() => navigation.navigate('profile')}>
          <Image className="h-16 w-16 rounded-full" source={PlaceholderUserPicture} />
        </Pressable>
      </View>
    </Container>
  );
};

export { HomeScreen };
