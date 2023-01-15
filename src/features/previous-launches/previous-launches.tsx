import React, { useMemo } from 'react';
import { Pressable, RefreshControl, View, useWindowDimensions } from 'react-native';

import { Container } from '@components/container';
import { PreviousLaunch } from '@features/home/components/previous-carousel/components/previous-launch';
import { Launch } from '@features/home/hooks/types';
import { usePreviousLaunches } from '@features/home/hooks/use-previous-launches';
import { useAnalytics } from '@libs/firebase/analytics/use-analytics';
import { getAdUnitId, insertAdsToArray, isIOS } from '@libs/utilities';
import { RootStackParams } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { BannerAd } from 'react-native-google-mobile-ads';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParams, 'previous-launches'>;

export const PreviousLaunchesScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const { logEvent } = useAnalytics();
  const {
    data: docs,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    isFetching,
  } = usePreviousLaunches();

  const { width: windowWidth } = useWindowDimensions();

  const width = windowWidth - 32;

  const data = useMemo(() => {
    return insertAdsToArray({
      array: docs?.pages?.flat().map((doc) => doc.data()) ?? [],
      interval: 5,
    });
  }, [docs?.pages]);

  const renderItem = ({ item }: { item: Launch }) => {
    return (
      <Animated.View entering={FadeIn}>
        <Pressable
          onPress={() => {
            logEvent('launch_detail', { launch: item.name });
            navigation.navigate('launch-detail', {
              launch: item,
            });
          }}
        >
          <PreviousLaunch launch={item} />
        </Pressable>
      </Animated.View>
    );
  };

  const handleGetNextPage = () => {
    if (!isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  const bannerAdSize = useMemo(() => {
    const height = 224;
    return `${Math.floor(width)}x${height}`;
  }, [width]);

  return (
    <Container>
      <FlashList
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
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          if (item.type === 'ad') {
            return (
              <View className="px-4">
                <View className="bg-secondary rounded-lg h-56 overflow-hidden">
                  <BannerAd unitId={getAdUnitId()} size={bannerAdSize} />
                </View>
              </View>
            );
          }
          return renderItem({ item: item as Launch });
        }}
        keyExtractor={(item) => String(item.id)}
        estimatedItemSize={207}
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
