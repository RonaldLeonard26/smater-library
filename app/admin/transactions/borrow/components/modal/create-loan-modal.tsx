import { CircleX } from 'lucide-react';
import BookSearchBar from '../book-search-bar';
import useCreateLoan from '../../../hooks/useCreateLoan';

interface CreateLoanModalProps {
  isOpen: boolean;
  onClose: () => void;

  // studentId: string;
  studentName?: string;
  // currentLoansCount: number;
}

export default function CreateLoanModal({
  isOpen,
  onClose,
  studentName,
}: CreateLoanModalProps) {
  const { search, setSearch, previewBook, isSearchingBook, handleSearchBook } =
    useCreateLoan();

  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl h-[90vh] bg-white border shadow-md rounded-lg flex flex-col p-6"
      >
        {/* header */}
        <div className="flex justify-between border-b pb-4 items-center">
          <div className="flex flex-col space-y-1">
            <h2 className="text-base font-semibold text-slate-800">
              Peminjaman Baru
            </h2>
            <p className="font-mono font-semibold text-muted-foreground text-xs">
              @{studentName}
            </p>
          </div>
          <button onClick={onClose} className="text-xl font-bold">
            <CircleX className="h-4 w-4" />
          </button>
        </div>

        {/* input field */}
        <div className="mt-4">
          <BookSearchBar
            value={search}
            onChange={setSearch}
            onSearch={handleSearchBook}
            isLoading={isSearchingBook}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* card preview book */}
          <div className="flex flex-col border rounded-lg">
            {previewBook && <h1>{previewBook?.title}</h1>}
          </div>

          {/* cart book */}
          <div className="flex flex-col border rounded-lg"></div>
        </div>
      </div>
    </div>

    // <Dialog open={isOpen} onOpenChange={onClose}>
    //   <DialogContent className="w-3xl max-h-[90vh] flex flex-col p-6">
    //     <DialogHeader className="pb-3 border-b">
    //       <DialogTitle className="text-base font-bold text-slate-800 flex items-center justify-between">
    //         <span>Peminjaman Baru (Bulk Mode)</span>
    //         <Badge variant="outline" className="text-xs font-normal">
    //           Siswa:{' '}
    //           <strong className="ml-1 text-teal-700">{studentName}</strong>
    //         </Badge>
    //       </DialogTitle>
    //     </DialogHeader>

    //     <div className="flex-1 overflow-y-auto space-y-4 py-3 scrollbar-thin">
    //       {/* Step 1: Scan Sample Barcode */}
    //       <div className="space-y-1.5">
    //         <label className="text-xs font-medium text-slate-600">
    //           Scan Barcode Sampel Buku
    //         </label>
    //         <div className="flex gap-2">
    //           <InputWithIcon
    //             leftIcon={<Barcode className="h-4 w-4 text-slate-400" />}
    //           ></InputWithIcon>
    //         </div>
    //         <Button type="button" className="bg-teal-600 hover:bg-teal-700">
    //           Cari
    //         </Button>
    //       </div>
    //     </div>

    //     {/* Step 2: Form Qty jika Sampel Ditemukan
    //       {activeBook && (
    //         <div className="p-3 border rounded-md bg-teal-50/60 border-teal-200 space-y-3">
    //           <div>
    //             <p className="text-sm font-bold text-slate-800">
    //               {activeBook.title}
    //             </p>
    //             <p className="text-xs text-slate-500">
    //               {activeBook.category_name} • Stok Tersedia:{' '}
    //               <strong className="text-teal-700">
    //                 {activeBook.available_stock} Eksemplar
    //               </strong>
    //             </p>
    //           </div>

    //           <div className="flex items-center gap-3">
    //             <div className="w-32">
    //               <label className="text-[11px] font-medium text-slate-600">
    //                 Jumlah (Qty)
    //               </label>
    //               <Input
    //                 type="number"
    //                 min={1}
    //                 max={activeBook.available_stock}
    //                 value={qtyInput}
    //                 onChange={(e) => setQtyInput(parseInt(e.target.value) || 1)}
    //                 className="bg-white text-sm"
    //               />
    //             </div>
    //             <Button
    //               type="button"
    //               onClick={handleAddDraft}
    //               className="mt-4 bg-teal-700 hover:bg-teal-800 text-white gap-1.5"
    //             >
    //               <Plus className="w-4 h-4" /> Masukkan Daftar
    //             </Button>
    //           </div>
    //         </div>
    //       )}

    //       {/* Draft List */}
    //     {/* <div className="space-y-2">
    //       <div className="flex justify-between items-center">
    //         <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
    //           Daftar Pinjaman ({totalSelectedQty} Buku)
    //         </h4>
    //         <span className="text-xs text-slate-500">
    //           Sisa Kuota:{' '}
    //           <strong>{40 - (currentLoansCount + totalSelectedQty)}</strong>
    //         </span>
    //       </div>

    //       {draftItems.length === 0 ? (
    //         <div className="border border-dashed rounded-md p-6 text-center text-slate-400 flex flex-col items-center">
    //           <Layers className="w-8 h-8 stroke-1 mb-1" />
    //           <p className="text-xs">
    //             Scan sampel barcode di atas untuk menambah pinjaman.
    //           </p>
    //         </div>
    //       ) : (
    //         <div className="border rounded-md divide-y max-h-[180px] overflow-y-auto">
    //           {draftItems.map((item, idx) => (
    //             <div
    //               key={item.book_id}
    //               className="p-2.5 flex items-center justify-between hover:bg-slate-50"
    //             >
    //               <div>
    //                 <p className="text-sm font-medium text-slate-800">
    //                   {item.title}
    //                 </p>
    //                 <p className="text-xs text-slate-500">
    //                   {item.category_name} ({item.duration_days} Hari)
    //                 </p>
    //               </div>
    //               <div className="flex items-center gap-3">
    //                 <Badge variant="secondary" className="font-mono text-xs">
    //                   {item.quantity} Eksemplar
    //                 </Badge>
    //                 <Button
    //                   size="icon"
    //                   variant="ghost"
    //                   className="h-7 w-7 text-slate-400 hover:text-rose-600"

    //                 >
    //                   <Trash2 className="w-3.5 h-3.5" />
    //                 </Button>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //     </div> */}

    //     <DialogFooter className="pt-3 border-t flex justify-between">
    //       <Button variant="outline" onClick={onClose}>
    //         Batal
    //       </Button>
    //       <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
    //         Proses Peminjaman
    //       </Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
}
