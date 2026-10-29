'use server';

import { createSupabaseService } from '@/lib/supabase/service';
import {
  AdminLoginForm,
  adminLoginSchema,
} from './components/validation/admin-validation';

const ADMIN_ERROR = 'Email atau password salah';

export async function adminLogin(
  input: AdminLoginForm,
): Promise<{ error: string | null }> {
  const parsed = adminLoginSchema.safeParse(input);
  if (!parsed.success) return { error: ADMIN_ERROR };

  const supabase = createSupabaseService();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { error: ADMIN_ERROR };

  // role & status dari tabel profiles, bukan metadata
  const { data: me } = await supabase
    .from('profiles')
    .select('role, status')
    .eq('id', data.user.id)
    .single();

  if (me?.role !== 'ADMIN' || me.status !== 'ACTIVE') {
    await supabase.auth.signOut(); // siswa yang iseng login di tab Admin
    return { error: ADMIN_ERROR };
  }

  return { error: null };
}
