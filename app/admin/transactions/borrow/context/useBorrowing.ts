'use client';

import { RawLoanBook, StudentLoanInfo } from '@/types/loans';
import { CreateLoanPayload } from '@/types/type';
import { createContext, useContext } from 'react';

interface BorrowingContextValue {
  //student
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  student: StudentLoanInfo | null;
  isSearchingStudent: boolean;
  handleSearch: () => Promise<void>;
  refreshStudent: () => Promise<void>;
  clearStudent: () => void;

  //modal
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;

  //book
  search: string;
  setSearch: (value: string) => void;
  isSearchingBook: boolean;
  previewBook: RawLoanBook | null;
  resetPreviewBook: () => void;
  selectedBooks: RawLoanBook[];
  handleSearchBook: () => void;
  handleAddBook: () => void;
  handleRemove: (copi_id: string) => void;
  handleAddSameBook: (bookId: string, quantity: number) => Promise<void>;

  // create
  mutateCreateLoan: (payload: CreateLoanPayload) => Promise<void>;
  isCreateLoan: boolean;
}

export const BorrowingContext = createContext<
  BorrowingContextValue | undefined
>(undefined);

export default function useBorrowing() {
  const context = useContext(BorrowingContext);

  if (!context) {
    throw new Error(
      'useBorrowingContext harus digunakan di dalam BorrowingProvider',
    );
  }

  return context;
}
