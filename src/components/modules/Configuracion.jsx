
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, Globe, Palette, Bell, Cloud, Bot, Shield, Database, HelpCircle, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserProfileSection from '@/components/config/UserProfileSection';
import AppearanceSection from '@/components/config/AppearanceSection';
import NotificationsSection from '@/components/config/NotificationsSection';
import APIConfigSection from '@/components/config/APIConfigSection';
import VoiceSettingsSection from '@/components/config/VoiceSettingsSection';
import SecuritySection from '@/components/config/SecuritySection';
import DataManagementSection from '@/components/config/DataManagementSection';
import HelpSection from '@/components/config/HelpSection';

const Configuracion = ({ userProfile, onUpdateProfile }) => {
  const { t } = useLanguage();

  const tabs = [
    { id: "profile", icon: User, label: t('config.profile') || 'Profile' },
    { id: "appearance", icon: Palette, label: t('config.appearance') || 'Appearance' },
    { id: "notifications", icon: Bell, label: t('config.notifications') || 'Notifications' },
    { id: "integrations", icon: Cloud, label: t('config.integrations') || 'Integrations' },
    { id: "voice", icon: Bot, label: t('config.voice') || 'Voice Assistant' },
    { id: "security", icon: Shield, label: t('config.privacy') || 'Privacy & Security' },
    { id: "data", icon: Database, label: t('config.data') || 'Data Management' },
    { id: "help", icon: HelpCircle, label: t('config.help') || 'Help & Support' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
          {t('config.title') || 'Settings'}
        </h1>
        <p className="text-slate-500 dark:text-white/60">
          {t('config.subtitle') || 'Manage your account and application preferences.'}
        </p>
      </div>

      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
        <TabsList className="flex md:flex-col h-auto md:w-1/4 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="w-full justify-start gap-3 px-4 py-3 text-sm font-medium data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-white/5 data-[state=active]:text-emerald-600 data-[state=active]:dark:text-emerald-400"
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1">
          <TabsContent value="profile">
            <UserProfileSection userProfile={userProfile} onUpdateProfile={onUpdateProfile} />
          </TabsContent>
          <TabsContent value="appearance">
            <AppearanceSection />
          </TabsContent>
           <TabsContent value="notifications">
            <NotificationsSection userProfile={userProfile} onUpdateProfile={onUpdateProfile} />
          </TabsContent>
           <TabsContent value="integrations">
            <APIConfigSection />
          </TabsContent>
           <TabsContent value="voice">
            <VoiceSettingsSection />
          </TabsContent>
           <TabsContent value="security">
            <SecuritySection />
          </TabsContent>
          <TabsContent value="data">
            <DataManagementSection />
          </TabsContent>
           <TabsContent value="help">
            <HelpSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Configuracion;
