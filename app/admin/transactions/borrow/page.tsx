'use client';

import Borrow from './borrow';
import BorrowingProvider from './context/BorrowingProvider';

export default function BorrowPage() {
  return (
    <BorrowingProvider>
      <Borrow />
    </BorrowingProvider>
  );
}
