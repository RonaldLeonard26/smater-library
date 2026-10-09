'use client';

import { useParams } from 'next/navigation';
import Detail from './components/detail';
import useGetStudentId from '../hooks/useGetStudentId';

export default function DetailPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const { student, isLoading, error } = useGetStudentId(studentId);

  if (!student) {
    return <div>Siswa tidak ditemukan.</div>;
  }

  return (
    <>
      <Detail student={student} />
    </>
  );
}
