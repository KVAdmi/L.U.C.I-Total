
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import SpecialtyModules from '@/components/dashboard/SpecialtyModules';
import SystemHealth from '@/components/dashboard/SystemHealth';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickStats from '@/components/dashboard/QuickStats';
import TodayAgenda from '@/components/dashboard/TodayAgenda';

const Dashboard = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('sidebar.dashboard')} | AL-E</title>
        <meta name="description" content={t('dashboard.welcome')} />
      </Helmet>
      <motion.div 
        className="p-4 sm:p-6 lg:p-8 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('dashboard.panelPrincipal')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.welcome')}</p>
        </div>
        
        <QuickStats />
        
        <SpecialtyModules onNavigate={onNavigate} />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <TodayAgenda onNavigate={onNavigate} />
          <SystemHealth />
          <RecentActivity />
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard;
