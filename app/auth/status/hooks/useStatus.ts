import { supabase } from '@/lib/supabase/client';
import { RegistrationStatus } from '@/types/student';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function useStatus() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const query = useQuery({
    queryKey: ['status'],
    queryFn: async (): Promise<RegistrationStatus | null> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase
        .from('profiles')
        .select('status')
        .eq('id', user.id)
        .single();

      return data?.status as RegistrationStatus;
    },
    refetchInterval: (q) => (q.state.data === 'PENDING' ? 1500 : false),
  });

  const logout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.replace('/auth');
    router.refresh();
  };

  const goToHome = () => {
    router.replace('/');
    router.refresh();
  };

  return {
    status: query.data,
    isLoading: query.isLoading,
    isError: query.error,
    isFetching: query.isFetching,
    refetch: query.refetch,
    logout,
    isLoggingOut,
    goToHome,
  };
}
