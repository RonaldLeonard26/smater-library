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
import AddCategoryForm from '../form/add-categories-form';

export default function AddCategoryModal() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-teal-600 text-white">
          Tambah Data
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Kategori</DialogTitle>
          <DialogDescription>
            Isi data dibawah untuk menambah kategori baru.
          </DialogDescription>
        </DialogHeader>
        <AddCategoryForm
          onSuccess={() => setOpen(false)}
          close={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
