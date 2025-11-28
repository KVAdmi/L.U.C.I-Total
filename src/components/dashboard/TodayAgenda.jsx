
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Users, Phone, ArrowRight } from 'lucide-react';

const appointments = [
    { time: '09:00', title: 'Reunión con Cliente VIP', type: 'meeting' },
    { time: '11:00', title: 'Llamada de seguimiento', type: 'call' },
    { time: '14:00', title: 'Workshop de estrategia', type: 'workshop' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

const TodayAgenda = ({ onNavigate }) => {
    const { t } = useLanguage();

    const getTypeIcon = (type) => {
        switch (type) {
            case 'video': return <Video className="h-4 w-4 text-cyan-400" />;
            case 'call': return <Phone className="h-4 w-4 text-green-400" />;
            case 'workshop': return <Users className="h-4 w-4 text-purple-400" />;
            default: return <Users className="h-4 w-4 text-blue-400" />;
        }
    };

    return (
        <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 shadow-lg h-full flex flex-col xl:col-span-1">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center text-foreground">
                    <Calendar className="h-5 w-5 mr-3" />
                    {t('dashboard.todayAgenda')}
                </h2>
                <button 
                    onClick={() => onNavigate('agenda')} 
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                    {t('common.viewAll')} <ArrowRight className="h-3 w-3" />
                </button>
            </div>
            <motion.ul 
                className="space-y-4 flex-1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {appointments.map((apt, index) => (
                    <motion.li
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-4 p-3 bg-background/30 rounded-lg border border-white/10"
                    >
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                            {getTypeIcon(apt.type)}
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-foreground">{apt.title}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1.5" />
                                {apt.time} - {t('common.today')}
                            </div>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
};

export default TodayAgenda;
