import { format, parseISO, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { Transaction } from '../types/finance';

export const formatDate = (date: string) => {
  return format(parseISO(date), 'd MMMM yyyy', { locale: tr });
};

export const getMonthlyData = (transactions: Transaction[]) => {
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  return transactions.filter(transaction => 
    isWithinInterval(parseISO(transaction.date), { start: monthStart, end: monthEnd })
  );
};

export const getYearlyData = (transactions: Transaction[]) => {
  const currentDate = new Date();
  const yearStart = startOfYear(currentDate);
  const yearEnd = endOfYear(currentDate);

  return transactions.filter(transaction => 
    isWithinInterval(parseISO(transaction.date), { start: yearStart, end: yearEnd })
  );
};

export const getTodaysTransactions = (transactions: Transaction[]) => {
  const today = new Date();
  const dayStart = startOfDay(today);
  const dayEnd = endOfDay(today);

  return transactions.filter(transaction => 
    isWithinInterval(parseISO(transaction.date), { start: dayStart, end: dayEnd })
  );
};