import { categoriesServices } from '@/services/categories.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useDeleteCategory() {
  const queryQlient = useQueryClient();

  const { mutate: mutateDeleteCategory, isPending: isPendingDeleteCategory } =
    useMutation({
      mutationFn: (id: number) => categoriesServices.remove(id),
      onError: () => {
        toast.error('Failed to delete category');
      },
      onSuccess: () => {
        queryQlient.invalidateQueries({ queryKey: ['categories'] });
        toast.success('Success to delete category');
      },
    });

  return { mutateDeleteCategory, isPendingDeleteCategory };
}
