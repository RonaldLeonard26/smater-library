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
import { BookColumn } from '../columns';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import useDeleteBook from '../hooks/useDeleteBook';

interface PropsTypes {
  books: BookColumn;
}

export default function DeleteBookModal(props: PropsTypes) {
  const { books } = props;
  const { mutateDeleteBook, isPendingDeleteBook } = useDeleteBook();
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
            Apakah anda yakin?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini akan menghapus data secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel size="sm">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutateDeleteBook(books.id)}
            className="bg-rose-700 hover:bg-rose-500"
            size="sm"
          >
            {isPendingDeleteBook ? <Spinner className="size-6" /> : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
