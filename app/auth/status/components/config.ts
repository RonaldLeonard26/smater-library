import { CheckCircle2, Clock, LucideIcon, XCircle } from 'lucide-react';
import { RegistrationStatus } from '../status';

export const CONFIG: Record<
  RegistrationStatus,
  { icon: LucideIcon; title: string; description: string; iconClass: string }
> = {
  PENDING: {
    icon: Clock,
    title: 'Menunggu persetujuan',
    description:
      'Pendaftaranmu sudah diterima. Admin perpustakaan sedang memeriksa data NIS/NISN-mu. Halaman ini akan berubah otomatis setelah disetujui.',
    iconClass:
      'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400',
  },
  ACTIVE: {
    icon: CheckCircle2,
    title: 'Akun kamu sudah aktif',
    description:
      'Data kamu sudah diverifikasi. Akunmu sekarang bisa digunakan untuk meminjam buku.',
    iconClass:
      'bg-teal-100 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400',
  },
  REJECTED: {
    icon: XCircle,
    title: 'Pendaftaran ditolak',
    description:
      'Data yang kamu daftarkan belum sesuai. Silakan hubungi admin perpustakaan untuk informasi lebih lanjut.',
    iconClass: 'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400',
  },
};
