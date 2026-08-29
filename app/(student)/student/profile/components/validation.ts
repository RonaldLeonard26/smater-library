import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().trim().min(1, 'Password lama wajib di isi'),
    newPassword: z.string().trim().min(6, 'Password baru minimal 6 karakter'),
    confirmPassword: z
      .string()
      .trim()
      .min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export type ChangePasswordValues = Omit<ChangePasswordForm, 'confirmPassword'>;
