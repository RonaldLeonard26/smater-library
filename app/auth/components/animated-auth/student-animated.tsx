'use client';

import { useState } from 'react';
import { AuthMode } from './admin-animated';
import { AnimatePresence, motion as m } from 'framer-motion';
import StudentLoginForm from '../forms/student-login-form';
import StudentRegisterForm from '../forms/student-register-form';

export default function AnimatedStudentsAuth() {
  const [mode, setMode] = useState<AuthMode>('login');
  return (
    <div className="overflow-hidden border rounded-lg p-3 shadow-sm">
      <div className="relative">
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
              <p>Silahkan masuk ke akun anda</p>
              <StudentLoginForm />
              <div className="flex items-center justify-center">
                <p className="text-xs">
                  Belum punya akun? {''}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-xs text-teal-500 font-semibold hover:underline"
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
              className="space-y-4"
            >
              <div className="flex flex-col gap-2">
                <p>Isi data dibawah untuk membuat akun anda!</p>
              </div>
              <StudentRegisterForm />
              <div className="flex items-center justify-center">
                <p className="text-xs">
                  Sudah punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className=" text-xs text-teal-500 font-semibold hover:underline cursor-pointer"
                  >
                    Masuk disini
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
