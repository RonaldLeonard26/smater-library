import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical, QrCode } from 'lucide-react';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import EditBookModal from './modals/edit-book-modal';
import DeleteBookModal from './modals/delete-book-modal';
import BarcodeModal from './modals/barcode-modal';
import { BookColumn } from '@/types/type';
import { formatIsbnPattern } from '@/lib/utils';

export const columns: ColumnDef<BookColumn>[] = [
  {
    accessorKey: 'cover_url',
    header: 'Cover',
    cell: ({ row }) => (
      <div className="relative h-24 w-18 overflow-hidden rounded border bg-slate-100 shadow-sm">
        <Image
          loading="lazy"
          src={row.original.cover_url}
          alt="cover_url"
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: () => <p className="text-center">Judul & Penulis</p>,
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-65">
        <p className="font-medium text-slate-900 text-sm text-wrap leading-snug">
          {row.original.title}
        </p>
        <p className="text-xs text-slate-500 font-normal line-clamp-1">
          Penulis:{' '}
          <span className="text-slate-700">{row.original.author || '-'}</span>
        </p>
        <p className="text-xs text-slate-500 font-normal line-clamp-1">
          Penerbit :{' '}
          <span className="text-slate-700">{row.original.publisher}</span>
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'isbn',
    header: () => <div className="text-center">ISBN</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <p className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded w-max border border-slate-200">
          {formatIsbnPattern(row.original.isbn)}
        </p>
      </div>
    ),
  },

  {
    id: 'category_name',
    header: () => <p className="text-center">Kategori</p>,
    cell: ({ row }) => {
      const categoryName = row.original.categories?.name;
      return (
        <div className="flex items-center justify-center">
          <Badge
            variant="outline"
            className="bg-amber-50/80 text-amber-700 border-amber-200  text-xs font-normal"
          >
            {' '}
            {categoryName || 'No Category'}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'copies',
    header: () => <p className="text-center">Jumlah</p>,
    cell: ({ row }) => {
      const totalCopies = row.original.book_copies?.length || 0;
      return (
        <div className="text-center font-semibold text-sm text-slate-700">
          {totalCopies} buku
        </div>
      );
    },
  },
  {
    accessorKey: 'barcode',
    header: () => <p className="text-center">Barcode</p>,
    cell: ({ row }) => {
      const bookId = row.original.id;
      return (
        <div className="flex items-center justify-center">
          <BarcodeModal bookId={bookId}>
            <Button variant="link">
              Lihat <QrCode />
            </Button>
          </BarcodeModal>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const book = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="xs" className="p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <EditBookModal books={book} />
            <DeleteBookModal books={book} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
