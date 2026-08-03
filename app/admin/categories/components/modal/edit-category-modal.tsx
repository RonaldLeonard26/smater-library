import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import EditCategoryForm from '../form/edit-category-form';
import { CategoryColumn } from '../columns';

export default function EditCategoryModal({
  category,
}: {
  category: CategoryColumn;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle> Edit Category</DialogTitle>
          <DialogDescription>
            Isi form dibawah untuk mengubah data kategori
          </DialogDescription>
        </DialogHeader>
        <EditCategoryForm
          category={category}
          close={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
