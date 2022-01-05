import { useEffect, useState } from 'react';

type Interval = 'second' | 'minute' | 'hour' | number | undefined | null;

const useDate = ({
  date,
  interval,
}: { date?: Date; interval?: Interval } = {}) => {
  const [newDate, setNewDate] = useState(date ?? new Date());

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    const bump = () => {
      timeoutId = setTimeout(() => {
        setNewDate(date ?? new Date());
        bump();
      }, nextCallback(date ?? new Date(), interval));
    };

    bump();

    return () => clearTimeout(timeoutId!);
  });

  return newDate;
};

export { useDate };

const nextCallback = (now: Date, interval: Interval) => {
  if (typeof interval === 'number') {
    return interval;
  }
  if (interval === 'second') {
    return 1000 - now.getMilliseconds();
  }
  if (interval === 'minute') {
    return 60 * 1000 - now.getMilliseconds() - now.getSeconds() * 1000;
  }
  if (interval === 'hour') {
    return (
      60 * 60 * 1000 -
      now.getMilliseconds() -
      now.getSeconds() * 1000 -
      now.getMinutes() * 60 * 1000
    );
  }
  return 1000 - now.getMilliseconds();
};
