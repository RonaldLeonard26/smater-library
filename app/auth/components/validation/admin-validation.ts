import * as z from 'zod';

export const adminRegisterSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Nama lengkap wajib di isi'),
    position: z.string().trim().min(1, 'Jabatan wajib diisi'),
    email: z.email({ message: 'Format email tidak valid' }),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak sesuai',
    path: ['confirmPassword'],
  });

export const adminLoginSchema = z.object({
  email: z.email({ message: 'Format email tidak valid' }),
  password: z.string().min(6, 'Password min 6 characters'),
});

export type AdminRegisterSchema = z.infer<typeof adminRegisterSchema>;
export type AdminRegisterForm = Omit<AdminRegisterSchema, 'confirmPassword'>;

export type AdminLoginForm = z.infer<typeof adminLoginSchema>;
