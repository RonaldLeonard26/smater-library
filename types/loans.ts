export interface StudentLoanInfo {
  id: string;
  full_name: string;
  nis: string;
  nisn: string;
  profile_picture: string;
  active_loans: [];
}

export interface ActiveLoanItem {
  loan_item_id: string;
  loan_id: string;
  loan_date: string;
  due_date: string;
  barcode: string;
  book_title: string;
  book_authors: string;
  book_publisher: string;
  category_name: string;
  fine_per_day: number;
  days_overdue: number;
  estimated_fine: number;
}

export interface RawLoanBook {
  copyId: string;
  barcode: string;
  status: string;

  bookId: string;
  title: string;
  authors: string;
  cover_url: string;

  category: string;
  duration_days: number;
  fine_amount: number;
  availableStock: number;
}
