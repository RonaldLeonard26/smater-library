'use client';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '@/constants/list.constants';
import { useEffect, useState } from 'react';
import { SkeletonTable } from '@/components/skeleton/skeleton-table';
import { ScanQrCode } from 'lucide-react';
import { LoanItem } from '@/types/type';
import { columns } from './components/columns';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/data-table/date-table';
import TableToolbar from '@/components/data-table/table-toolbar';
import useDebounce from '@/components/hooks/useDebounce';
import useLoans from './components/hooks/useLoans';
import Link from 'next/link';
import ScannerDialog from './components/modals/scanner-dialog';
import useReturnLoan from './components/hooks/useReturnLoan';
import ReturnLoanModal from './components/modals/return-loan-modal';

export default function ListLoans() {
  const [mounted, setMounted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [loanData, setLoanData] = useState<LoanItem | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: PAGE_DEFAULT,
    pageSize: Number(LIMIT_DEFAULT),
  });
  const { loanItems, total, isLoading } = useLoans(
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
  );
  const { getLoanByBarcode, isFetchingByBarcode } = useReturnLoan();

  const handleScanSuccess = async (barcode: string) => {
    try {
      const loanData = await getLoanByBarcode(barcode);
      if (loanData) {
        setLoanData(loanData);
        setIsOpenModal(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
          <Button variant="outline" onClick={() => setIsScannerOpen(true)}>
            <ScanQrCode />
            Pindai Buku
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
      <ScannerDialog
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        title="Pindai Barcode Pengembalian Buku"
      />

      {loanData && (
        <ReturnLoanModal
          loanItem={loanData}
          isOpen={isOpenModal}
          onClose={() => {
            setIsOpenModal(false);
            setLoanData(null);
          }}
        />
      )}
    </div>
  );
}
