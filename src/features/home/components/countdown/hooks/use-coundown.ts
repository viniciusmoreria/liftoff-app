import { useEffect, useState } from 'react';

import { addLeadingZeros } from '@libs/utilities';
import { intervalToDuration } from 'date-fns';

export function useCountdown(targetDate: Date) {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
}

const getReturnValues = (countDown: number) => {
  const { days, hours, minutes, seconds } = intervalToDuration({
    start: new Date(),
    end: new Date(countDown + new Date().getTime()),
  });

  return {
    days: addLeadingZeros(days),
    hours: addLeadingZeros(hours),
    minutes: addLeadingZeros(minutes),
    seconds: addLeadingZeros(seconds),
  };
};
