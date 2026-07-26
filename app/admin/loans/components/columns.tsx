import { LoanItem } from '@/types/type';
import { formatDate } from '@/utils/format-date';
import { ColumnDef } from '@tanstack/react-table';

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
  },
  {
    id: 'actions',
    cell: ({ row }) => {},
  },
];
