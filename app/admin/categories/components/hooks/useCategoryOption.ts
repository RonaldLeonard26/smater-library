import { categoriesServices } from '@/services/categories.service';
import { useQuery } from '@tanstack/react-query';

export default function useCategoryOptions() {
  const { data, isLoading } = useQuery({
    queryKey: ['category-options'],
    queryFn: categoriesServices.getOptions,
  });

  return {
    categories: data ?? [],
    isLoading,
  };
}
