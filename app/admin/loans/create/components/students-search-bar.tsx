import InputWithIcon from '@/components/common/input-with-icon';
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
    <div className="mx-2 lg:mx-0">
      <InputWithIcon
        rightIcon={<Search size={18} color="grey" />}
        placeholder="Masukan NISN siswa"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={value}
        onKeyDown={(e) => handleKeyDown(e, onSearch)}
        disabled={isLoading}
      />
    </div>
  );
}
