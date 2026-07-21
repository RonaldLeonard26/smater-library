import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const bookCopiesServices = {
  async getAll() {
    const { data, error } = await supabase
      .from('books_copies')
      .select('*', { count: 'exact' });

    if (error) throw new Error(error.message);
    return data;
  },
  async getBookById(bookId: string) {
    const { data, error } = await supabase
      .from('book_copies')
      .select(`id, barcode, status`, { count: 'exact' })
      .eq('book_id', bookId)
      .order('barcode');

    if (error) throw new Error(error.message);

    return data;
  },

  async AddCopies(bookId: string, copies: number) {
    const { error } = await supabase.rpc('create_book_copies', {
      p_book_id: bookId,
      p_copies: copies,
    });
    if (error) throw new Error(error.message);
  },
  async RemoveCopies() {},
};
