
import React from 'react';
import { motion } from 'framer-motion';
import { Bed, BedDouble, SprayCan, XCircle } from 'lucide-react';
import PanelCristal from '@/components/ui/PanelCristal';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

const BedIcon = ({ status, number }) => {
  const { toast } = useToast();
  const statusConfig = {
    available: { icon: Bed, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
    occupied: { icon: BedDouble, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    cleaning: { icon: SprayCan, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
    blocked: { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-500/10' }
  };
  const Icon = statusConfig[status].icon;

  return (
    <motion.button 
      onClick={() => toast({ title: `Cama ${number}`, description: `Estado: ${status}`})}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("relative rounded-lg p-2 flex flex-col items-center justify-center aspect-square transition-colors", statusConfig[status].bgColor)}
    >
      <Icon className={cn("w-8 h-8 md:w-10 md:h-10", statusConfig[status].color)} />
      <span className="absolute bottom-1 right-2 text-xs font-bold text-slate-500 dark:text-white/50">{number}</span>
    </motion.button>
  );
};

const BedManagement = () => {
  const { t } = useLanguage();
  const beds = [
    { number: '101', status: 'occupied' }, { number: '102', status: 'occupied' }, { number: '103', status: 'available' },
    { number: '104', status: 'cleaning' }, { number: '105', status: 'occupied' }, { number: '106', status: 'available' },
    { number: '107', status: 'available' }, { number: '108', status: 'blocked' }, { number: '201', status: 'occupied' },
    { number: '202', status: 'available' }, { number: '203', status: 'occupied' }, { number: '204', status: 'occupied' },
    { number: '205', status: 'cleaning' }, { number: '206', status: 'occupied' }, { number: '207', status: 'available' },
    { number: '208', status: 'occupied' },
  ];

  const statusCounts = beds.reduce((acc, bed) => {
    acc[bed.status] = (acc[bed.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <PanelCristal className="p-4 h-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">{t('hospital.bedManagement.title')}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>{t('hospital.bedManagement.available')}: <strong>{statusCounts.available || 0}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>{t('hospital.bedManagement.occupied')}: <strong>{statusCounts.occupied || 0}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span>{t('hospital.bedManagement.cleaning')}: <strong>{statusCounts.cleaning || 0}</strong></span>
          </div>
           <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>{t('hospital.bedManagement.blocked')}: <strong>{statusCounts.blocked || 0}</strong></span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-2">
        {beds.map(bed => <BedIcon key={bed.number} {...bed} />)}
      </div>
    </PanelCristal>
  );
};

export default BedManagement;
