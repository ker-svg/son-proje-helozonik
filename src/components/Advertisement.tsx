import React from 'react';
import { ExternalLink } from 'lucide-react';

const ADS = [
  {
    title: "Yatırım Fırsatı",
    description: "XYZ Bank'tan %25'e varan vadeli mevduat fırsatı!",
    link: "#",
    company: "XYZ Bank"
  },
  {
    title: "Emeklilik Planı",
    description: "ABC Sigorta ile geleceğinizi güvence altına alın",
    link: "#",
    company: "ABC Sigorta"
  },
  {
    title: "Kredi Fırsatı",
    description: "DEF Bank'tan düşük faizli ihtiyaç kredisi",
    link: "#",
    company: "DEF Bank"
  }
];

export function Advertisement() {
  // Rastgele bir reklam seç
  const ad = ADS[Math.floor(Math.random() * ADS.length)];

  return (
    <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1">
            {ad.company} - Sponsorlu
          </p>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            {ad.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {ad.description}
          </p>
          <a
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-2 font-medium"
          >
            Detaylı Bilgi
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}