import { Image, Pressable, Text, View } from 'react-native';

import { PlaceholderUserPicture } from '@assets/images';
import { Container } from '@components/container';
import { useUser } from '@hooks/use-user';
import { getTimeOfTheDay } from '@libs/utilities';
import { RootStackParams } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParams, 'profile'>;

const HomeScreen = ({ navigation }: Props) => {
  const { username } = useUser();

  return (
    <Container useScrollView>
      <View className="flex-row items-center">
        <View className="flex-1 justify-items-center space-y-1">
          <Text className="text-xl text-white">Good {getTimeOfTheDay()},</Text>
          <Text numberOfLines={2} className="text-xl text-white font-semibold">
            {username ?? 'crew member'}
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate('profile')}>
          <Image className="h-16 w-16 rounded-full ml-4" source={PlaceholderUserPicture} />
        </Pressable>
      </View>
    </Container>
  );
};

export { HomeScreen };
