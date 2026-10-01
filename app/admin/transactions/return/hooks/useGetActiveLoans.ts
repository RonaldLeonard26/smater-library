import { loansServices } from '@/services/loans.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface UseGetActiveLoansParams {
  search: string;
  page: number;
  limit: number;
}

export default function useGetActiveLoans({
  search,
  page,
  limit,
}: UseGetActiveLoansParams) {
  const query = useQuery({
    queryKey: ['active-loans', search, page, limit],
    queryFn: () => loansServices.getAllActiveLoans({ search, page, limit }),
    placeholderData: keepPreviousData,
  });

  return {
    activeLoans: query.data?.data ?? [],
    total: query.data?.total ?? 0,

    page: query.data?.page ?? page,
    limit: query.data?.limit ?? limit,

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,

    refetch: query.refetch,
  };
}
