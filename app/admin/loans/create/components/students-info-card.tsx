import { Students } from '../../../../../types/type';

interface PropsTypes {
  student: Students;
  totalLoans: number;
}

export default function StudentsInfoCard(props: PropsTypes) {
  const { student, totalLoans } = props;
  return (
    <div className="border rounded-sm p-3 bg-teal-50 space-y-2 border-teal-200">
      <p className="text-sm text-slate-500">
        Nama : <span className="font-bold">{student.full_name}</span>
      </p>
      <p className="text-sm text-slate-500">
        NISN : <span className="font-bold">{student.nisn}</span>
      </p>
      <p className="text-sm text-slate-500">
        {totalLoans >= 3 ? (
          'Siswa sudah memenuhi kuota peminjaman'
        ) : (
          <p>
            Kuota Pinjam : <span className="font-bold">{totalLoans} / 3</span>
          </p>
        )}
      </p>
    </div>
  );
}
