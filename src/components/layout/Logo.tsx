import React from 'react';
import { Wallet } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Wallet className="w-8 h-8 text-primary-500 dark:text-primary-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-500 rounded-full border-2 border-white dark:border-gray-800" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-200">
          KasaNet
        </h1>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
        Her adımda finansal kontrol
      </p>
    </div>
  );
}