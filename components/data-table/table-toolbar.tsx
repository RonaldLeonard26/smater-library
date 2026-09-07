'use client';
import { Search } from 'lucide-react';
import InputWithIcon from '../common/input-with-icon';
import { Input } from '../ui/input';
import { handleKeyDown } from '../common/search-input';

export interface PropsTypes {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  children?: React.ReactNode;
}
export default function TableToolbar(props: PropsTypes) {
  const { globalFilter, setGlobalFilter, children } = props;

  return (
    <div className="flex items-center gap-2 justify-between ">
      {/* <Input
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="search..."
        className="max-w-sm w-64"
      /> */}
      <InputWithIcon
        leftIcon={<Search className="h-4 w-4" />}
        placeholder="search..."
        className="max-w-sm w-64"
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <div>{children}</div>
    </div>
  );
}
