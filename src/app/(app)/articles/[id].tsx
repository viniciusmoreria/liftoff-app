import { MaterialIcons } from '@expo/vector-icons';
import { estimateReadTime } from '@libs/utils/estimateReadTime';
import { formatRelativeDate } from '@libs/utils/formatRelativeDate';
import { darkBlurhash } from '@libs/utils/launches';
import { Article as ArticleType } from '@modules/articles/data/repository/getArticles';
import { ARTICLE_BY_ID_QUERY_KEY } from '@modules/articles/domain/useCases/getArticles/queries';
import { Text } from '@modules/components';
import { useQueryClient } from '@tanstack/react-query';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function Article() {
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();

  const article = queryClient.getQueryData([ARTICLE_BY_ID_QUERY_KEY, Number(id)]) as ArticleType;

  if (!article) return null;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{ title: article.news_site, headerShown: true, headerLargeTitle: false }}
      />
      <View style={styles.main}>
        <View style={styles.title}>
          <Text text={article.title} size="xl" weight="semiBold" />
          <View style={styles.flexRow}>
            <Text
              text={formatRelativeDate(article.published_at)}
              size="xs"
              color={colors.textDim}
            />
            <MaterialIcons name="circle" color={colors.textDim} size={8} />
            <Text
              text={`${estimateReadTime(article.summary).toFixed(0)} min read`}
              size="xs"
              color={colors.textDim}
            />
          </View>
        </View>

        <Image
          source={{ uri: article.image_url }}
          placeholder={darkBlurhash}
          contentFit="cover"
          transition={300}
          style={styles.articleImage}
        />

        <Text text={article.summary} size="md" />

        <Pressable
          onPress={() =>
            WebBrowser.openBrowserAsync(article.url, {
              readerMode: true,
            })
          }
          style={styles.button}>
          <Text
            text="Continue reading on the website"
            size="xs"
            weight="semiBold"
            textAlign="center"
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.xs,
    backgroundColor: colors.background,
    paddingBottom: spacing.lg,
  },
  main: {
    flex: 1,
    rowGap: spacing.xs,
  },
  title: {
    rowGap: spacing.md,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: spacing.md,
  },
  articleImage: {
    height: 220,
    borderRadius: spacing.lg,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
});
