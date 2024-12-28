import React, { useEffect, useState } from 'react';
import { DollarSign, Euro, PoundSterling, RefreshCw } from 'lucide-react';

interface Rate {
  code: string;
  value: number;
}

export function CurrencyRates() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/TRY');
      const data = await response.json();
      setRates([
        { code: 'USD', value: 1 / data.rates.USD },
        { code: 'EUR', value: 1 / data.rates.EUR },
        { code: 'GBP', value: 1 / data.rates.GBP },
      ]);
    } catch (error) {
      console.error('Döviz kurları alınamadı:', error);
    }
    setLoading(false);
  };

  const getIcon = (code: string) => {
    switch (code) {
      case 'USD': return <DollarSign className="w-5 h-5" />;
      case 'EUR': return <Euro className="w-5 h-5" />;
      case 'GBP': return <PoundSterling className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Döviz Kurları</h2>
        <button
          onClick={fetchRates}
          className="text-blue-600 hover:text-blue-800"
          disabled={loading}
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <div className="space-y-3">
        {rates.map((rate) => (
          <div key={rate.code} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getIcon(rate.code)}
              <span className="font-medium">{rate.code}</span>
            </div>
            <span className="font-semibold">
              ₺{rate.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}