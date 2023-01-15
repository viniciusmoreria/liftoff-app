import React, { useMemo } from 'react';
import { Pressable, RefreshControl, Text, View, useWindowDimensions } from 'react-native';

import { Container } from '@components/container';
import { ProgressBar } from '@components/progress-bar';
import { Launch } from '@features/home/hooks/types';
import { useUpcomingLaunches } from '@features/home/hooks/use-upcoming-launches';
import { useAnalytics } from '@libs/firebase/analytics/use-analytics';
import { getAdUnitId, insertAdsToArray, isIOS } from '@libs/utilities';
import { RootStackParams } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { format } from 'date-fns';
import { BannerAd } from 'react-native-google-mobile-ads';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParams, 'upcoming-launches'>;

export const UpcomingLaunchesScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const { logEvent } = useAnalytics();
  const { data: launches, refetch } = useUpcomingLaunches();

  const { width: windowWidth } = useWindowDimensions();

  const width = windowWidth - 32;

  const data = useMemo(() => {
    return insertAdsToArray({
      array: launches?.filter((launch) => new Date(launch.net) > new Date()) ?? [],
      interval: 5,
    });
  }, [launches]);

  const renderItem = ({ item }: { item: Launch }) => {
    const hasLiftoff = new Date(item.net) < new Date();
    return (
      <Pressable
        onPress={() => {
          logEvent('launch_detail', { launch: item.name });
          navigation.navigate('launch-detail', {
            launch: item,
          });
        }}
      >
        <Animated.View entering={FadeIn} className="px-4">
          <View className="bg-secondary p-4 rounded-lg h-24 w-full overflow-hidden">
            <View className="flex-1 flex-row items-center">
              <View className="items-center">
                <Text className="text-white text-xs font-bold">
                  {format(new Date(item.net), 'H:mm')}
                </Text>
                <Text className="text-gray text-xs mt-2">
                  {format(new Date(item.net), 'MMM d')}
                </Text>
              </View>
              <View className="h-full mx-3 w-px bg-dark" />
              <View className="flex-1 mr-2">
                <Text className="text-white text-xs font-bold" numberOfLines={2}>
                  {item?.mission?.name ?? item?.name}
                </Text>
                <Text className="text-gray text-xs mt-2">
                  {item?.rocket?.configuration?.full_name}
                </Text>
              </View>
              {item?.mission?.orbit?.abbrev && (
                <View className="items-end">
                  <Text className="text-white text-xs font-bold">Orbit</Text>
                  <Text className="text-gray text-xs mt-2">{item?.mission?.orbit?.abbrev}</Text>
                </View>
              )}
            </View>
            {hasLiftoff && (
              <View className="absolute bottom-0 left-0 right-0">
                <ProgressBar height={3} backgroundColor="#d83545" />
              </View>
            )}
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  const bannerAdSize = useMemo(() => {
    const height = 96;
    return `${Math.floor(width)}x${height}`;
  }, [width]);

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
        renderItem={({ item }) => {
          if (item?.type === 'ad') {
            return (
              <View className="px-4">
                <View className="bg-secondary rounded-lg h-24 w-full overflow-hidden">
                  <BannerAd unitId={getAdUnitId()} size={bannerAdSize} />
                </View>
              </View>
            );
          }
          return renderItem({ item: item });
        }}
        keyExtractor={(item) => String(item.id)}
        estimatedItemSize={110}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{
          paddingTop: isIOS ? 56 : 18,
          paddingBottom: insets.bottom + 16,
        }}
      />
    </Container>
  );
};
