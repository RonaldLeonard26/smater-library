import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoanItem } from '@/types/type';
import { formatDate } from '@/utils/format-date';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import ReturnLoanModal from './modals/return-loan-modal';
import { Badge } from '@/components/ui/badge';

const statusConfig = {
  ACTIVE: {
    label: 'Aktif',
    className: 'bg-teal-500 text-white',
  },
  OVERDUE: {
    label: 'Terlambat',
    className: 'bg-red-100 text-red-700 hover:bg-red-100',
  },
} as const;

export const columns: ColumnDef<LoanItem>[] = [
  {
    accessorKey: 'nisn',
    header: 'NISN',
  },
  {
    accessorKey: 'full_name',
    header: 'Nama',
  },
  {
    accessorKey: 'title',
    header: 'Buku',
  },

  {
    accessorKey: 'barcode',
    header: 'Barcode',
    cell: ({ row }) => <p className="font-mono">{row.getValue('barcode')}</p>,
  },
  {
    accessorKey: 'loan_date',
    header: 'Tgl Pinjam',
    cell: ({ row }) => formatDate(row.original.loan_date),
  },
  {
    accessorKey: 'due_date',
    header: 'Jatuh Tempo',
    cell: ({ row }) => formatDate(row.original.due_date),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status as keyof typeof statusConfig;
      const config = statusConfig[status];
      return <Badge className={config.className}>{config.label}</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const loan = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="xs" className="p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ReturnLoanModal {...loan} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
