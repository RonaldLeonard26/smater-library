import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const errorCode = searchParams.get('error_code');

  if (!code) {
    // link sudah dipakai / kedaluwarsa
    const reason = errorCode === 'otp_expired' ? 'expired' : 'invalid';
    return NextResponse.redirect(`${origin}/auth?link=${reason}`);
  }

  if (!code) return NextResponse.redirect(`${origin}/auth`);

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    // link kedaluwarsa, atau dibuka di browser/perangkat lain

    return NextResponse.redirect(`${origin}/auth?confirmed=1`);
  }

  return NextResponse.redirect(`${origin}/auth/status`);
}
