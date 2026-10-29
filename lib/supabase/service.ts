import 'server-only'; // build error kalau tidak sengaja diimpor ke client
import { createClient } from '@supabase/supabase-js';

export function createSupabaseService() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // tanpa prefix NEXT_PUBLIC_
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
