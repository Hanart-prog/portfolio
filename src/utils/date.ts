import i18n from '@/i18n';

export const formatDate = (date: string): string => {
  const [year, month]: [string, string] = date.split('-') as [string, string];

  return new Intl.DateTimeFormat(i18n.language, {
    month: 'short',
    year: 'numeric',
  }).format(new Date(Number(year), Number(month) - 1));
};

export const isOngoing = (endDate: string | undefined): boolean => {
  if (endDate === undefined) {
    return true;
  }

  const now = new Date();
  const end = String(endDate);
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  return (end.length === 4 ? `${end}-12` : end) >= currentMonth;
};
