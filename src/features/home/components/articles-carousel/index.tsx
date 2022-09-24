import React, { useMemo, useRef } from 'react';
import { Animated, Text, View, useWindowDimensions } from 'react-native';

import { ArticleQueryCacheType, Article as ArticleType } from '@features/home/hooks/types';
import { ARTICLES_QUERY_KEY } from '@features/home/hooks/use-articles';
import { FlashList } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import Reanimated, { FadeIn } from 'react-native-reanimated';

import { Pagination } from '../pagination';
import { Article } from './components/article';

const SPACING = 18;

export const ArticlesCarousel = () => {
  const queryClient = useQueryClient();
  const articles = queryClient.getQueryData<ArticleQueryCacheType>([ARTICLES_QUERY_KEY]);

  const { width: windowWidth } = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current;

  const width = windowWidth - SPACING * 2;

  const renderItem = ({ item }: { item: ArticleType }) => {
    return <Article article={item} />;
  };

  const data = useMemo(() => {
    return articles?.pages
      ?.flat()
      .slice(0, 5)
      .map((article) => article);
  }, [articles]);

  if (!data) {
    return null;
  }

  return (
    <Reanimated.View entering={FadeIn} className="mt-0">
      <View className="flex-row justify-between mb-4 px-4">
        <Text className="text-sm font-bold text-white">News</Text>
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
