import { LoanHistoryItem } from '@/types/history';
import { formatDate } from '@/utils/format-date';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const columns: ColumnDef<LoanHistoryItem>[] = [
  {
    accessorKey: 'book_title',
    header: () => <p className="font-semibold">Buku</p>,
    cell: ({ row }) => {
      const authors = row.original.book_authors;
      const authorsList = authors ? authors.split('|').filter(Boolean) : [];
      return (
        <div className="flex items-start gap-2 max-w-75">
          {row.original.cover_url && (
            <div className="relative h-18 w-14 overflow-hidden rounded border bg-slate-100 shadow-sm">
              <Image
                src={row.original.cover_url}
                alt="cover"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-col flex-1  gap-2">
            <p className="text-wrap font-medium text-sm">
              {row.original.book_title}
            </p>
            <p className="font-medium text-xs">
              Kategori :{' '}
              <span className="text-muted-foreground text-xs">
                {' '}
                {row.original.category_name}
              </span>
            </p>
            <div className="flex items-center font-medium text-xs gap-1.5 flex-wrap">
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
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'barcode',
    header: () => <p className="font-semibold text-center">Barcode</p>,
    cell: ({ row }) => {
      return (
        <p className="inline-flex w-fit max-w-full items-center rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-xs font-medium text-slate-600">
          {row.original.barcode}
        </p>
      );
    },
  },
  {
    accessorKey: 'student_name',
    header: () => <p className="font-semibold">Siswa</p>,
    cell: ({ row }) => {
      return (
        <div className="max-w-48">
          <p className="text-wrap font-medium text-sm">
            {row.original.student_name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'loan_date',
    header: () => <p className="font-semibold text-center">Tgl Pinjam</p>,
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium text-sm">
            {formatDate(row.original.loan_date)}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'due_date',
    header: () => <p className="font-semibold">Tenggat</p>,
    cell: ({ row }) => {
      return (
        <p className="font-medium text-sm">
          {formatDate(row.original.due_date)}
        </p>
      );
    },
  },
  {
    accessorKey: 'returned_at',
    header: () => <p className="font-semibold text-center">Dikembalikan</p>,
    cell: ({ row }) => {
      return (
        <p className="font-medium text-sm text-center">
          {formatDate(row.original.returned_at)}
        </p>
      );
    },
  },
];
