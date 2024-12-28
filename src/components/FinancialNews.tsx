import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { MOCK_NEWS } from '../constants/mockNews';

export function FinancialNews() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold">Finansal Haberler</h2>
      </div>

      <div className="space-y-4">
        {MOCK_NEWS.map((item, index) => (
          <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
            <div className="group">
              <h3 className="font-medium text-gray-900 flex items-center gap-1">
                {item.title}
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(item.publishedAt).toLocaleDateString('tr-TR')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}