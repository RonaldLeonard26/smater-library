import { handleKeyDown } from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ScanQrCode, Search } from 'lucide-react';

interface PropsTypes {
  value: string;
  onSearch: () => void;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export default function BookSearchBar(props: PropsTypes) {
  const { onSearch, value, onChange, isLoading } = props;
  return (
    <div className="flex items-center gap-2 ">
      <div className="relative flex-1">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, onSearch)}
          placeholder="Pindai atau masukan barcode buku..."
          disabled={isLoading}
          autoFocus
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onSearch}
          className="absolute top-0 right-1 bg-transparent "
        >
          {' '}
          {isLoading ? (
            <Loader2 size={18} className="animate-spin text-muted-foreground" />
          ) : (
            <Search size={18} className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      <Button variant="outline">
        <ScanQrCode /> Pindai
      </Button>
    </div>
  );
}
