import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StudentLoanInfo } from '@/types/type';
import Link from 'next/link';

interface PropsTypes {
  student: StudentLoanInfo;
  currentLoans: number;
}

export default function StudentsInfoCard(props: PropsTypes) {
  const { student, currentLoans } = props;
  const isQuotaFull = currentLoans >= 3;
  return (
    <div
      className={cn(
        'rounded-sm p-3 space-y-2 mx-2 lg:mx-0',
        isQuotaFull
          ? 'border border-red-200 bg-destructive/5'
          : 'bg-teal-50 border border-teal-200',
      )}
    >
      <p className="text-sm text-slate-500">
        Nama : <span className="font-bold">{student.full_name}</span>
      </p>
      <p className="text-sm text-slate-500">
        NISN : <span className="font-bold">{student.nisn}</span>
      </p>

      {isQuotaFull ? (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Siswa telah mencapai batas maksimal peminjaman{' '}
          </p>
          <Link href={'/admin/loans'}>
            <Button variant="link" className="text-sm text-slate-500">
              Lihat daftar
            </Button>
          </Link>
        </div>
      ) : (
        <p className="text-sm text-slate-500">
          Kuota Pinjam : <span className="font-bold">{currentLoans} / 3</span>
        </p>
      )}
    </div>
  );
}
