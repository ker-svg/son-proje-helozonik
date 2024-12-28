import { Currency } from '../types/settings';

const CURRENCY_FORMATS: Record<Currency, { locale: string; currency: string }> = {
  TRY: { locale: 'tr-TR', currency: 'TRY' },
  USD: { locale: 'en-US', currency: 'USD' },
  EUR: { locale: 'de-DE', currency: 'EUR' },
  GBP: { locale: 'en-GB', currency: 'GBP' },
};

export function formatCurrency(amount: number, currency: Currency): string {
  const { locale, currency: code } = CURRENCY_FORMATS[currency];
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
  }).format(amount);
}