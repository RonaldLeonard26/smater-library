import { loansServices } from '@/services/loans.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useLoans(page: number, limit: number, search: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['loan-items', page, limit, search],
    queryFn: () => loansServices.getLoans(page, limit, search),
    placeholderData: keepPreviousData,
  });

  return {
    loanItems: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
  };
}
