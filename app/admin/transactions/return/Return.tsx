'use client';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '@/constants/list.constants';
import { Separator } from '@/components/ui/separator';
import { SkeletonTable } from '@/components/skeleton/skeleton-table';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useGetActiveLoans from './hooks/useGetActiveLoans';
import TableToolbar from '@/components/data-table/table-toolbar';
import BarcodeInput from './components/barcode-input';
import ReturnModal from './components/return-modal';
import ReturnTable from './components/return-table';
import useReturnLoan from './hooks/useReturnLoan';
import { ReturnLoanPayload } from '@/types/loans';
import useReturnByBarcode from './hooks/useReturnByBarcode';
import { toast } from 'sonner';

export default function Return() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: PAGE_DEFAULT,
    pageSize: Number(LIMIT_DEFAULT),
  });
  const { activeLoans, total, isLoading } = useGetActiveLoans({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: globalFilter,
  });

  const {
    handleCloseReturnModal,
    handleOpenReturnModal,
    handleOpenSingleReturn,
    setReturnItems,
    setIsReturnModalOpen,
    isReturnModalOpen,
    returnItems,
    resetSelectionKey,
    returnStudent,
    isPendingReturnLoan,
    mutateReturnLoan,
  } = useReturnLoan();
  const { barcode, setBarcode, searchBarcode, isSearching } =
    useReturnByBarcode();

  const handleBarcodeSearch = async () => {
    const item = await searchBarcode(barcode);

    if (!item) {
      toast.error('Buku tidak sedang dipinjam');
      return;
    }

    setReturnItems([item]);
    setIsReturnModalOpen(true);
  };
  const handleSubmitReturn = async (data: ReturnLoanPayload) => {
    if (!data) return;
    try {
      await mutateReturnLoan(data);
      setBarcode('');
      handleCloseReturnModal();
    } catch (error) {}
  };
  return (
    <div className="h-full flex flex-col gap-4 p-2 overflow-hidden">
      {/* return by barcode */}
      <BarcodeInput
        onChange={setBarcode}
        onSearch={handleBarcodeSearch}
        isLoading={isSearching}
        value={barcode}
      />
      <Separator />
      <TableToolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      >
        <Button onClick={() => handleOpenReturnModal(returnItems)}>
          <RotateCcw className="h-4 w-4" />
          Kembalikan({returnItems.length})
        </Button>
      </TableToolbar>
      <div className="flex-1 min-h-0 w-full">
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <ReturnTable
            data={activeLoans ?? []}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            pagination={pagination}
            setPagination={setPagination}
            pageCount={Math.ceil(total / pagination.pageSize) || 0}
            onSelectionChange={setReturnItems}
            onReturn={handleOpenSingleReturn}
            resetSelectionKey={resetSelectionKey}
            containerClassName="max-h-[90vh]"
          />
        )}
      </div>
      <ReturnModal
        isOpen={isReturnModalOpen}
        onClose={handleCloseReturnModal}
        items={returnItems}
        student={returnStudent}
        isPending={isPendingReturnLoan}
        onSubmit={handleSubmitReturn}
      />
    </div>
  );
}
