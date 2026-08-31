import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useCopies from '../hooks/useCopies';
import { Badge } from '@/components/ui/badge';
import { ReactQRCode } from '@lglab/react-qr-code';
import { Button } from '@/components/ui/button';
import { Download, PrinterCheck, Trash2 } from 'lucide-react';
import useGetBarcode from '../hooks/useGetBarcode';
import { useState } from 'react';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import useAddCopies from '../hooks/useAddCopies';
import { Spinner } from '@/components/ui/spinner';
import { Controller } from 'react-hook-form';
import useDeleteCopy from '../hooks/useDeleteCopy';
import { Separator } from '@/components/ui/separator';

interface PropsTypes {
  children: React.ReactNode;
  bookId: string;
}
export default function BarcodeModal({ bookId, children }: PropsTypes) {
  const [open, setOpen] = useState(false);
  const { copies } = useCopies(bookId);
  const {
    downloadSinggleQR,
    handlePrintAll,
    handlePrintSinggle,
    downloadAllQR,
    qrRefs,
  } = useGetBarcode(copies);

  const { control, handleSubmit, handleSave, isPending } = useAddCopies(bookId);
  const { mutateDelete, isPendingDelete } = useDeleteCopy(bookId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" max-h-[80vh] max-w-sm overflow-y-auto scrollbar-thin print:p-0 print:max-w-none print:shadow-none">
        <DialogHeader className="print:hidden">
          <DialogTitle>Barcode</DialogTitle>
          <DialogDescription>
            Unduh atau cetak daftar barcode buku!
          </DialogDescription>
          <Separator />
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Total buku saat ini :{' '}
            <span className="font-semibold text-black">{copies.length}</span>
          </p>

          <form onSubmit={handleSubmit(handleSave)}>
            <Controller
              control={control}
              name="copies"
              render={({ field: { onChange, ...field }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Tambah Buku</FieldLabel>
                  <div className="flex items-center justify-between gap-2">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                      type="number"
                    />
                    {fieldState.invalid && (
                      <FieldError
                        className="text-xs text-destructive"
                        errors={[fieldState.error]}
                      />
                    )}
                    <Button
                      type="submit"
                      variant="outline"
                      disabled={isPending}
                      className="bg-teal-500 text-white"
                    >
                      {isPending ? <Spinner /> : 'Tambah'}
                    </Button>
                  </div>
                </Field>
              )}
            />
          </form>

          {copies?.map((copy) => (
            <div
              key={copy.id}
              className="flex items-center justify-between border rounded-md print:border-none print:p-2"
            >
              <div className="p-2">
                <ReactQRCode
                  dataModulesSettings={{ style: 'horizontal-line' }}
                  finderPatternInnerSettings={{ style: 'rounded-sm' }}
                  finderPatternOuterSettings={{ style: 'rounded-sm' }}
                  imageSettings={{
                    src: 'https://reactqrcode.com/images/logo-60.png',
                    width: 20,
                    height: 20,
                    excavate: true,
                    opacity: 1,
                  }}
                  background="#FFFFFF"
                  marginSize={2}
                  size={120}
                  value={copy.barcode}
                  ref={(el) => {
                    if (el) {
                      qrRefs.current.set(copy.id, el);
                    } else {
                      qrRefs.current.delete(copy.id);
                    }
                  }}
                />

                <span className="text-xs text-slate-500 font-semibold font-mono ">
                  {copy.barcode}
                </span>
              </div>
              <Badge
                className="print:hidden"
                variant={
                  copy.status === 'AVAILABLE' ? 'outline' : 'destructive'
                }
              >
                {copy.status === 'AVAILABLE' ? 'Tersedia' : 'Dipinjam'}
              </Badge>
              <div className="flex print:hidden px-2">
                <Button
                  onClick={() => downloadSinggleQR(copy.id, copy.barcode)}
                  variant="ghost"
                >
                  <Download />
                </Button>
                <Button
                  onClick={() => handlePrintSinggle(copy.id)}
                  variant="ghost"
                >
                  <PrinterCheck />
                </Button>
                <Button
                  onClick={() => mutateDelete(copy.id)}
                  disabled={isPendingDelete}
                  variant="ghost"
                >
                  {isPendingDelete ? <Spinner /> : <Trash2 color="red" />}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className="print:hidden">
          <div className="flex gap-2 items-baseline-last">
            <Button onClick={downloadAllQR} variant="outline">
              Unduh Semua <Download />
            </Button>
            <Button onClick={handlePrintAll} variant="outline">
              Cetak Semua <PrinterCheck />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
