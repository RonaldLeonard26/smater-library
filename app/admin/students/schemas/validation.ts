import { z } from 'zod';

export const studentProfileSchema = z.object({
  nisn: z
    .string()
    .trim()
    .min(10, 'NISN harus 10 karakter')
    .max(10, 'NISN harus 10 karakter'),
  nis: z
    .string()
    .trim()
    .min(4, 'NIS harus 4 karakter')
    .max(4, 'NIS harus 4 karakter'),
});

export type StudentProfileFormValues = z.infer<typeof studentProfileSchema>;
