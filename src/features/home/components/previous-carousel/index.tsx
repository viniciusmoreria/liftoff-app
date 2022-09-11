import React, { useMemo, useRef } from 'react';
import { Animated, Image, Text, View, useWindowDimensions } from 'react-native';

import { Launch } from '@features/home/hooks/types';
import { usePreviousLaunches } from '@features/home/hooks/use-previous-launches';
import { FlashList } from '@shopify/flash-list';
import { format } from 'date-fns';
import Reanimated, { FadeIn } from 'react-native-reanimated';

import { Pagination } from '../pagination';

const SPACING = 32;

export const PreviousCarousel = () => {
  const { data: docs } = usePreviousLaunches();

  const { width: windowWidth } = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current;

  const width = windowWidth - SPACING * 2;

  const renderItem = ({ item }: { item: Launch }) => {
    return (
      <View className="bg-secondary rounded-lg" style={{ width, marginHorizontal: SPACING }}>
        <Image
          source={{ uri: item.image }}
          className="h-32 rounded-t-lg"
          accessibilityLabel={`${item.name} launch image`}
        />
        <View className="h-24 p-4">
          <View className="flex-1 flex-row items-center">
            <View className="items-center">
              <Text className="text-white text-xs font-bold">
                {format(new Date(item.net), 'p')}
              </Text>
              <Text className="text-gray text-xs mt-2">{format(new Date(item.net), 'MMM do')}</Text>
            </View>
            <View className="h-full mx-4 w-px bg-dark" />
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
        </View>
      </View>
    );
  };

  const data = useMemo(() => {
    return docs?.pages?.flat().map((doc) => doc.data() as Launch);
  }, [docs]);

  if (!data) {
    return null;
  }

  return (
    <Reanimated.View entering={FadeIn} className="mt-0">
      <View className="flex-row justify-between mb-4 px-8">
        <Text className="text-sm font-bold text-white">Recent</Text>
        <Text className="text-sm font-bold text-white">See all</Text>
      </View>

      <FlashList
        data={data ?? []}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        bounces={false}
        snapToInterval={width + SPACING * 2}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={375}
        keyExtractor={(item) => String(item.id)}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
      />

      <View className="mt-14">
        <Pagination marginHorizontal={8} data={data ?? []} scrollX={scrollX} dotSize={5} />
      </View>
    </Reanimated.View>
  );
};
