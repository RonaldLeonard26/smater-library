import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '@/constants/list.constants';
import * as z from 'zod';

export const booksSchema = z.object({
  books: z.array(
    z.object({
      title: z.string().trim().min(1, 'Title is required'),
      author: z.string().trim().min(1, 'Author is required'),
      barcode: z.string().optional(),
      stock: z.coerce.number<number>().min(1, 'Stock must be at least 1'),
      category_id: z.coerce.number<number>().min(1, 'Please select a category'),
      cover_url: z
        .any()
        .refine((file) => file instanceof File, 'Cover image is required')
        .refine(
          (file: File) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
          'Image format must be jpg, jpeg, or png',
        )
        .refine(
          (file: File) => file?.size <= MAX_FILE_SIZE,
          'Max file size is 2MB',
        ),
    }),
  ),
});

export type BooksForm = z.infer<typeof booksSchema>;
