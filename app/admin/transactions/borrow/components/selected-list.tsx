import { List, Pointer } from 'lucide-react';
import SelectedBookCard from './selected-books-card';
import { RawLoanBook } from '@/types/loans';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface SelectedListProps {
  selectedBooks: RawLoanBook[];
  onRemove: (copy_id: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  onAddSameBook: (bookId: string, quantity: number) => void;
  remainingQuota: number;
}

export default function SelectedList({
  selectedBooks,
  onSubmit,
  onRemove,
  isLoading,
  onAddSameBook,
  remainingQuota,
}: SelectedListProps) {
  return (
    <div className="flex flex-col space-y-3 ">
      <div className="flex items-center border-b  gap-1.5">
        <List className="h-4 text-primary w-4" />
        <p className="text-sm font-semibold leading-snug">Daftar Pinjam</p>
      </div>

      {selectedBooks.length >= 1 && (
        <div className="flex flex-col gap-2 max-h-65 overflow-y-auto scrollbar-thin pr-2  ">
          {selectedBooks.map((book) => (
            <SelectedBookCard
              key={book.copy_id}
              book={book}
              onRemove={onRemove}
              onAddSameBook={onAddSameBook}
              remainingQuota={remainingQuota}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between ">
        <p className="text-sm font-medium ">
          Total : {selectedBooks.length} buku
        </p>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="cursor-pointer"
        >
          <Pointer className="h-4 w-4" />
          {isLoading ? <Spinner /> : 'Proses Pinjaman'}
        </Button>
      </div>
    </div>
  );
}
