'use server';

import { createClient } from '@/lib/supabase/server';
import { createSupabaseService } from '@/lib/supabase/service';
import {
  AdminLoginForm,
  adminLoginSchema,
} from './components/validation/admin-validation';
import {
  StudentLoginForm,
  studentLoginSchema,
} from './components/validation/student-validation';

const ADMIN_ERROR = 'Email atau password salah';
const STUDENT_ERROR = 'NIS/NISN atau password salah';
const UNCONFIRMED = 'Email belum dikonfirmasi. Periksa kotak masuk emailmu.';

export async function studentLogin(input: StudentLoginForm): Promise<{
  error: string | null;
  status?: 'ACTIVE' | 'PENDING' | 'REJECTED';
}> {
  const parsed = studentLoginSchema.safeParse(input);
  if (!parsed.success) return { error: STUDENT_ERROR };
  const { identifier, password } = parsed.data;

  const service = createSupabaseService();
  const { data: profile } = await service
    .from('profiles')
    .select('id, status')
    .eq('role', 'STUDENT')
    .or(`nisn.eq.${identifier},nis.eq.${identifier}`)
    .maybeSingle();
  if (!profile) return { error: STUDENT_ERROR };

  const { data: userData } = await service.auth.admin.getUserById(profile.id);
  const email = userData.user?.email;
  if (!email) return { error: STUDENT_ERROR };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return {
      error: error.code === 'email_not_confirmed' ? UNCONFIRMED : STUDENT_ERROR,
    };
  }

  return { error: null, status: profile.status };
}
// ============================================================================================
export async function adminLogin(
  input: AdminLoginForm,
): Promise<{ error: string | null }> {
  const parsed = adminLoginSchema.safeParse(input);
  if (!parsed.success) return { error: ADMIN_ERROR };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { error: ADMIN_ERROR };

  const { data: me } = await supabase
    .from('profiles')
    .select('role, status')
    .eq('id', data.user.id)
    .single();

  if (me?.role !== 'ADMIN' || me.status !== 'ACTIVE') {
    await supabase.auth.signOut();
    return { error: ADMIN_ERROR };
  }

  return { error: null };
}
