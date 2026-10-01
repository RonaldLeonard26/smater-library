export interface StudentLoanInfo {
  student_id: string;
  full_name: string;
  nis: string;
  nisn: string;
  profile_picture: string | null;
  active_loans: ActiveLoanItem[];
}

export interface ActiveLoanItem {
  loan_item_id: string;
  loan_id: string;
  loan_date: string;
  due_date: string;
  book_copy_id: string;
  barcode: string;
  book_title: string;
  cover_url: string;
  book_authors: string;
  book_publisher: string;
  category_name: string;
  fine_per_day: number;
  days_overdue: number;
  estimated_fine: number;
}

export interface RawLoanBook {
  copy_id: string;
  barcode: string;
  status: string;

  book_id: string;
  title: string;
  authors: string;
  cover_url: string;

  category_name: string;
  duration_days: number;
  fine_amount: number;
  available_stock: number;
}

export interface AllActiveLoans extends ActiveLoanItem {
  student_id: string;
  student_name: string;
  nis: string;
  nisn: string;
  profile_picture: string | null;
  book_id: string;
}

export type AllActiveLoansResponse = {
  data: AllActiveLoans[];
  total: number;
  page: number;
  limit: number;
};

export type AllActiveLoansParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export interface ReturnLoanPayload {
  copyIds: string[];
}
export type LoanType = 'ADD' | 'EXTEND';

export type ActiveLoanByBarcode = ActiveLoanItem;
