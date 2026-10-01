import { ActiveLoanItem } from '@/types/loans';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import Image from 'next/image';

interface LoanInfoCardProps {
  item: ActiveLoanItem;
}

export default function LoanInfoCard({ item }: LoanInfoCardProps) {
  const authors = item.book_authors
    ? item.book_authors.split('|').filter(Boolean)
    : [];

  const isOverdue = item.days_overdue > 0;

  return (
    <div className="flex gap-3 rounded-lg border shadow-sm   bg-card p-3">
      {/* Cover */}
      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-md border bg-slate-100 shadow-sm">
        {item.cover_url ? (
          <Image
            loading="eager"
            src={item.cover_url}
            alt={`Cover ${item.book_title}`}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-center text-[10px] text-muted-foreground">
            No Cover
          </div>
        )}
      </div>

      {/* Information */}
      <div className="min-w-0 flex-1 space-y-1.5">
        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight">
          {item.book_title}
        </h3>

        {/* Authors */}
        {authors.length > 0 && (
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {authors.join(', ')}
          </p>
        )}

        {/* Barcode */}
        <p className="inline-flex max-w-full rounded border bg-muted px-2 py-0.5 font-mono text-[11px] font-medium">
          {item.barcode}
        </p>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 text-xs">
          <div>
            <p className="text-muted-foreground">Tgl. Pinjam</p>
            <p className="font-medium">{formatDate(item.loan_date)}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Jatuh Tempo</p>
            <p
              className={
                isOverdue ? 'font-medium text-destructive' : 'font-medium'
              }
            >
              {formatDate(item.due_date)}
            </p>
          </div>
        </div>

        {/* Fine */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          {isOverdue ? (
            <p className="text-xs font-medium text-destructive">
              Terlambat {item.days_overdue} hari
            </p>
          ) : (
            <p className="text-xs font-medium text-emerald-600">
              Tidak terlambat
            </p>
          )}

          <p
            className={`text-xs font-semibold ${
              item.estimated_fine > 0
                ? 'text-destructive'
                : 'text-muted-foreground'
            }`}
          >
            Denda: {formatCurrency(item.estimated_fine)}
          </p>
        </div>
      </div>
    </div>
  );
}
