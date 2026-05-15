'use client';

import { useState } from 'react';
import DataTable from '@/components/data-table/date-table';
import { columns } from '../categories/components/columns';
import TableToolbar from '@/components/data-table/table-toolbar';
import AddCategoryModal from './components/modal/add-categories-modal';

const data = [
  {
    name: 'Buku Mapel',
    duration_days: 1,
    fine_amount: 1000,
  },
  {
    name: 'Novel',
    duration_days: 5,
    fine_amount: 5000,
  },
  {
    name: 'Buku Paket',
    duration_days: 365,
    fine_amount: 10000,
  },
];

export default function Categories() {
  const [globalFilter, setGlobalFilter] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <h2>Categories</h2>
      <TableToolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      >
        <AddCategoryModal />
      </TableToolbar>
      <DataTable
        data={data}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}
