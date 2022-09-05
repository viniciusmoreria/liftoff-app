import { Platform } from 'react-native';

import { intervalToDuration, isAfter } from 'date-fns';

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
