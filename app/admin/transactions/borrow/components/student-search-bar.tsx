import InputWithIcon from '@/components/common/input-with-icon';
import { handleKeyDown } from '@/components/common/search-input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onSearch: () => void;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export default function StudentSearchBar({
  value,
  onSearch,
  onChange,
  isLoading,
}: SearchBarProps) {
  return (
    <div className="mx-2 lg:w-1/2 lg:mx-0">
      <InputWithIcon
        leftIcon={<Search size={18} color="grey" />}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        onKeyDown={(e) => handleKeyDown(e, onSearch)}
        disabled={isLoading}
        placeholder="Masukan Nama, Nisn, atau Nis siswa..."
      />
    </div>
  );
}
