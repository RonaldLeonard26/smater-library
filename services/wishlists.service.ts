import { CatalogBook, WishlistItem } from '@/types/catalog.type';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const wishlistService = {
  // Ambil daftar id buku yang di-wishlist oleh user
  async getUserWishlist(userId: string): Promise<WishlistItem[]> {
    if (!userId) return [];

    const { data, error } = await supabase
      .from('wishlists')
      .select(
        `
        id,
        book_id,
        books:book_id (
          id,
          title,
          author,
          cover_url,
          categories (
            id,
            name
          ),
          book_copies (
            status
          )
        )
      `,
      )
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    const normalized: WishlistItem[] = data.map((item) => {
      const rawBook = Array.isArray(item.books) ? item.books[0] : item.books;

      const formattedBook: CatalogBook = {
        id: rawBook.id,
        title: rawBook.title,
        author: rawBook.author,
        cover_url: rawBook.cover_url,
        categories: Array.isArray(rawBook.categories)
          ? rawBook.categories[0]
          : rawBook.categories,
        availableCopies:
          rawBook.book_copies?.filter(
            (copy: { status: string }) => copy.status === 'AVAILABLE',
          ).length ?? 0,
      };
      return {
        id: item.id,
        bookId: item.book_id,
        book: formattedBook,
      };
    });
    return normalized;
  },

  // Toggle Wishlist (Tambah jika belum ada, Hapus jika sudah ada)
  async toggleWishlist(userId: string, bookId: string, isWishlisted: boolean) {
    if (isWishlisted) {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', userId)
        .eq('book_id', bookId);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from('wishlists')
        .insert([{ user_id: userId, book_id: bookId }]);
      if (error) throw new Error(error.message);
    }
  },
};
