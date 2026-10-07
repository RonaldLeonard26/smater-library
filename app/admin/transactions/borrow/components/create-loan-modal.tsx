import { CircleX } from 'lucide-react';
import BookSearchBar from './book-search-bar';
import BookPreviewCard from './book-preview-card';
import BookPreviewCardSkeleton from '@/components/skeleton/skeleton-book-preview';

import SelectedList from './selected-list';
import useBorrowing from '../context/useBorrowing';
import { toast } from 'sonner';
import { LoanType } from '@/types/loans';

interface CreateLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LoanType;
}

export default function CreateLoanModal({
  isOpen,
  onClose,
  type,
}: CreateLoanModalProps) {
  const {
    student,
    refreshStudent,
    search,
    setSearch,
    previewBook,
    isSearchingBook,
    handleSearchBook,
    resetPreviewBook,
    handleAddBook,
    selectedBooks,
    handleAddSameBook,
    handleRemove,
    mutateCreateLoan,
    isCreateLoan,
  } = useBorrowing();

  const handleClose = () => {
    resetPreviewBook();
    onClose();
  };

  const student_id = student?.student_id;
  const activeLoanCount = student?.active_loans.length ?? 0;
  const remainingQuota = Math.max(
    0,
    40 - activeLoanCount - selectedBooks.length,
  );

  const handleSubmitLoan = async () => {
    if (!student_id) return;
    try {
      await mutateCreateLoan({
        studentId: student_id,
        copyIds: selectedBooks.map((item) => item.copy_id),
      });
      await refreshStudent();
      toast.success('Proses peminjaman buku berhasil!');
      handleClose();
    } catch {}
  };

  if (!isOpen) return null;
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl h-[90vh] bg-white border shadow-md rounded-lg flex flex-col p-6"
      >
        {/* header */}
        <div className="flex justify-between border-b pb-4 items-center">
          <div className="flex flex-col space-y-1">
            <h2 className="text-base font-semibold text-slate-800">
              {type === 'ADD' ? 'Peminjaman Baru' : 'Tambah Peminjaman'}
            </h2>
            <p className="font-mono font-semibold text-muted-foreground text-xs">
              @{student?.full_name}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-xl font-bold cursor-pointer"
          >
            <CircleX className="h-5 w-5" />
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

        <div className="grid grid-cols-2 items-start gap-4">
          {/* card preview book */}
          {isSearchingBook ? (
            <BookPreviewCardSkeleton />
          ) : previewBook ? (
            <div className="border rounded-lg shadow-sm mt-4">
              <BookPreviewCard book={previewBook} onAdd={handleAddBook} />
            </div>
          ) : null}

          {/* cart book */}
          <div>
            {selectedBooks.length >= 1 && (
              <SelectedList
                selectedBooks={selectedBooks}
                onRemove={handleRemove}
                onSubmit={handleSubmitLoan}
                isLoading={isCreateLoan}
                onAddSameBook={handleAddSameBook}
                remainingQuota={remainingQuota}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
