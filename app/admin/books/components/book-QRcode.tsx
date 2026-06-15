import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';
import QRCode from 'react-qr-code';

interface PropsTypes {
  barcode: string;
  title: string;
}

export default function BookQRCode(props: PropsTypes) {
  const { barcode, title } = props;
  const svgRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    if (!svgRef.current) return;

    try {
      // 1. ambil element svg dari react-qr-code yang ada di dalam wrapper div
      const svgElement = svgRef.current.querySelector(
        'svg',
      ) as SVGSVGElement | null;
      if (!svgElement) return;
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8',
      });
      //2.siapkan penampung gambar di memori browser
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);
      const image = new Image();
      image.onload = () => {
        // 3. Gambar ulang SVG ke dalam bentuk Canvas agar bisa dikonversi ke PNG
        const canvas = document.createElement('canvas');
        ((canvas.width = 256), (canvas.height = 256));

        const context = canvas.getContext('2d');

        if (context) {
          context.fillStyle = '#FFFFFF';
          context.fillRect(0, 0, 256, 256);
          context.drawImage(image, 0, 0, 256, 256);

          // 4. Memicu download file otomatis ke komputer admin

          const pngURL = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          // Bersihkan judul buku dari karakter aneh agar aman menjadi nama file
          const safeTitle = title
            .replace(/[^a-z0-9]/gi, '_')
            .toLocaleLowerCase();
          ((downloadLink.href = pngURL),
            (downloadLink.download = `qrcode_${safeTitle}_${barcode}.png`));

          (document.body.appendChild(downloadLink),
            downloadLink.click(),
            document.body.removeChild(downloadLink),
            toast.success('QRCode downloaded successfully!'));
        }
      };
      image.src = blobURL;
    } catch (error) {
      console.error(error);
      toast.error('Failed to download QR Code');
    }
  };
  return (
    <div className="group relative flex flex-col items-center gap-1 w-fit border p-1 rounded bg-white shadow-sm hover:shadow-md transition-all">
      {/* Gambar QR Code yang akan dibaca oleh sistem download */}
      <div ref={svgRef}>
        <QRCode size={50} value={barcode} viewBox="0 0 256 256" />
      </div>
      <span className="font-mono text-[9px] text-muted-foreground font-semibold">
        {barcode}
      </span>

      {/* Tombol download melayang (hover) yang super estetik */}
      <Button
        onClick={handleDownload}
        size="icon"
        variant="secondary"
        className="absolute inset-0 m-auto h-7 w-7 rounded-full bg-teal-500 text-white opacity-0 shadow group-hover:opacity-100 hover:bg-teal-600 transition-opacity"
        title="Download QR Code"
      >
        <Download size={12} />
      </Button>
    </div>
  );
}
