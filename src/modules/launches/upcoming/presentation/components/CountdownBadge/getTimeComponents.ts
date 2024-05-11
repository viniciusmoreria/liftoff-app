export const getTimeComponents = (countdown: {
  progressValue: number;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}) => {
  const { days, hours, minutes, seconds } = countdown;

  const timeComponents = [
    { value: days, label: Number(days) > 1 ? 'days' : 'day', show: Number(days) > 0 },
    {
      value: hours,
      label: Number(hours) > 1 ? 'hours' : 'hour',
      show: Number(hours) > 0,
    },
    {
      value: minutes,
      label: Number(minutes) > 1 ? 'mins' : 'min',
      show: Number(days) === 0 && Number(minutes) > 0,
    },
    {
      value: seconds,
      label: Number(seconds) > 1 ? 'secs' : 'sec',
      show: Number(days) === 0 && Number(hours) === 0,
    },
  ];

  return timeComponents.filter(({ show }) => show);
};
