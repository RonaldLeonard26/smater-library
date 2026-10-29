'use server';

import {
  AdminRegisterForm,
  adminRegisterSchema,
} from '../auth/components/validation/admin-validation';
import { createSupabaseService } from '@/lib/supabase/service';

export async function setUpFirstAdmin(input: AdminRegisterForm) {
  const parsed = adminRegisterSchema.safeParse({
    ...input,
    confirmPassword: input.password,
  });
  if (!parsed.success) return { error: 'Data tidak valid' };
  const data = parsed.data;
  if (
    !process.env.ADMIN_SETUP_CODE ||
    input.setUpCode !== process.env.ADMIN_SETUP_CODE
  ) {
    return { error: 'Kode setup salah' };
  }

  const service = createSupabaseService();
  const { count } = await service
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'ADMIN');
  if (count && count > 0) return { error: 'Setup sudah dilakukan' };

  const { data: created, error } = await service.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: { full_name: data.fullName },
    app_metadata: { role: 'ADMIN', position: data.position },
  });
  if (error || !created.user)
    return { error: error?.message ?? 'Gagal membuat akun' };

  // trigger bisa membuat profil sebagai STUDENT, jadi set role di sini
  const { error: profileError } = await service
    .from('profiles')
    .update({ role: 'ADMIN', position: data.position, status: 'ACTIVE' })
    .eq('id', created.user.id);

  if (profileError) {
    await service.auth.admin.deleteUser(created.user.id); // batalkan, jangan sisakan akun setengah jadi
    return { error: 'Gagal menyimpan profil admin' };
  }

  return { error: null };
}
