import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useStudentRegister from '../hooks/use-student-register';
import { Spinner } from '@/components/ui/spinner';
import { Eye, EyeOff } from 'lucide-react';
import useAdminRegister from '../hooks/use-admin-register';

export default function StudentRegisterForm() {
  const {
    register,
    handleSubmit,
    errors,
    isPendingStudentRegister,
    handleStudentRegister,
  } = useStudentRegister();
  const { handleVisiblePassword, visiblePassword } = useAdminRegister();
  return (
    <form
      onSubmit={handleSubmit(handleStudentRegister)}
      className=" grid gap-4"
    >
      <div className="space-y-2">
        <Label>Nama Lengkap</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Masukan nama lengkap anda..."
          required
          {...register('fullName')}
        />
        {errors.fullName?.message && (
          <p className="text-xs text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>NISN</Label>
        <Input
          id="nisn"
          type="text"
          placeholder="Input your NISN..."
          required
          {...register('nisn')}
        />
        {errors.nisn?.message && (
          <p className="text-xs text-destructive">{errors.nisn.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          required
          {...register('email')}
        />
        {errors.email?.message && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className=" relative space-y-2">
        <Label>Password</Label>
        <Input
          id="password"
          type={visiblePassword.password ? 'text' : 'password'}
          required
          {...register('password')}
        />
        <button
          className="focus:outline-none absolute top-8 right-2"
          type="button"
          onClick={() => handleVisiblePassword('password')}
        >
          {visiblePassword.password ? (
            <Eye
              size={16}
              strokeWidth={1.5}
              className="text-gray-500 pointer-events-none "
            />
          ) : (
            <EyeOff
              strokeWidth={1.5}
              size={16}
              className="text-gray-500 pointer-events-none"
            />
          )}
        </button>
        {errors.password?.message && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>
      <div className="relative space-y-2">
        <Label>Confirm Password</Label>
        <Input
          id="confirmPassword"
          type={visiblePassword.confirmPassword ? 'text' : 'password'}
          required
          {...register('confirmPassword')}
        />
        <button
          className="focus:outline-none absolute top-8 right-2"
          type="button"
          onClick={() => handleVisiblePassword('confirmPassword')}
        >
          {visiblePassword.confirmPassword ? (
            <Eye
              size={16}
              strokeWidth={1.5}
              className="text-gray-500 pointer-events-none "
            />
          ) : (
            <EyeOff
              strokeWidth={1.5}
              size={16}
              className="text-gray-500 pointer-events-none"
            />
          )}
        </button>
        {errors.confirmPassword?.message && (
          <p className="text-xs text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPendingStudentRegister}
        className="w-full bg-teal-600 hover:bg-teal-400"
      >
        {isPendingStudentRegister ? <Spinner className="size-6" /> : 'Register'}
      </Button>
    </form>
  );
}
