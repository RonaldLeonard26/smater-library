import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoanItem } from '@/types/type';
import { formatDate } from '@/utils/format-date';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import ReturnLoanModal from './modals/return-loan-modal';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

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

const LoansAction = ({ loanItem }: { loanItem: LoanItem }) => {
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsReturnModalOpen(true);
            }}
            onClick={() => setIsReturnModalOpen(true)}
          >
            Pengembalian
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ReturnLoanModal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        loanItem={loanItem}
      />
    </>
  );
};

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
      return <LoansAction loanItem={loan} />;
    },
  },
];
