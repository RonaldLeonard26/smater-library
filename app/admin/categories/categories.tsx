'use client';

import { useEffect, useState } from 'react';
import DataTable from '@/components/data-table/date-table';
import { columns } from '../categories/components/columns';
import TableToolbar from '@/components/data-table/table-toolbar';
import AddCategoryModal from './components/modal/add-categories-modal';
import useCategories from './components/hooks/useCategories';
import { SkeletonTable } from '@/components/skeleton/skeleton-table';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '@/constants/list.constants';

export default function Categories() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [mounted, setMounted] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: PAGE_DEFAULT,
    pageSize: Number(LIMIT_DEFAULT),
  });
  const { categories, total, isLoading } = useCategories(
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col p-2 gap-4">
      <TableToolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      >
        <AddCategoryModal />
      </TableToolbar>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <DataTable
          data={categories || []}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={Math.ceil(total / pagination.pageSize)}
        />
      )}
    </div>
  );
}
