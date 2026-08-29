import { useForm } from 'react-hook-form';
import {
  ChangePasswordForm,
  changePasswordSchema,
  ChangePasswordValues,
} from '../components/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authServices } from '@/services/auth.service';
import { toast } from 'sonner';
import { useState } from 'react';

type PasswordFieldKey = 'oldPassword' | 'newPassword' | 'confirmPassword';

export default function useChangePass() {
  const [visiblePassword, setVisiblePassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const toggleVisibility = (key: PasswordFieldKey) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const { mutate: handleUpdatePassword, isPending } = useMutation({
    mutationFn: (data: ChangePasswordValues) =>
      authServices.updatePassword(data),
    onSuccess: () => {
      toast.success('Password berhasil diperbarui');
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Gagal memperbarui password');
    },
  });

  const onSubmit = (data: ChangePasswordValues) => {
    handleUpdatePassword(data);
  };

  return {
    control,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
    toggleVisibility,
    visiblePassword,
  };
}
