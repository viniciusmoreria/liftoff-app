import React from 'react';

import { useDripsyTheme } from 'dripsy';
import { FlatList, StatusBar } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import { useArticles } from '@hooks/useArticles';
import type { ArticleProps } from '@types';

export default function Articles() {
  const { theme } = useDripsyTheme();

  const {
    data: articles,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useArticles();

  const [isHeaderVisible, setIsHeaderVisible] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleGetNextPage = React.useCallback(() => {
    if (
      articles?.pages[articles?.pages.length - 1].length === 0 ||
      isFetchingNextPage
    ) {
      return;
    }

    const newPageValue = page + 20;

    fetchNextPage({ pageParam: newPageValue });
    setPage(newPageValue);
  }, [articles?.pages, fetchNextPage, isFetchingNextPage, page]);

  const handleRefreshArticles = React.useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  const articlesData = React.useMemo(() => {
    const dataArr = articles?.pages.flat();

    dataArr?.unshift({
      id: String(Math.random()),
    } as ArticleProps);

    return dataArr;
  }, [articles?.pages]);

  if (!articlesData?.length && !isLoading) {
    return (
      <Atoms.Box
        sx={{
          mt: '36px',
          pl: '24px',
        }}
      >
        <Molecules.SectionTitle title="News" />

        <Atoms.Text variant="text-xs" sx={{ color: 'white', mt: '10px' }}>
          Something went wrong while fetching the recent news, please try again
          later
        </Atoms.Text>
      </Atoms.Box>
    );
  }

  const renderItem = ({
    item: article,
    index,
  }: {
    item: ArticleProps;
    index: number;
  }) => {
    if (index === 0) {
      return (
        <Animated.View
          entering={FadeIn.delay(150)}
          style={{ paddingHorizontal: 24 }}
        >
          <Atoms.Text
            variant="text-2xl"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mt: '16px',
              mb: '24px',
            }}
          >
            {isHeaderVisible ? ' ' : "What's new?"}
          </Atoms.Text>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        key={article.id}
        entering={FadeIn}
        style={{ paddingHorizontal: 24 }}
      >
        <Molecules.Article article={article} onDailyFeed />
      </Animated.View>
    );
  };

  return (
    <Atoms.Box sx={{ flex: 1, bg: 'background' }}>
      <StatusBar
        backgroundColor={
          isHeaderVisible ? theme.colors.secondary : 'transparent'
        }
      />

      <FlatList
        data={articlesData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onEndReached={handleGetNextPage}
        onEndReachedThreshold={0.5}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        removeClippedSubviews
        refreshing={isRefreshing}
        onRefresh={handleRefreshArticles}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 120,
        }}
        ListHeaderComponent={
          <Molecules.Header title="Daily feed" showTitle={isHeaderVisible} />
        }
        ListEmptyComponent={<Molecules.Loading />}
        stickyHeaderIndices={[0]}
        onScroll={({ nativeEvent: { contentOffset } }) => {
          if (contentOffset.y > 35) {
            setIsHeaderVisible(true);
          }

          if (contentOffset.y < 35) {
            setIsHeaderVisible(false);
          }
        }}
      />
    </Atoms.Box>
  );
}
