import { NextRequest, NextResponse } from 'next/server';
import { createProxyClient } from './lib/supabase/proxy';

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next({ request: { headers: req.headers } });
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith('/auth/callback')) return NextResponse.next();

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return res;
  }

  const supabase = createProxyClient(req, res);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // aturan route
  const isCallback = pathname.startsWith('/auth/callback');
  const isStatusPage = pathname === '/auth/status';
  const isAuthRoute = pathname.startsWith('/auth');
  const isSetupRoute = pathname.startsWith('/setup');
  const isAdminRoute = pathname.startsWith('/admin');
  const isStudentAllowRoute =
    pathname === '/' ||
    pathname.startsWith('/books') ||
    pathname.startsWith('/student') ||
    pathname.startsWith('/about');

  const redirectWithCookies = (destination: string) => {
    const redirectRes = NextResponse.redirect(new URL(destination, req.url));
    res.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectRes;
  };

  if (isCallback) return res;

  // 1. BELUM LOGIN
  if (!user || error) {
    if (isStatusPage) return redirectWithCookies('/');
    if (isStudentAllowRoute || isAuthRoute || isSetupRoute) return res;
    return redirectWithCookies('/');
  }

  // 2. SUDAH LOGIN: ambil role & status dari tabel profiles
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, status')
    .eq('id', user.id)
    .single();

  const role = profile?.role;
  const status = profile?.status ?? 'PENDING'; // profil tidak ada -> anggap belum aktif

  // 2a. Belum disetujui: hanya boleh halaman status
  if (status !== 'ACTIVE') {
    if (isStatusPage) return res;
    return redirectWithCookies('/auth/status');
  }

  // 2b. Akun aktif
  if (isStatusPage) return res; // supaya alert "akun sudah aktif" tetap bisa tampil

  if (isAuthRoute || isSetupRoute) {
    return redirectWithCookies(role === 'ADMIN' ? '/admin/dashboard' : '/');
  }

  if (role !== 'ADMIN') {
    if (isAdminRoute || !isStudentAllowRoute) return redirectWithCookies('/');
  }

  if (role === 'ADMIN' && pathname.startsWith('/student')) {
    return redirectWithCookies('/admin/dashboard');
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
