export type Theme = 'light' | 'dark';
export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP';

export interface Settings {
  theme: Theme;
  currency: Currency;
  notifications: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}