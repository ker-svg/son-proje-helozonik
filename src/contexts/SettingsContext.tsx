import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Theme, Currency, Settings } from '../types/settings';

interface SettingsContextType {
  settings: Settings;
  updateTheme: (theme: Theme) => void;
  updateCurrency: (currency: Currency) => void;
  toggleNotifications: () => void;
}

const defaultSettings: Settings = {
  theme: 'light',
  currency: 'TRY',
  notifications: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const updateTheme = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const updateCurrency = (currency: Currency) => {
    setSettings(prev => ({ ...prev, currency }));
  };

  const toggleNotifications = () => {
    setSettings(prev => ({ ...prev, notifications: !prev.notifications }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateTheme, updateCurrency, toggleNotifications }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}