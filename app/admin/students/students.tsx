'use client';

import TableToolbar from '@/components/data-table/table-toolbar';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '@/constants/list.constants';
import { useState } from 'react';
import useGetStudents from './hooks/useGetStudents';
import { SkeletonTable } from '@/components/skeleton/skeleton-table';
import DataTable from '@/components/data-table/date-table';
import { columns } from './components/columns';
import { RegistrationStatus, Student } from '@/types/student';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { usePendingCount } from './hooks/useReviewStudents';

export default function Students() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [status, setStatus] = useState<RegistrationStatus | 'ALL'>('ALL');
  const [pagination, setPagination] = useState({
    pageIndex: PAGE_DEFAULT,
    pageSize: Number(LIMIT_DEFAULT),
  });
  const { data: pendingCount } = usePendingCount();
  const { students, total, isLoading } = useGetStudents({
    search: globalFilter,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    status,
  });
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const resetPage = () => setPagination((p) => ({ ...p, pageIndex: 0 }));
  return (
    <div className="flex h-full min-h-0 pl-1 flex-col gap-4 overflow-hidden">
      <Tabs
        value={status}
        onValueChange={(v) => {
          setStatus(v as RegistrationStatus | 'ALL');
          resetPage();
        }}
      >
        <TabsList className="w-full max-w-xs">
          <TabsTrigger value="ALL">Semua</TabsTrigger>
          <TabsTrigger value="PENDING" className="gap-2 text-sm">
            Menunggu
            {!!pendingCount && (
              <Badge className="h-5 px-1.5">{pendingCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="ACTIVE">Aktif</TabsTrigger>
          <TabsTrigger value="REJECTED">Ditolak</TabsTrigger>
        </TabsList>
      </Tabs>
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
          containerClassName="max-h-[74vh]"
        />
      )}
    </div>
  );
}
