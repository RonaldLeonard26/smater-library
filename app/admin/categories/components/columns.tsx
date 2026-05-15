'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CategoriesForm } from './validation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

export const columns: ColumnDef<CategoriesForm>[] = [
  {
    accessorKey: 'name',
    header: 'Kategori',
  },
  {
    accessorKey: 'duration_days',
    header: 'Durasi',
  },
  {
    accessorKey: 'fine_amount',
    header: 'Denda',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // const category = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="xs" className="p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
