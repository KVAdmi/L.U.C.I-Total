
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart, Clock, FolderGit2 } from 'lucide-react';

const LeftColumn = ({ cases }) => {
  const { t } = useLanguage();
  const activeCases = cases.filter(c => c.status === 'active').length;
  const upcomingDeadlines = cases.filter(c => {
    if (!c.nextHearing) return false;
    const deadline = new Date(c.nextHearing);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  }).length;

  const specialties = [
    { id: 'civil', label: t('legal.civil') },
    { id: 'commercial', label: t('legal.commercial') },
    { id: 'maritime', label: t('legal.maritime') },
    { id: 'labor', label: t('legal.labor') },
    { id: 'fiscal', label: t('legal.fiscal') },
    { id: 'penal', label: t('legal.penal') },
    { id: 'administrative', label: t('legal.administrative') },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">{t('legal.kpis')}</h2>
        <div className="bg-[#1F1F1F] p-4 rounded-lg space-y-4 border border-[rgba(0,30,33,0.35)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart className="w-5 h-5 text-[#BFC8CF]" />
              <span className="text-sm text-[#BFC8CF]">{t('legal.activeCases')}</span>
            </div>
            <span className="text-xl font-bold text-white">{activeCases}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#BFC8CF]" />
              <span className="text-sm text-[#BFC8CF]">{t('legal.upcomingDeadlines')}</span>
            </div>
            <span className="text-xl font-bold text-white">{upcomingDeadlines}</span>
          </div>
        </div>
      </div>

      {/* Specialties */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">{t('legal.specialties')}</h2>
        <div className="bg-[#1F1F1F] p-4 rounded-lg space-y-2 border border-[rgba(0,30,33,0.35)]">
          {specialties.map(spec => (
            <button key={spec.id} className="w-full text-left flex items-center gap-3 p-2 rounded-md hover:bg-[#003336] transition-colors">
              <FolderGit2 className="w-4 h-4 text-[#BFC8CF]" />
              <span className="text-sm text-[#BFC8CF]">{spec.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
