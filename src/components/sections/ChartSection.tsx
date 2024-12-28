import React from 'react';
import { MonthlyChart } from '../charts/MonthlyChart';
import { YearlyChart } from '../charts/YearlyChart';
import type { Transaction } from '../../types/finance';

interface ChartSectionProps {
  transactions: Transaction[];
}

export function ChartSection({ transactions }: ChartSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MonthlyChart transactions={transactions} />
      <YearlyChart transactions={transactions} />
    </div>
  );
}