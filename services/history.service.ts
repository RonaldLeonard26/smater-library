import { LoanHistoryParams, LoanHistoryResponse } from '@/types/history';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const historyServices = {
  async getBookCopyHistory({
    search,
    statuses,
    isOverdue,
    page,
    limit,
  }: LoanHistoryParams) {
    const { data, error } = await supabase.rpc('get_book_copy_history', {
      p_search: search.trim(),
      p_statuses: statuses,
      p_is_overdue: isOverdue,
      p_page: page,
      p_limit: limit,
    });

    if (error)
      throw new Error(error.message || 'Gagal mengambil riwayat peminjaman');
    return data as LoanHistoryResponse;
  },
};
