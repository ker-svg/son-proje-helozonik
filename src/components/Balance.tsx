import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import type { Balance as BalanceType } from '../types/finance';

interface BalanceProps {
  balance: BalanceType;
}

export function Balance({ balance }: BalanceProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Bakiye</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">₺{balance.total}</p>
          </div>
          <Wallet className="w-8 h-8 text-primary-500 dark:text-primary-400" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Gelir</p>
            <p className="text-2xl font-bold text-success-600 dark:text-success-400">₺{balance.income}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-success-500 dark:text-success-400" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Gider</p>
            <p className="text-2xl font-bold text-danger-600 dark:text-danger-400">₺{balance.expense}</p>
          </div>
          <TrendingDown className="w-8 h-8 text-danger-500 dark:text-danger-400" />
        </div>
      </div>
    </div>
  );
}