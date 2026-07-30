import { BookOpen, Heart, User } from 'lucide-react';

export const navLinks = [
  {
    title: 'Beranda',
    href: '/',
  },
  {
    title: 'Katalog',
    href: '/books',
  },
  {
    title: 'Tentang',
    href: '/about',
  },
];

export const navStudents = [
  {
    key: 'wishlist',
    label: 'Wishlist',
    href: '/student/wishlist',
    icon: Heart,
  },
  {
    key: 'my-book',
    label: 'My Books',
    href: '/student/my-books',
    icon: BookOpen,
  },
  {
    key: 'profile',
    label: 'Profile',
    href: '/student/profile',
    icon: User,
  },
];
