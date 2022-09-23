import { Image, Pressable, RefreshControl, Text, View } from 'react-native';

import { PlaceholderUserPicture } from '@assets/images';
import { Container } from '@components/container';
import { getTimeOfTheDay } from '@libs/utilities';
import { RootStackParams } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useUserStore } from '@store/userStore';
import { useQueryClient } from '@tanstack/react-query';

import { ArticlesCarousel } from './components/articles-carousel';
import { Countdown } from './components/countdown';
import { PreviousCarousel } from './components/previous-carousel';
import { UpcomingCarousel } from './components/upcoming-carousel';

type Props = NativeStackScreenProps<RootStackParams, 'home'>;

export const HomeScreen = ({ navigation }: Props) => {
  const queryClient = useQueryClient();

  const { username } = useUserStore();

  return (
    <Container
      useScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          tintColor="white"
          colors={['white']}
          onRefresh={() => {
            queryClient.invalidateQueries();
          }}
        />
      }
    >
      <Pressable onPress={() => navigation.navigate('profile')}>
        <View className="flex-row items-center px-8 mt-4">
          <View className="flex-1 justify-items-center space-y-1">
            <Text className="text-lg text-white">Good {getTimeOfTheDay()},</Text>
            <Text numberOfLines={2} className="text-lg text-white font-semibold">
              {username ?? 'crew member'}
            </Text>
          </View>
          <Image className="h-14 w-14 rounded-full ml-4" source={PlaceholderUserPicture} />
        </View>
      </Pressable>
      <Countdown />
      <UpcomingCarousel />
      <PreviousCarousel />
      <ArticlesCarousel />
    </Container>
  );
};
