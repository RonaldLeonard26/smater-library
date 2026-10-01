import { LoanHistoryParams } from '@/types/history';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const historyServices = {
  async getBookCopyHistory({
    search,
    status,
    copyStatus,
    page,
    limit,
  }: LoanHistoryParams) {
    const { data, error } = await supabase.rpc('get_book_copy_history', {
      p_search: search,
      p_status: status,
      p_copy_status: copyStatus,
      p_page: page,
      p_limit: limit,
    });

    if (error)
      throw new Error(error.message || 'Gagal mengambil riwayat peminjaman');
    return data;
  },
};
