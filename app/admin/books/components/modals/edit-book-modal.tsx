import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useState } from 'react';
import EditBookForm from '../form/edit-book-form';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { BookColumn } from '../columns';

interface PropsTypes {
  books: BookColumn;
}
export default function EditBookModal(props: PropsTypes) {
  const { books } = props;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Buku</DialogTitle>
          <DialogDescription>
            Fill the form below to update book.
          </DialogDescription>
        </DialogHeader>
        <EditBookForm
          books={books}
          onSuccess={() => setOpen(false)}
          close={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
