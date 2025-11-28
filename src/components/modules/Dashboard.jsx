
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import HeroBar from '@/components/dashboard/HeroBar';
import TodayAgenda from '@/components/dashboard/TodayAgenda';
import TodayTasks from '@/components/dashboard/TodayTasks';
import CriticalReminders from '@/components/dashboard/CriticalReminders';
import ExecutiveSummary from '@/components/dashboard/ExecutiveSummary';
import NewsStream from '@/components/dashboard/NewsStream';
import LuciRecommendations from '@/components/dashboard/LuciRecommendations';

const Dashboard = ({ onNavigate }) => {
  return (
    <>
      <Helmet>
        <title>Dashboard Ejecutivo | L.U.C.I</title>
        <meta name="description" content="Panel ejecutivo inteligente con información crítica del día" />
      </Helmet>
      <motion.div 
        className="p-4 sm:p-6 lg:p-8 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Bar - Clima y Bienvenida */}
        <HeroBar />
        
        {/* Tu Día Hoy - 3 Tarjetas Principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TodayAgenda />
          <TodayTasks />
          <CriticalReminders />
        </div>

        {/* Informe Ejecutivo - 4 Mini Cards */}
        <ExecutiveSummary />

        {/* News & Insights */}
        <NewsStream />

        {/* L.U.C.I Recommendations */}
        <LuciRecommendations />
      </motion.div>
    </>
  );
};

export default Dashboard;
