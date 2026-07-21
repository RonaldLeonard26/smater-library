import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loanFormSchema, LoanFormValues } from '../validation';
import { loansServices } from '@/services/loans.service';
import { toast } from 'sonner';
import { useMemo, useState } from 'react';

export interface Students {
  id: string;
  nisn: string;
  full_name: string;
  role: string;
}

export interface SelectedBook extends Book {
  estimatedDueDate: Date;
}

export interface Book {
  id: string;
  category_id: number;
  title: string;
  author: string;
  barcode?: string;
  stock: number;
  cover_url?: string;
  categories?: {
    id: number;
    name: string;
    duration_days: number;
    fine_amount: number;
  };
}

export default function useLoans() {
  const [student, setStudent] = useState<Students | null>(null);
  const [studentError, setStudentError] = useState('');
  const [activeLoans, setActiveLoans] = useState(0);
  const [bookPreview, setBookPreview] = useState<Book | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<SelectedBook[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);

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
      student_id: '',
      books: [],
      keyword: '',
      barcode: '',
    },
  });

  //cari student by nisn
  const handleSearchStudent = async (nisn: string) => {
    try {
      setStudentError('');
      const student = await loansServices.findStudentByNisn(nisn);
      const count = await loansServices.getActiveLoans(student.id);

      if (count >= 3) {
        setValue('student_id', '');
        setStudent(null);
        setActiveLoans(0);
        setStudentError(`${student.full_name} sudah memenuhi limit peminjaman`);
        return;
      }
      setStudent(student as Students);
      setActiveLoans(count);
      setValue('student_id', '');
    } catch (err) {
      setStudent(null);
      setStudentError('Student not found');
      console.log(err);
    }
  };

  //cari buku by barcode
  const handleGetBook = async (keyword: string) => {
    const books = await loansServices.searchBooks(keyword);

    if (books.length === 0) {
      toast.error('Book not found');
      return;
    }

    if (books.length === 1) {
      setBookPreview(books[0]);
      setSearchResults([]);
      return;
    }

    setSearchResults(books);
  };

  //estimasi due date
  const dueDate = useMemo(() => {
    if (!bookPreview?.categories?.duration_days) return null;
    const due = new Date();
    due.setDate(due.getDate() + bookPreview.categories.duration_days);
    return due;
  }, [bookPreview]);

  //tambahkan buku ke list pinjam
  const handleAddBook = () => {
    if (!bookPreview) return;

    const estimatedDueDate = new Date();

    estimatedDueDate.setDate(
      estimatedDueDate.getDate() + (bookPreview.categories?.duration_days ?? 0),
    );

    //maksimal 3 buku
    if (selectedBooks.length >= 3) {
      toast.error('Maksimal peminjaman 3 buku');
      setBookPreview(null);
      setValue('barcode', '');
      return;
    }
    //tidak boleh duplikat
    const exist = selectedBooks.some((book) => book.id === bookPreview.id);
    if (exist) {
      toast.error('Buku sudah ada di daftar pinjam');
      setBookPreview(null);
      setValue('barcode', '');
      return;
    }
    //jika stock habis
    if (bookPreview.stock <= 0) {
      toast.error('Book is out of stock');
      return;
    }
    setSelectedBooks((prev) => [...prev, { ...bookPreview, estimatedDueDate }]);
    setBookPreview(null);
    setValue('barcode', '');
  };

  //remove book
  const handleRemoveBook = (bookId: string) => {
    setSelectedBooks((prev) => prev.filter((book) => book.id !== bookId));
  };

  //submitLoan
  const handleSubmitLoan = async () => {
    if (!student) return;

    if (selectedBooks.length === 0) {
      toast.error('Please add at least one book');
      return;
    }

    const loan = await loansServices.createLoan(student.id);

    for (const book of selectedBooks) {
      await loansServices.createLoanItem(loan.id, book);

      await loansServices.decreaseBookStock(book.id, book.stock);
    }

    toast.success('Loan created');
    setStudent(null);
    setSelectedBooks([]);
    setBookPreview(null);

    reset();
  };
  const remainingSlots = 3 - activeLoans - selectedBooks.length;

  return {
    student,
    activeLoans,
    remainingSlots,

    bookPreview,
    handleGetBook,
    dueDate,
    searchResults,
    setSearchResults,

    handleAddBook,
    selectedBooks,

    control,
    handleSearchStudent,
    errors,
    handleSubmit,
    reset,
    watch,

    handleSubmitLoan,
    handleRemoveBook,

    studentError,
    setStudentError,
  };
}
