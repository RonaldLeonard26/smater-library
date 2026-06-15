import { BooksForm } from '@/app/admin/books/components/validation';
import { generateBookCode } from '@/lib/generateId';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const booksServices = {
  async getAll() {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    return data;
  },
  async create(payload: BooksForm) {
    //1.proses setiap books dalam form
    const uploadPromises = payload.books.map(async (item) => {
      const fileName = `${Date.now()}-${item.cover_url.title}`;

      //2.upload ke storage
      const { data, error: storageError } = await supabase.storage
        .from('book_covers')
        .upload(fileName, item.cover_url, {
          cacheControl: '3600',
          upsert: false,
        });
      if (storageError)
        throw new Error(`Upload image: ${storageError.message}`);
      //ambil public url
      const {
        data: { publicUrl },
      } = supabase.storage.from('book_covers').getPublicUrl(fileName);

      //kembalikan object data yg siap insert ke table
      return {
        title: item.title,
        author: item.author,
        category_id: item.category_id,
        stock: item.stock,
        barcode: generateBookCode(),
        cover_url: publicUrl,
      };
    });
    const booksData = await Promise.all(uploadPromises);

    //insert array ke table
    const { data, error } = await supabase
      .from('books')
      .insert(booksData)
      .select();

    if (error) throw new Error(error.message || 'Failed to add books');

    return data;
  },
  async update() {},
  async remove() {},
};
