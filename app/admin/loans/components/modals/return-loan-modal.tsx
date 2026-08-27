import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import useReturnLoan from '../hooks/useReturnLoan';
import { LoanItem } from '@/types/type';
import { differenceInCalendarDays } from 'date-fns';
import { formatDate } from '@/utils/format-date';
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoanModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  loanItem: LoanItem;
}

export default function ReturnLoanModal({
  isOpen,
  onClose,
  loanItem,
}: LoanModalProps) {
  const { handleReturnLoan, isPendingReturnLoan } = useReturnLoan();

  const daysLate = Math.max(
    differenceInCalendarDays(new Date(), new Date(loanItem.due_date)),
    0,
  );

  const fineAmount = daysLate * loanItem.fine_amount_per_day;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Pengembalian
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Pengembalian Buku</DialogTitle>
          <DialogDescription>
            Informasi buku yang akan dikembalikan
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-3">
          <div className="border-b pb-2">
            <p className="text-muted-foreground">Peminjam</p>
            <p className="font-semibold text-slate-800">
              {loanItem.full_name} ({loanItem.nisn})
            </p>
          </div>
          <div className="border-b pb-2 space-y-2">
            <p className="text-muted-foreground">
              Judul :{' '}
              <span className="font-semibold text-black">{loanItem.title}</span>
            </p>
            <p className="text-muted-foreground">
              Barcode :{' '}
              <span className="font-mono font-semibold text-black">
                {loanItem.barcode}
              </span>
            </p>
            <p className="text-muted-foreground">
              Tanggal Pinjam :{' '}
              <span className="text-black font-semibold">
                {formatDate(loanItem.loan_date)}
              </span>
            </p>
            <p className="text-muted-foreground">
              Jatuh Tempo :{' '}
              <span className="text-black font-semibold">
                {formatDate(loanItem.due_date)}
              </span>
            </p>
          </div>
          {daysLate > 0 ? (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-3 items-start">
              <AlertTriangle
                className="text-amber-600 shrink-0 mt-0.5"
                size={18}
              />
              <div>
                <p className="font-bold text-amber-800">
                  This loan is OVERDUE!
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Terlambat <span className="font-bold">{daysLate} hari</span>.
                  Total denda yang wajib ditagih ke siswa:
                </p>
                <p className="text-lg font-black text-amber-900 mt-1">
                  Rp {fineAmount.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex gap-3 items-start">
              <CheckCircle2
                className="text-emerald-600 shrink-0 mt-0.5"
                size={18}
              />
              <div>
                <p className="font-bold text-emerald-800">On Time Return</p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Buku dikembalikan sesuai masa pinjam. Tidak ada denda.
                </p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPendingReturnLoan}
          >
            Batal
          </Button>
          {/* 4. TEMBAK RPC UTAMA SAAT MODAL DI-SUBMIT */}
          <Button
            onClick={() => handleReturnLoan(loanItem.loan_item_id)}
            disabled={isPendingReturnLoan}
            className=" hover:bg-slate-800 bg-primary text-white"
          >
            {isPendingReturnLoan ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Ya
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
