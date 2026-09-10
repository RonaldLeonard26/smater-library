'use client';

import DataTable from '@/components/data-table/date-table';
import StudentsInfoCard from './components/student-info-card';
import StudentSearchBar from './components/student-search-bar';
import { activeLoansColumns } from './components/columns';
import { ActiveLoanItem } from '@/types/loans';
import CreateLoanModal from './components/modal/create-loan-modal';
import useSearchStudent from '../hooks/useSearchStudent';

export default function Borrow() {
  const {
    searchQuery,
    setSearchQuery,
    handleSearch,
    isSearchingStudent,
    student,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  } = useSearchStudent();

  const activeLoansCount = student?.active_loans?.length || 0;

  return (
    <div className="space-y-4">
      <StudentSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        isLoading={isSearchingStudent}
      />

      {student && (
        <StudentsInfoCard
          student={student}
          currentLoans={activeLoansCount}
          onOpenModal={handleOpenModal}
        />
      )}

      {student && activeLoansCount !== 0 && (
        <DataTable<ActiveLoanItem, unknown>
          columns={activeLoansColumns}
          data={student.active_loans || []}
          emptyMessage="Siswa ini tidak sedang meminjam buku."
        />
      )}
      <CreateLoanModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        studentName={student?.full_name}
      />
    </div>
  );
}
