
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, FolderOpen, Files, CalendarDays, BellRing, MessageSquare, 
  Calculator, Sparkles
} from 'lucide-react';
import IAActionPanel from '@/components/ui/IAActionPanel';
import { cn } from '@/lib/utils';
import CardCristal from '@/components/ui/CardCristal';
import { useToast } from '@/components/ui/use-toast';

// Import LEXIA submódulos
import CasosExpedientes from './CasosExpedientes';
import DocumentosPlantillas from './DocumentosPlantillas';
import AgendaPlazos from './AgendaPlazos';
import ClientesContratos from './ClientesContratos';
import MinutasDanos from './MinutasDanos';

const LexiaModule = ({ isIAPanelCollapsed, assistantName }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('casos_expedientes');

  const tabs = [
    { value: 'casos_expedientes', label: 'Casos & Expedientes', icon: Briefcase },
    { value: 'documentos_plantillas', label: 'Documentos & Plantillas', icon: Files },
    { value: 'agenda_plazos', label: 'Agenda & Plazos', icon: CalendarDays },
    { value: 'clientes_contratos', label: 'Clientes & Contratos', icon: FolderOpen },
    { value: 'minutas_danos', label: 'Minutas & Daños', icon: Calculator },
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
          )}>LEGAL</h1>
          <p className={cn(
            "mt-1",
            theme === 'dark' ? 'text-gray-400' : 'text-ale-slate'
          )}>Sistema integral de gestión legal</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
             <CardCristal className={cn(
               "p-4 border",
               theme === 'dark' ? 'bg-white/5 border-ale-glass' : 'bg-white border-ale-border-light'
             )}>
                <h3 className={cn(
                  "text-lg font-semibold mb-4 flex items-center gap-2",
                  theme === 'dark' ? 'text-ale-white' : 'text-ale-charcoal'
                )}>
                    <Sparkles className={cn(
                      "w-5 h-5",
                      theme === 'dark' ? 'text-ale-neon' : 'text-ale-accent-cyan'
                    )}/>
                    IA Legal
                </h3>
                 <div className="space-y-2">
                     {
                         ['Buscar Jurisprudencia', 'Redactar Escrito', 'Resumir Documento', 'Detectar Riesgos'].map(action => (
                             <button 
                               key={action} 
                               onClick={() => toast({title: action})} 
                               className={cn(
                                 "w-full text-left p-3 rounded-md text-sm transition-colors",
                                 theme === 'dark' 
                                   ? 'bg-white/5 hover:bg-ale-petrol/50 text-white/80 hover:text-ale-white'
                                   : 'bg-ale-pearl hover:bg-ale-deep-teal/10 text-ale-slate hover:text-ale-charcoal'
                               )}
                             >
                                 {action}
                             </button>
                         ))
                     }
                 </div>
             </CardCristal>
          </div>
          <div className="lg:w-3/4">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <TabsList className="md:col-span-1 flex md:flex-col gap-2 bg-transparent p-0 h-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger 
                        key={tab.value} 
                        value={tab.value}
                        className={cn(
                          "w-full flex items-center justify-start gap-3 p-3 rounded-lg border transition-all",
                          theme === 'dark'
                            ? "data-[state=active]:bg-ale-petrol data-[state=active]:text-ale-white data-[state=active]:shadow-lg data-[state=active]:border-ale-neon bg-[#1A1A1A] text-white/60 hover:bg-ale-petrol/50 hover:text-ale-white border-ale-glass"
                            : "data-[state=active]:bg-ale-deep-teal data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-ale-accent-cyan bg-white text-ale-slate hover:bg-ale-pearl hover:text-ale-charcoal border-ale-border-light"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm">{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                
                <div className="md:col-span-3">
                  {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="m-0">
                       <CardCristal>
                          {tab.value === 'casos_expedientes' && <CasosExpedientes />}
                          {tab.value === 'documentos_plantillas' && <DocumentosPlantillas />}
                          {tab.value === 'agenda_plazos' && <AgendaPlazos />}
                          {tab.value === 'clientes_contratos' && <ClientesContratos />}
                          {tab.value === 'minutas_danos' && <MinutasDanos />}
                       </CardCristal>
                    </TabsContent>
                  ))}
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </main>

       <IAActionPanel 
        assistantName={assistantName} 
        context="lexia"
        className="hidden xl:flex"
        isCollapsed={isIAPanelCollapsed}
        onToggleCollapse={() => toast({ title: 'Toggle IA Panel' })}
      />
    </div>
  );
};

export default LexiaModule;
