'use client';

import DataTable from '@/components/data-table/date-table';
import TableToolbar from '@/components/data-table/table-toolbar';
import useDebounce from '@/components/hooks/useDebounce';
import { SkeletonTable } from '@/components/skeleton/skeleton-table';
import { Button } from '@/components/ui/button';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '@/constants/list.constants';
import { useEffect, useState } from 'react';
import { columns } from './components/columns';
import useLoans from './components/hooks/useLoans';
import Link from 'next/link';
import { ScanQrCode } from 'lucide-react';

export default function ListLoans() {
  const [mounted, setMounted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const debouncedSearch = useDebounce(globalFilter, 500);

  const [pagination, setPagination] = useState({
    pageIndex: PAGE_DEFAULT,
    pageSize: Number(LIMIT_DEFAULT),
  });
  const { loanItems, total, isLoading } = useLoans(
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
    <div className="h-full flex flex-col gap-4 p-2 overflow-hidden">
      <TableToolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      >
        <div className="flex items-center justify-between gap-4">
          <Button variant="outline">
            <ScanQrCode />
            Pindai untuk pengmbalian
          </Button>

          <Link href="/admin/loans/create">
            <Button variant="outline" className="bg-teal-500 text-white">
              Buat Pinjaman
            </Button>
          </Link>
        </div>
      </TableToolbar>
      <div className="flex-1 min-h-0 w-full">
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <DataTable
            data={loanItems ?? []}
            columns={columns}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            pagination={pagination}
            setPagination={setPagination}
            pageCount={Math.ceil(total / pagination.pageSize) || 0}
          />
        )}
      </div>
    </div>
  );
}
