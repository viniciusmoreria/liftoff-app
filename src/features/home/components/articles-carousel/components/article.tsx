import { useState } from 'react';
import { Image, Text, View, useWindowDimensions } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Article as ArticleType } from '@features/home/hooks/types';
import { formatRelativeDate } from '@libs/utilities';
import { Skeleton } from 'moti/skeleton';

const SPACING = 18;

export const Article = ({ article }: { article: ArticleType }) => {
  const { width: windowWidth } = useWindowDimensions();
  const width = windowWidth - SPACING * 2;

  const [hasLoadedImage, setHasLoadedImage] = useState(false);

  return (
    <View
      className="flex-row bg-secondary rounded-lg overflow-hidden"
      style={{ width, marginHorizontal: SPACING }}
    >
      <View className="rounded-t-lg h-32 w-28">
        <Skeleton show={!hasLoadedImage} width="100%" radius={0}>
          <Image
            source={{ uri: article.imageUrl }}
            className="h-32 w-28"
            accessibilityLabel={`Published image of the article: ${article.title}`}
            onLoadEnd={() => setHasLoadedImage(true)}
          />
        </Skeleton>
      </View>

      <View className="flex-1 justify-between p-4">
        <Text className="text-white text-xs font-bold" numberOfLines={3}>
          {article.title}
        </Text>

        <View className="flex-row w-full items-center justify-between">
          <View className="flex-1 flex-row items-center">
            <Feather name="clock" color="white" />

            <Text className="text-white text-[9px] font-semibold ml-1">
              {formatRelativeDate(article.publishedAt)}
            </Text>
          </View>

          <Text className="text-white text-[9px] font-semibold ml-1">{article.newsSite}</Text>
        </View>
      </View>
    </View>
  );
};
