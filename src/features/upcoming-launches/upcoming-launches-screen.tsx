import React from 'react';
import { Pressable, RefreshControl, Text, View } from 'react-native';

import { Container } from '@components/container';
import { ProgressBar } from '@components/progress-bar';
import { Launch } from '@features/home/hooks/types';
import { useUpcomingLaunches } from '@features/home/hooks/use-upcoming-launches';
import { isIOS } from '@libs/utilities';
import { RootStackParams } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { format } from 'date-fns';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParams, 'upcoming-launches'>;

export const UpcomingLaunchesScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const { data: launches, refetch } = useUpcomingLaunches();

  const data = launches?.filter((launch) => new Date(launch.net) > new Date()) ?? [];

  const renderItem = ({ item }: { item: Launch }) => {
    const hasLiftoff = new Date(item.net) < new Date();
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('launch-detail', {
            launch: item,
          })
        }
      >
        <Animated.View entering={FadeIn} className="px-4">
          <View className="bg-secondary p-4 rounded-lg h-24 w-full overflow-hidden">
            <View className="flex-1 flex-row items-center">
              <View className="items-center">
                <Text className="text-white text-xs font-bold">
                  {format(new Date(item.net), 'H:mm')}
                </Text>
                <Text className="text-gray text-xs mt-2">
                  {format(new Date(item.net), 'MMM d')}
                </Text>
              </View>
              <View className="h-full mx-3 w-px bg-dark" />
              <View className="flex-1 mr-2">
                <Text className="text-white text-xs font-bold" numberOfLines={2}>
                  {item?.mission?.name ?? item?.name}
                </Text>
                <Text className="text-gray text-xs mt-2">
                  {item?.rocket?.configuration?.full_name}
                </Text>
              </View>
              {item?.mission?.orbit?.abbrev && (
                <View className="items-end">
                  <Text className="text-white text-xs font-bold">Orbit</Text>
                  <Text className="text-gray text-xs mt-2">{item?.mission?.orbit?.abbrev}</Text>
                </View>
              )}
            </View>
            {hasLiftoff && (
              <View className="absolute bottom-0 left-0 right-0">
                <ProgressBar height={3} backgroundColor="#d83545" />
              </View>
            )}
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <Container>
      <FlashList
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor="white"
            colors={['#000']}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        estimatedItemSize={110}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{
          paddingTop: isIOS ? 56 : 18,
          paddingBottom: insets.bottom + 16,
        }}
      />
    </Container>
  );
};
