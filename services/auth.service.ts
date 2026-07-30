import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const authServices = {
  async getProfile() {
    const { data, error } = await supabase.from('profiles').select('*');

    if (error) throw new Error(error.message || 'User tidak ditemukan');

    return data;
  },
  async logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },
};
