import {
  BookOpenText,
  BookUp2,
  LayoutGrid,
  Settings,
  Tag,
  Users,
} from 'lucide-react';

export const SIDEBAR_ADMIN = [
  {
    key: 'dashboard',
    label: 'Menu',
    href: '/admin/dashboard',
    icon: LayoutGrid,
    dsc: '',
  },
  {
    key: 'loans',
    label: 'Transaksi',
    href: '/admin/loans',
    icon: BookUp2,
    dsc: 'Kelola transaksi peminjaman dan pengembalian buku',
  },
  {
    key: 'books',
    label: 'Data Buku',
    href: '/admin/books',
    icon: BookOpenText,
    dsc: 'Kelola data buku perpustakaan',
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
