import { AdminStatsOverview } from '@/types/stats.type';
import {
  AlertCircle,
  BookCheck,
  BookOpen,
  Heart,
  LucideIcon,
} from 'lucide-react';

export interface StatCardConfig {
  id: string;
  title: string;
  value: number;
  desc: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export const getStatsOverviewConfig = (
  overview?: AdminStatsOverview,
): StatCardConfig[] => [
  {
    id: 'total-books',
    title: 'Total Judul Buku',
    value: overview?.totalBooks ?? 0,
    desc: `${overview?.totalCopies ?? 0} Total Eksemplar Fisik`,
    icon: BookOpen,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    id: 'active-loans',
    title: 'Peminjaman Aktif',
    value: overview?.activeLoans ?? 0,
    desc: 'Buku sedang dipinjam siswa',
    icon: BookCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    id: 'overdue-loans',
    title: 'Terlambat Kembali',
    value: overview?.overdueLoans ?? 0,
    desc: 'Perlu di follow up',
    icon: AlertCircle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    id: 'total-wishlists',
    title: 'Total Wishlist Siswa',
    value: overview?.totalWishlists ?? 0,
    desc: 'Interaksi disimpan siswa',
    icon: Heart,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
];
