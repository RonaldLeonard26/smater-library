import InputWithIcon from '@/components/common/input-with-icon';
import { handleKeyDown } from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Search } from 'lucide-react';

interface BarcodeInputProps {
  value: string;
  onSearch: () => void;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export default function BarcodeInput({
  value,
  onSearch,
  onChange,
  isLoading,
}: BarcodeInputProps) {
  return (
    <div className="flex items-center gap-2 w-150">
      <InputWithIcon
        leftIcon={<Search className="h-4 w-4" />}
        placeholder="Masukan atau scan kode barcode.."
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, onSearch)}
        disabled={isLoading}
        className="h-10 text-base w-full"
      />
      <Button
        type="submit"
        onClick={onSearch}
        className="h-10 px-6 shrink-0 text-base"
      >
        {isLoading ? <Spinner /> : ' Scan'}
      </Button>
    </div>
  );
}
