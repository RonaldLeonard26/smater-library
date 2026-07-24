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

export interface Students {
  id: string;
  nisn: string;
  full_name: string;
  role: string;
}
