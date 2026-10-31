// components/status-badge.tsx
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RegistrationStatus } from '@/types/student';

const STATUS_UI: Record<
  RegistrationStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: 'Menunggu',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  ACTIVE: {
    label: 'Aktif',
    className: 'border-teal-200 bg-teal-50 text-teal-700',
  },
  REJECTED: {
    label: 'Ditolak',
    className: 'border-red-200 bg-red-50 text-red-700',
  },
};

export function StatusBadge({ status }: { status: RegistrationStatus }) {
  const { label, className } = STATUS_UI[status];
  return (
    <Badge variant="outline" className={cn('text-xs', className)}>
      {label}
    </Badge>
  );
}
