import { LoanHistoryItem, LoanHistoryStatus } from './history';

export interface Student {
  id: string;
  full_name: string;
  nisn: string;
  nis: string;
  profile_picture: string;
}

export interface GetStudentParams {
  search: string;
  page: number;
  limit: number;
}

export interface StudentHistoryItem {
  loan_item_id: string;
  loan_id: string;

  book_copy_id: string;

  book_id: string;
  book_title: string;
  book_authors: string;
  book_publisher: string;
  cover_url: string | null;
  category_name: string;

  barcode: string;

  loan_date: string;
  due_date: string;
  returned_at: string | null;

  status: LoanHistoryStatus;
  days_overdue: number;
  fine_amount: number;
}

export interface StudentHistorySummary {
  borrowed?: number;
  overdue?: number;
  total_fine: number;
  total: number;
}

export interface StudentHistoryResponse {
  items: StudentHistoryItem[];
  total: number;
  page: number;
  limit: number;
  summary: StudentHistorySummary;
}

export interface StudentHistoryParams {
  studentId: string;
  search: string;
  statuses: LoanHistoryStatus[];
  isOverdue: boolean;
  page: number;
  limit: number;
}
