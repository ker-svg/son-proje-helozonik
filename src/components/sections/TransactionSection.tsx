import React from 'react';
import { TransactionForm } from '../TransactionForm';
import { TransactionList } from '../TransactionList';
import type { Transaction } from '../../types/finance';

interface TransactionSectionProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export function TransactionSection({ transactions, onAddTransaction }: TransactionSectionProps) {
  return (
    <div className="space-y-6">
      <TransactionForm onAddTransaction={onAddTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
}