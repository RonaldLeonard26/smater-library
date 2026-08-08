import { studentLoanServices } from '@/services/student.loan.service';
import {
  FormattedActiveLoan,
  FormattedHistoryLoan,
  RawLoanItem,
} from '@/types/student-loan';
import { formatDate } from '@/utils/format-date';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function useStudentBook(userId: string | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['loan-items', userId],
    queryFn: () => studentLoanServices.getStudentLoan(userId!),
    enabled: Boolean(userId),
  });

  // Pemrosesan & Destrukturisasi Data
  const { activeLoans, historyLoans } = useMemo(() => {
    if (!data) return { activeLoans: [], historyLoans: [] };

    const rawList = data as unknown as RawLoanItem[];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const active: FormattedActiveLoan[] = [];
    const history: FormattedHistoryLoan[] = [];

    rawList.forEach((item) => {
      // Destrukturisasi properti utama dari item
      const {
        id,
        due_date,
        returned_at,
        book_copies: {
          books: { title, author, cover_url },
        },
        loans: { loan_date },
      } = item;

      const borrowDate = formatDate(loan_date);

      if (returned_at) {
        history.push({
          id,
          bookTitle: title,
          bookAuthor: author,
          coverUrl: cover_url,
          borrowDate,
          returnedDate: formatDate(returned_at),
        });
      } else {
        const dueDateObj = new Date(due_date);
        dueDateObj.setHours(0, 0, 0, 0);

        const diffTime = dueDateObj.getTime() - today.getTime();
        const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        active.push({
          id,
          bookTitle: title,
          bookAuthor: author,
          coverUrl: cover_url,
          borrowDate,
          dueDate: formatDate(dueDateObj),
          daysRemaining,
          isOverdue: daysRemaining < 0,
        });
      }
    });

    return { activeLoans: active, historyLoans: history };
  }, [data]);

  return { activeLoans, historyLoans, isLoading, error, refetch };
}
