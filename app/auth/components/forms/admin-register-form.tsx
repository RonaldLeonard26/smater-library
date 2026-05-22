import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAdminRegister from '../hooks/use-admin-register';
import { Spinner } from '@/components/ui/spinner';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminRegisterForm() {
  const {
    register,
    handleSubmit,
    errors,
    isPendingAdminRegister,
    handleRegister,
    handleVisiblePassword,
    visiblePassword,
  } = useAdminRegister();
  return (
    <form onSubmit={handleSubmit(handleRegister)} className=" grid gap-4">
      <div className="space-y-2">
        <Label>Fullname</Label>
        <Input
          id="fullName"
          type="text"
          required
          placeholder="Input your fullname here..."
          {...register('fullName')}
        />
        {errors.fullName?.message && (
          <p className="text-destructive text-xs">{errors.fullName?.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          id="email"
          type="email"
          required
          placeholder="example@gmail.com"
          {...register('email')}
        />
        {errors.email?.message && (
          <p className="text-destructive text-xs">{errors.email?.message}</p>
        )}
      </div>
      <div className=" relative space-y-2">
        <Label>Password</Label>
        <Input
          id="password"
          type={visiblePassword.password ? 'text' : 'password'}
          required
          {...register('password')}
          className=""
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
          <p className="text-destructive text-xs">{errors.password?.message}</p>
        )}
      </div>
      <div className="relative space-y-2">
        <Label>Confirm Password</Label>
        <Input
          type={visiblePassword.confirmPassword ? 'text' : 'password'}
          id="confirmPassword"
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
          <p className="text-destructive text-xs">
            {errors.confirmPassword?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-400"
          disabled={isPendingAdminRegister}
        >
          {isPendingAdminRegister ? <Spinner className="size-6" /> : 'Register'}
        </Button>
      </div>
    </form>
  );
}
