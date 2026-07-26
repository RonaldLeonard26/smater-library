import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (date: string | Date) => {
  return format(new Date(date), 'dd MMM yyyy', {
    locale: id,
  });
};
