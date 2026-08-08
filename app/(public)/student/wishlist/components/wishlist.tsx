'use client';

import CardBook from '@/app/(public)/books/components/card/card-book';
import useWishlist from '../hooks/useWishlist';

export default function Wishlist() {
  const { wishlist, handleWishlist } = useWishlist();

  return (
    <section className="container mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {wishlist.map((book) => (
          <CardBook
            key={book.id}
            book={book}
            isWishlist
            onToggleWishlist={() => handleWishlist(book)}
          />
        ))}
      </div>
    </section>
  );
}
