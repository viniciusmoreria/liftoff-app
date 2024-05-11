import { Ionicons } from '@expo/vector-icons';
import { formatRelativeDate } from '@libs/utils/formatRelativeDate';
import { Article } from '@modules/articles/data/repository/getArticles';
import { useArticles } from '@modules/articles/domain/useCases/getArticles';
import { ImageLoader, Text } from '@modules/components';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { router } from 'expo-router';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';

const PAGE_WIDTH = Dimensions.get('window').width - spacing.md;

const renderItem = ({ item }: { item: Article }) => {
  const article = item;

  return (
    <TouchableWithoutFeedback onPress={() => router.push(`/articles/${article.id}`)}>
      <View key={item.id} style={styles.articleContainer}>
        <View style={styles.articleContent}>
          <Text
            text={article?.title}
            size="xs"
            numberOfLines={4}
            weight="semiBold"
            style={styles.flexText}
          />
          <Text text={formatRelativeDate(article.published_at)} size="xxs" weight="semiBold" />
        </View>

        <ImageLoader
          style={styles.articleImage}
          source={article.image_url}
          borderRadius={spacing.lg}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export const ArticlesBadge = () => {
  const { mostRecentArticles } = useArticles();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text text="News" size="md" weight="semiBold" />

        <TouchableWithoutFeedback onPress={() => router.push('/articles/')} hitSlop={15}>
          <View style={styles.seeAll}>
            <Text text="See all" size="xxs" weight="semiBold" />

            <View style={styles.seeAllText}>
              <Ionicons
                name="chevron-forward"
                size={14}
                color={colors.text}
                style={styles.seeAllIcon}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Carousel
        data={mostRecentArticles}
        renderItem={renderItem}
        style={{ width: PAGE_WIDTH }}
        height={190}
        width={PAGE_WIDTH}
        loop={false}
        pagingEnabled
        snapEnabled
        autoPlay={false}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 45,
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.border,
    borderRadius: 24,
    overflow: 'hidden',
    paddingVertical: spacing.lg,
    marginTop: spacing.xxs,
    rowGap: spacing.xxs,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  seeAllText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.borderDim,
    height: 20,
    width: 20,
    borderRadius: 12.5,
  },
  seeAllIcon: {
    marginLeft: 2,
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
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: spacing.sm,
  },
  flexText: {
    flex: 1,
  },
  articleImage: {
    height: 140,
    width: 140,
    borderRadius: spacing.lg,
  },
});
