import { createContext } from 'react';
import {
  CustomerInfo,
  MakePurchaseResult,
  PurchasesOffering,
  PurchasesPackage,
  PurchasesStoreTransaction,
} from 'react-native-purchases';

export type PurchasesContextProps = {
  currentOffering: PurchasesOffering | null;
  purchasePackage: (packageToPurchase: PurchasesPackage) => Promise<MakePurchaseResult>;
  customerInfo?: CustomerInfo;
  isSubscribed: boolean;
  getNonSubscriptionPurchase: (
    identifier: string
  ) => Promise<PurchasesStoreTransaction | null | undefined>;
  restore: () => Promise<void>;
};

export const PurchasesContext = createContext<PurchasesContextProps | null>(null);
