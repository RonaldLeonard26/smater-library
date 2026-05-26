import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAdminLogin from '../hooks/use-admin-login';
import { Spinner } from '@/components/ui/spinner';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLoginForm() {
  const {
    handleLogin,
    isPendingAdminLogin,
    register,
    errors,
    handleSubmit,
    visiblePassword,
    handleVisiblePassword,
  } = useAdminLogin();
  return (
    <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
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
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className=" relative space-y-2">
        <Label>Password</Label>
        <Input
          id="password"
          type={visiblePassword.password ? 'text' : 'password'}
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
      <div className=" relative space-y-2">
        <Label>Confirm Password</Label>
        <Input
          id="confirmPassword"
          type={visiblePassword.confirmPassword ? 'text' : 'password'}
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
      <div className="space-y-2">
        <Button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-400"
          disabled={isPendingAdminLogin}
        >
          {isPendingAdminLogin ? <Spinner className="size-6" /> : 'Login'}
        </Button>
      </div>
    </form>
  );
}
