export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Balance {
  total: number;
  income: number;
  expense: number;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  createdAt: string;
}

export interface Debt {
  id: string;
  title: string;
  amount: number;
  remainingAmount: number;
  dueDate: string;
  creditor: string;
  interestRate?: number;
  paymentFrequency: 'monthly' | 'weekly' | 'yearly';
  createdAt: string;
}