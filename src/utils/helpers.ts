import { formatRelative, intervalToDuration, isAfter } from 'date-fns';
import en from 'date-fns/locale/en-US';
import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const isNameValid =
  /^[A-Za-zÀ-ú\s]+(([',. -][A-Za-zÀ-ú ])?[A-Za-zÀ-ú]*)*$/;

export const groupBy = <T = any>(arr: T[], key: string) =>
  arr
    .map((val: any) => val[key])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});

export const greet = () => {
  const date = new Date();
  const hour = date.getHours();

  if (hour < 12) {
    return 'Good morning';
  }

  if (hour < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
};

function addLeadingZeros(number: number, targetLength = 2): string {
  return String(number).padStart(targetLength, '0');
}

export function getTMinus(date: Date) {
  const { days, hours, minutes, seconds } = intervalToDuration({
    start: new Date(),
    end: date,
  });

  const tMinus = {
    days: addLeadingZeros(days as number),
    hours: addLeadingZeros(hours as number),
    minutes: addLeadingZeros(minutes as number),
    seconds: addLeadingZeros(seconds as number),
  };

  return tMinus;
}

export type LaunchStageType = ReturnType<typeof getLaunchStage>;

export function getLaunchStage(date: Date) {
  const tMinus = getTMinus(date);

  if (isAfter(new Date(), date)) {
    return 'T-Plus';
  }

  if (isAfter(new Date(), date) && Number(tMinus.minutes) < 1) {
    return 'Liftoff';
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

export const dateLocale = {
  ...en,
  formatRelative: (token: string) => formatRelativeLocale[token],
};

export const formatRelativeDate = (date: string) => {
  const formattedDate = formatRelative(new Date(date), new Date(), {
    locale: dateLocale,
  });

  return formattedDate;
};
