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
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutGrid,
  },
  {
    key: 'loans',
    label: 'Loans',
    href: '/admin/loans',
    icon: BookUp2,
  },
  {
    key: 'books',
    label: 'Books',
    href: '/admin/books',
    icon: BookOpenText,
  },
  {
    key: 'categories',
    label: 'Categories',
    href: '/admin/categories',
    icon: Tag,
  },

  {
    key: 'students',
    label: 'Students',
    href: '/admin/students',
    icon: Users,
  },
  {
    key: 'settings',
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];
