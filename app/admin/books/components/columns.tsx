import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import BookQRCode from './book-QRcode';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import EditBookModal from './modals/edit-book-modal';
import DeleteBookModal from './modals/delete-book-modal';

export interface BookColumn {
  id: string;
  title: string;
  author: string;
  barcode: string;
  cover_url: string;
  stock: number;
  category_id: number;
  categories?: {
    id: number;
    name: string;
  };
}

export const columns: ColumnDef<BookColumn>[] = [
  {
    accessorKey: 'cover_url',
    header: 'Image',
    cell: ({ row }) => (
      <Image
        loading="lazy"
        src={row.original.cover_url}
        alt="cover_url"
        width={60}
        height={90}
        className="object-cover aspect-auto"
      />
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
  {
    id: 'category_name',
    header: 'Category',
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
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    accessorKey: 'barcode',
    header: 'QR Code',
    cell: ({ row }) => {
      const barcode = row.original.barcode;
      const title = row.original.title;
      return <BookQRCode barcode={barcode} title={title} />;
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
