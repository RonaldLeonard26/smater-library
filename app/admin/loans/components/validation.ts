import * as z from 'zod';

export const loanFormSchema = z.object({
  student_nisn: z.string().uuid('Siswa wajib di isi'),
  copies: z
    .array(z.string().uuid())
    .min(1, 'Minimal pilih 1 buku')
    .max(3, 'Maksimal 3 buku'),
  keyword: z.string(),
});

export type LoanFormValues = z.infer<typeof loanFormSchema>;
