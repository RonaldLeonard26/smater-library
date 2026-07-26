'use client';

import { Controller } from 'react-hook-form';
import StudentSearchBar from './components/students-search-bar';
import StudentsInfoCard from './components/students-info-card';
import BookSearchBar from './components/book-search-bar';
import BookPreviewCard from './components/book-preview-card';
import SelectedBookList from './components/selected-book-list';
import useCreateLoans from './components/hooks/useCreateLoans';

export default function CreateLoans() {
  const loans = useCreateLoans();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground font-semibold">
        Transaksi peminjaman buku
      </p>

      <Controller
        control={loans.control}
        name="student_nisn"
        render={({ field }) => (
          <StudentSearchBar
            value={field.value}
            onChange={field.onChange}
            onSearch={() => loans.handleSearchStudent(field.value)}
          />
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/*  preview */}
        <div className="flex flex-col space-y-4">
          {loans.student?.id && (
            <StudentsInfoCard
              student={loans.student}
              totalLoans={loans.totalLoans}
            />
          )}
          {loans.student?.id && (
            <Controller
              control={loans.control}
              name="keyword"
              render={({ field }) => (
                <BookSearchBar
                  value={field.value}
                  onChange={field.onChange}
                  onSearch={() => loans.searchAvailableBook(field.value)}
                />
              )}
            />
          )}

          {loans.searchResults && (
            <BookPreviewCard
              book={loans.searchResults}
              onAdd={loans.handleAddBook}
            />
          )}
        </div>
        {/* payload */}
        <div>
          {loans.selectedBooks.length >= 1 && (
            <SelectedBookList
              books={loans.selectedBooks}
              onRemove={loans.handleRemoveBook}
              onSubmit={loans.handleCreateLoan}
            />
          )}
        </div>
      </div>
    </div>
  );
}
