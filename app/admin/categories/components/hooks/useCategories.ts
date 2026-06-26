import { categoriesServices } from '@/services/categories.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useCategories(
  page: number,
  limit: number,
  search: string,
) {
  const { data, isLoading } = useQuery({
    queryKey: ['categories', page, limit, search],
    queryFn: () => categoriesServices.getAll(page, limit, search),
    placeholderData: keepPreviousData,
  });

  return {
    categories: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
  };
}
