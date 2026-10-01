import {
  AllActiveLoans,
  AllActiveLoansParams,
  ReturnLoanPayload,
} from '@/types/loans';
import { CreateLoanPayload } from '@/types/type';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const loansServices = {
  //1.cari siswa
  async searchStudent(searchQuery: string) {
    if (!searchQuery) return [];

    const { data, error } = await supabase.rpc('search_student_loans', {
      p_search: searchQuery,
    });

    if (error) throw new Error(error.message);
    return data;
  },

  // =============================================================

  // 2. get details book
  async getDetailsBook(searchQuery: string) {
    const { data, error } = await supabase.rpc('search_available_book', {
      p_search: searchQuery.trim(),
    });
    if (error) throw new Error(error.message || 'Gagal mengambil detail buku');
    if (!data || data.length === 0) {
      throw new Error('Buku tidak ditemukan.');
    }

    return data[0];
  },
  // ============================================================

  //3. get N available book_copies
  async getAvailableBookCopies(
    bookId: string,
    quantity: number,
    excludeCopyIds: string[] = [],
  ) {
    const { data, error } = await supabase.rpc('get_available_book_copies', {
      p_book_id: bookId,
      p_quantity: quantity,
      p_exclude_copy_ids: excludeCopyIds,
    });
    if (error) throw new Error(error.message);

    return data;
  },
  // ======================================================================

  //4. Create loan transaction
  async createLoanTransactions(payload: CreateLoanPayload) {
    const { data, error } = await supabase.rpc('create_loan_transaction', {
      p_student_id: payload.studentId,
      p_copy_ids: payload.copyIds,
    });

    if (error) throw new Error(error.message);

    return data;
  },

  // 5.return loan item
  async returnLoanItems(payload: ReturnLoanPayload) {
    const { data, error } = await supabase.rpc('return_loan_items', {
      p_copy_ids: payload.copyIds,
    });
    if (error)
      throw new Error(error.message || 'Gagal memproses pengembalian buku');
    return data;
  },

  //=============================================================================

  // 6. Return by barcode
  async getActiveLoanByBarcode(barcode: string) {
    const { data, error } = await supabase.rpc('get_active_loan_by_barcode', {
      p_barcode: barcode.trim(),
    });

    if (error) {
      throw new Error(error.message || 'Gagal mencari barcode buku');
    }

    return data as AllActiveLoans | null;
  },
  // =========================================================================

  // 7. get AllActiveloans
  async getAllActiveLoans({
    search = '',
    page = 1,
    limit = 10,
  }: AllActiveLoansParams) {
    const { data, error } = await supabase.rpc('get_all_active_loan_items', {
      p_search: search.trim(),
      p_page: page,
      p_limit: limit,
    });

    if (error)
      throw new Error(error.message || 'Gagal mengambil data peminjaman aktif');

    return {
      data: data?.data ?? [],
      total: Number(data?.total ?? 0),
      page: Number(data?.page ?? page),
      limit: Number(data?.limit ?? limit),
    };
  },

  // ============================================================
};
