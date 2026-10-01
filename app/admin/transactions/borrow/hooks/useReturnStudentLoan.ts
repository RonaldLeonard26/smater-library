import { ActiveLoanItem } from '@/types/loans';
import { useState } from 'react';

export default function useReturnStudentLoan() {
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnItems, setReturnItems] = useState<ActiveLoanItem[]>([]);
  const [resetSelectionKey, setResetSelectionKey] = useState(0);

  const handleOpenReturnModal = (items: ActiveLoanItem[]) => {
    if (!items.length) return;

    setReturnItems(items);
    setIsReturnModalOpen(true);
  };

  const handleOpenSingleReturn = (item: ActiveLoanItem) => {
    setReturnItems([item]);
    setIsReturnModalOpen(true);
  };

  const handleCloseReturnModal = () => {
    setIsReturnModalOpen(false);
    setReturnItems([]);
    setResetSelectionKey((prev) => prev + 1);
  };

  return {
    handleCloseReturnModal,
    handleOpenReturnModal,
    handleOpenSingleReturn,
    setReturnItems,
    isReturnModalOpen,
    returnItems,
    resetSelectionKey,
  };
}
