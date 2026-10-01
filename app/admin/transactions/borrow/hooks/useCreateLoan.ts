import { useMutation } from '@tanstack/react-query';
import { loansServices } from '@/services/loans.service';
import { CreateLoanPayload } from '@/types/type';
import { toast } from 'sonner';

export default function useCreateLoan() {
  //create loan
  const { mutateAsync: mutateCreateLoan, isPending: isCreateLoan } =
    useMutation({
      mutationFn: (payload: CreateLoanPayload) =>
        loansServices.createLoanTransactions(payload),
      onError: (error) => {
        toast.error(error.message || 'Gagal memproses pinjaman!');
      },
    });

  return {
    mutateCreateLoan,
    isCreateLoan,
  };
}
