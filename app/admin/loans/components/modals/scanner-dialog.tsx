import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const scanner = new Html5QrcodeScanner(
          'book-camera-reader',
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
            formatsToSupport: [
              Html5QrcodeSupportedFormats.CODE_128,
              Html5QrcodeSupportedFormats.EAN_13,
              Html5QrcodeSupportedFormats.QR_CODE,
            ],
          },
          false,
        );

        scanner.render(
          (decodedText) => {
            onScanSuccess(decodedText);
            scanner.clear();
            onClose();
          },
          () => {}, // mengabaikan frame saat mencari barcode
        );

        scannerRef.current = scanner;
      }, 200);

      return () => clearTimeout(timer);
    } else {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div
          id="book-camera-reader"
          className="w-full overflow-hidden rounded-lg"
        ></div>
      </DialogContent>
    </Dialog>
  );
}
