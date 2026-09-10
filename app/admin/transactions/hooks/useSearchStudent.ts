import useDebounce from '@/components/hooks/useDebounce';
import { loansServices } from '@/services/loans.service';
import { StudentLoanInfo } from '@/types/loans';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export default function useSearchStudent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [student, setStudent] = useState<StudentLoanInfo | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { mutate: searchStudent, isPending: isSearchingStudent } = useMutation({
    mutationFn: () => loansServices.searchStudent(debouncedSearch),
    onSuccess: (data) => {
      // Data RPC mengembalikan array, ambil index ke-0 jika ada
      const result = data && data.length > 0 ? data[0] : null;
      setStudent(result);

      if (!result) {
        toast.error('Siswa tidak ditemukan');
      }
      setSearchQuery('');
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal mencari data siswa');
    },
  });

  return {
    searchQuery,
    setSearchQuery,
    handleSearch: () => searchStudent(),
    isSearchingStudent,
    student,

    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
}
