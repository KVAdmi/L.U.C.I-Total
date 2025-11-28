
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import BedManagement from './BedManagement';
import NursingDashboard from './NursingDashboard';
import ORSchedule from './ORSchedule';
import HospitalActionGrid from './HospitalActionGrid';
import { mockHospitalBeds } from '@/lib/mock-data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const HospitalModule = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [beds, setBeds] = useState(mockHospitalBeds);

  const handleActionClick = (action) => {
    toast({
      title: `Acción: ${action}`,
      description: "Esta funcionalidad estará disponible próximamente.",
    });
  };
  
  const updateBedStatus = (bedId, newStatus) => {
    setBeds(beds.map(bed => 
      bed.id === bedId ? { ...bed, status: newStatus } : bed
    ));
    toast({
        title: "Cama Actualizada",
        description: `El estado de la cama ${beds.find(b=>b.id === bedId).number} es ahora ${newStatus}.`
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            {t('hospital.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Sistema Hospitalario Integral
          </p>
        </div>
      </div>

      <HospitalActionGrid onAction={handleActionClick} />

      <Tabs defaultValue="beds" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-200/80 dark:bg-slate-800/80">
          <TabsTrigger value="beds">{t('hospital.beds')}</TabsTrigger>
          <TabsTrigger value="nursing">{t('hospital.nursing')}</TabsTrigger>
          <TabsTrigger value="surgery">{t('hospital.surgery')}</TabsTrigger>
        </TabsList>
        <TabsContent value="beds" className="mt-4">
          <BedManagement beds={beds} onUpdateBedStatus={updateBedStatus} />
        </TabsContent>
        <TabsContent value="nursing" className="mt-4">
          <NursingDashboard />
        </TabsContent>
        <TabsContent value="surgery" className="mt-4">
          <ORSchedule />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HospitalModule;
