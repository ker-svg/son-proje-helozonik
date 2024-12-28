import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/sections/Dashboard';
import { TransactionSection } from './components/sections/TransactionSection';
import { ChartSection } from './components/sections/ChartSection';
import { GoalTracker } from './components/goals/GoalTracker';
import { DebtTracker } from './components/debt/DebtTracker';
import { AboutSection } from './components/sections/AboutSection';
import { SettingsProvider } from './contexts/SettingsContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { useAppState } from './hooks/useAppState';
import { MainContent } from './components/layout/MainContent';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const { 
    transactions, 
    goals, 
    debts,
    addTransaction,
    addGoal,
    updateGoal,
    contributeToGoal,
    addDebt,
    updateDebt,
    makeDebtPayment
  } = useAppState();

  return (
    <SettingsProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 lg:flex">
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          
          <div className="flex-1">
            <div className="p-4 bg-white dark:bg-gray-800 shadow-sm lg:flex lg:justify-end">
              <Header />
            </div>
            
            <MainContent
              activeSection={activeSection}
              transactions={transactions}
              goals={goals}
              debts={debts}
              onAddTransaction={addTransaction}
              onAddGoal={addGoal}
              onUpdateGoal={updateGoal}
              onContributeToGoal={contributeToGoal}
              onAddDebt={addDebt}
              onUpdateDebt={updateDebt}
              onMakeDebtPayment={makeDebtPayment}
            />
          </div>
        </div>
      </NotificationProvider>
    </SettingsProvider>
  );
}