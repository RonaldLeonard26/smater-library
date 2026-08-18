import InputWithIcon from '@/components/common/input-with-icon';
import { handleKeyDown } from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import { Loader2, ScanQrCode, Search } from 'lucide-react';
import { useState } from 'react';
import ScannerDialog from '../../components/modals/scanner-dialog';

interface PropsTypes {
  value: string;
  onSearch: () => void;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export default function BookSearchBar(props: PropsTypes) {
  const { onSearch, value, onChange, isLoading } = props;
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleScanSuccess = (scannedBarcode: string) => {
    onChange(scannedBarcode); // Set nilai barcode ke form state

    // Beri sedikit delay agar state ter-update sempurna lalu eksekusi pencarian
    setTimeout(() => {
      onSearch();
    }, 100);
  };

  return (
    <div className="flex items-center gap-2 mx-2 lg:mx-0 ">
      <div className="flex-1">
        <InputWithIcon
          placeholder="Masukan kode barcode"
          rightIcon={<Search size={18} color="grey" />}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          onKeyDown={(e) => handleKeyDown(e, onSearch)}
          disabled={isLoading}
        />
      </div>
      <Button variant="outline" onClick={() => setIsScannerOpen(true)}>
        <ScanQrCode />
      </Button>

      <ScannerDialog
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        title="Scan Barcode Buku"
      />
    </div>
  );
}
