import { historyServices } from '@/services/history.service';
import { LoanHistoryParams } from '@/types/history';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useGetHistory({
  search,
  statuses,
  isOverdue,
  page,
  limit,
}: LoanHistoryParams) {
  const query = useQuery({
    queryKey: ['loans-history', page, limit, search, statuses, isOverdue],
    queryFn: () =>
      historyServices.getBookCopyHistory({
        search,
        page,
        limit,
        statuses,
        isOverdue,
      }),
    placeholderData: keepPreviousData,
  });

  return {
    history: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
