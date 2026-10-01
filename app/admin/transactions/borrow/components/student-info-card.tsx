import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoanType, StudentLoanInfo } from '@/types/loans';
import { PlusCircle } from 'lucide-react';

interface StudentInfoProps {
  student: StudentLoanInfo;
  currentLoans: number;
  onOpenModal: () => void;
  type: LoanType;
}

export default function StudentsInfoCard({
  student,
  currentLoans,
  onOpenModal,
  type,
}: StudentInfoProps) {
  const isQuotaFull = currentLoans >= 40;

  return (
    <div
      className={cn(
        'rounded-md p-4 w-1/2 space-y-2.5 mx-2 lg:mx-0 transition-colors',
        isQuotaFull
          ? 'border border-rose-300 bg-rose-50/50'
          : 'border border-teal-200 bg-teal-50/50',
      )}
    >
      <div className="grid grid-cols-1 gap-2 text-sm text-slate-600">
        <p>
          Nama :{' '}
          <span className="font-semibold text-slate-800">
            {student.full_name}
          </span>
        </p>

        <p>
          NISN :{' '}
          <span className="font-semibold text-slate-800">{student.nisn}</span>
        </p>
        <p>
          NIS :{' '}
          <span className="font-semibold text-slate-800">{student.nis}</span>
        </p>
      </div>

      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Kuota Pinjam :{' '}
          <span
            className={cn(
              'font-bold',
              isQuotaFull ? 'text-rose-600' : 'text-teal-700',
            )}
          >
            {currentLoans} / 40
          </span>
        </p>

        {isQuotaFull ? (
          <span className="text-xs font-semibold text-rose-600 bg-rose-100 px-2.5 py-1 rounded-md border border-rose-200">
            Batas Maksimal Tercapai
          </span>
        ) : (
          <Button className="cursor-pointer" onClick={onOpenModal}>
            <PlusCircle className="w-4 h-4" />
            {type === 'ADD' ? 'Buat Pinjaman Baru' : 'Tambah Pinjaman'}
          </Button>
        )}
      </div>
    </div>
  );
}
