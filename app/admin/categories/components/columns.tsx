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
import { CategoryColumn } from '@/types/categories';

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: () => <div className=" pl-2 font-semibold ">Kategori</div>,
    cell: ({ row }) => (
      <p className="pl-2 font-medium text-slate-800 leading-snug ">
        {row.original.name}
      </p>
    ),
  },
  {
    accessorKey: 'duration_days',
    header: () => <div className="font-semibold">Durasi</div>,
    cell: ({ row }) => (
      <p className="font-medium text-slate-800 leading-snug">
        {row.original.duration_days} hari
      </p>
    ),
  },
  {
    accessorKey: 'fine_amount',
    header: () => <div className="font-semibold">Denda/hari</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('fine_amount'));

      return amount > 0 ? (
        <Badge
          variant="outline"
          className="bg-amber-50/80 text-amber-700 border-amber-200 font-normal"
        >
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
    header: () => <div className="font-semibold">Kode</div>,
    cell: ({ row }) => (
      <p className="font-medium text-slate-800 leading-snug">
        {row.original.code}
      </p>
    ),
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
