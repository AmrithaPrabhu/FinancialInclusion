// LoanEducationGame.tsx
import { useState } from 'react';

interface LoanOption {
  id: number;
  principal: number;
  interestRate: number; // annual
  tenure: number; // in months
}

const loanOptions: LoanOption[] = [
  { id: 1, principal: 100000, interestRate: 8, tenure: 24 },
  { id: 2, principal: 100000, interestRate: 10, tenure: 36 },
  { id: 3, principal: 100000, interestRate: 6.5, tenure: 18 },
];

function calculateEMI(principal: number, annualRate: number, months: number) {
  const monthlyRate = annualRate / 12 / 100;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}

export default function LoanEducationGame() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedLoan = loanOptions.find((loan) => loan.id === selectedId);
  const emi = selectedLoan ? calculateEMI(selectedLoan.principal, selectedLoan.interestRate, selectedLoan.tenure) : 0;
  const totalRepayment = selectedLoan ? emi * selectedLoan.tenure : 0;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-purple-200 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">🏦 Loan Smart: The EMI Adventure</h1>
      <p className="text-center mb-8 text-lg">Choose the best loan offer and learn how EMI works.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loanOptions.map((loan) => {
          const emi = calculateEMI(loan.principal, loan.interestRate, loan.tenure);
          const total = emi * loan.tenure;
          const isSelected = loan.id === selectedId;

          return (
            <div
              key={loan.id}
              onClick={() => setSelectedId(loan.id)}
              className={`p-4 rounded-xl border cursor-pointer transition shadow-md hover:shadow-xl ${
                isSelected ? 'bg-green-200 border-green-500' : 'bg-white'
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">Option {loan.id}</h2>
              <p>Principal: ₹{loan.principal.toLocaleString()}</p>
              <p>Interest: {loan.interestRate}% p.a.</p>
              <p>Tenure: {loan.tenure} months</p>
              <p className="mt-2 font-medium">Monthly EMI: ₹{emi.toFixed(0)}</p>
              <p>Total Payable: ₹{total.toFixed(0)}</p>
            </div>
          );
        })}
      </div>

      {selectedLoan && (
        <div className="mt-10 p-6 bg-white rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-2">📊 Result</h2>
          <p className="text-lg mb-2">You chose Option {selectedLoan.id}</p>
          <p className="text-md text-gray-700">
            You'll pay <strong>₹{emi.toFixed(0)}</strong> per month for <strong>{selectedLoan.tenure}</strong> months.
          </p>
          <p className="text-md mt-1 text-gray-700">
            Total repayment: <strong>₹{totalRepayment.toFixed(0)}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
