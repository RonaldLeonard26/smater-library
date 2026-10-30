import { createBrowserClient } from '@supabase/ssr';
import { authCookieOptions } from './config';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { cookieOptions: authCookieOptions },
);
