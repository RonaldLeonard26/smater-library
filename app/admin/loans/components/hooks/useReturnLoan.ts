import { loansServices } from '@/services/loans.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useReturnLoan() {
  const queryQlient = useQueryClient();

  const { mutate: mutateReturnLoan, isPending: isPendingReturnLoan } =
    useMutation({
      mutationFn: (loanItemId: string) =>
        loansServices.returnLoanItem(loanItemId),
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success('Buku berhasil dikembalikan');
        queryQlient.invalidateQueries({ queryKey: ['loan-items'] });
      },
    });

  const { mutateAsync: getLoanByBarcode, isPending: isFetchingByBarcode } =
    useMutation({
      mutationFn: (barcode: string) =>
        loansServices.getActiveLoanByBarcode(barcode),
      onError: (error: Error) => {
        toast.error(
          error.message || 'Buku tidak ditemukan / tidak sedang dipinjam',
        );
      },
    });

  const handleReturnLoan = (loanItemId: string) => mutateReturnLoan(loanItemId);

  return {
    handleReturnLoan,
    isPendingReturnLoan,

    getLoanByBarcode,
    isFetchingByBarcode,

    isPending: isPendingReturnLoan || isFetchingByBarcode,
  };
}
