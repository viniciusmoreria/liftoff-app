import { PurchasesContext } from '@modules/purchases/context/purchases-context';
import { useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, {
  CustomerInfo,
  LOG_LEVEL,
  PurchasesOffering,
  PurchasesPackage,
} from 'react-native-purchases';

type PurchasesProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const androidApiKey = process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID!;
const iosApiKey = process.env.EXPO_PUBLIC_REVENUE_CAT_IOS!;

export const PurchasesProvider = ({ children }: PurchasesProviderProps) => {
  const [initialized, setInitialized] = useState(false);
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>();

  const getOfferings = async () => {
    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings.current;
    setOffering(currentOffering);
  };

  const init = async () => {
    Purchases.configure({
      apiKey: Platform.OS === 'android' ? androidApiKey : iosApiKey,
    });

    if (__DEV__) {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    }

    await getOfferings();

    Purchases.addCustomerInfoUpdateListener((customerInfo) => {
      setCustomerInfo(customerInfo);
    });

    setInitialized(true);
  };

  const purchasePackage = async (purchasedPackage: PurchasesPackage) => {
    const result = await Purchases.purchasePackage(purchasedPackage);
    return result;
  };

  const getCustomerInfo = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    setCustomerInfo(customerInfo);
  };

  const checkIfUserIsSubscribed = async () => {
    if (!initialized || !customerInfo) return;
    const isPro = customerInfo.activeSubscriptions.length > 0;
    setIsSubscribed(isPro);
  };

  const getNonSubscriptionPurchase = async (identifier: string) => {
    if (!initialized || !customerInfo) return null;

    const item = customerInfo.nonSubscriptionTransactions.find(
      (t) => t.productIdentifier === identifier
    );

    return item;
  };

  const restore = async () => {
    await Purchases.restorePurchases();
  };

  useEffect(() => {
    init();
    getCustomerInfo();
  }, []);

  useEffect(() => {
    checkIfUserIsSubscribed();
  }, [initialized, customerInfo]);

  const contextValue = useMemo(
    () => ({
      currentOffering: offering,
      restore,
      purchasePackage,
      customerInfo,
      isSubscribed,
      getNonSubscriptionPurchase,
    }),
    [offering, purchasePackage, customerInfo, isSubscribed, getNonSubscriptionPurchase, restore]
  );

  if (!initialized) {
    return null;
  }

  return <PurchasesContext.Provider value={contextValue}>{children}</PurchasesContext.Provider>;
};
