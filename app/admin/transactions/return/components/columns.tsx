import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AllActiveLoans } from '@/types/loans';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { ColumnDef } from '@tanstack/react-table';
import { RotateCcw } from 'lucide-react';
import Image from 'next/image';

interface ReturnColumnProps {
  onReturn: (item: AllActiveLoans) => void;
  selectedItems: Record<string, AllActiveLoans>;
  onToggleRow: (item: AllActiveLoans, checked: boolean) => void;
}

export const getReturnColumns = ({
  onReturn,
  selectedItems,
  onToggleRow,
}: ReturnColumnProps): ColumnDef<AllActiveLoans>[] => [
  {
    accessorKey: 'student_name',
    header: () => <p className="font-semibold">Nama</p>,
    cell: ({ row }) => (
      <p className="font-medium text-wrap text-sm">
        {row.original.student_name}
      </p>
    ),
  },
  {
    accessorKey: 'cover_url',
    header: () => <p className="font-semibold">Cover</p>,
    cell: ({ row }) => (
      <div className="relative h-20 w-14 overflow-hidden rounded border bg-slate-100 shadow-sm ">
        {row.original.cover_url && (
          <Image
            loading="eager"
            src={row.original.cover_url}
            alt="cover_url"
            fill
            className="object-cover"
            sizes="80px"
          />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'book_title',
    header: () => <p className="p-0 font-semibold ">Judul & Penulis</p>,
    cell: ({ row }) => {
      const authors = row.original.book_authors;
      const authorsList = authors ? authors.split('|').filter(Boolean) : [];
      return (
        <div className="flex flex-col p-0 gap-1 max-w-50 ">
          <p className="font-medium text-sm line-clamp-2">
            {row.original.book_title}
          </p>
          <div className="flex flex-wrap items-center">
            Penulis :
            {authorsList.map((author, index) => (
              <span
                className="text-xs text-muted-foreground font-medium"
                key={index}
              >
                {author} {index < authorsList.length - 1 && ','}
              </span>
            ))}
          </div>
          <p className="inline-flex w-fit max-w-full items-center rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-xs font-medium text-slate-600">
            {row.original.barcode}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'loan_date',
    header: () => <p className="font-semibold ">Tgl Pinjam</p>,
    cell: ({ row }) => (
      <p className="text-sm  font-medium">
        {formatDate(row.original.loan_date)}
      </p>
    ),
  },
  {
    accessorKey: 'due_date',
    header: () => <p className="font-semibold ">Tenggat</p>,
    cell: ({ row }) => {
      const dueDate = new Date(row.original.due_date);

      return <p className="text-sm font-medium">{formatDate(dueDate)}</p>;
    },
  },
  {
    accessorKey: 'estimated_fine',
    header: () => <p className="font-semibold ">Est. Denda</p>,
    cell: ({ row }) => {
      const fine = row.original.estimated_fine;
      return (
        <p
          className={`text-sm text-center font-medium ${fine > 0 ? 'text-rose-600' : 'text-slate-500'}`}
        >
          {fine > 0 ? formatCurrency(fine) : 'Rp 0'}
        </p>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="text-center">
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-1 text-xs text-amber-700 hover:bg-amber-50 hover:text-amber-800 border-amber-200"
          onClick={() => onReturn(row.original)}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Kembalikan
        </Button>
      </div>
    ),
  },

  {
    id: 'select',
    header: ({ table }) => {
      const selectAbleRows = table
        .getRowModel()
        .rows.filter((row) => row.getCanSelect());
      const selectedRows = selectAbleRows.filter(
        (row) => selectedItems[row.original.loan_item_id],
      );
      const allSelected =
        selectAbleRows.length > 0 &&
        selectedRows.length === selectAbleRows.length;
      const someSelected = selectedRows.length > 0 && !allSelected;

      const studentsInCurrentPage = new Set(
        table.getRowModel().rows.map((row) => row.original.student_id),
      );
      const hasSingleStudent = studentsInCurrentPage.size === 1;
      const hasSelectedStudent = Object.keys(selectedItems).length > 0;
      const canSelectAll = hasSelectedStudent || hasSingleStudent;

      return (
        <Checkbox
          disabled={!canSelectAll}
          checked={allSelected ? true : someSelected ? 'indeterminate' : false}
          onCheckedChange={(checked) => {
            selectAbleRows.forEach((row) => {
              onToggleRow(row.original, !!checked);
            });
          }}
          aria-label="Pilih semua buku"
        />
      );
    },

    cell: ({ row }) => {
      const item = row.original;

      return (
        <Checkbox
          checked={!!selectedItems[item.loan_item_id]}
          disabled={!row.getCanSelect()}
          onCheckedChange={(checked) => onToggleRow(item, !!checked)}
          aria-label={`Pilih ${item.book_title}`}
        />
      );
    },

    enableSorting: false,
    enableHiding: false,
  },
];
