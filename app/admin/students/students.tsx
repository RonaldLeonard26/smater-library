'use client';

import TableToolbar from '@/components/data-table/table-toolbar';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '@/constants/list.constants';
import { useState } from 'react';
import useGetStudents from './hooks/useGetStudents';
import { SkeletonTable } from '@/components/skeleton/skeleton-table';
import DataTable from '@/components/data-table/date-table';
import { columns } from './components/columns';
import { Student } from '@/types/student';

export default function Students() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: PAGE_DEFAULT,
    pageSize: Number(LIMIT_DEFAULT),
  });
  const { students, total, isLoading } = useGetStudents({
    search: globalFilter,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  return (
    <div className="flex h-full flex-col gap-4 p-2 overflow-hidden">
      <TableToolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <DataTable
          data={students || []}
          columns={columns(setStudentToDelete)}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={Math.ceil(total / pagination.pageSize)}
          containerClassName="max-h-[81vh]"
        />
      )}
    </div>
  );
}
