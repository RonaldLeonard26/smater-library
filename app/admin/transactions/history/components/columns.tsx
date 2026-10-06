import { cn } from '@/lib/utils';
import { LoanHistoryItem } from '@/types/history';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const columns: ColumnDef<LoanHistoryItem>[] = [
  {
    accessorKey: 'book_title',
    header: () => <p className="font-semibold whitespace-nowrap">Buku</p>,
    cell: ({ row }) => {
      const { book_title, cover_url, book_authors, category_name } =
        row.original;
      const authorsList =
        book_authors
          ?.split('|')
          .map((author) => author.trim())
          .filter(Boolean) ?? [];

      return (
        <div className="flex w-68 min-w-68 max-w-68 items-start gap-3">
          <div className="relative h-18 w-14 shrink-0 overflow-hidden rounded border bg-slate-100 shadow-sm">
            {cover_url ? (
              <Image
                src={cover_url}
                alt="cover"
                fill
                className="object-cover"
                sizes="65px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                -
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-wrap text-sm font-medium leading-5">
              {book_title}
            </p>
            <p className="text-xs font-medium leading-5">
              Kategori:{' '}
              <span className="font-normal text-muted-foreground">
                {category_name || '-'}
              </span>
            </p>
            <div className="text-xs font-medium leading-5">
              Penulis:{' '}
              {authorsList.length > 0 ? (
                <span className="font-normal text-muted-foreground">
                  {authorsList.join(', ')}
                </span>
              ) : (
                <span className="font-normal text-muted-foreground">-</span>
              )}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'barcode',
    header: () => <p className="font-semibold whitespace-nowrap">Barcode</p>,
    cell: ({ row }) => (
      <p className="inline-flex w-fit max-w-full items-center whitespace-nowrap rounded border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-600">
        {row.original.barcode}
      </p>
    ),
  },
  {
    accessorKey: 'student_name',
    header: () => <p className="font-semibold whitespace-nowrap">Siswa</p>,
    cell: ({ row }) => (
      <p className="w-46 min-w-46 max-w-46 whitespace-normal text-wrap text-sm font-medium leading-5">
        {row.original.student_name}
      </p>
    ),
  },
  {
    accessorKey: 'loan_date',
    header: () => <p className="font-semibold whitespace-nowrap">Tgl Pinjam</p>,
    cell: ({ row }) => (
      <p className="whitespace-nowrap text-sm font-medium">
        {formatDate(row.original.loan_date)}
      </p>
    ),
  },
  {
    accessorKey: 'due_date',
    header: () => <p className="font-semibold whitespace-nowrap">Tenggat</p>,
    cell: ({ row }) => (
      <p className="whitespace-nowrap text-sm font-medium">
        {formatDate(row.original.due_date)}
      </p>
    ),
  },

  {
    accessorKey: 'returned_at',
    header: () => (
      <p className="whitespace-nowrap text-center font-semibold">
        Dikembalikan
      </p>
    ),
    cell: ({ row }) => {
      const { returned_at, days_overdue } = row.original;

      return (
        <p
          className={cn(
            'whitespace-nowrap text-center text-sm font-medium',
            !returned_at
              ? 'text-muted-foreground'
              : days_overdue > 0
                ? 'text-destructive'
                : 'text-primary',
          )}
        >
          {formatDate(returned_at)}
        </p>
      );
    },
  },

  {
    accessorKey: 'days_overdue',
    header: () => <p className="whitespace-nowrap font-semibold">Terlambat</p>,
    cell: ({ row }) => {
      const daysOverdue = row.original.days_overdue;

      return (
        <p
          className={cn(
            'whitespace-nowrap text-sm font-medium',
            daysOverdue > 0 ? 'text-destructive' : 'text-muted-foreground',
          )}
        >
          {daysOverdue > 0 ? `${daysOverdue} hari` : '-'}
        </p>
      );
    },
  },
  {
    accessorKey: 'fine_amount',
    header: () => <p className="whitespace-nowrap font-semibold">Denda</p>,
    cell: ({ row }) => (
      <p className="whitespace-nowrap text-sm font-medium">
        {formatCurrency(row.original.fine_amount)}
      </p>
    ),
  },
];
