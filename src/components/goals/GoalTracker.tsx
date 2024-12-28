import React, { useState } from 'react';
import { Target, Edit2, Save, X } from 'lucide-react';
import { Goal } from '../../types/finance';
import { GoalContribution } from './GoalContribution';

interface GoalTrackerProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onUpdateGoal: (goalId: string, updates: Partial<Goal>) => void;
  onContributeToGoal: (goalId: string, amount: number) => void;
}

export function GoalTracker({ goals, onAddGoal, onUpdateGoal, onContributeToGoal }: GoalTrackerProps) {
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
  });
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline) return;

    onAddGoal({
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: newGoal.deadline,
      createdAt: new Date().toISOString(),
    });

    setNewGoal({ title: '', targetAmount: '', deadline: '' });
  };

  const startEditing = (goal: Goal) => {
    setEditingGoal(goal.id);
    setEditForm({
      title: goal.title,
      targetAmount: goal.targetAmount.toString(),
      deadline: goal.deadline,
    });
  };

  const handleUpdate = (goalId: string) => {
    if (!editForm.title || !editForm.targetAmount || !editForm.deadline) return;

    onUpdateGoal(goalId, {
      title: editForm.title,
      targetAmount: parseFloat(editForm.targetAmount),
      deadline: editForm.deadline,
    });

    setEditingGoal(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold">Finansal Hedefler</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        {/* Mevcut form alanları aynı kalacak */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Hedef Başlığı</label>
          <input
            type="text"
            value={newGoal.title}
            onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Örn: Yeni Araba"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hedef Miktar (₺)</label>
          <input
            type="number"
            value={newGoal.targetAmount}
            onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hedef Tarihi</label>
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Hedef Ekle
        </button>
      </form>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border rounded-lg p-4">
            {editingGoal === goal.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
                <input
                  type="number"
                  value={editForm.targetAmount}
                  onChange={(e) => setEditForm(prev => ({ ...prev, targetAmount: e.target.value }))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
                <input
                  type="date"
                  value={editForm.deadline}
                  onChange={(e) => setEditForm(prev => ({ ...prev, deadline: e.target.value }))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(goal.id)}
                    className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Kaydet
                  </button>
                  <button
                    onClick={() => setEditingGoal(null)}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                  >
                    <X className="w-4 h-4" />
                    İptal
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{goal.title}</h3>
                    <p className="text-sm text-gray-500">
                      Hedef: ₺{goal.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => startEditing(goal)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <p className="text-sm font-medium">
                      {new Date(goal.deadline).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>İlerleme</span>
                    <span>{((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                    />
                  </div>
                </div>
                <GoalContribution
                  goalId={goal.id}
                  goalTitle={goal.title}
                  currentAmount={goal.currentAmount}
                  targetAmount={goal.targetAmount}
                  onContribute={onContributeToGoal}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}