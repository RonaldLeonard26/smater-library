'use client';
import { Search } from 'lucide-react';
import InputWithIcon from '../common/input-with-icon';

export interface PropsTypes {
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
  children?: React.ReactNode;
  hideFilter?: boolean;
}
export default function TableToolbar(props: PropsTypes) {
  const { globalFilter, setGlobalFilter, children, hideFilter } = props;

  return (
    <div className="flex items-center gap-2 justify-between ">
      {!hideFilter ? (
        <InputWithIcon
          leftIcon={<Search className="h-4 w-4" />}
          placeholder="search..."
          className="max-w-sm w-64"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter?.(e.target.value)}
        />
      ) : (
        <div />
      )}
      <div>{children}</div>
    </div>
  );
}
