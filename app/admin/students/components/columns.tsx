'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Student } from '@/types/student';
import { ColumnDef } from '@tanstack/react-table';
import { SquarePen, Trash2 } from 'lucide-react';
import Link from 'next/link';

export const columns = (
  onDelete: (student: Student) => void,
): ColumnDef<Student>[] => [
  {
    accessorKey: 'full_name',
    header: 'Nama',
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={student.profile_picture ?? undefined}
              alt={student.full_name}
            />
            <AvatarFallback>
              {student.full_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <span className="font-medium">{student.full_name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'nisn',
    header: 'NISN',
  },
  {
    accessorKey: 'nis',
    header: 'NIS',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="text-primary hover:bg-accent">
                <Link href={`/admin/students/${student.id}`}>
                  {' '}
                  <SquarePen className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Detail</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => onDelete(student)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hapus</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];
