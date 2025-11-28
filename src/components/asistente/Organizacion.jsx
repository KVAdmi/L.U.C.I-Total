
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Sliders, Zap, Clock, Coffee, Briefcase, Users, Video, Loader2 } from 'lucide-react';
import SubmoduleHeader from './SubmoduleHeader';
import { getTasks } from '@/lib/asistente/organization';

const Organizacion = ({ onBack }) => {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const schedule = [
    { time: '09:00 - 10:00', task: 'Trabajo Enfocado: Reporte Trimestral', icon: Briefcase, color: 'bg-blue-500' },
    { time: '10:00 - 11:00', task: 'Reunión de Marketing', icon: Users, color: 'bg-purple-500' },
    { time: '11:00 - 11:30', task: 'Llamada con Cliente', icon: Video, color: 'bg-cyan-500' },
    { time: '11:30 - 12:00', task: 'Tiempo muerto detectado - Sugerencia: Revisar emails', icon: Clock, color: 'bg-gray-500' },
    { time: '12:00 - 13:00', task: 'Bloque de Almuerzo', icon: Coffee, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-8">
      <SubmoduleHeader onBack={onBack} title={t('asistente.organizacion')} subtitle={t('asistente.organizacionDesc')} icon={Sliders} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1F1F1F] p-6 rounded-lg mb-8"
      >
        <h3 className="text-lg text-white mb-2 flex items-center gap-2"><Zap className="text-yellow-400" /> {t('asistente.organizacion.suggestion')}</h3>
        <p className="text-[#BFC8CF]">{t('asistente.organizacion.suggestionDesc')}</p>
      </motion.div>
      
      <div>
        <h3 className="text-xl text-white mb-4">{t('asistente.organizacion.todayAgenda')}</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[rgba(0,30,33,0.35)]"></div>
          {schedule.map((item, index) => {
             const Icon = item.icon;
             return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 mb-4 pl-10 relative"
              >
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${item.color} flex items-center justify-center -translate-x-1/2 border-4 border-[#1F1F1F]`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#BFC8CF]">{item.time}</p>
                  <p className="text-white font-medium">{item.task}</p>
                </div>
              </motion.div>
             )
          })}
        </div>
      </div>
    </div>
  );
};

export default Organizacion;
