import useDeleteCategory from '../hooks/useDeleteCategory';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { CategoryColumn } from '../columns';
import { Spinner } from '@/components/ui/spinner';

interface PropsTypes {
  category: CategoryColumn;
}

export default function DeleteCategoryModal(props: PropsTypes) {
  const { category } = props;
  const { mutateDeleteCategory, isPendingDeleteCategory } = useDeleteCategory();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader className="items-start">
          <AlertDialogTitle className="text-md">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel size="sm">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutateDeleteCategory(category.id)}
            className="bg-rose-700 hover:bg-rose-500"
            size="sm"
          >
            {isPendingDeleteCategory ? (
              <Spinner className="size-6" />
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
