import { useForm } from 'react-hook-form';
import { EditBookForm, editBookSchema } from '../validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { booksServices } from '@/services/books.service';
import { toast } from 'sonner';
import { BookColumn } from '../columns';

interface PropsTypes {
  books?: BookColumn;
  onSuccess: () => void;
}

export default function useEditBook(props: PropsTypes) {
  const { books, onSuccess } = props;
  const queryQlient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditBookForm>({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      title: books?.title,
      author: books?.author,
      stock: books?.stock,
      category_id: books?.category_id,
      cover_url: books?.cover_url,
    },
  });

  const { mutate: mutateEditBook, isPending: isPendingEditBook } = useMutation({
    mutationFn: (payload: EditBookForm) => {
      if (!books?.id) throw new Error('Book id is required');
      return booksServices.update(books.id, payload);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to edit book');
    },
    onSuccess: () => {
      queryQlient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Success to update book');
      reset();

      if (onSuccess) onSuccess();
    },
  });

  const handleUpdate = (data: EditBookForm) => mutateEditBook(data);

  return {
    control,
    handleSubmit,
    errors,
    isPendingEditBook,
    handleUpdate,
    reset,
  };
}
