import { booksServices } from '@/services/books.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useCatalogBooks() {
  const { data, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: () => booksServices.getCatalogBooks(0, 12, ''),
    placeholderData: keepPreviousData,
  });

  return {
    books: data?.data ?? [],
    isLoading,
    total: data?.total ?? 0,
  };
}
