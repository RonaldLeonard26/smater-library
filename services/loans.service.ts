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

  // 2. Cari buku by barcode
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
    return data;
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
