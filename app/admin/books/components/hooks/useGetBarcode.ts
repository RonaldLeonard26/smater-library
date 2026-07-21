import { ReactQRCodeRef } from '@lglab/react-qr-code';
import { useRef } from 'react';

interface CopyType {
  id: string;
  barcode: string;
  status: string;
}

export default function useGetBarcode(copies: CopyType[] | undefined) {
  // Fungsi pembantu untuk mengubah URL gambar menjadi Base64 string
  const getBase64FromUrl = async (url: string): Promise<string> => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    });
  };

  //1.membuat map untuk menampung banyak ref sekaligus
  const qrRefs = useRef<Map<string, ReactQRCodeRef>>(new Map());

  const downloadSinggleQR = async (id: string, barcode: string) => {
    const qrRef = qrRefs.current.get(id);
    if (!qrRef) return;

    const svgElement = qrRef.svg;
    if (!svgElement) return;

    try {
      // 2. Ambil elemen gambar logo di dalam SVG asli bawaan library
      const svgImage = svgElement.querySelector('image');
      let originalHref = 'https://reactqrcode.com/images/logo-60.png';

      if (svgImage) {
        originalHref =
          svgImage.getAttribute('href') ||
          svgImage.getAttribute('xlink:href') ||
          originalHref;
      }
      // 3. Konversi logo eksternal menjadi Base64 agar lolos CORS Kebijakan Browser
      const base64Logo = await getBase64FromUrl(originalHref);

      // 4. Duplikat elemen SVG agar tidak merusak UI asli aplikasi saat kita edit variabelnya
      const cloneSvg = svgElement.cloneNode(true) as SVGAElement;
      const cloneImage = cloneSvg.querySelector('image');

      // Ganti tautan link gambar di dalam klon SVG menjadi string Base64 lokal
      if (cloneImage) {
        cloneImage.setAttribute('href', base64Logo);
      }
      // 5. Ubah struktur SVG tiruan menjadi string text XML
      const svgString = new XMLSerializer().serializeToString(cloneSvg);
      const svgBlob = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);

      const image = new Image();
      image.onload = () => {
        // Membuat canvas resolusi ultra tinggi (1200x1400)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 1200;
        canvas.height = 1400;

        // Isi warna background kertas putih bersih
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Gambar QR Code (yang sekarang sudah tertanam logo Base64 di dalamnya)
        ctx.drawImage(image, 0, 0, 1200, 1200);

        // Sisipkan teks kode buku di area bawah gambar
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 65px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(barcode, canvas.width / 2, 1280);

        // Trigger Proses Download Otomatis Browser
        const pngURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngURL;
        downloadLink.download = `QR-${barcode}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobURL);
      };

      image.src = blobURL;
    } catch (error) {
      console.error('Gagal memproses gambar logo QR:', error);
      // Fallback/Cadangan: Jika internet putus, tetap unduh QR + teks tanpa logo daripada macet
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const blobURL = window.URL.createObjectURL(svgBlob);
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = 1200;
        canvas.height = 1400;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, 1200, 1200);
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 65px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(barcode, canvas.width / 2, 1280);
        const pngURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngURL;
        downloadLink.download = `QR-${barcode}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobURL);
      };
      image.src = blobURL;
    }
  };

  const downloadAllQR = () => {
    if (!copies) return;
    copies.forEach((copy) => {
      downloadSinggleQR(copy.id, copy.barcode);
    });
  };

  //fungsi cetak semua ke halaman printer
  const handlePrint = () => {
    if (!copies || copies.length === 0) return;

    // 1. Buat kontainer cetak sementara
    const printArea = document.createElement('div');
    printArea.id = 'library-print-area';

    // 2. Salin isi QR dan susun menjadi grid label yang siap cetak
    copies.forEach((copy) => {
      const qrRef = qrRefs.current.get(copy.id);
      const originalSvg = qrRef?.svg;

      if (originalSvg) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'print-item';

        // Duplikat SVG asli agar bisa berdiri sendiri di luar modal
        const clonedSvg = originalSvg.cloneNode(true) as SVGElement;
        clonedSvg.setAttribute('width', '140');
        clonedSvg.setAttribute('height', '140');

        const textLabel = document.createElement('div');
        textLabel.className = 'print-label';
        textLabel.innerText = copy.barcode;

        itemContainer.appendChild(clonedSvg);
        itemContainer.appendChild(textLabel);
        printArea.appendChild(itemContainer);
      }
    });

    document.body.appendChild(printArea);

    // 3. Panggil fungsi cetak browser, lalu bersihkan kontainer setelah selesai
    window.print();
    document.body.removeChild(printArea);
  };

  return { downloadSinggleQR, handlePrint, downloadAllQR, qrRefs };
}
