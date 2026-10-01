import { loansServices } from '@/services/loans.service';
import { StudentLoanInfo } from '@/types/loans';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export default function useSearchStudent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const [student, setStudent] = useState<StudentLoanInfo | null>(null);

  const { mutateAsync: searchStudent, isPending: isSearchingStudent } =
    useMutation({
      mutationFn: (search: string) => loansServices.searchStudent(search),

      onSuccess: (data) => {
        const result = data?.[0] ?? null;

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

  const handleSearch = async () => {
    const search = searchQuery.trim();

    if (!search) return;

    setLastSearch(search);

    await searchStudent(search);
  };

  const refreshStudent = async () => {
    if (!lastSearch) return;

    await searchStudent(lastSearch);
  };

  const clearStudent = () => {
    setStudent(null);
    setSearchQuery('');
    setLastSearch('');
  };

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
    isSearchingStudent,
    student,
    refreshStudent,
    clearStudent,
  };
}
