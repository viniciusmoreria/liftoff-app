import { addLeadingZeros } from '@libs/utils/addLeadingZeros';
import { intervalToDuration } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  targetDate: Date;
};

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

export function useCountdown({ targetDate }: Props) {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  const updateCountDown = useCallback(() => {
    setCountDown(countDownDate - new Date().getTime());
  }, [countDownDate]);

  useEffect(() => {
    const interval = setInterval(updateCountDown, 1000);
    return () => clearInterval(interval);
  }, [updateCountDown]);

  const currentTimestamp = Date.now();

  const totalDifferenceInSeconds = (countDownDate - currentTimestamp) / 1000;
  const totalTimeInSeconds = (countDownDate - new Date().setHours(0, 0, 0, 0)) / 1000;
  const progressValue =
    ((totalTimeInSeconds - totalDifferenceInSeconds) / totalTimeInSeconds) * 100;

  return {
    ...getReturnValues(countDown),
    progressValue,
  };
}
