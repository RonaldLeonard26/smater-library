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
        <Button variant="outline">Add Category</Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Categories</DialogTitle>
          <DialogDescription>
            Fill the form below to add a new category.
          </DialogDescription>
        </DialogHeader>
        <AddCategoryForm />
      </DialogContent>
    </Dialog>
  );
}
