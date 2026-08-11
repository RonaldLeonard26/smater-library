import { Card, CardContent } from '@/components/ui/card';
import { FormattedHistoryLoan } from '@/types/student-loan';
import { Calendar, CircleCheck } from 'lucide-react';
import Image from 'next/image';

export default function CardHistoryBook({
  loan,
}: {
  loan: FormattedHistoryLoan;
}) {
  return (
    <Card className="overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <CardContent className="flex items-center p-4 gap-4">
        <div className="relative w-20 h-28 shrink-0 rounded-lg overflow-hidden bg-slate-100">
          {loan.coverUrl ? (
            <Image
              src={loan.coverUrl}
              alt={loan.bookTitle}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
              No Cover
            </div>
          )}
        </div>

        {/* info peminjaman */}
        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-slate-700 line-clamp-1">
              {loan.bookTitle}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {loan.bookAuthor}
            </p>
          </div>

          <div className="space-y-1 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Pinjam: {loan.borrowDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CircleCheck className="h-3.5 w-3.5 text-primary" />
              <span>Dikembalikan: {loan.returnedDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
