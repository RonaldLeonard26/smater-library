import { authServices } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';
import useSession from '../hooks/useSession';

export default function useNavbar() {
  const { user, userId, loading: sessionLoading } = useSession();

  const query = useQuery({
    queryKey: ['profiles', userId],
    queryFn: () => authServices.getProfile(userId!),
    enabled: !!userId && !sessionLoading,
  });

  return {
    profile: query.data ?? null,
    isLoading: sessionLoading || (!!userId && query.isLoading),
    isAuthenticated: !!user,
  };
}
