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

  const { mutate: mutateRetrunByBarcode, isPending: isPendingReturnByBarcode } =
    useMutation({
      mutationFn: (barcode: string) => loansServices.returnByBarcode(barcode),
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success('Buku Berhasil dikembalikan');
        queryQlient.invalidateQueries({ queryKey: ['loan-items'] });
      },
    });

  const handleReturnLoan = (loanItemId: string) => mutateReturnLoan(loanItemId);
  const handleReturnByBarcode = (barcode: string) =>
    mutateRetrunByBarcode(barcode);

  return {
    handleReturnLoan,
    isPendingReturnLoan,

    handleReturnByBarcode,
    isPendingReturnByBarcode,

    isPending: isPendingReturnLoan || isPendingReturnByBarcode,
  };
}
