import InputWithIcon from '@/components/common/input-with-icon';
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
    <div className="flex items-center gap-2 mx-2 lg:mx-0 ">
      <div className="flex-1">
        <InputWithIcon
          placeholder="Masukan kode barcode"
          rightIcon={<Search size={18} color="grey" />}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={value}
          onKeyDown={(e) => handleKeyDown(e, onSearch)}
          disabled={isLoading}
        />
      </div>
      <Button variant="outline">
        <ScanQrCode />
      </Button>
    </div>
  );
}
