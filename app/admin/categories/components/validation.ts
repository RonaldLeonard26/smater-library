import * as z from 'zod';

export const categoriesSchema = z.object({
  name: z.string().min(1, 'Nama kategori wajib diisi'),
  duration_days: z.coerce.number().min(1, 'Durasi minimal 1 hari'),
  fine_amount: z.coerce.number().min(1, 'Denda minimal Rp 0'),
});

export type CategoriesForm = z.infer<typeof categoriesSchema>;
