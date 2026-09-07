import { NextRequest, NextResponse } from 'next/server';
import { createProxyClient } from './lib/supabase/proxy';

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
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

  // Helper redirect aman cookie
  const redirectWithCookies = (destination: string) => {
    const redirectRes = NextResponse.redirect(new URL(destination, req.url));
    res.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectRes;
  };

  // 1. BELUM LOGIN
  if (!user || error) {
    if (isStudentAllowRoute || isAuthRoute) {
      return res;
    }
    return redirectWithCookies('/');
  }

  // 2. SUDAH LOGIN
  if (user) {
    if (isAuthRoute) {
      const redirectUrl = userRole === 'ADMIN' ? '/admin/dashboard' : '/';
      return redirectWithCookies(redirectUrl);
    }

    if (userRole !== 'ADMIN') {
      if (isAdminRoute || !isStudentAllowRoute) {
        return redirectWithCookies('/');
      }
    }

    if (userRole === 'ADMIN') {
      if (pathname.startsWith('/student')) {
        return redirectWithCookies('/admin/dashboard');
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
