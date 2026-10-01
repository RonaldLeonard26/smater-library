import { Button } from '@/components/ui/button';
import { RawLoanBook } from '@/types/loans';
import { Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface SelectedBookCardProps {
  book: RawLoanBook;
  onRemove: (copy_id: string) => void;
  onAddSameBook: (bookId: string, quantity: number) => void;
  remainingQuota: number;
}

export default function SelectedBookCard({
  book,
  onRemove,
  onAddSameBook,
  remainingQuota,
}: SelectedBookCardProps) {
  const [isAddingSameBook, setIsAddingSameBook] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + book.duration_days);

  const returnDateFormatted = returnDate.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const handleAddSameBook = () => {
    if (quantity < 1) return;

    onAddSameBook(book.book_id, quantity);

    // kembali ke tampilan awal setelah berhasil menambah
    setIsAddingSameBook(false);
    setQuantity(1);
  };

  const handleCancelAddSameBook = () => {
    setIsAddingSameBook(false);
    setQuantity(1);
  };
  return (
    <div className="relative rounded-md border bg-white p-3 shadow-sm">
      {/* Remove */}
      <Button
        type="button"
        variant="secondary"
        onClick={() => onRemove(book.copy_id)}
        className="absolute top-1 right-1 cursor-pointer bg-white hover:bg-red-100"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>

      <div className="flex items-center gap-3">
        {/* Cover */}
        <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded border bg-slate-100">
          {book.cover_url && (
            <Image
              src={book.cover_url}
              alt={`Cover ${book.title}`}
              fill
              sizes="56px"
              className="object-cover"
            />
          )}
        </div>

        {/* Book information */}
        <div className="min-w-0 flex-1 space-y-1.5 pr-6">
          {/* Title */}
          <p className="line-clamp-2 text-sm font-semibold leading-snug text-slate-800">
            {book.title}
          </p>

          {/* Barcode */}
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="shrink-0 text-xs text-muted-foreground">
              Barcode:
            </span>

            <span className="inline-flex w-fit max-w-full items-center truncate rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-xs text-slate-600">
              {book.barcode}
            </span>
          </div>

          {/* Estimated return date */}
          <div className="flex items-center gap-1.5">
            <span className="shrink-0 text-xs text-muted-foreground">
              Estimasi Kembali:
            </span>

            <span className="text-xs font-medium text-teal-700">
              {returnDateFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Same book option */}
      <div className="mt-4 border-t pt-3">
        {!isAddingSameBook ? (
          <button
            type="button"
            onClick={() => setIsAddingSameBook(true)}
            className="text-sm font-light text-primary hover:underline"
          >
            Ingin pinjam buku yang sama?
          </button>
        ) : (
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium  text-muted-foreground">
              Sisa kuota :{' '}
              <span className="text-destructive">{remainingQuota} buku!</span>
            </p>
            <div className="flex items-center gap-2">
              {/* Quantity */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Jumlah:</span>

                <input
                  type="number"
                  min={1}
                  max={remainingQuota}
                  value={quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    if (value > remainingQuota) {
                      setQuantity(remainingQuota);
                      return;
                    }
                    setQuantity(value);
                  }}
                  className="h-8 w-16 rounded-md border px-2 text-center text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Add */}
              <Button
                type="button"
                disabled={remainingQuota === 0 || quantity < 1}
                size="sm"
                onClick={handleAddSameBook}
                className="h-8 cursor-pointer bg-accent text-primary"
              >
                <Plus className="h-4 w-4" />
                Tambah
              </Button>

              {/* Cancel */}
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleCancelAddSameBook}
                className="h-8 w-8 cursor-pointer  hover:bg-red-100"
              >
                <X className="text-destructive" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
