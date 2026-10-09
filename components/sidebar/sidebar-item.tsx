import {
  ArrowDownLeft,
  ArrowUpRight,
  BookOpenText,
  BookUp2,
  History,
  LayoutGrid,
  Settings,
  Tag,
  Users,
} from 'lucide-react';

export const SIDEBAR_ADMIN = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutGrid,
    dsc: 'Pantau performa koleksi buku, tren peminjaman, dan permintaan siswa.',
  },
  {
    key: 'books',
    label: 'Data Buku',
    href: '/admin/books',
    icon: BookOpenText,
    dsc: 'Kelola data buku perpustakaan',
  },
  {
    key: 'loans',
    label: 'Transaksi',
    icon: BookUp2,
    dsc: 'Kelola transaksi peminjaman dan pengembalian buku',
    children: [
      {
        key: 'loans',
        label: 'Peminjaman',
        href: '/admin/transactions/borrow',
        icon: ArrowUpRight,
      },
      {
        key: 'returns',
        label: 'Pengembalian',
        href: '/admin/transactions/return',
        icon: ArrowDownLeft,
      },
      {
        key: 'history',
        label: 'Riwayat',
        href: '/admin/transactions/history',
        icon: History,
      },
    ],
  },

  {
    key: 'categories',
    label: 'Kategori',
    href: '/admin/categories',
    icon: Tag,
    dsc: 'Kelola data kategori perpustakaan',
  },

  {
    key: 'students',
    label: 'Siswa',
    href: '/admin/students',
    icon: Users,
    dsc: 'Kelola data siswa, edit dan hapus data siswa',
  },
  {
    key: 'settings',
    label: 'Pengaturan',
    href: '/admin/settings',
    icon: Settings,
  },
];
