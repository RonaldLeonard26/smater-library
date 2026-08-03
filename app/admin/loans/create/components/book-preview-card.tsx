import { Book as BookIcon, ShoppingCart } from 'lucide-react';
import type { BookCopy } from '@/types/type';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/format-date';

interface Props {
  book: BookCopy;
  onAdd: (book: BookCopy) => void;
}
export default function BookPreviewCard(props: Props) {
  const { book, onAdd } = props;

  const estimatedReturn = new Date();
  estimatedReturn.setDate(estimatedReturn.getDate() + book.duration_days);

  return (
    <div className="flex flex-col border rounded-md shadow-sm p-3 mx-2 lg:mx-0 space-y-2">
      <div className="flex items-center gap-2">
        <BookIcon size={16} />
        <p className="font-bold">{book.title}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b pb-3 ">
        <p className="text-sm text-muted-foreground list-inside list-item">
          Kategori :{' '}
          <span className="font-semibold text-sm">{book.category_name}</span>
        </p>
        <p className="text-sm text-muted-foreground list-inside list-item">
          Penulis : <span className="font-semibold text-sm">{book.author}</span>
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-semibold">Durasi</p>
        <Badge variant="outline" className="bg-teal-500 w-15 text-white ">
          {book.duration_days} hari
        </Badge>
      </div>

      <div className="border-b pb-3">
        <p className="text-sm text-muted-foreground">
          Estimasi tanggal pengembalian :{' '}
          <span className="font-semibold"> {formatDate(estimatedReturn)}</span>{' '}
          {''}
          jika dipinjam hari ini.
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold">Denda</p>
        <Badge variant="outline" className="bg-red-200">
          Rp. {book.fine_amount} / hari
        </Badge>
      </div>
      <div>
        <Button
          className="w-full bg-teal-500 text-white cursor-pointer"
          variant="outline"
          onClick={() => onAdd(book)}
        >
          <ShoppingCart />
          Tambah ke daftar pinjaman
        </Button>
      </div>
    </div>
  );
}
