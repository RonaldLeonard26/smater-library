import { StudentLoanRow } from '@/types/rpc';
import { CreateLoanPayload } from '@/types/type';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const loansServices = {
  //cari siswa by nisn
  async findStudentByNisn(nisn: string) {
    const { data, error } = await supabase.rpc('search_student_by_nisn', {
      p_nisn: nisn,
    });

    if (error)
      throw new Error(
        error.message || 'Siswa tidak ditemukan, masukan NISN yang sesuai',
      );
    if (!data || data.length === 0) {
      throw new Error('Siswa tidak ditemukan');
    }
    const rows = data as StudentLoanRow[];
    const student = {
      id: rows[0].student_id,
      nisn: rows[0].nisn,
      full_name: rows[0].full_name,
      borrowedBooks: rows
        .filter((item) => item.book_id !== null)
        .map((item) => ({
          copy_id: item.copy_id,
          book_id: item.book_id,
          title: item.title,
          barcode: item.barcode,
          loan_item_id: item.loan_item_id,
          due_date: item.due_date,
        })),
    };

    return student;
  },

  async searchBooks(barcode: string) {
    const { data, error } = await supabase.rpc('search_available_books', {
      p_keyword: barcode,
    });

    if (error) throw new Error(error.message);

    if (!data?.length) {
      throw new Error('Buku sedang dipinjam atau tidak tersedia');
    }

    return data?.[0] ?? [];
  },

  async createLoan(payload: CreateLoanPayload) {
    const { data, error } = await supabase.rpc('create_loan', {
      p_student_id: payload.studentId,
      p_copy_ids: payload.copyIds,
    });

    if (error) throw new Error(error.message);

    return data;
  },

  //get loans
  async getLoans(page: number, limit: number, search: string) {
    const { data, error } = await supabase.rpc('get_active_loans_items', {
      p_search: search,
      p_page: page,
      p_limit: limit,
    });
    const total = data.length > 0 ? data[0].total_count : 0;
    if (error) throw new Error(error.message);
    return {
      data: data ?? [],
      total,
    };
  },

  async getActiveLoanByBarcode(barcode: string) {
    const { data, error } = await supabase.rpc('get_active_loan_by_barcode', {
      p_barcode: barcode,
    });

    if (error) throw new Error(error.message);
    return data[0];
  },

  //return loans
  async returnLoanItem(loanItemId: string) {
    const { data, error } = await supabase.rpc('return_loan_item', {
      p_loan_item_id: loanItemId,
    });
    if (error) throw new Error(error.message);

    return data;
  },
};
