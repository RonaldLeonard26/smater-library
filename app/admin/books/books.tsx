'use client';

import TableToolbar from '@/components/data-table/table-toolbar';
import { useEffect, useState } from 'react';
import AddBooksModal from './components/modals/add-books-modal';
import DataTable from '@/components/data-table/date-table';
import { columns } from './components/columns';
import useBooks from './components/hooks/useBooks';

export default function Books() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [mounted, setMounted] = useState(false);
  const { dataBooks, isLoadingBooks } = useBooks();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2>Books</h2>
      <TableToolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      >
        <AddBooksModal />
      </TableToolbar>
      <DataTable
        data={dataBooks || []}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}
