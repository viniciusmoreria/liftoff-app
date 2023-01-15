import { ComponentProps } from 'react';
import { Platform } from 'react-native';

import { AD_UNIT_ANDROID_ID, AD_UNIT_IOS_ID } from '@constants/index';
import { Ionicons } from '@expo/vector-icons';
import { formatRelative, intervalToDuration, isAfter } from 'date-fns';
import en from 'date-fns/locale/en-US';
import { TestIds } from 'react-native-google-mobile-ads';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export function getTimeOfTheDay() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'morning';
  }
  if (hour < 18) {
    return 'afternoon';
  }
  return 'evening';
}

export function addLeadingZeros(number?: number, targetLength = 2) {
  return String(number).padStart(targetLength, '0');
}

export function getLaunchStage(date: Date) {
  const { hours, minutes } = intervalToDuration({
    start: new Date(),
    end: date,
  });

  if (isAfter(new Date(), date) && Number(hours) < 1 && Number(minutes) < 1) {
    return 'Liftoff';
  }
  if (isAfter(new Date(), date)) {
    return 'T-Plus';
  }
  return 'T-Minus';
}

const formatRelativeLocale: { [key: string]: string } = {
  lastWeek: "'Last' eeee",
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: "'Next' eeee",
  other: 'E, LLL d',
};

const dateLocale = {
  ...en,
  formatRelative: (token: string) => formatRelativeLocale[token],
};

export const formatRelativeDate = (date: string) => {
  const formattedDate = formatRelative(new Date(date), new Date(), {
    locale: dateLocale,
  });

  return formattedDate;
};

export const isNameValid = /^[A-Za-zÀ-ú\s]+(([',. -][A-Za-zÀ-ú ])?[A-Za-zÀ-ú]*)*$/;

export const extractPadLocationName = (padName: string) => {
  return padName.substring(0, padName.indexOf(','));
};

export const getLaunchStatusIcon: { [key: string]: ComponentProps<typeof Ionicons>['name'] } = {
  1: 'time-sharp',
  2: 'ios-help-circle',
  3: 'checkmark-sharp',
  4: 'close-sharp',
  5: 'ios-pause-circle',
  6: 'ios-airplane',
  7: 'ios-warning',
  8: 'ios-help-circle',
};

export const getLaunchStatusColor: { [key: string]: string } = {
  1: '#c0c0c0',
  2: '#c0c0c0',
  3: 'green',
  4: '#d83545',
  5: '#c0c0c0',
  6: 'green',
  7: 'orange',
  8: '#c0c0c0',
};

export const formatToDollar = (value: string) => {
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  });
};

export const formatToUnit = (value?: number, unit?: string) => {
  if (!value) {
    return null;
  }
  return value.toLocaleString('en-US', {
    style: 'unit',
    unit: unit,
    unitDisplay: 'short',
  });
};

export const insertAdsToArray = <T>({ array, interval }: { array: T[]; interval: number }) => {
  const arrayWithAds = array.reduce((acc, item, index) => {
    if (index % interval === 0 && index !== 0) {
      acc.push({ type: 'ad', id: index } as typeof item);
    }
    acc.push(item);
    return acc;
  }, [] as T[]);

  return arrayWithAds;
};

export const getAdUnitId = () => {
  if (__DEV__) {
    return TestIds.BANNER;
  }
  if (isIOS) {
    return AD_UNIT_IOS_ID;
  }
  if (isAndroid) {
    return AD_UNIT_ANDROID_ID;
  }
  return TestIds.BANNER;
};
