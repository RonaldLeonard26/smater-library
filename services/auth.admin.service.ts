import {
  AdminLoginForm,
  AdminRegisterForm,
} from '@/app/auth/components/validation/admin-validation';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const authAdminServices = {
  async register(payload: AdminRegisterForm) {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: payload.fullName,
          role: 'ADMIN',
          position: payload.position,
        },
      },
    });
    if (error) throw new Error(error.message);
    return data;
  },
  async logIn(payload: AdminLoginForm) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    if (error) throw error;
    return data;
  },
};
