import { formatRelative } from 'date-fns';
import en from 'date-fns/locale/en-US';

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
