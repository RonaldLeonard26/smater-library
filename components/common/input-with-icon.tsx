import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function InputWithIcon({
  leftIcon,
  rightIcon,
  className,
  ...props
}: InputWithIconProps) {
  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {leftIcon}
        </div>
      )}

      <Input
        {...props}
        className={cn(leftIcon && 'pl-10', rightIcon && 'pr-10', className)}
      />

      {rightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {rightIcon}
        </div>
      )}
    </div>
  );
}
