import { categoriesServices } from '@/services/categories.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useCategories() {
  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesServices.getAll(),
    placeholderData: keepPreviousData,
  });

  return {
    dataCategories,
    isLoadingCategories,
  };
}
