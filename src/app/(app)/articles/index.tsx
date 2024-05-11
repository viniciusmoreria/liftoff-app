import { formatRelativeDate } from '@libs/utils/formatRelativeDate';
import { Article } from '@modules/articles/data/repository/getArticles';
import { useArticles } from '@modules/articles/domain/useCases/getArticles';
import { ImageLoader, Text } from '@modules/components';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { Stack, router } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const renderItem = ({ item }: { item: Article }) => {
  const article = item;

  return (
    <TouchableWithoutFeedback onPress={() => router.push(`/articles/${article.id}`)}>
      <View key={item.id} style={styles.articleContainer}>
        <View style={styles.articleContent}>
          <Text text={article?.title} size="xs" numberOfLines={4} style={styles.flexText} />
          <Text text={formatRelativeDate(article.published_at)} size="xxs" weight="semiBold" />
        </View>

        <ImageLoader
          source={article.image_url}
          style={styles.articleImage}
          borderRadius={spacing.lg}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function PreviousLaunches() {
  const { articles, refetchArticles, isFetchingNextPage, isFetching, fetchNextPage } =
    useArticles();

  const handleGetNextPage = () => {
    if (!isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Articles',
          headerShown: true,
        }}
      />
      <FlatList
        data={articles}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor="white"
            colors={['#000']}
            onRefresh={refetchArticles}
          />
        }
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.content}
        onEndReached={handleGetNextPage}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xs,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingTop: spacing.lg,
    rowGap: spacing.xs,
  },
  flexText: {
    flex: 1,
  },
  articleImage: {
    height: 140,
    width: 140,
    borderRadius: spacing.lg,
  },
  articleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.borderDim,
    padding: spacing.lg,
    borderRadius: spacing.lg,
    columnGap: spacing.md,
  },
  articleContent: {
    flex: 1,
  },
});
