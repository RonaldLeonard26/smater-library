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

export type CategoryColumn = {
  id: number;
  name: string;
  duration_days: number;
  fine_amount: number;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: () => <span className="font-semibold">Category</span>,
    cell: ({ row }) => <span>{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'duration_days',
    header: () => <span className="font-semibold">Loan Duration</span>,
    cell: ({ row }) => <span>{row.getValue('duration_days')} Days</span>,
  },
  {
    accessorKey: 'fine_amount',
    header: () => <span className="font-semibold">Fine Amount</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('fine_amount'));
      const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(amount);
      return amount > 0 ? (
        <Badge variant="destructive" className="font-semibold">
          {formatted}
        </Badge>
      ) : (
        <Badge variant="secondary" className="text-muted-foreground">
          Free
        </Badge>
      );
    },
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
