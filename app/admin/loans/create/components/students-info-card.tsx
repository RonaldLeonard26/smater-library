import { Students } from '../../../../../types/type';

interface PropsTypes {
  student: Students;
  remainingSlots: number;
}

export default function StudentsInfoCard(props: PropsTypes) {
  const { student, remainingSlots } = props;
  return (
    <div className="border rounded-sm p-3 bg-teal-50 space-y-2 border-teal-200">
      <p className="text-sm text-slate-500">
        Nama : <span className="font-bold">{student.full_name}</span>
      </p>
      <p className="text-sm text-slate-500">
        NISN : <span className="font-bold">{student.nisn}</span>
      </p>
      <p className="text-sm text-slate-500">
        Kuota Pinjam : <span className="font-bold">{remainingSlots} / 3</span>
      </p>
    </div>
  );
}
