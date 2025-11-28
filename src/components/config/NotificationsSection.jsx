
import React from 'react';
import ConfigCard from './ConfigCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Bell, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NotificationsSection = ({ userProfile, onUpdateProfile }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [notifications, setNotifications] = React.useState(userProfile.notifications || { email: true, sms: false, push: true });

  const handleToggle = (id) => {
    setNotifications(prev => {
        const newNotifications = { ...prev, [id]: !prev[id] };
        return newNotifications;
    });
  };
  
   const handleSave = () => {
    onUpdateProfile({ notifications });
    toast({
      title: t('config.saveSuccess') || "Settings saved.",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <ConfigCard
      title={t('config.notifications') || 'Notifications'}
      description={t('config.notificationsDesc') || 'Choose how you want to be notified.'}
      footer={
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {t('common.save') || 'Save Changes'}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-lg">
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-slate-500" />
            <Label htmlFor="email" className="text-base font-medium">
              {t('config.emailNotifications') || 'Email Notifications'}
            </Label>
          </div>
          <Switch 
            id="email" 
            checked={notifications.email} 
            onCheckedChange={() => handleToggle('email')} 
          />
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-lg">
          <div className="flex items-center gap-4">
            <MessageSquare className="w-5 h-5 text-slate-500" />
            <Label htmlFor="sms" className="text-base font-medium">
              {t('config.smsNotifications') || 'SMS Notifications'}
            </Label>
          </div>
          <Switch 
            id="sms" 
            checked={notifications.sms} 
            onCheckedChange={() => handleToggle('sms')}
          />
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-lg">
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-slate-500" />
            <Label htmlFor="push" className="text-base font-medium">
              {t('config.pushNotifications') || 'Push Notifications'}
            </Label>
          </div>
          <Switch 
            id="push" 
            checked={notifications.push} 
            onCheckedChange={() => handleToggle('push')}
          />
        </div>
      </div>
    </ConfigCard>
  );
};

export default NotificationsSection;
