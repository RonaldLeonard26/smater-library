'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client'; // sesuaikan path client kamu

export default function SessionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // sessionStorage akan HILANG secara otomatis begitu tab/browser ditutup
    const isSessionActive = sessionStorage.getItem('app_session_active');

    if (!isSessionActive) {
      // Jika tab/browser baru saja dibuka, bersihkan cookie lama (force logout)
      supabase.auth.signOut().then(() => {
        sessionStorage.setItem('app_session_active', 'true');
      });
    }
  }, []);

  return <>{children}</>;
}
