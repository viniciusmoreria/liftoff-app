import { formatters } from '@libs/utils/formatters';
import { extractLaunchData } from '@libs/utils/launches';
import { Text } from '@modules/components';
import { Launch } from '@modules/launches/upcoming/data/repository/fetchUpcomingLaunches';
import { useUpcomingLaunches } from '@modules/launches/upcoming/domain/useCases/getUpcomingLaunches';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { format } from 'date-fns';
import { Stack, router } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const renderItem = ({ item }: { item: Launch }) => {
  const launch = item;

  const { launchName, padLocation, rocketName } = extractLaunchData({ launch });

  return (
    <TouchableWithoutFeedback onPress={() => router.push(`/launches/${launch?.id}`)}>
      <View key={item.id} style={styles.launchContainer}>
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
    </TouchableWithoutFeedback>
  );
};

export default function UpcomingLaunches() {
  const { upcomingLaunches, refetchUpcomingLaunches } = useUpcomingLaunches();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Upcoming',
          headerShown: true,
        }}
      />
      <FlatList
        data={upcomingLaunches}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor="white"
            colors={['#000']}
            onRefresh={refetchUpcomingLaunches}
          />
        }
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.content}
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
    padding: spacing.lg,
    borderRadius: spacing.lg,
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
