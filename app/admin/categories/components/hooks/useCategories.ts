import useDebounce from '@/components/hooks/useDebounce';
import { categoriesServices } from '@/services/categories.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useCategories(
  page: number,
  limit: number,
  search: string,
) {
  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading } = useQuery({
    queryKey: ['categories', page, limit, debouncedSearch],
    queryFn: () => categoriesServices.getAll(page, limit, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  return {
    categories: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
  };
}
