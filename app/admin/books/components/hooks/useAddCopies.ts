import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AddCopiesForm, addCopiesSchema } from '../validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookCopiesServices } from '@/services/book.copies.service';
import { toast } from 'sonner';

export default function useAddCopies(bookId: string) {
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<AddCopiesForm>({
    resolver: zodResolver(addCopiesSchema),
    defaultValues: {
      copies: 0,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ copies }: AddCopiesForm) =>
      bookCopiesServices.addCopies(bookId, copies),

    onError: (error) => {
      toast.error(error.message || 'Gagal menambah jumlah buku');
    },

    onSuccess: () => {
      toast.success('Buku berhasil ditambahkan');

      queryClient.invalidateQueries({
        queryKey: ['book-copies', bookId],
      });

      queryClient.invalidateQueries({
        queryKey: ['books'],
      });

      reset();
    },
  });

  const handleSave = (data: AddCopiesForm) => mutate(data);

  return {
    control,
    handleSubmit,
    handleSave,
    isPending,
  };
}
