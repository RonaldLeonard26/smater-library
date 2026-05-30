import * as z from 'zod';

export const categoriesSchema = z.object({
  categories: z.array(
    z.object({
      name: z.string().trim().min(1, 'Category is required'),
      duration_days: z.coerce
        .number<number>()
        .min(1, 'Duration days min 1 day'),
      fine_amount: z.coerce
        .number<number>()
        .min(1, 'Fine amount is required, min Rp.0'),
    }),
  ),
});

export type CategoriesForm = z.infer<typeof categoriesSchema>;
