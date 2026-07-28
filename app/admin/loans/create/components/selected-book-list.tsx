import { BookCopy } from '@/types/type';
import SelectedBook from './selected-book';
import { Button } from '@/components/ui/button';
import { CircleCheckBig } from 'lucide-react';

interface Props {
  books: BookCopy[];
  onRemove: (copyId: string) => void;
  onSubmit: () => void;
}

export default function SelectedBookList({ books, onRemove, onSubmit }: Props) {
  return (
    <div className="space-y-3 border shadow-sm rounded-md p-3">
      {books.map((book) => (
        <SelectedBook key={book.copy_id} book={book} onRemove={onRemove} />
      ))}

      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-muted-foreground">
          {books.length} buku dipilih
        </p>

        <Button
          variant="outline"
          onClick={onSubmit}
          disabled={books.length === 0}
          className="bg-teal-500 text-white"
        >
          <CircleCheckBig /> Pinjam Buku
        </Button>
      </div>
    </div>
  );
}
