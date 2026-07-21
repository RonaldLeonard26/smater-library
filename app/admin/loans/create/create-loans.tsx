'use client';

import { Controller } from 'react-hook-form';
import useLoans from '../components/hooks/useLoans';
import StudentSearchBar from './components/students-search-bar';
import StudentsErrorCard from './components/students-error-card';
import StudentsInfoCard from './components/students-info-card';
import BookSearchBar from './components/book-search-bar';
import BookPreviewCard from './components/book-preview-card';

export default function CreateLoans() {
  const loans = useLoans();
  return (
    <div>
      <Controller
        control={loans.control}
        name="student_id"
        render={({ field }) => (
          <StudentSearchBar
            value={field.value}
            onChange={field.onChange}
            onSearch={() => loans.handleSearchStudent(field.value)}
          />
        )}
      />
      {loans.studentError && (
        <StudentsErrorCard
          onClose={() => loans.setStudentError('')}
          message={loans.studentError}
        />
      )}
      {loans.student?.id && (
        <StudentsInfoCard
          student={loans.student}
          remainingSlots={loans.remainingSlots}
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
              onSearch={() => loans.handleGetBook(field.value)}
            />
          )}
        />
      )}

      {loans.bookPreview && (
        <BookPreviewCard bookPreview={loans.bookPreview.title} />
      )}
    </div>
  );
}
