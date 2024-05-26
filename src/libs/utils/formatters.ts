const formatToDollar = (value: string) => {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    unitDisplay: 'short',
    notation: 'standard',
  });

  return formatter.format(Number(value));
};

const formatToCurrency = (value: string | number, currency: string) => {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    unitDisplay: 'short',
    notation: 'standard',
  });

  return formatter.format(Number(value)).replace(/^(\D+)/, '$1 ');
};

const formatToUnit = (value?: number, unit?: string) => {
  if (!value) {
    return null;
  }

  const formatter = Intl.NumberFormat('pt-BR', {
    unit,
    style: 'unit',
    unitDisplay: 'short',
    notation: 'standard',
  });

  return formatter.format(value);
};

const date = {
  day_month: 'MMM dd',
  day_month_year: 'MMM dd, yyyy',
  day_month_year_time_zone: 'MMM dd yyyy, h:mm a O',
  day_of_week: 'eee',
  month_day: 'MMM d',
  hour_minute: 'HH:mm O',
  hour_minute_strip: 'HH:mm',
  timezone: 'O',
};

export const formatters = {
  formatToDollar,
  formatToCurrency,
  formatToUnit,
  date,
};
