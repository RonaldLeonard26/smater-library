'use client';

import { useState } from 'react';
import useGetHistory from './hooks/useGetHistory';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '@/constants/list.constants';
import DataTable from '@/components/data-table/date-table';
import { SkeletonTable } from '@/components/skeleton/skeleton-table';
import { columns } from './components/columns';

export default function History() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: PAGE_DEFAULT,
    pageSize: Number(LIMIT_DEFAULT),
  });
  const [statusLoan, setStatusLoan] = useState('ALL');
  const [copyStatus, setcopyStatus] = useState('ALL');
  const { history, total, isLoading } = useGetHistory({
    search: globalFilter,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    status: statusLoan,
    copyStatus: copyStatus,
  });

  return (
    <div className="h-full flex flex-col gap-4 p-2 overflow-hidden">
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <DataTable
          data={history || []}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={Math.ceil(total / pagination.pageSize)}
          rowSpanBy="book_id"
          rowSpanColumns={['book_title']}
          getRowId={(row) => row.loan_item_id}
        />
      )}
    </div>
  );
}
