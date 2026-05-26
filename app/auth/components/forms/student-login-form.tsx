import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useStudentLogin from '../hooks/use-student-login';
import useAdminRegister from '../hooks/use-admin-register';
import { Eye, EyeOff } from 'lucide-react';

export default function StudentLoginForm() {
  const { handleVisiblePassword, visiblePassword } = useAdminRegister();
  const {
    register,
    handleSubmit,
    errors,
    isPendingStudentLogin,
    handleStudentLogin,
  } = useStudentLogin();
  return (
    <form onSubmit={handleSubmit(handleStudentLogin)} className="grid gap-4">
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
      <div className="relative space-y-2">
        <Label>Password</Label>
        <Input
          id="password"
          required
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
          required
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
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
