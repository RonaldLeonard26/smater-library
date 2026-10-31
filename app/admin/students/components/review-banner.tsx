'use client';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Student } from '@/types/student';
import useReviewStudent from '../hooks/useReviewStudents';

export default function ReviewBanner({ student }: { student: Student }) {
  const { mutate, isPending } = useReviewStudent();
  if (student.status !== 'PENDING') return null;

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <Clock className="mt-0.5 size-5 text-amber-600" />
        <div className="text-sm">
          <p className="font-medium text-amber-900">Menunggu persetujuan</p>
          <p className="text-amber-800">
            Cocokkan NIS/NISN dengan data sekolah. Jika ada koreksi, simpan dulu
            di form profil, baru setujui.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={() => mutate({ studentId: student.id, action: 'REJECT' })}
        >
          <XCircle className="size-4" /> Tolak
        </Button>
        <Button
          disabled={isPending}
          onClick={() => mutate({ studentId: student.id, action: 'APPROVE' })}
        >
          <CheckCircle2 className="size-4" /> Setujui
        </Button>
      </div>
    </div>
  );
}
