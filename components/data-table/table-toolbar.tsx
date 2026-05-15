'use client';
import { Input } from '../ui/input';

export interface PropsTypes {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  children?: React.ReactNode;
}
export default function TableToolbar(props: PropsTypes) {
  const { globalFilter, setGlobalFilter, children } = props;

  return (
    <div className="flex items-center justify-between px-2">
      <Input
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="search..."
        className="max-w-sm w-64"
      />
      <div>{children}</div>
    </div>
  );
}
