'use client';

import CardBook from './components/card/card-book';
import useCatalogBooks from './components/hooks/useCatalogBooks';
import { BookOpenCheck } from 'lucide-react';
import FilterCategory from './components/filter/filter-category';
import { useEffect, useState } from 'react';

import useCategoryOptions from '@/app/admin/categories/components/hooks/useCategoryOption';

export default function Catalog() {
  const { categories } = useCategoryOptions();
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { books, isLoading } = useCatalogBooks({
    search,
    categories: selectedCategories,
  });

  const handleToggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleResetCategory = () => {
    setSelectedCategories([]);
  };

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);
  return (
    <section className="container mx-auto px-6">
      {/* Heading */}
      <div className="space-y-1 mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold"> Katalog Buku</h1>
          <BookOpenCheck className="text-teal-500" />
        </div>
        <p className="text-muted-foreground text-sm">
          Temukan buku favoritmu dan simpan ke wishlist.
        </p>
      </div>

      {/* Search */}

      <FilterCategory
        search={search}
        onSearch={setSearch}
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        onReset={handleResetCategory}
      />

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 mt-5">
        {books.map((book) => (
          <CardBook key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
