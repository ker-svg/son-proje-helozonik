import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Transaction, Goal, Debt } from '../types/finance';

export function useAppState() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...transaction, id: uuidv4() }]);
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    setGoals(prev => [...prev, { ...goal, id: uuidv4() }]);
  };

  const updateGoal = (goalId: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  const contributeToGoal = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(goal =>
      goal.id === goalId
        ? { ...goal, currentAmount: goal.currentAmount + amount }
        : goal
    ));
  };

  const addDebt = (debt: Omit<Debt, 'id'>) => {
    setDebts(prev => [...prev, { ...debt, id: uuidv4() }]);
  };

  const updateDebt = (debtId: string, updates: Partial<Debt>) => {
    setDebts(prev => prev.map(debt =>
      debt.id === debtId ? { ...debt, ...updates } : debt
    ));
  };

  const makeDebtPayment = (debtId: string, amount: number) => {
    setDebts(prev => prev.map(debt =>
      debt.id === debtId
        ? { ...debt, remainingAmount: debt.remainingAmount - amount }
        : debt
    ));
  };

  return {
    transactions,
    goals,
    debts,
    addTransaction,
    addGoal,
    updateGoal,
    contributeToGoal,
    addDebt,
    updateDebt,
    makeDebtPayment,
  };
}