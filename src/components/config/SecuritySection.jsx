
import React from 'react';
import ConfigCard from './ConfigCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Shield, KeyRound, LogOut, Smartphone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SecuritySection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleAction = (feature) => {
     toast({
      title: `🚧 ${feature} no implementado`,
      description: 'Esta función de seguridad estará disponible pronto.',
    });
  };

  return (
    <ConfigCard
      title={t('config.privacy') || 'Privacy & Security'}
      description={t('config.securityDesc') || 'Manage your security settings and active sessions.'}
    >
      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleAction('2FA')}>
          <Shield className="w-4 h-4" />
          {t('config.setup2FA') || 'Set Up Two-Factor Authentication'}
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleAction('Password Change')}>
          <KeyRound className="w-4 h-4" />
          {t('config.changePassword') || 'Change Password'}
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleAction('Session Management')}>
          <Smartphone className="w-4 h-4" />
          {t('config.manageSessions') || 'Manage Active Sessions'}
        </Button>
         <Button variant="destructive" className="w-full justify-start gap-3" onClick={() => handleAction('Logout All')}>
          <LogOut className="w-4 h-4" />
          {t('config.logoutAll') || 'Log Out From All Devices'}
        </Button>
      </div>
    </ConfigCard>
  );
};

export default SecuritySection;
