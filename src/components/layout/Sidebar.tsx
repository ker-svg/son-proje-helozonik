import React from 'react';
import { LayoutDashboard, LineChart, Wallet, Target, Receipt, Menu, Info } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Genel Bakış', icon: LayoutDashboard },
  { id: 'transactions', label: 'İşlemler', icon: Receipt },
  { id: 'debts', label: 'Borçlar', icon: Wallet },
  { id: 'goals', label: 'Hedefler', icon: Target },
  { id: 'charts', label: 'Grafikler', icon: LineChart },
  { id: 'about', label: 'Hakkında', icon: Info },
];

export function Sidebar({ isOpen, onToggle, activeSection, onSectionChange }: SidebarProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md lg:hidden"
      >
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      </button>
      
      <div className={`
        fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:w-64
      `}>
        <div className="p-6">
          <Logo />
          <nav className="space-y-2 mt-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors
                    ${activeSection === item.id 
                      ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}