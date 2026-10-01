import { loansServices } from '@/services/loans.service';
import { RawLoanBook } from '@/types/loans';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export default function useSearchBooks() {
  const [search, setSearch] = useState('');
  const [previewBook, setPreviewBook] = useState<RawLoanBook | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<RawLoanBook[]>([]);

  const resetPreviewBook = useCallback(() => {
    setSearch('');
    setPreviewBook(null);
    setSelectedBooks([]);
  }, []);

  //get details book
  const { mutate: searchBook, isPending: isSearchingBook } = useMutation({
    mutationFn: () => loansServices.getDetailsBook(search.trim()),
    onSuccess: (data) => {
      if (!data) {
        toast.error('Buku tidak ditemukan!');
        return;
      }

      setPreviewBook(data);
      setSearch('');
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal mencari data buku!');
    },
  });

  const handleSearchBook = () => {
    if (!search.trim()) {
      return;
    }

    searchBook();
  };

  const handleAddBook = () => {
    if (!previewBook) return;
    const exist = selectedBooks.some(
      (item) => item.barcode === previewBook.barcode,
    );
    if (exist) {
      toast.error(
        `Buku dengan barcode ${previewBook.barcode} sudah ada di daftar pinjam`,
      );
      return;
    }

    setSelectedBooks((prev) => [...prev, previewBook]);
  };

  const handleRemove = (copy_id: string) => {
    setSelectedBooks((prev) => prev.filter((item) => item.copy_id !== copy_id));
  };

  const handleAddSameBook = async (bookId: string, quantity: number) => {
    try {
      const excludeCopyIds = selectedBooks.map((item) => item.copy_id);

      const availableCopies = await loansServices.getAvailableBookCopies(
        bookId,
        quantity,
        excludeCopyIds,
      );

      if (!availableCopies || availableCopies.length === 0) {
        toast.error('Tidak ada copy buku yang tersedia');
        return;
      }

      if (availableCopies.length < quantity) {
        toast.error(`Stok tersedia hanya ${availableCopies.length} buku`);
        return;
      }

      setSelectedBooks((prev) => [...prev, ...availableCopies]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Gagal mengambil copy buku',
      );
    }
  };

  return {
    search,
    setSearch,
    previewBook,
    isSearchingBook,
    handleSearchBook,
    resetPreviewBook,
    handleAddBook,
    handleRemove,
    selectedBooks,
    handleAddSameBook,
  };
}
