import React from 'react';
import { translations } from '../translations';
import { Language } from '../types';
import { Siren, Shield, Flame, Ambulance } from 'lucide-react';

interface EmergencyPageProps {
  lang: Language;
}

export const EmergencyPage: React.FC<EmergencyPageProps> = ({ lang }) => {
  const t = translations[lang];

  const cards = [
    {
      id: '117',
      number: '117',
      title: t.emergency,
      icon: Siren,
      bg: 'bg-red-600',
      text: 'text-white'
    },
    {
      id: '119',
      number: '119',
      title: t.police,
      icon: Shield,
      bg: 'bg-blue-600',
      text: 'text-white'
    },
    {
      id: '110',
      number: '110',
      title: t.fireBrigade,
      icon: Flame,
      bg: 'bg-orange-600',
      text: 'text-white'
    },
    {
      id: '1990',
      number: '1990',
      title: t.ambulance,
      icon: Ambulance,
      bg: 'bg-green-500', // Using green as per common standards or the image reference
      text: 'text-white'
    }
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-extrabold text-[#0F172A]">{t.emergencyNumbers}</h2>
        <span className="text-slate-400 font-medium">{t.sriLanka}</span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <a 
              key={card.id}
              href={`tel:${card.number}`}
              className={`${card.bg} rounded-xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer`}
            >
              <div className="mb-4 text-white/90">
                <Icon className="w-12 h-12" />
              </div>
              <h3 className="text-6xl font-black text-white mb-2">{card.number}</h3>
              <p className="text-xl font-bold text-white/90 mb-6">{card.title}</p>
              <span className="text-sm font-medium text-white/70 bg-black/10 px-4 py-1.5 rounded-full group-hover:bg-black/20 transition-colors">
                {t.tapToCall}
              </span>
            </a>
          );
        })}
      </div>

      {/* Footer Alert */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Siren className="h-5 w-5 text-yellow-600" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-bold text-yellow-800">
              {t.importantNotice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};