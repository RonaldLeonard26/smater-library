import { authServices } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';
import useSession from '../hooks/useSession';

export default function useNavbar() {
  const { user, loading: sessionLoading } = useSession();
  const query = useQuery({
    queryKey: ['profiles', user?.id],
    queryFn: () => authServices.getProfile(user!.id),
    enabled: !!user,
  });
  return {
    profile: query.data,
    isLoading: sessionLoading || query.isLoading,
    isAuthenticated: !!user,
  };
}
