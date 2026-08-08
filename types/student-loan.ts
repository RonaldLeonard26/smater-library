export interface RawLoanItem {
  id: string;
  due_date: string;
  returned_at: string | null;
  created_at: string;
  book_copies: {
    id: string;
    barcode: string;
    books: {
      id: string;
      title: string;
      author: string;
      cover_url: string | null;
    };
  };
  loans: {
    id: string;
    student_id: string;
    loan_date: string;
  };
}

export interface FormattedActiveLoan {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  coverUrl: string | null;
  borrowDate: string;
  dueDate: string;
  isOverdue: boolean;
  daysRemaining: number;
}

export interface FormattedHistoryLoan {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  coverUrl: string | null;
  borrowDate: string;
  returnedDate: string;
}

export interface LoanItem {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  coverUrl: string | null;
  borrowDate: string;
  dueDate: string;
  isOverdue: boolean;
  daysRemaining: number;
}
