import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { CategoriesForm, categoriesSchema } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { categoriesServices } from '@/services/categories.service';
import { toast } from 'sonner';

export default function useAddCategories(onSuccess?: () => void) {
  const queryQlient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CategoriesForm>({
    resolver: zodResolver(categoriesSchema),
    defaultValues: {
      categories: [{ name: '', duration_days: 1, fine_amount: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  });

  const { mutate: mutateCategoies, isPending: isPendingCategories } =
    useMutation({
      mutationFn: (data: CategoriesForm) => categoriesServices.create(data),
      onError: (error) => {
        toast.error(error.message || 'Failed to create category');
      },
      onSuccess: () => {
        toast.success('Success to create category');
        reset();
        queryQlient.invalidateQueries({ queryKey: ['categories'] });

        if (onSuccess) onSuccess();
      },
    });

  const handleSave = (data: CategoriesForm) => mutateCategoies(data);

  return {
    register,
    handleSubmit,
    errors,
    control,
    fields,
    append,
    remove,
    isPendingCategories,
    handleSave,
  };
}
