import { Ionicons } from '@expo/vector-icons';
import { ArticlesBadge } from '@modules/articles/presentation/components/ArticlesBadge';
import { Text } from '@modules/components';
import { PreviousBadge } from '@modules/launches/previous/presentation/components/PreviousBadge';
import { useUpcomingLaunches } from '@modules/launches/upcoming/domain/useCases/getUpcomingLaunches';
import { CountdownBadge } from '@modules/launches/upcoming/presentation/components/CountdownBadge';
import { UpcomingBadge } from '@modules/launches/upcoming/presentation/components/UpcomingBadge';
import { usePurchases } from '@modules/purchases/hooks/usePurchases';
import { DrawerActions } from '@react-navigation/native';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { router, useNavigation } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

const getTimeOfTheDay = () => {
  const hour = new Date().getHours();
  return hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
};

export default function Page() {
  const { isSubscribed } = usePurchases();

  const { dispatch } = useNavigation();
  const { nextLaunch } = useUpcomingLaunches();

  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);

  return (
    <Animated.ScrollView
      entering={FadeIn}
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}>
      <View>
        <View style={styles.header}>
          <Text size="xl" text={`Good ${getTimeOfTheDay()}`} weight="semiBold" />

          <View style={styles.flexRow}>
            <TouchableWithoutFeedback onPress={() => router.push('/subscriptions/')}>
              <Ionicons
                name={isSubscribed ? 'heart-sharp' : 'heart-circle'}
                size={22}
                color={colors.text}
              />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => dispatch(DrawerActions.openDrawer())}>
              <Ionicons name="reorder-two-sharp" size={22} color={colors.text} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

      <CountdownBadge nextLaunch={nextLaunch} />

      <UpcomingBadge />

      <PreviousBadge />

      <ArticlesBadge />
    </Animated.ScrollView>
  );
}

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    scrollContainer: {
      backgroundColor: colors.background,
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: spacing.xs,
      backgroundColor: colors.background,
      paddingBottom: spacing.xl,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: insets.top,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.md,
      backgroundColor: colors.background,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
    },
  });
