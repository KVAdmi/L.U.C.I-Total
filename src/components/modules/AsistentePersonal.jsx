
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Bell, Sliders, MessageCircle, BarChart2, Share2, Brain, Users, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

import Citas from '@/components/asistente/Citas';
import Recordatorios from '@/components/asistente/Recordatorios';
import Organizacion from '@/components/asistente/Organizacion';
import Comunicacion from '@/components/asistente/Comunicacion';
import Productividad from '@/components/asistente/Productividad';
import Integraciones from '@/components/asistente/Integraciones';
import AgendaProactiva from '@/components/asistente/AgendaProactiva';
import Coordinacion from '@/components/asistente/Coordinacion';
import GestionPersonal from '@/components/asistente/GestionPersonal';
import AsistenteConversacional from '@/components/asistente/AsistenteConversacional';

const submodules = [
    { key: 'asistente.citas', component: Citas, icon: Calendar },
    { key: 'asistente.recordatorios', component: Recordatorios, icon: Bell },
    { key: 'asistente.organizacion', component: Organizacion, icon: Sliders },
    { key: 'asistente.comunicacion', component: Comunicacion, icon: MessageCircle },
    { key: 'asistente.productividad', component: Productividad, icon: BarChart2 },
    { key: 'asistente.integraciones', component: Integraciones, icon: Share2 },
    { key: 'asistente.proactiva', component: AgendaProactiva, icon: Brain },
    { key: 'asistente.coordinacion', component: Coordinacion, icon: Users },
    { key: 'asistente.personal', component: GestionPersonal, icon: User },
    { key: 'asistente.conversacional', component: AsistenteConversacional, icon: Bot },
];

const AsistentePersonal = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeSubmodule, setActiveSubmodule] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, },
    },
  };

  const ActiveComponent = activeSubmodule ? submodules.find(s => s.key === activeSubmodule.key)?.component : null;

  if (activeSubmodule && ActiveComponent) {
    return (
        <div className={cn(
          "font-questrial min-h-full",
          theme === 'dark' ? 'bg-[#0A0A0A] text-[#FFFFFF]' : 'bg-ale-white-bg text-ale-charcoal'
        )}>
            <ActiveComponent onBack={() => setActiveSubmodule(null)} />
        </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('sidebar.asistentePersonal')} | AL-E</title>
      </Helmet>
      <div className={cn(
        "font-questrial min-h-full p-8",
        theme === 'dark' ? 'bg-[#0A0A0A] text-[#FFFFFF]' : 'bg-ale-white-bg text-ale-charcoal'
      )}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className={cn(
            "text-4xl font-normal tracking-wide uppercase",
            theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
          )}>{t('sidebar.asistentePersonal')}</h1>
          <p className={cn(
            "mt-2 text-lg",
            theme === 'dark' ? 'text-[#BFC8CF]' : 'text-ale-slate'
          )}>{t('asistente.subtitle')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {submodules.map((sub) => {
            const Icon = sub.icon;
            return (
              <motion.div
                key={sub.key}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => setActiveSubmodule(sub)}
              >
                <div className={cn(
                  "rounded-lg p-6 border transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col",
                  theme === 'dark'
                    ? 'bg-[#1F1F1F] border-[rgba(0,30,33,0.35)] hover:border-[#003336]'
                    : 'bg-white border-ale-border-light hover:border-ale-accent-cyan hover:shadow-lg'
                )}>
                  <div className="flex-1">
                    <div className={cn(
                      "w-12 h-12 flex items-center justify-center rounded-full mb-4 transition-colors duration-300",
                      theme === 'dark'
                        ? 'bg-[rgba(0,30,33,0.35)] group-hover:bg-[#003336]'
                        : 'bg-ale-pearl group-hover:bg-ale-deep-teal'
                    )}>
                      <Icon className={cn(
                        "w-6 h-6",
                        theme === 'dark' ? 'text-[#FFFFFF]' : 'text-ale-charcoal group-hover:text-white'
                      )} />
                    </div>
                    <h2 className={cn(
                      "text-xl font-normal mb-2",
                      theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
                    )}>{t(sub.key)}</h2>
                    <p className={cn(
                      "text-sm leading-relaxed",
                      theme === 'dark' ? 'text-[#BFC8CF]' : 'text-ale-slate'
                    )}>
                      {t(`${sub.key}Desc`)}
                    </p>
                  </div>
                  <div className={cn(
                    "mt-6 text-right text-xs transition-colors duration-300",
                    theme === 'dark' 
                      ? 'text-[#BFC8CF] group-hover:text-white'
                      : 'text-ale-slate group-hover:text-ale-deep-teal'
                  )}>
                    {t('common.view')} &rarr;
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};

export default AsistentePersonal;
