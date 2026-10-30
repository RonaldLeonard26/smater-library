export const authCookieOptions = {
  name: 'sb-session',
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
};

// jadikan session cookie, kecuali saat cookie sedang dihapus (maxAge 0)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toSessionCookie(options: any) {
  if (!options || options.maxAge === 0) return options;
  const { maxAge: _maxAge, expires: _expires, ...rest } = options;
  return rest;
}
