import { booksServices } from '@/services/books.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useBooks(page: number, limit: number, search: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['books', page, limit, search],
    queryFn: () => booksServices.getAll(page, limit, search),
    placeholderData: keepPreviousData,
  });

  return {
    books: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
  };
}
