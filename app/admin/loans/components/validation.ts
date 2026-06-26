import * as z from 'zod';

export const loansSchema = z.object({
  nisn: z.string().trim().min(10, 'NISN is required'),
});

export type LoansForm = z.infer<typeof loansSchema>;
