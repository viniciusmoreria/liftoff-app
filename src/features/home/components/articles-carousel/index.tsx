import React, { useMemo, useRef } from 'react';
import { Animated, Pressable, Text, View, useWindowDimensions } from 'react-native';

import { Article as ArticleType } from '@features/home/hooks/types';
import { useArticles } from '@features/home/hooks/use-articles';
import { getAdUnitId, insertAdsToArray } from '@libs/utilities';
import { FlashList } from '@shopify/flash-list';
import { BannerAd } from 'react-native-google-mobile-ads';
import Reanimated, { FadeIn } from 'react-native-reanimated';

import { Pagination } from '../pagination';
import { Article } from './components/article';

const SPACING = 18;

type Props = {
  navigateToNews: () => void;
  navigateToNewsDetail: (article: ArticleType) => void;
};

export const ArticlesCarousel = ({ navigateToNews, navigateToNewsDetail }: Props) => {
  const { data: articles } = useArticles();

  const { width: windowWidth } = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current;

  const width = windowWidth - SPACING * 2;

  const renderItem = ({ item }: { item: ArticleType }) => {
    return (
      <Pressable onPress={() => navigateToNewsDetail(item)}>
        <Article article={item} />
      </Pressable>
    );
  };

  const data = useMemo(() => {
    return insertAdsToArray({
      array:
        articles?.pages
          ?.flat()
          .slice(0, 6)
          .map((article) => article) ?? [],
      interval: 2,
    }).slice(0, 6);
  }, [articles]);

  return (
    <Reanimated.View entering={FadeIn} className="mt-0">
      <View className="flex-row justify-between mb-4 px-4">
        <Text className="text-sm font-bold text-white">News</Text>
        <Pressable onPress={navigateToNews}>
          <Text className="text-sm font-bold text-white">See all</Text>
        </Pressable>
      </View>

      <FlashList
        data={data ?? []}
        renderItem={({ item }) => {
          if (item.type === 'ad') {
            return (
              <View
                className="bg-secondary rounded-lg h-32 overflow-hidden"
                style={{ width, marginHorizontal: SPACING }}
              >
                <BannerAd unitId={getAdUnitId()} size={`${windowWidth}x128`} />
              </View>
            );
          }
          return renderItem({ item: item as ArticleType });
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
