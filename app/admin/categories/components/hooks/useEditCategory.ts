import { useForm } from 'react-hook-form';
import { EditCategoryForm, editCategorySchema } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesServices } from '@/services/categories.service';
import { toast } from 'sonner';
import { CategoryColumn } from '../columns';

export default function useEditCategory(
  category: CategoryColumn,
  onSuccess: () => void,
) {
  const queryQlient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditCategoryForm>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: category?.name,
      duration_days: category?.duration_days,
      fine_amount: category?.fine_amount,
      code: category?.code,
    },
  });

  const { mutate: mutateEditCategory, isPending: isPendingEditCategory } =
    useMutation({
      mutationFn: (payload: EditCategoryForm) =>
        categoriesServices.update(category.id, payload),
      onError: (error) => {
        toast.error(error.message || 'Gagal mengubah data kategori');
      },
      onSuccess: () => {
        queryQlient.invalidateQueries({ queryKey: ['categories'] });
        toast.success('Berhasil mengubah data kategori');
        reset();

        if (onSuccess) onSuccess();
      },
    });

  const handleUpdate = (data: EditCategoryForm) => mutateEditCategory(data);
  return {
    control,
    handleSubmit,
    errors,
    isPendingEditCategory,
    handleUpdate,
  };
}
