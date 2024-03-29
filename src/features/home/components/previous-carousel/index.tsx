import { useMemo, useRef } from 'react';
import { Animated, Pressable, Text, View, useWindowDimensions } from 'react-native';

import { Launch } from '@features/home/hooks/types';
import { usePreviousLaunches } from '@features/home/hooks/use-previous-launches';
import { FlashList } from '@shopify/flash-list';
import Reanimated, { FadeIn } from 'react-native-reanimated';

import { Pagination } from '../pagination';
import { PreviousLaunch } from './components/previous-launch';

const SPACING = 18;

type Props = {
  navigateToLaunchDetail: (launch: Launch) => void;
  navigateToPreviousLaunches: () => void;
};

export const PreviousCarousel = ({ navigateToLaunchDetail, navigateToPreviousLaunches }: Props) => {
  const { data: docs } = usePreviousLaunches();

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
    return docs?.pages
      ?.flat()
      .slice(0, 5)
      .map((doc) => doc.data() as Launch);
  }, [docs]);

  if (!data) {
    return null;
  }

  return (
    <Reanimated.View entering={FadeIn} className="mt-0">
      <View className="flex-row justify-between mb-4 px-4">
        <Text className="text-sm font-bold text-white">Recent</Text>
        <Pressable onPress={navigateToPreviousLaunches}>
          <Text className="text-sm font-bold text-white">See all</Text>
        </Pressable>
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
