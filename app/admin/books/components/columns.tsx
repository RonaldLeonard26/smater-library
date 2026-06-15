import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import BookQRCode from './book-QRcode';
import { img } from 'framer-motion/client';
import Image from 'next/image';

export interface BookColumn {
  id: string;
  title: string;
  author: string;
  barcode: string;
  cover_url: string;
  stock: number;
}

export const columns: ColumnDef<BookColumn>[] = [
  {
    accessorKey: 'cover_url',
    header: 'Image',
    cell: ({ row }) => (
      <Image
        src={row.original.cover_url}
        alt="cover_url"
        width={100}
        height={100}
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
            {/* <EditCategoryModal category={category} />
            <DeleteCategoryModal category={category} /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
