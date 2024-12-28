import React, { useState } from 'react';
import { PiggyBank } from 'lucide-react';

interface DebtPaymentProps {
  debtId: string;
  debtTitle: string;
  remainingAmount: number;
  onMakePayment: (debtId: string, amount: number) => void;
}

export function DebtPayment({
  debtId,
  debtTitle,
  remainingAmount,
  onMakePayment
}: DebtPaymentProps) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    const paymentAmount = parseFloat(amount);
    if (paymentAmount <= 0 || paymentAmount > remainingAmount) return;

    onMakePayment(debtId, paymentAmount);
    setAmount('');
  };

  return (
    <div className="border-t pt-3 mt-3">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <PiggyBank className="w-4 h-4" />
          <span>Ödeme Yap</span>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ödeme miktarı"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            min="0"
            max={remainingAmount}
            step="0.01"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
          >
            Öde
          </button>
        </div>
      </form>
    </div>
  );
}