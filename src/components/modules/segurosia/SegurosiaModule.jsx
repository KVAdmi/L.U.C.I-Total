
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Target, ShieldCheck, RefreshCw, AlertOctagon, 
  FileText, BarChart2, Calendar
} from 'lucide-react';
import IAActionPanel from '@/components/ui/IAActionPanel';
import { cn } from '@/lib/utils';
import CardCristal from '@/components/ui/CardCristal';
import { useToast } from '@/components/ui/use-toast';

// Dummy Tab Components
const TabContentPlaceholder = ({ title, icon, theme }) => {
  const Icon = icon;
  return (
    <div className={cn(
      "p-8 text-center border-2 border-dashed rounded-lg",
      theme === 'dark' 
        ? 'text-gray-400 border-ale-glass' 
        : 'text-ale-slate border-ale-border-light'
    )}>
      <div className="flex justify-center mb-4">
        <Icon className={cn(
          "w-12 h-12",
          theme === 'dark' ? 'text-ale-neon' : 'text-ale-accent-cyan'
        )} />
      </div>
      <h2 className={cn(
        "text-2xl font-bold mb-2",
        theme === 'dark' ? 'text-ale-white' : 'text-ale-charcoal'
      )}>{title}</h2>
      <p>Este módulo está en construcción. Aquí vivirán las herramientas de {title}.</p>
    </div>
  );
}

const SegurosiaModule = ({ isIAPanelCollapsed, assistantName }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('prospeccion_pipeline');

  const tabs = [
    { value: 'prospeccion_pipeline', label: 'Prospección & Pipeline', icon: Target },
    { value: 'cartera_renovaciones', label: 'Cartera & Renovaciones', icon: RefreshCw },
    { value: 'siniestros_reclamaciones', label: 'Siniestros & Reclamaciones', icon: AlertOctagon },
    { value: 'atencion_cliente', label: 'Atención al Cliente', icon: Users },
    { value: 'marketing_scripts', label: 'Marketing & Scripts', icon: FileText },
    { value: 'reportes_despacho', label: 'Reportes del Despacho', icon: BarChart2 },
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
          )}>SEGUROS</h1>
          <p className={cn(
            "mt-1",
            theme === 'dark' ? 'text-gray-400' : 'text-ale-slate'
          )}>Sistema integral de gestión de seguros</p>
        </header>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 bg-transparent p-0 h-auto">
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
                <TabContentPlaceholder title={tab.label} icon={tab.icon} theme={theme} />
              </CardCristal>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <IAActionPanel 
        assistantName={assistantName} 
        context="segurosia"
        className="hidden xl:flex"
        isCollapsed={isIAPanelCollapsed}
        onToggleCollapse={() => toast({ title: 'Toggle IA Panel' })}
      />
    </div>
  );
};

export default SegurosiaModule;
