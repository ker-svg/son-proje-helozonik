import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, parseISO, startOfYear, eachMonthOfInterval } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { Transaction } from '../../types/finance';
import { getYearlyData } from '../../utils/dateUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface YearlyChartProps {
  transactions: Transaction[];
}

export function YearlyChart({ transactions }: YearlyChartProps) {
  const yearlyTransactions = getYearlyData(transactions);
  const currentYear = new Date().getFullYear();
  
  const months = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: new Date(),
  });

  const monthlyTotals = months.map(month => {
    const monthStr = format(month, 'yyyy-MM');
    return {
      income: yearlyTransactions
        .filter(t => t.type === 'income' && format(parseISO(t.date), 'yyyy-MM') === monthStr)
        .reduce((sum, t) => sum + t.amount, 0),
      expense: yearlyTransactions
        .filter(t => t.type === 'expense' && format(parseISO(t.date), 'yyyy-MM') === monthStr)
        .reduce((sum, t) => sum + t.amount, 0),
    };
  });

  const data = {
    labels: months.map(month => format(month, 'MMMM', { locale: tr })),
    datasets: [
      {
        label: 'Gelir',
        data: monthlyTotals.map(t => t.income),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Gider',
        data: monthlyTotals.map(t => t.expense),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${currentYear} Yılı Gelir/Gider Analizi`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Yıllık Gelir/Gider Analizi</h2>
      <div className="h-[300px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}