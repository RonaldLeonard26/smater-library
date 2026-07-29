'use client';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion as m } from 'framer-motion';
import { useState } from 'react';
import AdminLoginForm from '../forms/admin-login-form';
import AdminRegisterForm from '../forms/admin-register-form';

export type AuthMode = 'login' | 'register';

export default function AnimatedAdminAuth() {
  const [mode, setMode] = useState<AuthMode>('login');
  return (
    <div className="overflow-hidden p-4 border rounded-lg shadow-sm">
      <div className="relative ">
        <AnimatePresence mode="wait">
          {mode === 'login' ? (
            <m.div
              key="login"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: 'easeInOut',
              }}
              className="space-y-4"
            >
              <div className="mb-4">
                <h2 className="text-lg">Selamat datang</h2>
                <p>Silahkan masuk ke akun anda!</p>
              </div>

              <AdminLoginForm />
              <div className="flex items-center justify-center">
                <p className="text-xs">
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-teal-500 font-semibold text-xs hover:underline"
                  >
                    Daftar disni
                  </button>
                </p>
              </div>
            </m.div>
          ) : (
            <m.div
              key="register"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className="space-y-2"
            >
              <div className="mb-4">
                <p className="font-normal">
                  Isi data dibawah ini untuk membuat akun
                </p>
              </div>
              <AdminRegisterForm />
              <div className="flex items-center justify-center">
                <p className="text-primary text-xs">
                  Sudah punya akun{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-teal-500 hover:underline cursor-pointer text-xs font-semibold"
                  >
                    Masuk disni
                  </button>
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
