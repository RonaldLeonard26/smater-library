import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ActiveLoanItem } from '@/types/loans';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { ColumnDef } from '@tanstack/react-table';
import { RotateCcw } from 'lucide-react';

export const activeLoansColumns: ColumnDef<ActiveLoanItem>[] = [
  {
    accessorKey: 'barcode',
    header: 'Barcode',
    cell: ({ row }) => (
      <span className="font-mono text-xs font-semibold bg-slate-100 border px-2 py-1 rounded">
        {row.original.barcode}
      </span>
    ),
  },
  {
    accessorKey: 'book_title',
    header: 'Judul Buku',
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-slate-800">{row.original.book_title}</p>
        <p className="text-xs text-slate-500">
          {row.original.book_authors} • {row.original.category_name}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'loan_date',
    header: 'Tgl Pinjam',
    cell: ({ row }) => (
      <p className="text-xs font-medium">
        {formatDate(row.original.loan_date)}
      </p>
    ),
  },
  {
    accessorKey: 'due_date',
    header: 'Tenggat',
    cell: ({ row }) => {
      const dueDate = new Date(row.original.due_date);
      const isOverdue = row.original.days_overdue > 0;

      return (
        <div>
          <p className="text-xs font-medium">{formatDate(dueDate)}</p>
          {isOverdue ? (
            <Badge variant="destructive" className="text-[10px] mt-0.5">
              Terlambat {row.original.days_overdue} hari
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-[10px] text-teal-600 border-teal-200 bg-teal-50 mt-0.5"
            >
              Aktif
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'estimated_fine',
    header: 'Est. Denda',
    cell: ({ row }) => {
      const fine = row.original.estimated_fine;
      return (
        <span
          className={`text-xs font-semibold ${fine > 0 ? 'text-rose-600' : 'text-slate-500'}`}
        >
          {fine > 0 ? formatCurrency(fine) : 'Rp 0'}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 text-xs text-amber-700 hover:bg-amber-50 hover:text-amber-800 border-amber-200"
          //   onClick={() => onReturnItem(row.original.loan_item_id)}
          //   disabled={isReturning}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Kembalikan
        </Button>
      </div>
    ),
  },
];
