import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PropsTypes {
  value: string;
  onSearch: () => void;
  onChange: (value: string) => void;
}

export default function BookSearchBar(props: PropsTypes) {
  const { onSearch, value, onChange } = props;
  return (
    <div className="relative">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Masukan kode barcode atau pindai..."
      />
      <Button
        type="button"
        onClick={onSearch}
        className="absolute top-0 right-1 bg-transparent"
      >
        <Search size={18} color="grey" />
      </Button>
    </div>
  );
}
