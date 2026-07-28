import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loanFormSchema, LoanFormValues } from '../../../components/validation';
import { loansServices } from '@/services/loans.service';
import { toast } from 'sonner';
import { useState } from 'react';
import { BookCopy, CreateLoanPayload, StudentLoanInfo } from '@/types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateLoans() {
  const [student, setStudent] = useState<StudentLoanInfo | null>(null);
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
  const { mutate: searchStudent, isPending: isSearchingStudent } = useMutation({
    mutationFn: (nisn: string) => loansServices.findStudentByNisn(nisn),

    onSuccess: (student) => {
      setStudent(student as StudentLoanInfo);
      setValue('student_nisn', '');
    },
    onError: (error) => {
      setStudent(null);
      setValue('student_nisn', '');
      toast.error(error.message || 'Siswa tidak ditemukan');
    },
  });
  const handleSearchStudent = (nisn: string) => searchStudent(nisn);

  //ambil nilai buku yang sudah dipinjam & hitung batas peminjaman
  const borrowedCount = student?.borrowedBooks.length ?? 0;
  const selectedCount = selectedBooks.length;

  const currentLoans = borrowedCount + selectedCount;
  const isQuotaFull = currentLoans >= 3;

  //cari buku by barcode
  const { mutate: searchAvailableBook, isPending: isSearchingBook } =
    useMutation({
      mutationFn: (barcode: string) => loansServices.searchBooks(barcode),
      onError: (error) => {
        setSearchResults(null);
        setValue('keyword', '');
        toast.error(error.message || 'Buku tidak di temukan');
      },
      onSuccess: (book) => {
        setSearchResults(book as BookCopy);
        setValue('keyword', '');
      },
    });
  const handleSearchBook = (barcode: string) => searchAvailableBook(barcode);

  //tambahkan ke keranjang
  const handleAddBook = () => {
    if (!searchResults) return;
    //cek batas peminjaman
    if (isQuotaFull) {
      toast.error('Siswa sudah mencapai batas peminjaman');
      setSearchResults(null);
      setValue('keyword', '');
      return;
    }
    //cek apakah buku sudah masih dalam pinjaman aktif
    const alreadyBorrowed = student?.borrowedBooks.some(
      (item) => item.book_id === searchResults.book_id,
    );
    if (alreadyBorrowed) {
      toast.error('Siswa sudah meminjam buku ini');
      setSearchResults(null);
      setValue('keyword', '');
      return;
    }

    //tidak boleh duplikat
    const exist = selectedBooks.some(
      (item) => item.title === searchResults.title,
    );
    if (exist) {
      toast.error('Buku sudah ada di daftar pinjaman');
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
    isSearchingStudent,

    handleSearchBook,
    isSearchingBook,
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

    currentLoans,
    isQuotaFull,
  };
}
