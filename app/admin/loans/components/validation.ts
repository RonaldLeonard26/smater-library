import * as z from 'zod';

export const loanFormSchema = z.object({
  student_id: z.string().uuid(),
  barcode: z.string(),
  books: z.array(z.string().uuid()).min(1).max(3),
  keyword: z.string(),
});

export type LoanFormValues = z.infer<typeof loanFormSchema>;
