import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ActiveLoanItem, ReturnLoanPayload } from '@/types/loans';
import LoanInfoCard from './info-loan';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import useReturnLoan from '../hooks/useReturnLoan';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/format-currency';

export interface ReturnStudent {
  student_id: string;
  full_name: string;
  nis: string;
  nisn: string;
  profile_picture: string | null;
}

interface ReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: ReturnStudent | undefined;
  items: ActiveLoanItem[];
  onSubmit: (data: ReturnLoanPayload) => void;
  isPending: boolean;
}

export default function ReturnModal({
  isOpen,
  onClose,
  items,
  student,
  onSubmit,
  isPending,
}: ReturnModalProps) {
  if (!student) return null;
  const totalFine = items.reduce(
    (total, item) => total + Number(item.estimated_fine ?? 0),
    0,
  );
  const isBulk = items.length > 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn('max-w-sm', isBulk && '!max-w-2xl')}>
        <DialogHeader>
          <DialogTitle>Pengembalian Buku</DialogTitle>
          <DialogDescription>
            Periksa informasi buku yang akan dikembalikan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 pt-3">
          {/* Peminjam */}
          <div className="border-b pb-3">
            <p className="text-sm text-muted-foreground">
              Peminjam :{' '}
              <span className="font-semibold text-slate-800">
                {' '}
                {student?.full_name}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Nisn :{' '}
              <span className="font-semibold text-slate-800">
                {' '}
                {student?.nisn}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Nis :{' '}
              <span className="font-semibold text-slate-800">
                {' '}
                {student?.nis}
              </span>
            </p>
          </div>

          {/* Buku */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Buku yang dikembalikan</p>

            <div
              className={cn(
                'max-h-[46vh] overflow-y-auto pr-2',
                isBulk ? 'grid grid-cols-2 gap-1.5' : 'space-y-2',
              )}
            >
              {items.map((item) => (
                <LoanInfoCard key={item.loan_item_id} item={item} />
              ))}
            </div>
          </div>
        </div>
        {/* Submit nanti di sini */}
        <DialogFooter className="flex justify-between items-center">
          {totalFine > 0 && (
            <div className="text-sm bg-amber-50 text-amber-700 border px-1.5 py-1 border-amber-200 rounded-lg">
              Total denda :{' '}
              <span className="font-semibold ">
                {formatCurrency(totalFine)}
              </span>
            </div>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isPending}>
              Batal
            </Button>
            {/* 4. TEMBAK RPC UTAMA SAAT MODAL DI-SUBMIT */}
            <Button
              disabled={isPending}
              className=" hover:bg-slate-800 bg-primary text-white"
              onClick={() => {
                onSubmit({
                  copyIds: items.map((item) => item.book_copy_id),
                });
              }}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Ya
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
