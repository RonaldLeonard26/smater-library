import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { BooksForm, booksSchema } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { booksServices } from '@/services/books.service';
import { toast } from 'sonner';

interface PropsTypes {
  onSuccess: () => void;
}

export default function useAddBooks(props: PropsTypes) {
  const { onSuccess } = props;
  const queryQlient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BooksForm>({
    resolver: zodResolver(booksSchema),
    defaultValues: {
      books: [
        {
          title: '',
          author: '',
          isbn: '',
          publisher: '',
          copies: 0,
          cover_url: null,
          category_id: undefined,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'books',
  });

  const { mutate: mutateAddBooks, isPending: isPendingAddBooks } = useMutation({
    mutationFn: (payload: BooksForm) => booksServices.create(payload),
    onError: (error) => {
      toast.error(error.message || 'Gagal menambahkan buku!');
    },
    onSuccess: () => {
      toast.success('Buku berhasil ditambahkan ');
      reset();
      queryQlient.invalidateQueries({ queryKey: ['books'] });

      if (onSuccess) onSuccess();
    },
  });

  const handleSave = (data: BooksForm) => mutateAddBooks(data);

  return {
    control,
    handleSubmit,
    errors,
    isPendingAddBooks,
    handleSave,

    fields,
    append,
    remove,
  };
}
