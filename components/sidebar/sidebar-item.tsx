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
  },
  {
    key: 'loans',
    label: 'Transaksi',
    href: '/admin/loans',
    icon: BookUp2,
  },
  {
    key: 'books',
    label: 'Data Buku',
    href: '/admin/books',
    icon: BookOpenText,
  },
  {
    key: 'categories',
    label: 'Kategori',
    href: '/admin/categories',
    icon: Tag,
  },

  {
    key: 'students',
    label: 'Siswa',
    href: '/admin/students',
    icon: Users,
  },
  {
    key: 'settings',
    label: 'Pengaturan',
    href: '/admin/settings',
    icon: Settings,
  },
];
