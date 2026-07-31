'use client';

import CardBook from './components/card/card-book';
import useCatalogBooks from './components/hooks/useCatalogBooks';

export default function Catalog() {
  const { books, isLoading } = useCatalogBooks();
  return (
    <div className="flex flex-wrap gap-6">
      {books.map((book) => (
        <CardBook key={book.id} book={book} />
      ))}
    </div>
  );
}
