import React, { useMemo } from 'react';
import { Pressable, RefreshControl, View } from 'react-native';

import { Container } from '@components/container';
import { PreviousLaunch } from '@features/home/components/previous-carousel/components/previous-launch';
import { Launch } from '@features/home/hooks/types';
import { usePreviousLaunches } from '@features/home/hooks/use-previous-launches';
import { RootStackParams } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParams, 'previous-launches'>;

export const PreviousLaunchesScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const {
    data: docs,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    isFetching,
  } = usePreviousLaunches();

  const data = useMemo(() => {
    return docs?.pages?.flat().map((doc) => doc.data() as Launch);
  }, [docs]);

  const renderItem = ({ item }: { item: Launch }) => {
    return (
      <Animated.View entering={FadeIn}>
        <Pressable
          onPress={() =>
            navigation.navigate('launch-detail', {
              launch: item,
            })
          }
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
        estimatedItemSize={207}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{
          paddingTop: 56,
          paddingBottom: insets.bottom + 16,
        }}
        onEndReached={handleGetNextPage}
      />
    </Container>
  );
};
