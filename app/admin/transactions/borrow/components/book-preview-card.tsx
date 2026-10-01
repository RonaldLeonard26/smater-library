import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RawLoanBook } from '@/types/loans';
import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';

interface BookPreviewProps {
  book: RawLoanBook;
  onAdd: (book: RawLoanBook) => void;
}

export default function BookPreviewCard({ book, onAdd }: BookPreviewProps) {
  const authorsList = book.authors
    ? book.authors.split(' | ').filter(Boolean)
    : [];

  return (
    <div className="flex flex-col gap-4 p-3">
      {/* Book Information */}
      <div className="flex items-start gap-4">
        {/* Cover */}
        <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-md border bg-slate-100 shadow-sm">
          <Image
            loading="eager"
            src={book.cover_url}
            alt={`Cover ${book.title}`}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        {/* Detail */}
        <div className="min-w-0 flex-1 space-y-2">
          {/* Title */}
          <p className="text-sm font-semibold leading-snug">{book.title}</p>

          {/* Authors - Horizontal */}
          <div className="flex items-start gap-2 text-xs">
            <span className="shrink-0 text-muted-foreground">Penulis:</span>

            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {authorsList.length > 0 ? (
                authorsList.map((author, index) => (
                  <span key={index} className="font-medium text-foreground">
                    {author}
                    {index < authorsList.length - 1 && ','}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground">Tidak diketahui</span>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Kategori:</span>

            <Badge
              variant="outline"
              className="border-amber-200 bg-amber-50/80 text-xs font-normal text-amber-700"
            >
              {book.category_name}
            </Badge>
          </div>

          {/* Barcode */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-muted-foreground">
              Barcode:
            </span>

            <span className="truncate rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600">
              {book.barcode}
            </span>
          </div>

          {/* Available Stock */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Stok:</span>

            <Badge className="bg-accent text-xs font-normal text-primary">
              Tersedia {book.available_stock}
            </Badge>
          </div>
        </div>
      </div>

      {/* Action */}
      <Button
        type="button"
        onClick={() => onAdd(book)}
        className="w-full cursor-pointer"
      >
        <ShoppingCartIcon />
        Tambah ke daftar pinjam
      </Button>
    </div>
  );
}
