import { bookCopiesServices } from '@/services/book.copies.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useDeleteCopy(bookId: string) {
  const queryClient = useQueryClient();

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: (copyId: string) => bookCopiesServices.removeCopy(copyId),
    onError: (error) => {
      toast.error(error.message || 'Gagal menghapus buku');
    },
    onSuccess: () => {
      toast.success('Buku berhasil dihapus');

      queryClient.invalidateQueries({ queryKey: ['book-copies', bookId] });

      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
  return { mutateDelete, isPendingDelete };
}
