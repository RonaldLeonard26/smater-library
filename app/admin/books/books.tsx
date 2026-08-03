'use client';

import TableToolbar from '@/components/data-table/table-toolbar';
import { useEffect, useState } from 'react';
import AddBooksModal from './components/modals/add-books-modal';
import DataTable from '@/components/data-table/date-table';
import { columns } from './components/columns';
import useBooks from './components/hooks/useBooks';
import { SkeletonTable } from '@/components/skeleton/skeleton-table';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '@/constants/list.constants';
import useDebounce from '@/components/hooks/useDebounce';

export default function Books() {
  const [mounted, setMounted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const debouncedSearch = useDebounce(globalFilter, 500);

  const [pagination, setPagination] = useState({
    pageIndex: PAGE_DEFAULT,
    pageSize: Number(LIMIT_DEFAULT),
  });
  const { books, total, isLoading } = useBooks(
    pagination.pageIndex,
    pagination.pageSize,
    debouncedSearch,
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-full flex flex-col gap-4 px-2 overflow-hidden">
      <TableToolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      >
        <AddBooksModal />
      </TableToolbar>
      <div className="flex-1 min-h-0 w-full">
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <DataTable
            data={books || []}
            columns={columns}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            pagination={pagination}
            setPagination={setPagination}
            pageCount={Math.ceil(total / pagination.pageSize)}
          />
        )}
      </div>
    </div>
  );
}
