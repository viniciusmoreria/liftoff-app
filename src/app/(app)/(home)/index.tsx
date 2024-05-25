import { Ionicons } from '@expo/vector-icons';
import { useAnalytics } from '@libs/firebase/analytics';
import { ArticlesBadge } from '@modules/articles/presentation/components/ArticlesBadge';
import { Text } from '@modules/components';
import { PreviousBadge } from '@modules/launches/previous/presentation/components/PreviousBadge';
import { useUpcomingLaunches } from '@modules/launches/upcoming/domain/useCases/getUpcomingLaunches';
import { CountdownBadge } from '@modules/launches/upcoming/presentation/components/CountdownBadge';
import { UpcomingBadge } from '@modules/launches/upcoming/presentation/components/UpcomingBadge';
import { useUserStore } from '@modules/user/store/user-store';
import { DrawerActions } from '@react-navigation/native';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { useNavigation } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import Animated, { FadeIn } from 'react-native-reanimated';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

const getTimeOfTheDay = () => {
  const hour = new Date().getHours();
  return hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
};

export default function Page() {
  const { enablePurchases } = useUserStore();

  const { dispatch } = useNavigation();
  const { nextLaunch } = useUpcomingLaunches();
  const { logEvent } = useAnalytics();

  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);

  async function presentPaywall() {
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall({
      displayCloseButton: true,
    });

    logEvent('present_paywall', { result: paywallResult });
  }

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
            {enablePurchases && (
              <TouchableWithoutFeedback onPress={() => presentPaywall()}>
                <Ionicons name="heart-circle" size={22} color={colors.text} />
              </TouchableWithoutFeedback>
            )}

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
