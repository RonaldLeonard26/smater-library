import { loansServices } from '@/services/loans.service';
import { AllActiveLoans, ReturnLoanPayload } from '@/types/loans';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { ReturnStudent } from '../components/return-modal';

export default function useReturnLoan() {
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnItems, setReturnItems] = useState<AllActiveLoans[]>([]);
  const [resetSelectionKey, setResetSelectionKey] = useState(0);

  const handleOpenReturnModal = (items: AllActiveLoans[]) => {
    if (!items.length) return;

    setReturnItems(items);
    setIsReturnModalOpen(true);
  };

  const handleOpenSingleReturn = (item: AllActiveLoans) => {
    setReturnItems([item]);
    setIsReturnModalOpen(true);
  };

  const handleCloseReturnModal = () => {
    setIsReturnModalOpen(false);
    setReturnItems([]);
    setResetSelectionKey((prev) => prev + 1);
  };

  const returnStudent: ReturnStudent | undefined = returnItems[0]
    ? {
        student_id: returnItems[0].student_id,
        full_name: returnItems[0].student_name,
        nis: returnItems[0].nis,
        nisn: returnItems[0].nisn,
        profile_picture: returnItems[0].profile_picture,
      }
    : undefined;
  const queryClient = useQueryClient();
  const { mutateAsync: mutateReturnLoan, isPending: isPendingReturnLoan } =
    useMutation({
      mutationFn: (payload: ReturnLoanPayload) =>
        loansServices.returnLoanItems(payload),
      onSuccess: () => {
        toast.success('Buku berhasil dikembalikan');
        queryClient.invalidateQueries({ queryKey: ['active-loans'] });
      },
      onError: (error) => {
        toast.error(error.message || 'Gagal memproses pengembalian');
      },
    });

  return {
    mutateReturnLoan,
    isPendingReturnLoan,

    handleCloseReturnModal,
    handleOpenReturnModal,
    handleOpenSingleReturn,
    setReturnItems,
    setIsReturnModalOpen,
    isReturnModalOpen,
    returnItems,
    resetSelectionKey,
    returnStudent,
  };
}
