'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import EditCategoryModal from './modal/edit-category-modal';
import { Badge } from '@/components/ui/badge';

import DeleteCategoryModal from './modal/delete-category-modal';
import { formatCurrency } from '@/utils/format-currency';

export type CategoryColumn = {
  id: number;
  name: string;
  duration_days: number;
  fine_amount: number;
  code: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: () => <span className="font-semibold">Kategori</span>,
    cell: ({ row }) => <span>{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'duration_days',
    header: () => <span className="font-semibold">Durasi</span>,
    cell: ({ row }) => <span>{row.getValue('duration_days')} hari</span>,
  },
  {
    accessorKey: 'fine_amount',
    header: () => <span className="font-semibold">Denda/hari</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('fine_amount'));

      return amount > 0 ? (
        <Badge variant="secondary" className="font-semibold bg-amber-50">
          {formatCurrency(amount)}
        </Badge>
      ) : (
        <Badge variant="outline" className="text-muted-foreground bg-teal-500">
          Free
        </Badge>
      );
    },
  },
  {
    accessorKey: 'code',
    header: () => <span className="font-semibold">Kode</span>,
    cell: ({ row }) => <span>{row.getValue('code')}</span>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const category = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="xs" className="p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <EditCategoryModal category={category} />
            <DeleteCategoryModal category={category} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
