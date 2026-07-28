export interface StudentLoanRow {
  student_id: string;
  nisn: string;
  full_name: string;

  copy_id: string | null;
  book_id: string | null;
  title: string | null;
  barcode: string | null;

  loan_item_id: string | null;
  due_date: string | null;
}
