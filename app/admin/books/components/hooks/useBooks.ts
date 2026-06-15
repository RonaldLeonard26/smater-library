import { booksServices } from '@/services/books.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useBooks() {
  const { data: dataBooks, isLoading: isLoadingBooks } = useQuery({
    queryKey: ['books'],
    queryFn: () => booksServices.getAll(),
    placeholderData: keepPreviousData,
  });

  return {
    dataBooks,
    isLoadingBooks,
  };
}
