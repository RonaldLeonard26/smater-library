import { booksServices } from '@/services/books.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useDeleteBook() {
  const queryQlient = useQueryClient();
  const { mutate: mutateDeleteBook, isPending: isPendingDeleteBook } =
    useMutation({
      mutationFn: (id: string) => booksServices.remove(id),
      onError: (error) => {
        console.error(error);
        toast.error('Failed to delete book');
      },
      onSuccess: () => {
        queryQlient.invalidateQueries({ queryKey: ['books'] });
        toast.success('Success to delete book');
      },
    });

  return { mutateDeleteBook, isPendingDeleteBook };
}
