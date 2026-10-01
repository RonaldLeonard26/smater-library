'use client';
import StudentLoanTable from './components/student-loan-table';
import StudentsInfoCard from './components/student-info-card';
import StudentSearchBar from './components/student-search-bar';
import CreateLoanModal from './components/create-loan-modal';
import useBorrowing from './context/useBorrowing';
import { LoanType, ReturnLoanPayload } from '@/types/loans';
import useReturnStudentLoan from './hooks/useReturnStudentLoan';
import ReturnModal from '../return/components/return-modal';
import useReturnLoan from '../return/hooks/useReturnLoan';

export default function Borrow() {
  const {
    searchQuery,
    setSearchQuery,
    handleSearch,
    isSearchingStudent,
    student,
    refreshStudent,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  } = useBorrowing();

  const {
    handleCloseReturnModal,
    handleOpenReturnModal,
    handleOpenSingleReturn,
    setReturnItems,
    isReturnModalOpen,
    returnItems,
    resetSelectionKey,
  } = useReturnStudentLoan();
  const { mutateReturnLoan, isPendingReturnLoan } = useReturnLoan();

  const handleSubmitReturn = async (data: ReturnLoanPayload) => {
    if (!data) return;
    try {
      const result = await mutateReturnLoan(data);
      console.log(result);
      await refreshStudent();
      handleCloseReturnModal();
    } catch (error) {}
  };
  const activeLoansCount = student?.active_loans?.length || 0;
  const loanType: LoanType = activeLoansCount ? 'EXTEND' : 'ADD';

  return (
    <div className="space-y-2">
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
          type={loanType}
        />
      )}

      {student && activeLoansCount !== 0 && (
        <StudentLoanTable
          data={student.active_loans || []}
          containerClassName="max-h-97 mr-2"
          resetSelectionKey={resetSelectionKey}
          onReturn={handleOpenSingleReturn}
          onSelectionChange={setReturnItems}
          onBulkReturn={handleOpenReturnModal}
        />
      )}
      <CreateLoanModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        type={loanType}
      />

      {student && (
        <ReturnModal
          isOpen={isReturnModalOpen}
          onClose={handleCloseReturnModal}
          student={student}
          items={returnItems}
          onSubmit={handleSubmitReturn}
          isPending={isPendingReturnLoan}
        />
      )}
    </div>
  );
}
