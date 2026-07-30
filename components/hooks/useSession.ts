import { supabase } from '@/lib/supabase/client';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session,
  };
}
