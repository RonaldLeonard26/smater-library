import useDebounce from '@/components/hooks/useDebounce';
import { loansServices } from '@/services/loans.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useLoans(page: number, limit: number, search: string) {
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = useQuery({
    queryKey: ['loan-items', page, limit, debouncedSearch],
    queryFn: () => loansServices.getLoans(page, limit, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  return {
    loanItems: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
  };
}
