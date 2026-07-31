'use client';

import Image from 'next/image';

export interface CatalogBook {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  availableCopies: number;
}
interface BookCard {
  book: CatalogBook;
}

export default function CardBook(props: BookCard) {
  const { book } = props;
  return (
    <div className="flex flex-col items-center border rounded-lg p-4 justify-center">
      {book.cover_url && (
        <Image
          src={book.cover_url}
          width={100}
          height={100}
          alt="cover"
          className="object-cover rounded-lg"
        />
      )}
      <div className="flex flex-col gap-2 mt-4">
        <p className="font-medium">{book.title}</p>
        <div className="flex items-center justify-between">
          <p>{book.author}</p>
          <p>{book.availableCopies}</p>
        </div>
      </div>
    </div>
  );
}
