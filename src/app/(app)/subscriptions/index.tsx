import { SpaceManAnimation } from '@assets/animations';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAnalytics } from '@libs/firebase/analytics';
import { Logger } from '@libs/logger';
import { formatters } from '@libs/utils/formatters';
import { Text } from '@modules/components';
import { usePurchases } from '@modules/purchases/hooks/usePurchases';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { PRODUCT_CATEGORY, PurchasesPackage } from 'react-native-purchases';
import Carousel from 'react-native-reanimated-carousel';
import { Skottie } from 'react-native-skottie';

const PAGE_WIDTH = Dimensions.get('window').width - spacing.md;

export default function Subscriptions() {
  const { logEvent } = useAnalytics();
  const { currentOffering, purchasePackage, restore } = usePurchases();

  const filteredPackages = currentOffering?.availablePackages.filter(
    (item) => item.product.productCategory === PRODUCT_CATEGORY.SUBSCRIPTION
  );

  const handlePurchasePackage = async (selectedPackage: PurchasesPackage) => {
    if (!selectedPackage) return;

    try {
      const result = await purchasePackage(selectedPackage);
      logEvent('purchase_result', { result });
      router.back();
    } catch (error) {
      Logger.error({
        domain: 'Subscriptions',
        error,
        name: 'PurchasePackagesError',
        severity: 'error',
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <Ionicons
        name="close-circle"
        color={colors.text}
        size={26}
        style={styles.closeIcon}
        onPress={() => router.dismiss()}
      />
      <View style={styles.content}>
        <Skottie source={SpaceManAnimation} autoPlay style={styles.lottie} loop />

        <Text
          text="Support Liftoff and Keep Us Soaring!"
          weight="semiBold"
          size="xl"
          textAlign="center"
        />

        <Text
          text="Liftoff is a one-person project dedicated to providing the most accurate and up-to-date information on rocket launches."
          size="sm"
          textAlign="center"
          color={colors.textDim}
        />

        <PackagesCarousel
          packages={filteredPackages}
          handlePurchasePackage={handlePurchasePackage}
          metadata={currentOffering?.metadata as PackageMetadata}
        />

        <View style={styles.flexRowAlign}>
          <TouchableWithoutFeedback onPress={restore}>
            <Text text="Restore" textAlign="center" size="xxs" />
          </TouchableWithoutFeedback>

          <MaterialIcons name="circle" color={colors.textDim} size={6} />

          <TouchableWithoutFeedback
            onPress={() => {
              WebBrowser.openBrowserAsync('https://liftoffprivacypolicy.carrd.co/');
            }}>
            <Text text="Privacy" textAlign="center" size="xxs" />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
}

type Subscription = {
  title: string;
  description: string;
  tag: string;
  identifier: string;
  cycles: number;
  discount?: string;
};

type PackageMetadata = {
  subscriptions: {
    ios: Subscription[];
    android: Subscription[];
  };
};

type PackagesCarouselProps = {
  packages?: PurchasesPackage[];
  metadata: PackageMetadata;
  handlePurchasePackage: (purchasesPackage: PurchasesPackage) => void;
};

const PackagesCarousel = (props: PackagesCarouselProps) => {
  const { packages, metadata, handlePurchasePackage } = props;

  const subscriptions = metadata.subscriptions[Platform.OS === 'ios' ? 'ios' : 'android'];

  const renderItem = ({ item }: { item: PurchasesPackage }) => {
    const packageMetadata = subscriptions.find((s) => s.identifier === item.product.identifier);

    if (!packageMetadata) return <View />;

    const isYearlySubscription = item.product.subscriptionPeriod === 'P1Y';

    const itemPrice = formatters.formatToCurrency(
      item.product.price / packageMetadata?.cycles,
      item.product.currencyCode
    );

    return (
      <View style={styles.product}>
        <Text text={packageMetadata.tag} size="xxs" style={styles.badge} />
        <Text size="md" weight="semiBold" text={packageMetadata.title} />
        <Text size="xs" text={packageMetadata.description} />
        {isYearlySubscription ? (
          <View>
            <View style={styles.flexRow}>
              <Text weight="semiBold" text={itemPrice} />
              <Text weight="semiBold" text="/ month" />
            </View>

            <View style={styles.flexRow}>
              <Text size="xxs" color={colors.textDim} text={item.product.priceString} />
              <Text size="xxs" color={colors.textDim} text="billed annually" />
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.flexRow}>
              <Text weight="semiBold" text={itemPrice} />
              <Text weight="semiBold" text="/ month" />
            </View>

            <View style={styles.flexRow}>
              <Text color={colors.textDim} text="" />
            </View>
          </View>
        )}

        <Pressable style={styles.button} onPress={() => handlePurchasePackage(item)}>
          <Text text="Continue" size="xs" weight="semiBold" textAlign="center" />
        </Pressable>
      </View>
    );
  };

  if (!packages) return null;

  return (
    <Carousel
      data={packages}
      renderItem={renderItem}
      style={{ width: PAGE_WIDTH }}
      height={320}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: spacing.safeAreaTop,
    paddingHorizontal: spacing.xs,
    backgroundColor: colors.background,
    paddingBottom: spacing.safeAreaBottom + spacing.lg,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    rowGap: spacing.sm,
  },
  flexText: {
    flex: 1,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    paddingTop: spacing.xs,
    paddingRight: spacing.xs,
  },
  lottie: {
    width: 135,
    height: 135,
  },
  product: {
    flex: 1,
    backgroundColor: colors.borderDim,
    padding: spacing.lg,
    borderRadius: spacing.lg,
    rowGap: spacing.sm,
  },
  badge: {
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    backgroundColor: colors.background,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.xs,
    borderRadius: spacing.xs,
  },
  button: {
    marginTop: spacing.md,
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    columnGap: spacing.xxs,
  },
  flexRowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: spacing.xs,
  },
});
