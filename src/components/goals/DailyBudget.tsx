import React, { useState } from 'react';
import { Calculator, Edit2, Save } from 'lucide-react';
import { Transaction } from '../../types/finance';
import { getTodaysTransactions } from '../../utils/dateUtils';

interface DailyBudgetProps {
  goals: Goal[];
  monthlyIncome: number;
  transactions: Transaction[];
}

export function DailyBudget({ goals, monthlyIncome, transactions }: DailyBudgetProps) {
  const [customDailyBudget, setCustomDailyBudget] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState('');

  const calculatedDailyBudget = (monthlyIncome - goals.reduce((total, goal) => {
    const monthlyContribution = (goal.targetAmount - goal.currentAmount) / 
      (Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)));
    return total + monthlyContribution;
  }, 0)) / 30;

  const dailyBudget = customDailyBudget ?? calculatedDailyBudget;
  const todaysExpenses = getTodaysTransactions(transactions)
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const remainingToday = dailyBudget - todaysExpenses;

  const handleSaveBudget = () => {
    const newBudget = parseFloat(tempBudget);
    if (!isNaN(newBudget) && newBudget > 0) {
      setCustomDailyBudget(newBudget);
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold">Günlük Bütçe Planı</h2>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-gray-600 hover:text-gray-800"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="number"
              value={tempBudget}
              onChange={(e) => setTempBudget(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Günlük bütçe girin"
              min="0"
              step="0.01"
            />
            <button
              onClick={handleSaveBudget}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Save className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800 mb-1">Günlük Harcanabilir Tutar</p>
              <p className="text-3xl font-bold text-green-700">
                ₺{dailyBudget.toFixed(2)}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 mb-1">Bugünkü Harcamalar</p>
              <p className="text-3xl font-bold text-blue-700">
                ₺{todaysExpenses.toFixed(2)}
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              remainingToday >= 0 ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <p className={`text-sm mb-1 ${
                remainingToday >= 0 ? 'text-green-800' : 'text-red-800'
              }`}>
                Kalan Bütçe
              </p>
              <p className={`text-3xl font-bold ${
                remainingToday >= 0 ? 'text-green-700' : 'text-red-700'
              }`}>
                ₺{Math.abs(remainingToday).toFixed(2)}
                {remainingToday < 0 && ' aşım'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}