import { Ionicons } from '@expo/vector-icons';
import { formatters } from '@libs/utils/formatters';
import { extractLaunchData } from '@libs/utils/launches';
import { ImageLoader, Text } from '@modules/components';
import { usePreviousLaunches } from '@modules/launches/previous/domain/useCases/getPreviousLaunches';
import { Launch } from '@modules/launches/upcoming/data/repository/fetchUpcomingLaunches';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { format } from 'date-fns';
import { router } from 'expo-router';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';

const PAGE_WIDTH = Dimensions.get('window').width - spacing.md;

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

export const PreviousBadge = () => {
  const { previousFiveLaunches } = usePreviousLaunches();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text text="Previous" size="md" weight="semiBold" />

        <TouchableWithoutFeedback onPress={() => router.push('/launches/previous')} hitSlop={15}>
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
        data={previousFiveLaunches}
        renderItem={renderItem}
        style={{ width: PAGE_WIDTH }}
        height={255}
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
  launchContainer: {
    overflow: 'hidden',
    backgroundColor: colors.borderDim,
    borderRadius: spacing.lg,
    rowGap: spacing.xs,
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
  launchImage: {
    height: 150,
    borderBottomRightRadius: spacing.lg,
    borderBottomLeftRadius: spacing.lg,
  },
  launchContent: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    rowGap: spacing.xxs,
  },
});
