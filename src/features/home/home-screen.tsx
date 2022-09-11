import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { PlaceholderUserPicture } from '@assets/images';
import { Container } from '@components/container';
import { useUser } from '@hooks/use-user';
import { getTimeOfTheDay } from '@libs/utilities';
import { RootStackParams } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Countdown } from './components/countdown';
import { PreviousCarousel } from './components/previous-carousel';
import { UpcomingCarousel } from './components/upcoming-carousel';

type Props = NativeStackScreenProps<RootStackParams, 'home'>;

export const HomeScreen = ({ navigation }: Props) => {
  const { username } = useUser();

  return (
    <Container useScrollView>
      <View className="flex-row items-center px-8">
        <View className="flex-1 justify-items-center space-y-1">
          <Text className="text-lg text-white">Good {getTimeOfTheDay()},</Text>
          <Text numberOfLines={2} className="text-lg text-white font-semibold">
            {username ?? 'crew member'}
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate('profile')}>
          <Image className="h-16 w-16 rounded-full ml-4" source={PlaceholderUserPicture} />
        </Pressable>
      </View>
      <Countdown />
      <UpcomingCarousel />
      <PreviousCarousel />
    </Container>
  );
};
