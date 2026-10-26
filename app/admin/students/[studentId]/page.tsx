'use client';

import { useParams } from 'next/navigation';
import Detail from './components/detail';
import useGetStudentId from '../hooks/useGetStudentId';

export default function DetailPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const { student, isLoading, error } = useGetStudentId(studentId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-muted-foreground text-sm animate-pulse">
          Sedang memuat data...
        </p>
      </div>
    );
  }
  if (!student) {
    return (
      <div className="flex items-center justify-between text-muted-foreground text-sm animate-pulse">
        Siswa tidak ditemukan.
      </div>
    );
  }

  return (
    <>
      <Detail student={student} />
    </>
  );
}
