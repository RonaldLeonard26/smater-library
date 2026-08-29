import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormattedHistoryLoan } from '@/types/student-loan';
import { Calendar, CircleCheck, Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CardHistoryProps {
  onRemove: () => void;
  loan: FormattedHistoryLoan;
  isLoading: boolean;
}

export default function CardHistoryBook({
  onRemove,
  loan,
  isLoading,
}: CardHistoryProps) {
  return (
    <Card className="overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <CardContent className=" relative flex items-center p-3 gap-4">
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

        <div className="absolute top-2 right-4 z-10">
          <Button
            onClick={onRemove}
            disabled={isLoading}
            variant="ghost"
            size="icon"
            className="cursor-pointer h-8 w-8 rounded-full bg-background backdrop-blur-md hover:bg-white shadow-sm border border-slate-100"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 text-destructive" />
            )}
          </Button>
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
