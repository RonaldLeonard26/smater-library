'use client';

import { AnimatePresence, motion as m } from 'framer-motion';
import AdminLoginForm from '../forms/admin-login-form';

export type AuthMode = 'login' | 'register';

export default function AnimatedAdminAuth() {
  return (
    <div className="overflow-hidden p-4 border rounded-lg shadow-sm">
      <div className="relative ">
        <AnimatePresence mode="wait">
          <m.div
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
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
