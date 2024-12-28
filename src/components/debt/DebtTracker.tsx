import React, { useState } from 'react';
import { Wallet, Plus, Edit2, Save, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import type { Debt } from '../../types/finance';
import { DebtPayment } from './DebtPayment';

interface DebtTrackerProps {
  debts: Debt[];
  onAddDebt: (debt: Omit<Debt, 'id'>) => void;
  onUpdateDebt: (debtId: string, updates: Partial<Debt>) => void;
  onMakePayment: (debtId: string, amount: number) => void;
}

export function DebtTracker({ debts, onAddDebt, onUpdateDebt, onMakePayment }: DebtTrackerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingDebtId, setEditingDebtId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    dueDate: '',
    creditor: '',
    interestRate: '',
    paymentFrequency: 'monthly' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDebt = {
      title: formData.title,
      amount: parseFloat(formData.amount),
      remainingAmount: parseFloat(formData.amount),
      dueDate: formData.dueDate,
      creditor: formData.creditor,
      interestRate: formData.interestRate ? parseFloat(formData.interestRate) : undefined,
      paymentFrequency: formData.paymentFrequency,
      createdAt: new Date().toISOString(),
    };

    onAddDebt(newDebt);
    setFormData({
      title: '',
      amount: '',
      dueDate: '',
      creditor: '',
      interestRate: '',
      paymentFrequency: 'monthly',
    });
    setIsAdding(false);
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.remainingAmount, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold">Borç Takibi</h2>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Borç Ekle
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4 border-b pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Borç Başlığı</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Miktar (₺)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Son Ödeme Tarihi</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Alacaklı</label>
              <input
                type="text"
                value={formData.creditor}
                onChange={(e) => setFormData(prev => ({ ...prev, creditor: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Faiz Oranı (%)</label>
              <input
                type="number"
                value={formData.interestRate}
                onChange={(e) => setFormData(prev => ({ ...prev, interestRate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ödeme Sıklığı</label>
              <select
                value={formData.paymentFrequency}
                onChange={(e) => setFormData(prev => ({ ...prev, paymentFrequency: e.target.value as 'monthly' | 'weekly' | 'yearly' }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="weekly">Haftalık</option>
                <option value="monthly">Aylık</option>
                <option value="yearly">Yıllık</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Borç Ekle
            </button>
          </div>
        </form>
      )}

      <div className="mb-6">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-800 mb-1">Toplam Borç</p>
          <p className="text-3xl font-bold text-red-700">₺{totalDebt.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        {debts.map((debt) => (
          <div key={debt.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{debt.title}</h3>
                <p className="text-sm text-gray-500">Alacaklı: {debt.creditor}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-600">₺{debt.remainingAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">
                  Son Ödeme: {new Date(debt.dueDate).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>İlerleme</span>
                <span>
                  {((1 - debt.remainingAmount / debt.amount) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(1 - debt.remainingAmount / debt.amount) * 100}%`
                  }}
                />
              </div>
            </div>

            <DebtPayment
              debtId={debt.id}
              debtTitle={debt.title}
              remainingAmount={debt.remainingAmount}
              onMakePayment={onMakePayment}
            />
          </div>
        ))}
      </div>
    </div>
  );
}