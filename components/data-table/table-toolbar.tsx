'use client';
import { Search } from 'lucide-react';
import InputWithIcon from '../common/input-with-icon';

export interface PropsTypes {
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
  children?: React.ReactNode;
  hideFilter?: boolean;
  childrenPosition?: 'left' | 'right';
}
export default function TableToolbar(props: PropsTypes) {
  const {
    globalFilter,
    setGlobalFilter,
    children,
    hideFilter,
    childrenPosition = 'right',
  } = props;

  const search = !hideFilter ? (
    <InputWithIcon
      leftIcon={<Search className="h-4 w-4" />}
      placeholder="Cari..."
      containerClassName="w-70"
      value={globalFilter ?? ''}
      onChange={(e) => setGlobalFilter?.(e.target.value)}
    />
  ) : (
    <div />
  );

  if (childrenPosition === 'left') {
    return (
      <div className="flex items-center gap-8">
        {search}
        <div className="flex shrink-0 ml-6 items-center gap-6 border-x px-6">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2">
      {search}
      {children}
    </div>
  );
}
