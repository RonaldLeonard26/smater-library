import CreateLoans from './create-loans';

export default function createLoans() {
  return (
    <div>
      {/* <CreateLoansForm /> */}
      <CreateLoans
        id=""
        nisn=""
        full_name=""
        active_loans={0}
        borrowedBooks={[]}
      />
    </div>
  );
}
