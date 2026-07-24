import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loanFormSchema, LoanFormValues } from '../../../components/validation';
import { loansServices } from '@/services/loans.service';
import { toast } from 'sonner';
import { useMemo, useState } from 'react';
import { BookCopy, CreateLoanPayload, Students } from '@/types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useLoans() {
  const [student, setStudent] = useState<Students | null>(null);
  const [activeLoans, setActiveLoans] = useState(0);
  const [searchResults, setSearchResults] = useState<BookCopy | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<BookCopy[]>([]);
  const queryQlient = useQueryClient();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      student_nisn: '',
      keyword: '',
    },
  });

  //cari student by nisn
  const handleSearchStudent = async (nisn: string) => {
    try {
      const student = await loansServices.findStudentByNisn(nisn);
      const count = await loansServices.getActiveLoans(student.id);

      if (count >= 3) {
        setValue('student_nisn', '');
        setStudent(null);
        setActiveLoans(0);
      }
      setStudent(student as Students);
      setActiveLoans(count);
      setValue('student_nisn', '');
    } catch (err) {
      setStudent(null);
      console.log(err);
    }
  };

  //cari buku by barcode
  const searchAvailableBook = async (barcode: string) => {
    const book = await loansServices.searchBooks(barcode);

    if (!book) {
      toast.error('Buku tidak ditemukan');
      return;
    }

    setSearchResults(book);
  };

  //add book
  const handleAddBook = () => {
    if (!searchResults) return;

    if (selectedBooks.length >= 3) {
      toast.error('Siswa sudah mencapai batas peminjaman');
      return;
    }

    //tidak boleh duplikat
    const exist = selectedBooks.some(
      (item) => item.title === searchResults.title,
    );
    if (exist) {
      toast.error('Buku sudah ada di daftar pinjam');
      setValue('keyword', '');
      setSearchResults(null);
      return;
    }
    setSelectedBooks((prev) => [...prev, searchResults]);
    setSearchResults(null);
    setValue('keyword', '');
  };

  //remove book
  const handleRemoveBook = (copyId: string) => {
    setSelectedBooks((prev) => prev.filter((item) => item.copy_id !== copyId));
  };

  const { mutate: mutateCreateLoan, isPending: isPendingCreateLoan } =
    useMutation({
      mutationFn: (payload: CreateLoanPayload) =>
        loansServices.createLoan(payload),
      onError: (error) => {
        toast.error(error.message || 'Gagal memproses pinjaman!');
      },
      onSuccess: () => {
        toast.success('Proses peminjaman buku berhasil');

        setSelectedBooks([]);
        setSearchResults(null);
        setStudent(null);
        setActiveLoans(0);

        reset();

        queryQlient.invalidateQueries({ queryKey: ['loans'] });
      },
    });

  const handleCreateLoan = () => {
    if (!student) return;

    mutateCreateLoan({
      studentId: student.id,
      copyIds: selectedBooks.map((item) => item.copy_id),
    });
  };

  return {
    handleSearchStudent,
    student,
    activeLoans,
    setActiveLoans,

    searchAvailableBook,
    searchResults,
    setSearchResults,

    control,
    errors,
    handleSubmit,
    reset,
    watch,

    handleAddBook,
    handleRemoveBook,

    selectedBooks,
    setSelectedBooks,

    handleCreateLoan,
    isPendingCreateLoan,
  };
}
