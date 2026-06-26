import { BookColumn } from '@/app/admin/books/components/columns';
import {
  BooksForm,
  EditBookForm,
} from '@/app/admin/books/components/validation';
import { generateBookCode } from '@/lib/generateId';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const booksServices = {
  async getAll(page: number, limit: number, search: string) {
    const from = page * limit;
    const to = from + limit - 1;
    let query = supabase.from('books').select(
      `
      id,
      title,
      author,
      barcode,
      stock,
      cover_url,
      category_id,
      categories (
        id,
        name
      )
    `,
      { count: 'exact' },
    );
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error, count } = await query
      .range(from, to)
      .order('id', { ascending: false });

    const normalizedData: BookColumn[] =
      data?.map((book) => ({
        ...book,
        categories: Array.isArray(book.categories)
          ? book.categories[0]
          : book.categories,
      })) ?? [];

    if (error) throw new Error(error.message);
    return { data: normalizedData, total: count ?? 0 };
  },
  async create(payload: BooksForm) {
    //1.proses setiap books dalam form
    const uploadPromises = payload.books.map(async (item, index) => {
      const file = item.cover_url as File;
      const fileExt = file.name.split('.').pop();

      // KUNCI UNIK: Bersihkan judul buku dari spasi, tambah timestamp, angka acak, DAN urutan index loop
      const safeTitle = item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const timestamp = Date.now();
      const uniqueString = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      // Menggabungkan index loop menjamin tidak akan ada nama file yang kembar dalam satu klik submit
      const fileName = `${timestamp}_${index}_${safeTitle}_${uniqueString}.${fileExt}`;
      // const filePath = `covers/${fileName}`;

      //2.upload ke storage
      const { data, error: storageError } = await supabase.storage
        .from('book_covers')
        .upload(fileName, file);
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
  async update(id: string, payload: EditBookForm) {
    const { data, error } = await supabase
      .from('books')
      .update(payload)
      .eq('id', id)
      .select();

    if (error) {
      if (error.code === '23505') {
        throw new Error('Book is available');
      }
      throw new Error(error?.message);
    }
    return data;
  },
  async remove(id: string) {
    const { data, error } = await supabase.from('books').delete().eq('id', id);

    if (error) throw new Error(error.message);
    return data;
  },
};
