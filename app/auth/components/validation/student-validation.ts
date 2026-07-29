import * as z from 'zod';

export const studentRegisterSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Nama lengkap wajib diisi'),
    nisn: z.string().trim().min(10, 'NISN harus 10 karakter'),
    email: z.email({ message: 'Email tidak valid' }),
    password: z.string().trim().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password yang ada masukan tidak sama',
    path: ['confirmPassword'],
  });

export const studentLoginSchema = z.object({
  nisn: z.string().trim().min(4, 'NISN wajib diisi'),
  password: z.string().trim().min(6, 'Password minimal 6 karakter'),
});

export type StudentRegisterSchema = z.infer<typeof studentRegisterSchema>;
export type StudentRegisterForm = Omit<
  StudentRegisterSchema,
  'confirmPassword'
>;

export type StudentLoginForm = z.infer<typeof studentLoginSchema>;
