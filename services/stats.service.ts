import { CatalogBook } from '@/types/catalog.type';
import {
  AdminStatsOverview,
  RawBookData,
  SupabaseWishlistJoined,
  TopBorrowedBook,
  TopWishlistedBook,
} from '@/types/stats.type';
import { createBrowserClient } from '@supabase/ssr';
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
export const adminStatsService = {
  // 1. Dapatkan Kartu Ringkasan (KPIs)
  async getOverviewStats(): Promise<AdminStatsOverview> {
    const nowISO = new Date().toISOString();
    const [
      { count: totalBooks },
      { count: totalCopies },
      { count: activeLoans },
      { count: overdueLoans },
      { count: totalWishlists },
    ] = await Promise.all([
      // Total Judul Master
      supabase.from('books').select('*', { count: 'exact', head: true }),

      // Total Seluruh Eksemplar Buku
      supabase.from('book_copies').select('*', { count: 'exact', head: true }),

      // Peminjaman Aktif (Berdasarkan status eksemplar BORROWED)
      supabase
        .from('book_copies')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'BORROWED'),

      // Peminjaman yang Terlambat (Belum dikembalikan/returned_at = NULL & due_date < Hari ini)
      supabase
        .from('loan_items')
        .select('*', { count: 'exact', head: true })
        .is('returned_at', null)
        .lt('due_date', nowISO),

      // Total Wishlist Seluruh Siswa
      supabase.from('wishlists').select('*', { count: 'exact', head: true }),
    ]);

    return {
      totalBooks: totalBooks ?? 0,
      totalCopies: totalCopies ?? 0,
      activeLoans: activeLoans ?? 0,
      overdueLoans: overdueLoans ?? 0,
      totalWishlists: totalWishlists ?? 0,
    };
  },

  //2.Buku paling banyak d wishlist
  async getTopWishlistedBooks(limit = 5): Promise<TopWishlistedBook[]> {
    const { data, error } = await supabase.from('wishlists').select(`
      book_id,
      books:book_id (
        id,
        title,
        author,
        categories (name),
        book_copies (status)
      )`);
    if (error) throw new Error(error.message);

    const typedCountsMap = new Map<
      string,
      { rawBook: RawBookData; count: number }
    >();

    (data as unknown as SupabaseWishlistJoined[])?.forEach((item) => {
      // Ambil object book (mengantisipasi jika Supabase mengembalikan object tunggal atau array)
      const book = Array.isArray(item.books) ? item.books[0] : item.books;
      if (!book) return;

      const existing = typedCountsMap.get(book.id);
      if (existing) {
        existing.count += 1;
      } else {
        typedCountsMap.set(book.id, { rawBook: book, count: 1 });
      }
    });
    return Array.from(typedCountsMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
      .map(({ rawBook, count }) => {
        const category = Array.isArray(rawBook.categories)
          ? rawBook.categories[0]
          : rawBook.categories;

        const availableCopies =
          rawBook.book_copies?.filter((c) => c.status === 'AVAILABLE').length ??
          0;

        return {
          id: rawBook.id,
          title: rawBook.title,
          author: rawBook.author,
          categoryName: category?.name ?? 'Tanpa Kategori',
          wishlistCount: count,
          availableCopies,
        };
      });
  },

  //3. Buku yang paling sering di pinjam
  async getTopBorrowedBooks(limit = 5): Promise<TopBorrowedBook[]> {
    const { data, error } = await supabase.from('loan_items').select(`
        id,
        book_copies:book_copy_id (
          book_id,
          books:book_id (
            id,
            title
          )
        )
      `);

    if (error) throw new Error(error.message);

    const borrowMap = new Map<string, { title: string; count: number }>();

    data?.forEach((item) => {
      const copy = Array.isArray(item.book_copies)
        ? item.book_copies[0]
        : item.book_copies;
      if (!copy) return;

      const book = Array.isArray(copy.books) ? copy.books[0] : copy.books;
      if (!book) return;

      if (borrowMap.has(book.id)) {
        borrowMap.get(book.id)!.count += 1;
      } else {
        borrowMap.set(book.id, { title: book.title, count: 1 });
      }
    });

    return Array.from(borrowMap.entries())
      .map(([id, val]) => ({
        id,
        title: val.title,
        totalLoans: val.count,
      }))
      .sort((a, b) => b.totalLoans - a.totalLoans)
      .slice(0, limit);
  },
};
