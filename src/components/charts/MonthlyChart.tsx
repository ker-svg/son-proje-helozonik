import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { Transaction } from '../../types/finance';
import { getMonthlyData } from '../../utils/dateUtils';
import { EXPENSE_CATEGORIES } from '../../constants/categories';

ChartJS.register(ArcElement, Tooltip, Legend);

interface MonthlyChartProps {
  transactions: Transaction[];
}

export function MonthlyChart({ transactions }: MonthlyChartProps) {
  const monthlyTransactions = getMonthlyData(transactions);
  
  const categoryTotals = EXPENSE_CATEGORIES.reduce((acc, category) => {
    const total = monthlyTransactions
      .filter(t => t.type === 'expense' && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
    if (total > 0) {
      acc[category] = total;
    }
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Aylık Harcama Dağılımı',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Aylık Harcama Analizi</h2>
      <div className="h-[300px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}