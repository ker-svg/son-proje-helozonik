import React, { useState } from 'react';
import { Settings as SettingsIcon, Sun, Moon, DollarSign } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import type { Theme, Currency } from '../../types/settings';

const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
  { value: 'TRY', label: 'Türk Lirası', symbol: '₺' },
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'EUR', label: 'Euro', symbol: '€' },
  { value: 'GBP', label: 'British Pound', symbol: '£' },
];

export function SettingsPanel() {
  const { settings, updateTheme, updateCurrency, toggleNotifications } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <SettingsIcon className="w-6 h-6 dark:text-gray-200" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="font-semibold dark:text-gray-200">Ayarlar</h3>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tema
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateTheme('light')}
                    className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-md border
                      ${settings.theme === 'light' 
                        ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600'}`}
                  >
                    <Sun className="w-4 h-4" />
                    <span className="dark:text-gray-200">Aydınlık</span>
                  </button>
                  <button
                    onClick={() => updateTheme('dark')}
                    className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-md border
                      ${settings.theme === 'dark' 
                        ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600'}`}
                  >
                    <Moon className="w-4 h-4" />
                    <span className="dark:text-gray-200">Karanlık</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Para Birimi
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => updateCurrency(e.target.value as Currency)}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {CURRENCIES.map(currency => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label} ({currency.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={toggleNotifications}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Bildirimleri Etkinleştir
                  </span>
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}