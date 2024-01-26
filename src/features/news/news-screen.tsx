import React, { useMemo } from 'react';
import { Pressable, RefreshControl, View } from 'react-native';

import { Container } from '@components/container';
import { Article } from '@features/home/components/articles-carousel/components/article';
import { Article as ArticleType } from '@features/home/hooks/types';
import { useArticles } from '@features/home/hooks/use-articles';
import { useAnalytics } from '@libs/firebase/analytics/use-analytics';
import { isIOS } from '@libs/utilities';
import { RootStackParams } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParams, 'news'>;

export const NewsScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const { logEvent } = useAnalytics();
  const { data: articles, fetchNextPage, refetch, isFetchingNextPage, isFetching } = useArticles();

  const data = useMemo(() => {
    return articles?.pages.flatMap((page) => page.results);
  }, [articles]);

  const renderItem = ({ item }: { item: ArticleType }) => {
    return (
      <Animated.View entering={FadeIn}>
        <Pressable
          onPress={() => {
            logEvent('news_detail', { article: item.title, articleUrl: item.url });
            navigation.navigate('news-detail', {
              article: item,
            });
          }}
        >
          <Article article={item} />
        </Pressable>
      </Animated.View>
    );
  };

  const handleGetNextPage = () => {
    if (!isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
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
        estimatedItemSize={143}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{
          paddingTop: isIOS ? 56 : 18,
          paddingBottom: insets.bottom + 16,
        }}
        onEndReached={handleGetNextPage}
      />
    </Container>
  );
};
