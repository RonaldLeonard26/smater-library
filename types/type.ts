export interface BookColumn {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  cover_url: string;
  category_id: number;
  categories?: {
    id: number;
    name: string;
  };
  book_copies: {
    id: string;
    barcode: string;
    status: 'AVAILABLE' | 'BORROWED';
  }[];
}

export interface BookCopy {
  copy_id: string;
  book_id: string;

  barcode: string;
  status: string;

  title: string;
  author: string;
  cover_url: string;

  category_id: number;
  category_name: string;

  duration_days: number;
  fine_amount: number;
}
export interface CreateLoanPayload {
  studentId: string;
  copyIds: string[];
}

export interface LoanItem {
  loan_item_id: string;
  loan_id: string;

  nisn: string;
  full_name: string;
  title: string;
  barcode: string;
  status: string;

  loan_date: string;
  due_date: string;

  category: string;
  fine_amount_per_day: number;
}

export interface BorrowedBook {
  book_id: string;
  title: string;
  barcode: string;
  due_date: string;
}

export interface StudentLoanInfo {
  id: string;
  nisn: string;
  full_name: string;
  borrowedBooks: BorrowedBook[];
}
