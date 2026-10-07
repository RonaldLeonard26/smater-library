import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { LoanHistoryStatus } from '@/types/history';

export interface HistoryFilterValue {
  statuses: LoanHistoryStatus[];
  isOverdue: boolean;
}

interface HistoryFilterProps {
  value: HistoryFilterValue;
  onChange: (value: HistoryFilterValue) => void;
}

const statusOptions: {
  value: LoanHistoryStatus;
  label: string;
}[] = [
  {
    value: 'BORROWED',
    label: 'Dipinjam',
  },
  {
    value: 'RETURNED',
    label: 'Dikembalikan',
  },
];

export default function HistoryFilter({ value, onChange }: HistoryFilterProps) {
  const handleStatusChange = (status: LoanHistoryStatus, checked: boolean) => {
    const statuses = checked
      ? [...value.statuses, status]
      : value.statuses.filter((item: LoanHistoryStatus) => item !== status);

    onChange({ ...value, statuses });
  };

  const handleOverdueChange = (checked: boolean) => {
    onChange({ ...value, isOverdue: checked });
  };
  return (
    <div className="flex w-fit shrink-0 items-center gap-6">
      {statusOptions.map((option) => {
        const checked = value.statuses.includes(option.value);

        return (
          <label
            key={option.value}
            htmlFor={`history-status-${option.value}`}
            className={cn(
              'flex cursor-pointer items-center gap-2 text-sm font-medium',
              'select-none',
            )}
          >
            <Checkbox
              id={`history-status-${option.value}`}
              checked={checked}
              onCheckedChange={(checked) =>
                handleStatusChange(option.value, checked === true)
              }
            />

            <span>{option.label}</span>
          </label>
        );
      })}
      <label
        htmlFor="history-overdue"
        className="flex cursor-pointer items-center gap-2 text-sm font-medium select-none"
      >
        <Checkbox
          id="history-overdue"
          checked={value.isOverdue}
          onCheckedChange={(checked) => handleOverdueChange(checked === true)}
        />

        <span>Terlambat</span>
      </label>
    </div>
  );
}
