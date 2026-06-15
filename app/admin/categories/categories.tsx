'use client';

import { useEffect, useState } from 'react';
import DataTable from '@/components/data-table/date-table';
import { columns } from '../categories/components/columns';
import TableToolbar from '@/components/data-table/table-toolbar';
import AddCategoryModal from './components/modal/add-categories-modal';
import useCategories from './components/hooks/useCategories';
import { SkeletonTable } from '@/components/skeleton/skeleton-table';

export default function Categories() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [mounted, setMounted] = useState(false);
  const { dataCategories, isLoadingCategories } = useCategories();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2>Categories</h2>
      <TableToolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      >
        <AddCategoryModal />
      </TableToolbar>
      {isLoadingCategories ? (
        <SkeletonTable />
      ) : (
        <DataTable
          data={dataCategories || []}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
    </div>
  );
}
