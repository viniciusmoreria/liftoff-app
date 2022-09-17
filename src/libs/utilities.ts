import { Platform } from 'react-native';

import { formatRelative, intervalToDuration, isAfter } from 'date-fns';
import en from 'date-fns/locale/en-US';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const HEADER_HEIGHT = 36;

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
