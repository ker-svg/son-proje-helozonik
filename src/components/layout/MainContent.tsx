import React from 'react';
import { Dashboard } from '../sections/Dashboard';
import { TransactionSection } from '../sections/TransactionSection';
import { ChartSection } from '../sections/ChartSection';
import { GoalTracker } from '../goals/GoalTracker';
import { DebtTracker } from '../debt/DebtTracker';
import { AboutSection } from '../sections/AboutSection';
import type { Transaction, Goal, Debt } from '../../types/finance';

interface MainContentProps {
  activeSection: string;
  transactions: Transaction[];
  goals: Goal[];
  debts: Debt[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onUpdateGoal: (goalId: string, updates: Partial<Goal>) => void;
  onContributeToGoal: (goalId: string, amount: number) => void;
  onAddDebt: (debt: Omit<Debt, 'id'>) => void;
  onUpdateDebt: (debtId: string, updates: Partial<Debt>) => void;
  onMakeDebtPayment: (debtId: string, amount: number) => void;
}

export function MainContent({
  activeSection,
  transactions,
  goals,
  debts,
  onAddTransaction,
  onAddGoal,
  onUpdateGoal,
  onContributeToGoal,
  onAddDebt,
  onUpdateDebt,
  onMakeDebtPayment,
}: MainContentProps) {
  const balance = transactions.reduce(
    (acc, t) => ({
      ...acc,
      total: acc.total + (t.type === 'income' ? t.amount : -t.amount),
      income: acc.income + (t.type === 'income' ? t.amount : 0),
      expense: acc.expense + (t.type === 'expense' ? t.amount : 0),
    }),
    { total: 0, income: 0, expense: 0 }
  );

  const monthlyIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <main className="p-6 lg:p-8">
      {activeSection === 'dashboard' && (
        <Dashboard
          balance={balance}
          goals={goals}
          monthlyIncome={monthlyIncome}
          transactions={transactions}
        />
      )}
      {activeSection === 'transactions' && (
        <TransactionSection
          transactions={transactions}
          onAddTransaction={onAddTransaction}
        />
      )}
      {activeSection === 'goals' && (
        <GoalTracker
          goals={goals}
          onAddGoal={onAddGoal}
          onUpdateGoal={onUpdateGoal}
          onContributeToGoal={onContributeToGoal}
        />
      )}
      {activeSection === 'debts' && (
        <DebtTracker
          debts={debts}
          onAddDebt={onAddDebt}
          onUpdateDebt={onUpdateDebt}
          onMakePayment={onMakeDebtPayment}
        />
      )}
      {activeSection === 'charts' && (
        <ChartSection transactions={transactions} />
      )}
      {activeSection === 'about' && <AboutSection />}
    </main>
  );
}