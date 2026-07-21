import * as z from 'zod';

export const categoriesSchema = z.object({
  categories: z.array(
    z.object({
      name: z.string().trim().min(1, 'Nama kategori wajib di isi'),
      duration_days: z.coerce
        .number<number>()
        .min(1, 'Durasi peminjaman minimal 1 hari'),
      fine_amount: z.coerce
        .number<number>()
        .min(1, 'Denda keterlambatan wajib di isi, min Rp.0'),
      code: z
        .string()
        .trim()
        .min(2, 'Kode kategori minimal 2 karakter')
        .max(4, 'Kode kategori maksimal 4 karakter')
        .regex(/^[A-Z]+$/, 'Hanya huruf kapital'),
    }),
  ),
});

export const editCategorySchema = z.object({
  name: z.string().trim().min(1, 'Nama kategori wajib di isi'),
  duration_days: z.coerce
    .number<number>()
    .min(1, 'Durasi peminjaman minimal 1 hari'),
  fine_amount: z.coerce
    .number<number>()
    .min(1, 'Denda keterlambatan wajib di isi, min Rp.0'),
  code: z
    .string()
    .trim()
    .min(2, 'Kode kategori minimal 2 karakter')
    .max(4, 'Kode kategori maksimal 4 karakter')
    .regex(/^[A-Z]+$/, 'Hanya huruf kapital'),
});

export type EditCategoryForm = z.infer<typeof editCategorySchema>;

export type CategoriesForm = z.infer<typeof categoriesSchema>;
