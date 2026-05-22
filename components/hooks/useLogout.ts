import { authAdminServices } from '@/services/auth.admin.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function useLogOut() {
  const router = useRouter();
  const { mutate: logOut, isPending: isPendingLogOut } = useMutation({
    mutationFn: authAdminServices.logOut,
    onSuccess: () => {
      toast.success('Success logot');
      router.push('/auth');
    },
    onError: () => {
      toast.error('Failed to logout');
    },
  });

  return { logOut, isPendingLogOut };
}
