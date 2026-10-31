'use client';
import { studentServices } from '@/services/students.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function usePendingCount() {
  return useQuery({
    queryKey: ['pending-count'],
    queryFn: studentServices.getPendingCount,
    refetchInterval: 30000,
  });
}

export default function useReviewStudent() {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: studentServices.reviewStudent,
    onSuccess: (_, v) => {
      toast.success(
        v.action === 'APPROVE' ? 'Siswa disetujui' : 'Pendaftaran ditolak',
      );
      qc.invalidateQueries({ queryKey: ['students'] });
      qc.invalidateQueries({ queryKey: ['student'] }); // key detail, sesuaikan
      qc.invalidateQueries({ queryKey: ['pending-count'] });
      router.refresh(); // kalau halaman detail memuat data lewat server component
    },
    onError: (e) => toast.error(e.message),
  });
}
