
import React from 'react';
import ConfigCard from './ConfigCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download, Upload, Trash2, Archive } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const DataManagementSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleAction = (feature) => {
     toast({
      title: `🚧 ${feature} no implementado`,
      description: 'Esta función estará disponible pronto.',
    });
  };

  return (
    <ConfigCard
      title={t('config.data') || 'Data Management'}
      description={t('config.dataDesc') || 'Export, import, or delete your account data.'}
    >
      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleAction('Export')}>
          <Download className="w-4 h-4" />
          {t('config.exportData') || 'Export All My Data'}
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleAction('Backup')}>
          <Archive className="w-4 h-4" />
          {t('config.createBackup') || 'Create a Cloud Backup'}
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full justify-start gap-3">
              <Trash2 className="w-4 h-4" />
              {t('config.deleteAccount') || 'Delete My Account'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('config.deleteConfirmTitle') || 'Are you absolutely sure?'}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('config.deleteConfirmDesc') || 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('common.cancel') || 'Cancel'}</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleAction('Delete Account')}>
                {t('common.continue') || 'Continue'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
      </div>
    </ConfigCard>
  );
};

export default DataManagementSection;
