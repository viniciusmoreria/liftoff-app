import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';

import { Feather, Ionicons } from '@expo/vector-icons';
import { useAnalytics } from '@libs/firebase/analytics/use-analytics';
import { formatRelativeDate } from '@libs/utilities';
import { RootStackParams } from '@navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { Skeleton } from 'moti/skeleton';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParams, 'news-detail'>;

export const NewsDetailScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const { logEvent } = useAnalytics();
  const { params } = useRoute<RouteProp<RootStackParams, 'news-detail'>>();
  const { article } = params;

  const [hasLoadedImage, setHasLoadedImage] = useState(false);

  return (
    <ScrollView
      className="bg-dark"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
      }}
    >
      <StatusBar backgroundColor="transparent" />

      <Pressable
        onPress={navigation.goBack}
        className="bg-dark absolute top-12 left-4 z-10 p-1 rounded-md"
      >
        <Ionicons name="chevron-back" color="#fff" size={28} />
      </Pressable>

      <View>
        <Skeleton show={!hasLoadedImage}>
          <FastImage
            source={{
              uri: article.imageUrl,
            }}
            style={{
              height: Dimensions.get('screen').height / 2,
              opacity: 0.5,
            }}
            onLoadEnd={() => setHasLoadedImage(true)}
            accessibilityLabel={`Published image of the article: ${article.title}`}
          />
        </Skeleton>

        <View className="absolute px-4 bottom-14">
          <Text className="text-white font-bold text-3xl">{article.title}</Text>
        </View>
      </View>

      <View className="bg-dark -mt-4 rounded-t-3xl w-full">
        <View className="flex mt-6 px-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center justify-between h-8">
              <Feather name="clock" color="white" />
              <Text className="text-white text-sm ml-1 leading-3">
                {formatRelativeDate(article.publishedAt)}
              </Text>
            </View>

            <Text className="text-white text-sm">{article.newsSite}</Text>
          </View>

          <View className="mt-10">
            <Text className="text-white text-sm">{article.summary}</Text>
          </View>

          <Pressable
            onPress={() => {
              logEvent('open_external_link', { url: article.url });
              WebBrowser.openBrowserAsync(article.url, {
                readerMode: true,
              });
            }}
            className="bg-secondary w-full p-4 rounded-lg items-center mt-16"
          >
            <Text className="text-white font-bold text-md">
              Continue reading on {article.newsSite}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
