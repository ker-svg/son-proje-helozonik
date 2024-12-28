import React from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import type { Transaction } from '../types/finance';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold p-6 border-b">İşlem Geçmişi</h2>
      <div className="divide-y">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              {transaction.type === 'income' ? (
                <ArrowUpCircle className="w-6 h-6 text-green-500 mr-3" />
              ) : (
                <ArrowDownCircle className="w-6 h-6 text-red-500 mr-3" />
              )}
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}₺{transaction.amount}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString('tr-TR')}
              </p>
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <p className="p-4 text-center text-gray-500">Henüz işlem bulunmuyor</p>
        )}
      </div>
    </div>
  );
}