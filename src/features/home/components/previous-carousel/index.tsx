import { useMemo, useRef } from 'react';
import { Animated, Pressable, Text, View, useWindowDimensions } from 'react-native';

import { Launch } from '@features/home/hooks/types';
import { usePreviousLaunches } from '@features/home/hooks/use-previous-launches';
import { getAdUnitId, insertAdsToArray } from '@libs/utilities';
import { FlashList } from '@shopify/flash-list';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
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
    return insertAdsToArray({
      array:
        docs?.pages
          ?.flat()
          .slice(0, 6)
          .map((doc) => doc.data()) ?? [],
      interval: 2,
    }).slice(0, 6);
  }, [docs?.pages]);

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
        renderItem={({ item }) => {
          if (item.type === 'ad') {
            return (
              <View
                className="bg-secondary rounded-lg h-56 overflow-hidden"
                style={{ width, marginHorizontal: SPACING }}
              >
                <BannerAd unitId={getAdUnitId()} size={BannerAdSize.INLINE_ADAPTIVE_BANNER} />
              </View>
            );
          }
          return renderItem({ item: item as Launch });
        }}
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
