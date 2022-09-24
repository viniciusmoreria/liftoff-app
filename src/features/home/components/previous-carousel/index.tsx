import React, { useMemo, useRef } from 'react';
import { Animated, Pressable, Text, View, useWindowDimensions } from 'react-native';

import { Launch, PreviousQueryCacheType } from '@features/home/hooks/types';
import { PREVIOUS_LAUNCHES_QUERY_KEY } from '@features/home/hooks/use-previous-launches';
import { FlashList } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import Reanimated, { FadeIn } from 'react-native-reanimated';

import { Pagination } from '../pagination';
import { PreviousLaunch } from './components/previous-launch';

const SPACING = 32;

type Props = {
  navigateToLaunchDetail: (launch: Launch) => void;
};

export const PreviousCarousel = ({ navigateToLaunchDetail }: Props) => {
  const queryClient = useQueryClient();
  const docs = queryClient.getQueryData<PreviousQueryCacheType>([PREVIOUS_LAUNCHES_QUERY_KEY]);

  const { width: windowWidth } = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current;

  const width = windowWidth - SPACING * 2;

  const renderItem = ({ item }: { item: Launch }) => {
    return (
      <Pressable onPress={() => navigateToLaunchDetail(item)}>
        <PreviousLaunch launch={item} />
      </Pressable>
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
