import { bookCopiesServices } from '@/services/book.copies.service';
import { useQuery } from '@tanstack/react-query';

export default function useCopies(bookId: string) {
  const { data, isLoading } = useQuery({
    queryFn: () => bookCopiesServices.getBookById(bookId),
    queryKey: ['book-copies', bookId],
    enabled: !!bookId,
  });

  return { copies: data ?? [], isLoading };
}
