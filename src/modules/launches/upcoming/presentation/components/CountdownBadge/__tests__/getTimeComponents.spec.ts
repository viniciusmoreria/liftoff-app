import { getTimeComponents } from '../getTimeComponents';

describe('getTimeComponents', () => {
  it('should return an array of time components with correct labels and values', () => {
    const countdown = {
      progressValue: 0.5,
      days: '2',
      hours: '12',
      minutes: '30',
      seconds: '45',
    };

    const expectedTimeComponents = [
      { value: '2', label: 'days', show: true },
      { value: '12', label: 'hours', show: true },
    ];

    const result = getTimeComponents(countdown);

    expect(result).toEqual(expectedTimeComponents);
  });

  it('should return an array of time components with correct labels and values when days, hours, and minutes are zero', () => {
    const countdown = {
      progressValue: 0.8,
      days: '0',
      hours: '0',
      minutes: '0',
      seconds: '30',
    };

    const expectedTimeComponents = [{ value: '30', label: 'secs', show: true }];

    const result = getTimeComponents(countdown);

    expect(result).toEqual(expectedTimeComponents);
  });

  it('should return an array of time components with correct labels and values when days are zero', () => {
    const countdown = {
      progressValue: 0.8,
      days: '0',
      hours: '10',
      minutes: '5',
      seconds: '30',
    };

    const expectedTimeComponents = [
      { value: '10', label: 'hours', show: true },
      { value: '5', label: 'mins', show: true },
    ];

    const result = getTimeComponents(countdown);

    expect(result).toEqual(expectedTimeComponents);
  });
});
