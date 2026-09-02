import { clsx, type ClassValue } from 'clsx';

import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIsbnPattern(value: string): string {
  if (!value) return '-';
  // 1. Ambil hanya angka/karakter alphanumeric (hapus dash lama)
  const cleaned = value.replace(/[^a-zA-Z0-9]/g, '');

  // 2. Tambahkan dash setiap 3 digit
  const match = cleaned.match(/.{1,3}/g);

  return match ? match.join('-') : value;
}
