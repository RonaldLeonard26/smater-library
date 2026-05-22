import * as z from 'zod';

export const adminRegisterSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Fullname is required'),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(6, 'Password min 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export const adminLoginSchema = z
  .object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(6, 'Password min 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export type AdminRegisterSchema = z.infer<typeof adminRegisterSchema>;
export type AdminRegisterForm = Omit<AdminRegisterSchema, 'confirmPassword'>;

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;
export type AdminLoginForm = Omit<AdminLoginSchema, 'confirmPassword'>;
