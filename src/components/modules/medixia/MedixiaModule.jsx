
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Calendar, Pencil, Pill, Stethoscope, KeyRound as UserRound, FolderKanban, Bell, FileText } from 'lucide-react';
import IAActionPanel from '@/components/ui/IAActionPanel';
import { cn } from '@/lib/utils';
import CardCristal from '@/components/ui/CardCristal';
import { useToast } from '@/components/ui/use-toast';

// MEDIXIA Submódulos
import ExpedientesPacientes from './ExpedientesPacientes';
import AgendaCirugias from './AgendaCirugias';
import NotasRecetas from './NotasRecetas';
import IAMedica from './IAMedica';
import DocumentosAlertas from './DocumentosAlertas';

const MedixiaModule = ({ isIAPanelCollapsed, assistantName }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('expedientes_pacientes');

  const tabs = [
    { value: "expedientes_pacientes", label: "Expedientes & Pacientes", icon: ClipboardList },
    { value: "agenda_cirugias", label: "Agenda & Cirugías", icon: Calendar },
    { value: "notas_recetas", label: "Notas & Recetas", icon: Pencil },
    { value: "ia_medica", label: "IA Médica", icon: Stethoscope },
    { value: "documentos_alertas", label: "Documentos & Alertas", icon: FileText },
  ];

  return (
    <div className="h-full flex font-['Questrial']">
      <main className={cn(
        "flex-1 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out p-6",
        isIAPanelCollapsed ? "pr-24" : "xl:pr-80",
        theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-ale-white-bg'
      )}>
        <header className="mb-6">
          <h1 className={cn(
            "text-3xl font-bold uppercase tracking-wider",
            theme === 'dark' ? 'text-ale-white' : 'text-ale-charcoal'
          )}>MÉDICO</h1>
          <p className={cn(
            "mt-1",
            theme === 'dark' ? 'text-gray-400' : 'text-ale-slate'
          )}>Sistema integral de gestión médica</p>
        </header>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 bg-transparent p-0 h-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-4 h-24 rounded-lg border transition-all",
                    theme === 'dark' 
                      ? "data-[state=active]:bg-ale-petrol data-[state=active]:text-ale-white data-[state=active]:shadow-lg data-[state=active]:border-ale-neon bg-[#1A1A1A] text-white/60 hover:bg-ale-petrol/50 hover:text-ale-white border-ale-glass"
                      : "data-[state=active]:bg-ale-deep-teal data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-ale-accent-cyan bg-white text-ale-slate hover:bg-ale-pearl hover:text-ale-charcoal border-ale-border-light"
                  )}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs text-center">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <CardCristal>
                {tab.value === 'expedientes_pacientes' && <ExpedientesPacientes />}
                {tab.value === 'agenda_cirugias' && <AgendaCirugias />}
                {tab.value === 'notas_recetas' && <NotasRecetas />}
                {tab.value === 'ia_medica' && <IAMedica />}
                {tab.value === 'documentos_alertas' && <DocumentosAlertas />}
              </CardCristal>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <IAActionPanel 
        assistantName={assistantName} 
        context="medixia"
        className="hidden xl:flex"
        isCollapsed={isIAPanelCollapsed}
        onToggleCollapse={() => toast({ title: 'Toggle IA Panel' })}
      />
    </div>
  );
};

export default MedixiaModule;
