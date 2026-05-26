import * as z from 'zod';

export const studentRegisterSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Fullname is required'),
    nisn: z.string().trim().min(4, 'NISN is required'),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().trim().min(6, 'Password min 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export const studentLoginSchema = z
  .object({
    nisn: z.string().trim().min(4, 'NISN is required'),
    password: z.string().trim().min(6, 'Password min 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export type StudentRegisterSchema = z.infer<typeof studentRegisterSchema>;
export type StudentRegisterForm = Omit<
  StudentRegisterSchema,
  'confirmPassword'
>;

export type StudentLoginSchema = z.infer<typeof studentLoginSchema>;
export type StudentLoginForm = Omit<StudentLoginSchema, 'confirmPassword'>;
