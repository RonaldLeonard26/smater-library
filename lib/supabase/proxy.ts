import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export function createProxyClient(req: NextRequest, res: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // HAPUS maxAge & expires agar tidak menjadi persistent cookie
            const { maxAge, expires, ...sessionOptions } = options;

            req.cookies.set({
              name,
              value,
              ...sessionOptions,
            });

            res.cookies.set({
              name,
              value,
              ...sessionOptions,
            });
          });
        },
      },
    },
  );
}
