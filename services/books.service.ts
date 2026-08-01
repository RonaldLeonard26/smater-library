import { BookColumn } from '@/app/admin/books/components/columns';
import {
  BooksForm,
  EditBookForm,
} from '@/app/admin/books/components/validation';
import { CatalogBook, CatalogBookParams } from '@/types/catalog.type';
import { createBrowserClient } from '@supabase/ssr';
import { count } from 'console';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
interface CreateBookPayload {
  title: string;
  author: string;
  category_id: number;
  cover_url: string;
}
export const booksServices = {
  async getAll(page: number, limit: number, search: string) {
    const from = page * limit;
    const to = from + limit - 1;
    let query = supabase.from('books').select(
      `
      id,
      title,
      author,
      cover_url,
      category_id,
      categories (
        id,
        name
      ),
      book_copies (
        id,
        barcode,
        status
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

        copies: book.book_copies?.length ?? 0,
        book_copies: book.book_copies,
      })) ?? [];

    if (error) throw new Error(error.message);
    return { data: normalizedData, total: count ?? 0 };
  },

  async uploadCover(file: File, title: string) {
    const fileExt = file.name.split('.').pop();
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const timestamp = Date.now();
    const uniqueString = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    // Menggabungkan menjamin tidak akan ada nama file yang kembar dalam satu klik submit
    const fileName = `${timestamp}_${safeTitle}_${uniqueString}.${fileExt}`;
    const { data, error: storageError } = await supabase.storage
      .from('book_covers')
      .upload(fileName, file);
    if (storageError) throw new Error(`Upload image: ${storageError.message}`);
    //ambil public url
    const {
      data: { publicUrl },
    } = supabase.storage.from('book_covers').getPublicUrl(fileName);

    return publicUrl;
  },

  async createBook(payload: CreateBookPayload) {
    const { data, error } = await supabase
      .from('books')
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async findBook(title: string, author: string, categoryId: number) {
    const { data, error } = await supabase
      .from('books')
      .select('id')
      .eq('title', title)
      .eq('author', author)
      .eq('category_id', categoryId)
      .maybeSingle();

    if (error) throw new Error(error.message);

    return data;
  },

  async create(payload: BooksForm) {
    for (const item of payload.books) {
      const existingBook = await this.findBook(
        item.title,
        item.author,
        item.category_id,
      );
      if (existingBook) {
        await supabase.rpc('create_book_copies', {
          p_book_id: existingBook.id,
          p_copies: item.copies,
        });
        continue;
      }

      const coverUrl = await this.uploadCover(
        item.cover_url as File,
        item.title,
      );

      const book = await this.createBook({
        title: item.title,
        author: item.author,
        category_id: item.category_id,
        cover_url: coverUrl,
      });

      await supabase.rpc('create_book_copies', {
        p_book_id: book.id,
        p_copies: item.copies,
      });
    }
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

  async getCatalogBooks({
    page,
    limit,
    search = '',
    categories = [],
  }: CatalogBookParams) {
    const from = page * limit;
    const to = from + limit - 1;

    let query = supabase.from('books').select(
      `id,
    title,
    author,
    cover_url,
    categories (
      id,
      name
    ),
    book_copies (
      status
    )`,
      { count: 'exact' },
    );

    if (search) {
      query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%`);
    }

    if (categories.length > 0) {
      query = query.in('category_id', categories);
    }

    const { data, error, count } = await query
      .range(from, to)
      .order('id', { ascending: false });
    console.log(data, error);

    if (error) throw new Error(error.message);

    const normalized: CatalogBook[] =
      data?.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        cover_url: book.cover_url,
        categories: Array.isArray(book.categories)
          ? book.categories[0]
          : book.categories,
        availableCopies:
          book.book_copies?.filter((copy) => copy.status === 'AVAILABLE')
            .length ?? 0,
      })) ?? [];

    return { data: normalized, total: count ?? 0 };
  },
};
