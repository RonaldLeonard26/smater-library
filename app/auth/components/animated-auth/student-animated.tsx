'use client';

import { useState } from 'react';
import { AuthMode } from './admin-animated';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import StudentLoginForm from '../forms/student-login-form';
import StudentRegisterForm from '../forms/student-register-form';
import { Button } from '@/components/ui/button';

export default function AnimatedStudentsAuth() {
  const [mode, setMode] = useState<AuthMode>('login');
  return (
    <Card className="overflow-hidden p-6">
      <div className="relative">
        <AnimatePresence mode="wait">
          {mode === 'login' ? (
            <motion.div
              key="login"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: 'easeInOut',
              }}
              className="space-y-4"
            >
              <div>
                <CardTitle>Login</CardTitle>
                <CardDescription>Masukan NISN dan password</CardDescription>
              </div>

              <StudentLoginForm />
              <p className="text-xs">
                Belum punya akun? {''}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setMode('register')}
                  className="text-xs text-primary hover:underline"
                >
                  Daftar disni
                </Button>
              </p>
            </motion.div>
          ) : (
            <motion.div
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
              <div>
                <CardTitle>Create student account</CardTitle>

                <CardDescription className="mb-2">
                  Fill the form below to create account
                </CardDescription>

                <p className="text-start text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="font-medium text-teal-600 hover:underline"
                  >
                    Login here
                  </button>
                </p>
              </div>
              <StudentRegisterForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
