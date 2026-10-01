import { loansServices } from '@/services/loans.service';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export default function useReturnByBarcode() {
  const [barcode, setBarcode] = useState('');

  const { mutateAsync: searchBarcode, isPending: isSearching } = useMutation({
    mutationFn: (barcode: string) =>
      loansServices.getActiveLoanByBarcode(barcode),
    onSuccess: (data) => {
      if (!data) {
        toast.error(`Buku dengan barcode ${barcode} tidak sedang dipinjam`);
        return;
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal mencari buku');
    },
  });

  return {
    barcode,
    setBarcode,
    searchBarcode,
    isSearching,
  };
}
