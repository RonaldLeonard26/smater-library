import { authAdminServices } from '@/services/auth.admin.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function useLogOut() {
  const router = useRouter();
  const { mutate: logOut, isPending: isPendingLogOut } = useMutation({
    mutationFn: authAdminServices.logOut,
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal keluar dari aplikasi');
    },
  });

  return { logOut, isPendingLogOut };
}
