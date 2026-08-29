import { NextRequest, NextResponse } from 'next/server';
import { createProxyClient } from './lib/supabase/proxy';

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

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

  // Ambil data role dari user metadata yang sudah terverifikasi aman oleh server Supabase
  const userRole = user?.user_metadata?.role;

  //aturan route
  const isAuthRoute = pathname.startsWith('/auth');
  const isAdminRoute = pathname.startsWith('/admin');
  const isStudentAllowRoute =
    pathname === '/' ||
    pathname.startsWith('/books') ||
    pathname.startsWith('/student') ||
    pathname.startsWith('/about');

  //1.kondisi belum login
  if (!user || error) {
    //ijinkan buka halaman publik dan halaman login/register
    if (isStudentAllowRoute || isAuthRoute) {
      return res;
    }
    // Jika mencoba masuk ke /admin tanpa login, tendang ke halaman home
    return NextResponse.redirect(new URL('/', req.url));
  }

  //2.pengguna sudah login
  if (user) {
    // Jika sudah login tapi mencoba akses halaman login (/auth),kembalikan ke Home atau Dashboard sesuai role
    if (isAuthRoute) {
      const redirectUrl = userRole === 'ADMIN' ? '/admin/dashboard' : '/';
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
    //jika pengguna adalah student
    if (userRole !== 'ADMIN') {
      // Student DILARANG masuk ke rute admin (/admin)
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      // Student HANYA boleh mengakses rute yang ditentukan
      if (!isStudentAllowRoute) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    if (userRole === 'ADMIN') {
      if (pathname.startsWith('/student')) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url)); // Alihkan ke base dashboard admin
      }
    }
  }

  return res;
}
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
