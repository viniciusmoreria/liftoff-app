import React, { useMemo } from 'react';
import { Pressable, RefreshControl, View } from 'react-native';

import { Container } from '@components/container';
import { Article } from '@features/home/components/articles-carousel/components/article';
import { Article as ArticleType } from '@features/home/hooks/types';
import { useArticles } from '@features/home/hooks/use-articles';
import { RootStackParams } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParams, 'news'>;

export const NewsScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const { data: articles, fetchNextPage, refetch, isFetchingNextPage, isFetching } = useArticles();

  const data = useMemo(() => {
    return articles?.pages?.flat().map((article) => article);
  }, [articles]);

  const renderItem = ({ item }: { item: ArticleType }) => {
    return (
      <Animated.View entering={FadeIn}>
        <Pressable
          onPress={() =>
            navigation.navigate('news-detail', {
              article: item,
            })
          }
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
    <Container
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
    >
      <FlashList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        estimatedItemSize={143}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{
          paddingTop: 48,
          paddingBottom: insets.bottom + 16,
        }}
        onEndReached={handleGetNextPage}
      />
    </Container>
  );
};
