import useDebounce from '@/components/hooks/useDebounce';
import { booksServices } from '@/services/books.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useCatalogBooks({
  search,
  categories,
}: {
  search: string;
  categories: string[];
}) {
  const debounceSearch = useDebounce(search, 500);
  const { data, isLoading } = useQuery({
    queryKey: ['catalog-books', debounceSearch, categories],
    queryFn: () =>
      booksServices.getCatalogBooks({
        page: 0,
        limit: 12,
        search: debounceSearch,
        categories,
      }),
    placeholderData: keepPreviousData,
  });

  return {
    books: data?.data ?? [],
    isLoading,
    total: data?.total ?? 0,
  };
}
