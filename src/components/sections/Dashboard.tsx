import React from 'react';
import { Balance } from '../Balance';
import { CurrencyRates } from '../CurrencyRates';
import { DailyBudget } from '../goals/DailyBudget';
import { SavingsTips } from '../SavingsTips';
import { Advertisement } from '../Advertisement';
import type { Transaction, Goal } from '../../types/finance';

interface DashboardProps {
  balance: { total: number; income: number; expense: number };
  goals: Goal[];
  monthlyIncome: number;
  transactions: Transaction[];
}

export function Dashboard({ balance, goals, monthlyIncome, transactions }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Balance balance={balance} />
          <div className="mt-6">
            <DailyBudget 
              goals={goals} 
              monthlyIncome={monthlyIncome} 
              transactions={transactions} 
            />
          </div>
        </div>
        <div className="space-y-6">
          <CurrencyRates />
          <Advertisement />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SavingsTips />
      </div>
    </div>
  );
}