
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { BookOpen, Scale, Landmark, Briefcase, FileSignature, Bell, Gavel, FileText } from 'lucide-react';

const MainContent = ({ cases, onSelectCase, onEditCase, onDeleteCase, selectedCaseId }) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleActionClick = (feature) => {
    toast({
      title: "Función no implementada",
      description: `La sección "${feature}" se habilitará pronto.`,
    });
  };

  const mainSections = [
    { id: 'cases', label: t('legal.cases'), icon: Briefcase, color: "text-blue-400" },
    { id: 'writings', label: t('legal.writings'), icon: FileSignature, color: "text-green-400" },
    { id: 'deadlines', label: t('legal.deadlines'), icon: Bell, color: "text-orange-400" },
    { id: 'hearings', label: t('legal.hearings'), icon: Gavel, color: "text-purple-400" },
    { id: 'jurisprudence', label: t('legal.jurisprudence'), icon: Scale, color: "text-indigo-400" },
    { id: 'legalDocs', label: t('legal.legalDocs'), icon: FileText, color: "text-pink-400" },
  ];

  const accessPanels = [
    { id: 'dof', label: t('legal.dof'), icon: BookOpen },
    { id: 'civilCode', label: t('legal.civilCode'), icon: Scale },
    { id: 'constitution', label: t('legal.constitution'), icon: Landmark },
  ];

  return (
    <div className="space-y-6">
      {/* Main Sections */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {mainSections.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => handleActionClick(label)}
            className="bg-[#1F1F1F] p-4 rounded-lg flex flex-col items-start justify-between aspect-square border border-[rgba(0,30,33,0.35)] hover:border-[#003336] hover:bg-[#001E21]/50 transition-all duration-200"
          >
            <Icon className={`w-8 h-8 ${color}`} />
            <span className="text-white font-semibold text-lg mt-auto">{label}</span>
          </button>
        ))}
      </div>

      {/* Real-Time Access */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">{t('legal.realTimeAccess')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accessPanels.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleActionClick(label)}
              className="bg-[#1F1F1F] p-4 rounded-lg flex items-center gap-4 border border-[rgba(0,30,33,0.35)] hover:border-[#003336] hover:bg-[#001E21]/50 transition-colors"
            >
              <Icon className="w-6 h-6 text-[#BFC8CF]" />
              <span className="text-white font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
