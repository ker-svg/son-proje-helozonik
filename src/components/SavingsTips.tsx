import React from 'react';
import { LightbulbIcon, Percent, TrendingDown, PiggyBank } from 'lucide-react';

const SAVINGS_TIPS = [
  {
    category: 'Akıllı Alışveriş',
    icon: TrendingDown,
    tips: [
      'İndirim dönemlerinde toplu alışveriş yapın (yıllık %15-20 tasarruf)',
      'Market markalı ürünleri tercih edin (aylık ~300₺ tasarruf)',
      'Alışveriş listesi hazırlayın ve sadece listedekileri alın',
      'İndirim kuponlarını ve sadakat programlarını kullanın'
    ]
  },
  {
    category: 'Enerji Tasarrufu',
    icon: Percent,
    tips: [
      'A+++ enerji sınıfı cihazlar kullanın (yıllık ~1200₺ tasarruf)',
      'Akıllı prizler ile stand-by tüketimini engelleyin (~150₺/ay)',
      'LED ampuller kullanın (ampul başına yıllık ~100₺ tasarruf)',
      'Isı yalıtımı yaptırın (ısınma giderlerinde %30-40 tasarruf)'
    ]
  },
  {
    category: 'Günlük Tasarruflar',
    icon: PiggyBank,
    tips: [
      'Kahve termosu kullanın (günlük 40-50₺ tasarruf)',
      'Evden yemek götürün (aylık ~1000₺ tasarruf)',
      'Toplu taşıma kullanın (aylık ~800₺ yakıt tasarrufu)',
      'Su tasarruflu musluk başlıkları kullanın (aylık ~100₺ tasarruf)'
    ]
  }
];

export function SavingsTips() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <LightbulbIcon className="w-6 h-6 text-warning-500" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Akıllı Tasarruf Önerileri
          </h2>
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        {SAVINGS_TIPS.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-warning-50 dark:bg-warning-900/20">
                  <Icon className="w-5 h-5 text-warning-600 dark:text-warning-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {section.category}
                </h3>
              </div>
              <div className="space-y-3 ml-12">
                {section.tips.map((tip, tipIndex) => (
                  <div 
                    key={tipIndex} 
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm"
                  >
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}