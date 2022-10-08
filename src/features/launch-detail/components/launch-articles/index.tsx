import React, { useMemo, useRef } from 'react';
import { Animated, Pressable, View, useWindowDimensions } from 'react-native';

import { Article } from '@features/home/components/articles-carousel/components/article';
import { Pagination } from '@features/home/components/pagination';
import { Article as ArticleType } from '@features/home/hooks/types';
import { useLaunchArticles } from '@features/launch-detail/hooks/use-launch-articles';
import { FlashList } from '@shopify/flash-list';
import Reanimated, { FadeIn } from 'react-native-reanimated';

const SPACING = 18;

type Props = {
  launchId: string;
  navigateToNewsDetail: (article: ArticleType) => void;
};

export const LaunchArticles = ({ launchId, navigateToNewsDetail }: Props) => {
  const { data: articles } = useLaunchArticles({
    launchId,
  });

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
    return articles?.pages
      ?.flat()
      .slice(0, 5)
      .map((article) => article);
  }, [articles]);

  if (!data?.length) {
    return null;
  }

  return (
    <Reanimated.View entering={FadeIn} className="mt-6">
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

      {data?.length > 1 && (
        <View className="mt-14">
          <Pagination marginHorizontal={8} data={data ?? []} scrollX={scrollX} dotSize={5} />
        </View>
      )}
    </Reanimated.View>
  );
};
