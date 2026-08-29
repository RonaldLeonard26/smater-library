import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LoanItem } from '@/types/student-loan';
import { AlertCircle, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function CardBorrowedBook({ loan }: { loan: LoanItem }) {
  return (
    <Card className="overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <CardContent className="flex items-center p-4 gap-4">
        {/* COVER */}
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
              <span>Tgl Pinjam: {loan.borrowDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-slate-400" />
              <span>Jatuh Tempo: {loan.dueDate}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="pt-1">
            <Badge
              variant="outline"
              className={cn(
                'text-[10px] font-medium border-none px-2 py-0.5',
                loan.isOverdue
                  ? 'bg-red-50 text-red-600'
                  : loan.daysRemaining <= 2
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-primary/10 text-primary',
              )}
            >
              {loan.isOverdue
                ? `Terlambat ${Math.abs(loan.daysRemaining)} Hari`
                : `${loan.daysRemaining} Hari Lagi`}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
