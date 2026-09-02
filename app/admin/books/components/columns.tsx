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

export interface BookColumn {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  cover_url: string;
  category_id: number;
  categories?: {
    id: number;
    name: string;
  };
  book_copies: {
    id: string;
    barcode: string;
    status: 'AVAILABLE' | 'BORROWED';
  }[];
}

export const columns: ColumnDef<BookColumn>[] = [
  {
    accessorKey: 'cover_url',
    header: 'Cover',
    cell: ({ row }) => (
      <Image
        loading="eager"
        src={row.original.cover_url}
        alt="cover_url"
        width={60}
        height={60}
        className="object-cover"
      />
    ),
  },
  {
    accessorKey: 'title',
    header: 'Judul',
  },
  {
    accessorKey: 'author',
    header: 'Penulis',
  },
  {
    accessorKey: 'isbn',
    header: 'ISBN',
  },
  {
    accessorKey: 'publisher',
    header: 'Penerbit',
  },
  {
    id: 'category_name',
    header: 'Kategori',
    cell: ({ row }) => {
      const categoryName = row.original.categories?.name;
      return (
        <Badge variant="outline" className="bg-yellow-50">
          {' '}
          {categoryName || 'No Category'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'copies',
    header: 'Jumlah Buku',
  },
  {
    accessorKey: 'barcode',
    header: 'Barcode',
    cell: ({ row }) => {
      const bookId = row.original.id;
      return (
        <BarcodeModal bookId={bookId}>
          <Button variant="link">
            Lihat <QrCode />
          </Button>
        </BarcodeModal>
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
