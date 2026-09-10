import useDebounce from '@/components/hooks/useDebounce';
import { loansServices } from '@/services/loans.service';
import { RawLoanBook } from '@/types/loans';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export default function useCreateLoan() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [previewBook, setPreviewBook] = useState<RawLoanBook | null>(null);

  const { mutate: searchBook, isPending: isSearchingBook } = useMutation({
    mutationFn: () => loansServices.getDetailsBook(debouncedSearch),
    onSuccess: (data) => {
      if (!data) {
        toast.error('Buku tidak ditemukan!');
      }
      setPreviewBook(data);
      setSearch('');
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal mencari data buku!');
    },
  });

  return {
    search,
    setSearch,
    previewBook,
    isSearchingBook,
    handleSearchBook: () => searchBook(),
  };
}
