'use client';

import CardBook from './components/card/card-book';
import useCatalogBooks from './components/hooks/useCatalogBooks';
import { BookOpenCheck, Library } from 'lucide-react';
import FilterCategory from './components/filter/filter-category';
import { useState } from 'react';
import useCategoryOptions from '@/app/admin/categories/components/hooks/useCategoryOption';
import useWishlist from '../../student/wishlist/hooks/useWishlist';
import { Skeleton } from '@/components/ui/skeleton';

export default function Catalog() {
  const { categories } = useCategoryOptions();
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { books, isLoading } = useCatalogBooks({
    search,
    categories: selectedCategories,
  });
  const { handleWishlist, wishlist } = useWishlist();

  const handleToggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleResetCategory = () => {
    setSelectedCategories([]);
  };

  return (
    <section className="container mx-auto px-6 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <BookOpenCheck className="h-6 w-6 text-primary" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
            Katalog Buku
          </h1>
        </div>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Temukan buku favoritmu dan simpan ke wishlist.
        </p>
      </div>

      {/* filter komponent */}
      <FilterCategory
        search={search}
        onSearch={setSearch}
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        onReset={handleResetCategory}
      />

      {/* Grid Books Container */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mt-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-2/3 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mt-4">
          {books.map((book) => (
            <CardBook
              key={book.id}
              book={book}
              isWishlist={wishlist.some((item) => item.id === book.id)}
              onToggleWishlist={() => handleWishlist(book)}
            />
          ))}
        </div>
      ) : (
        // empti state
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <div className="p-4 bg-slate-50 rounded-full text-slate-400">
            <Library className="h-8 w-8" />
          </div>
          <p className="font-medium text-slate-700">Buku tidak ditemukan</p>
          <p className="text-xs text-muted-foreground max-w-sm">
            Coba gunakan kata kunci pencarian lain atau hilangkan filter
            kategori.
          </p>
        </div>
      )}
    </section>
  );
}

{
  /* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-5">
        {books.map((book) => (
          <CardBook
            key={book.id}
            book={book}
            isWishlist={wishlist.some((item) => item.id === book.id)}
            onToggleWishlist={() => handleWishlist(book)}
          />
        ))}
      </div> */
}
