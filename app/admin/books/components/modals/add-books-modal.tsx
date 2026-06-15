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

import AddBooksForm from '../form/add-books-form';

export default function AddBooksModal() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Books</Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Books</DialogTitle>
          <DialogDescription>
            Fill the form below to add a new book.
          </DialogDescription>
        </DialogHeader>
        <AddBooksForm
          onSuccess={() => setOpen(false)}
          close={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
