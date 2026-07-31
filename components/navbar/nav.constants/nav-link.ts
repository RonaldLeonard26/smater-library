import { BookOpenText, Heart, User } from 'lucide-react';

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
    key: 'profile',
    label: 'Profile',
    href: '/student/profile',
    icon: User,
  },

  {
    key: 'my-book',
    label: 'My Books',
    href: '/student/my-books',
    icon: BookOpenText,
  },
  {
    key: 'wishlist',
    label: 'Wishlist',
    href: '/student/wishlist',
    icon: Heart,
  },
];
