import { formatters } from '@libs/utils/formatters';
import { extractLaunchData } from '@libs/utils/launches';
import { ImageLoader, Text } from '@modules/components';
import { usePreviousLaunches } from '@modules/launches/previous/domain/useCases/getPreviousLaunches';
import { Launch } from '@modules/launches/upcoming/data/repository/fetchUpcomingLaunches';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { format } from 'date-fns';
import { Stack, router } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const renderItem = ({ item }: { item: Launch }) => {
  const launch = item;

  const { launchImage, launchName, padLocation, rocketName } = extractLaunchData({ launch });

  return (
    <TouchableWithoutFeedback onPress={() => router.push(`/launches/${launch?.id}`)}>
      <View key={item.id} style={styles.launchContainer}>
        <ImageLoader style={styles.launchImage} source={launchImage} />

        <View style={styles.launchContent}>
          <View style={styles.cardTitle}>
            <Text text={rocketName} weight="semiBold" />
            <Text
              text={padLocation}
              size="xxs"
              weight="semiBold"
              numberOfLines={1}
              textAlign="right"
              style={styles.flexText}
            />
          </View>
          <Text text={launchName} size="xxs" numberOfLines={1} />
          <View style={styles.flexRow}>
            <Text
              text={format(new Date(item.net), formatters.date.day_of_week)}
              size="xxs"
              weight="semiBold"
            />
            <View style={styles.flexRow}>
              <Text
                text={format(new Date(item.net), `${formatters.date.month_day}, `)}
                size="xxs"
                weight="semiBold"
              />
              <Text
                text={format(new Date(item.net), formatters.date.hour_minute)}
                size="xxs"
                weight="semiBold"
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default function PreviousLaunches() {
  const {
    previousLaunches,
    refetchPreviousLaunches,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
  } = usePreviousLaunches();

  const handleGetNextPage = () => {
    if (!isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Previous',
          headerShown: true,
        }}
      />
      <FlatList
        data={previousLaunches}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor="white"
            colors={['#000']}
            onRefresh={refetchPreviousLaunches}
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
  launchContainer: {
    backgroundColor: colors.borderDim,
    borderRadius: spacing.lg,
    rowGap: spacing.xxs,
    overflow: 'hidden',
  },
  launchImage: {
    height: 150,
    borderRadius: spacing.lg,
  },
  launchContent: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    rowGap: spacing.xxs,
  },
  cardTitle: {
    columnGap: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexText: {
    flex: 1,
  },
});
