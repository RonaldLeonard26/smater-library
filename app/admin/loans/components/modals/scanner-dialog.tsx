import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface ScannerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (barcode: string) => void;
  title: string;
}

export default function ScannerDialog({
  isOpen,
  onClose,
  onScanSuccess,
  title,
}: ScannerDialogProps) {
  const [isInitializing, setIsInitializing] = useState(true);
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    let isMounted = true;

    const startScanner = async () => {
      if (!isOpen) return;
      setIsInitializing(true);

      // Beri jeda kecil agar DOM modal render sempurna sebelum scanner diikat
      await new Promise((resolve) => setTimeout(resolve, 300));

      const elementId = 'camera-reader-mesh';
      const element = document.getElementById(elementId);
      if (!element || !isMounted) return;

      try {
        // Inisialisasi instansi Html5Qrcode
        const html5Qrcode = new Html5Qrcode(elementId);
        html5QrcodeRef.current = html5Qrcode;

        // Jalankan kamera belakang (environment)
        await html5Qrcode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
          },
          (decodedText) => {
            // Callback saat barcode berhasil terdeteksi
            if (isMounted) {
              stopScanner().then(() => {
                onScanSuccess(decodedText);
                onClose();
              });
            }
          },
          () => {}, // mengabaikan error pencarian per frame
        );

        if (isMounted) setIsInitializing(false);
      } catch (err) {
        console.error('Gagal membuka kamera:', err);
        if (isMounted) setIsInitializing(false);
      }
    };

    const stopScanner = async () => {
      if (html5QrcodeRef.current) {
        try {
          if (html5QrcodeRef.current.isScanning) {
            await html5QrcodeRef.current.stop();
          }
          html5QrcodeRef.current.clear();
        } catch (err) {
          console.error('Gagal menghentikan scanner:', err);
        } finally {
          html5QrcodeRef.current = null;
        }
      }
    };

    if (isOpen) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      isMounted = false;
      stopScanner();
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="relative min-h-250px w-full overflow-hidden rounded-lg bg-black flex items-center justify-center">
          {isInitializing && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-slate-900/80 text-white">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium">Menyiapkan Kamera...</p>
            </div>
          )}

          {/* ID elemen ini diikat ke instance Html5Qrcode */}
          <div id="camera-reader-mesh" className="w-full h-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
