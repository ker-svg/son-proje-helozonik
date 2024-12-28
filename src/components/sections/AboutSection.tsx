import React from 'react';
import { Globe, Github, Linkedin, Twitter, Mail, Info } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    icon: Globe,
    label: 'Website',
    url: 'https://financetracker.com',
    color: 'text-blue-600'
  },
  {
    icon: Github,
    label: 'GitHub',
    url: 'https://github.com/financetracker',
    color: 'text-gray-800'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    url: 'https://linkedin.com/company/financetracker',
    color: 'text-blue-700'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    url: 'https://twitter.com/financetracker',
    color: 'text-blue-400'
  },
  {
    icon: Mail,
    label: 'Email',
    url: 'mailto:contact@financetracker.com',
    color: 'text-red-500'
  }
];

export function AboutSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Info className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold">Hakkımızda</h2>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            Finance Tracker, kişisel finansınızı kolayca yönetmenize yardımcı olan kapsamlı bir finansal yönetim aracıdır. 
            Gelir ve giderlerinizi takip edebilir, borçlarınızı yönetebilir, finansal hedefler belirleyebilir 
            ve günlük bütçenizi planlayabilirsiniz.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-4">Özellikler</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Gelir ve gider takibi</li>
            <li>Borç yönetimi</li>
            <li>Finansal hedef belirleme</li>
            <li>Günlük bütçe planlama</li>
            <li>Detaylı finansal raporlar ve grafikler</li>
            <li>Döviz kurları takibi</li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Bize Ulaşın</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <Icon className={`w-5 h-5 ${link.color}`} />
                  <span className="text-gray-700">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}