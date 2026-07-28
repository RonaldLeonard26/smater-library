import { handleKeyDown } from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';

interface PropsTypes {
  value: string;
  onSearch: () => void;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export default function StudentSearchBar(props: PropsTypes) {
  const { onSearch, value, onChange, isLoading } = props;
  return (
    <div className="relative w-1/2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={value}
        onKeyDown={(e) => handleKeyDown(e, onSearch)}
        placeholder="Masukan NISN siswa..."
        disabled={isLoading}
      />
      <Button
        type="button"
        onClick={onSearch}
        className="absolute top-0 right-1 bg-transparent"
      >
        {' '}
        {isLoading ? (
          <Loader2 size={18} className="animate-spin text-muted-foreground" />
        ) : (
          <Search size={18} color="grey" />
        )}
      </Button>
    </div>
  );
}
