import { ChangePasswordValues } from '@/app/(student)/student/profile/components/validation';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const authServices = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw new Error(error.message || 'Pengguna tidak ditemukan');

    return data;
  },
  async logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },
  async updatePassword({ oldPassword, newPassword }: ChangePasswordValues) {
    // 1. Ambil email pengguna yang sedang aktif
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      throw new Error('Gagal mengidentifikasi pengguna. Silakan login ulang.');
    }

    // 2. Verifikasi apakah password lama benar dengan cara re-authenticate
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: oldPassword,
    });

    if (signInError) {
      throw new Error('Password lama yang Anda masukkan salah');
    }

    // 3. Jika password lama cocok, update ke password baru
    const { data, error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      throw new Error(updateError.message);
    }

    return data;
  },
};
