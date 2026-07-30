import { authServices } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function useLogOut() {
  const router = useRouter();
  const { mutate: logOut, isPending: isPendingLogOut } = useMutation({
    mutationFn: authServices.logOut,
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal keluar dari aplikasi');
    },
  });

  return { logOut, isPendingLogOut };
}
