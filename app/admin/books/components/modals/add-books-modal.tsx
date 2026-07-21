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
        <Button
          variant="outline"
          className="bg-teal-500 text-white hover:text-slate-500"
        >
          Tambah Data
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Data Buku</DialogTitle>
          <DialogDescription>
            Isi form untuk menambahkan data buku
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
