import React, { useRef } from 'react';
import { Animated, Pressable, Text, View, useWindowDimensions } from 'react-native';

import { ProgressBar } from '@components/progress-bar';
import { Launch } from '@features/home/hooks/types';
import { UPCOMING_LAUNCHES_QUERY_KEY } from '@features/home/hooks/use-upcoming-launches';
import { FlashList } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import Reanimated, { FadeIn } from 'react-native-reanimated';

import { Pagination } from '../pagination';

const SPACING = 18;

type Props = {
  navigateToLaunchDetail: (launch: Launch) => void;
};

export const UpcomingCarousel = ({ navigateToLaunchDetail }: Props) => {
  const queryClient = useQueryClient();
  const launches = queryClient.getQueryData<Launch[]>([UPCOMING_LAUNCHES_QUERY_KEY]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  const width = windowWidth - SPACING * 2;

  const renderItem = ({ item }: { item: Launch }) => {
    const hasLiftoff = new Date(item.net) < new Date();
    return (
      <Pressable onPress={() => navigateToLaunchDetail(item)}>
        <View
          className="bg-secondary p-4 rounded-lg h-24 overflow-hidden"
          style={{ width, marginHorizontal: SPACING }}
        >
          <View className="flex-1 flex-row items-center">
            <View className="items-center">
              <Text className="text-white text-xs font-bold">
                {format(new Date(item.net), 'H:mm')}
              </Text>
              <Text className="text-gray text-xs mt-2">{format(new Date(item.net), 'MMM d')}</Text>
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
              <View>
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
      </Pressable>
    );
  };

  const data = launches?.filter((launch) => new Date(launch.net) > new Date()) ?? [];

  return (
    <Reanimated.View entering={FadeIn} className="mt-12">
      <View className="flex-row justify-between mb-4 px-4">
        <Text className="text-sm font-bold text-white">Upcoming</Text>
        <Text className="text-sm font-bold text-white">See all</Text>
      </View>

      <FlashList
        data={data?.slice(0, 5)}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        bounces={false}
        snapToInterval={width + SPACING * 2}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        estimatedItemSize={343}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
      />

      <View className="mt-14">
        <Pagination
          marginHorizontal={8}
          data={data?.slice(0, 5) ?? []}
          scrollX={scrollX}
          dotSize={5}
        />
      </View>
    </Reanimated.View>
  );
};
