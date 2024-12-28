import React from 'react';
import { NotificationCenter } from './NotificationCenter';
import { SettingsPanel } from './SettingsPanel';

export function Header() {
  return (
    <div className="flex items-center gap-4">
      <NotificationCenter />
      <SettingsPanel />
    </div>
  );
}