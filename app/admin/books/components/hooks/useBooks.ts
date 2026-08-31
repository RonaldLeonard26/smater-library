import useDebounce from '@/components/hooks/useDebounce';
import { booksServices } from '@/services/books.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useBooks(page: number, limit: number, search: string) {
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = useQuery({
    queryKey: ['books', page, limit, debouncedSearch],
    queryFn: () => booksServices.getAll(page, limit, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  return {
    books: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
  };
}
