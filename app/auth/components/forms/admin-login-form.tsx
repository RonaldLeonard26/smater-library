import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAdminLogin from '../hooks/use-admin-login';
import { Spinner } from '@/components/ui/spinner';

export default function AdminLoginForm() {
  const { handleLogin, isPendingAdminLogin, register, errors, handleSubmit } =
    useAdminLogin();
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
      <div className="space-y-2">
        <Label>Password</Label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password?.message && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
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
