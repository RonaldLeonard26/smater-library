import { ArrowRight, Loader2, LogOut } from 'lucide-react';
import { RegistrationStatus } from '../status';
import { CONFIG } from './config';
import { Button } from '@/components/ui/button';

interface StatusContentProps {
  status: RegistrationStatus;
  isFetching: boolean;
  isLoggingOut: boolean;
  onLogOut: () => void;
  onContinue: () => void;
}

export default function StatusContent(props: StatusContentProps) {
  const { status, isFetching, isLoggingOut, onContinue, onLogOut } = props;
  const { icon: Icon, title, description, iconClass } = CONFIG[status];
  return (
    <>
      <div className={`rounded-full p-4 ${iconClass}`}>
        <Icon className="size-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {status === 'PENDING' && (
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2
            className={`size-3 ${isFetching ? 'animate-spin' : 'opacity-0'}`}
          />
          Status diperbarui otomatis
        </p>
      )}

      <div className="flex w-full flex-col gap-2">
        {status === 'ACTIVE' && (
          <Button onClick={onContinue} className="w-full">
            Masuk ke beranda
            <ArrowRight className="size-4" />
          </Button>
        )}
        <Button
          variant={status === 'ACTIVE' ? 'ghost' : 'outline'}
          onClick={onLogOut}
          disabled={isLoggingOut}
          className="w-full"
        >
          {isLoggingOut ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <LogOut className="size-4" />
          )}
          Keluar
        </Button>
      </div>
    </>
  );
}
