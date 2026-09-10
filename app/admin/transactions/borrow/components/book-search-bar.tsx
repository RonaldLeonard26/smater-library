import InputWithIcon from '@/components/common/input-with-icon';
import { handleKeyDown } from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Barcode } from 'lucide-react';

interface BookSearchBarProps {
  value: string;
  onSearch: () => void;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export default function BookSearchBar({
  value,
  onSearch,
  onChange,
  isLoading,
}: BookSearchBarProps) {
  return (
    <div className="w-1/2 space-y-2 flex gap-2">
      <div className="flex-1">
        <InputWithIcon
          leftIcon={<Barcode className="h-4 w-4 text-slate-400" />}
          placeholder="Masukan atau scan kode barcode..."
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, onSearch)}
          disabled={isLoading}
        />
      </div>
      <Button
        type="button"
        className="bg-primary hover:bg-teal-700 shrink-0"
        onClick={onSearch}
      >
        {isLoading ? <Spinner /> : 'Cari'}
      </Button>
    </div>
  );
}
