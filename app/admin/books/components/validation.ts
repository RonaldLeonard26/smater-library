import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '@/constants/list.constants';
import * as z from 'zod';

export const booksSchema = z.object({
  books: z.array(
    z.object({
      title: z.string().trim().min(1, 'Judul buku wajib diisi'),
      author: z.string().trim().min(1, 'Penulis wajib diisi'),
      isbn: z.string().trim().min(1, 'ISBN wajib diisi'),
      publisher: z.string().trim().min(1, 'Penerbit wajib diisi'),
      copies: z.coerce.number<number>().min(1, 'Stok wajib diisi, minimal 1'),
      category_id: z.coerce
        .number<number>()
        .min(1, 'Pilih salah satu kategori'),
      cover_url: z
        .any()
        .refine((file) => file instanceof File, 'Cover wajib diisi')
        .refine(
          (file: File) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
          'Format cover harus jpg, jpeg, or png',
        )
        .refine(
          (file: File) => file?.size <= MAX_FILE_SIZE,
          'Ukuran maksimal 2MB',
        ),
    }),
  ),
});

export const editBookSchema = z.object({
  title: z.string().trim().min(1, 'Judul buku wajib diisi'),
  author: z.string().trim().min(1, 'Penuis buku wajib diisi'),
  isbn: z.string().trim().min(1, 'ISBN wajib diisi'),
  publisher: z.string().trim().min(1, 'Penerbit wajib diisi'),
  category_id: z.coerce.number<number>().min(1, 'Pilih salah satu kategori'),
  cover_url: z
    .any()
    .refine((file) => file !== null && file !== undefined, 'Cover wajib diisi')
    .refine((file) => {
      //jika user tidak ganti gambar
      if (typeof file === 'string') return true;
      //jika user ganti gambar {object file} cek type
      if (file instanceof File) {
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      }
      return true;
    }, 'Format cover harus jpg, jpeg, or png')
    .refine((file) => {
      //hanya cek ukuran jika upload file baru
      if (file instanceof File) {
        return file.size <= MAX_FILE_SIZE;
      }
      return true; //jika string lewati cek size
    }, 'Image size max 2MB'),
});

export const addCopiesSchema = z.object({
  copies: z.coerce
    .number<number>()
    .min(1, 'Minimal 1 buku')
    .max(100, 'Terlalu banyak'),
});

export type AddCopiesForm = z.infer<typeof addCopiesSchema>;

export type EditBookForm = z.infer<typeof editBookSchema>;

export type BooksForm = z.infer<typeof booksSchema>;
