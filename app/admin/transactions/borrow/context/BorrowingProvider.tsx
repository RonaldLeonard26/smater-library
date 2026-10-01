import { ReactNode, useState } from 'react';
import { BorrowingContext } from './useBorrowing';
import useSearchStudent from '../hooks/useSearchStudent';
import useSearchBooks from '../hooks/useSearchBooks';
import useCreateLoan from '../hooks/useCreateLoan';

interface BorrowingProviderProps {
  children: ReactNode;
}

export default function BorrowingProvider({
  children,
}: BorrowingProviderProps) {
  const studentSearch = useSearchStudent();
  const book = useSearchBooks();
  const loans = useCreateLoan();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <BorrowingContext.Provider
      value={{
        ...studentSearch,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        ...book,
        ...loans,
      }}
    >
      {children}
    </BorrowingContext.Provider>
  );
}
