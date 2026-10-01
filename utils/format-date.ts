import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return '-';
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return '-';
  }
  return format(parsedDate, 'dd MMM yyyy', {
    locale: id,
  });
};
