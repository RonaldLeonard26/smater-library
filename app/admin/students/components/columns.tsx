import { Student } from '@/types/student';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'profile_picture',
    header: 'Foto',
  },
  {
    accessorKey: 'full_name',
    header: 'Nama',
  },
  {
    accessorKey: 'nisn',
    header: 'NISN',
  },
  {
    accessorKey: 'nis',
    header: 'NIS',
  },
];
