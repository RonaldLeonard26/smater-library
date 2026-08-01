import {
  StudentLoginForm,
  StudentRegisterForm,
} from '@/app/(public)/auth/components/validation/student-validation';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const authStudentService = {
  async register(payload: StudentRegisterForm) {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: payload.fullName,
          nisn: payload.nisn,
          role: 'STUDENT',
        },
      },
    });
    if (error) throw new Error(error.message);
    return data;
  },
  async logIn(payload: StudentLoginForm) {
    //1. cari data profile berdasarkan NISN untuk dapat user_id
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('nisn', payload.nisn)
      .single();

    if (profileError || !profileData) {
      throw new Error('NISN not available');
    }
    // 2. Gunakan RPC atau cara aman Supabase untuk login.
    // Karena client-side SDK tidak bisa membaca tabel auth.users secara bebas,
    // cara paling standar di real project adalah membuat PostgreSQL Function (RPC)
    // untuk menarik email berdasarkan ID profil tersebut di sisi server aman.
    const { data: emailData, error: rpcError } = await supabase.rpc(
      'get_user_email_by_id',
      {
        user_id: profileData.id,
      },
    );
    if (rpcError || !emailData) {
      throw new Error('Failed to find login identity');
    }

    // 3. Eksekusi login menggunakan email asli yang didapatkan dari database
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: emailData,
        password: payload.password,
      });

    if (authError) throw new Error(authError.message);

    return authData;
  },
};
