
import React from 'react';
import ConfigCard from './ConfigCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { List } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const VoiceSettingsSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleShowCommands = () => {
    toast({
      title: '🚧 Funcionalidad no implementada',
      description: 'La lista de comandos de voz estará disponible pronto.',
    });
  };
  
  return (
    <ConfigCard
      title={t('config.voice') || 'Voice Assistant'}
      description={t('config.voiceDesc') || 'Configure your voice interaction preferences.'}
    >
      <div className="space-y-8">
        <div>
          <Label htmlFor="language">{t('config.voiceLang') || 'Voice Language'}</Label>
          <p className="text-sm text-slate-500 dark:text-white/60 mb-2">
            {t('config.voiceLangDesc') || 'The voice assistant uses your main interface language.'}
          </p>
          <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg font-mono text-sm text-emerald-500">
            {t('language') || 'es'}
          </div>
        </div>
        <div>
          <Label htmlFor="sensitivity">{t('config.sensitivity') || 'Sensitivity'}</Label>
          <Slider defaultValue={[50]} max={100} step={1} id="sensitivity" className="mt-2" />
          <p className="text-xs text-slate-500 dark:text-white/60 mt-2">
            {t('config.sensitivityDesc') || 'Adjust how sensitive the microphone is to your voice.'}
          </p>
        </div>
        <div>
           <Label>{t('config.voiceCommands') || 'Available Commands'}</Label>
           <Button variant="outline" className="w-full mt-2" onClick={handleShowCommands}>
              <List className="w-4 h-4 mr-2" />
              {t('config.showCommands') || 'Show Full Command List'}
            </Button>
        </div>
      </div>
    </ConfigCard>
  );
};

export default VoiceSettingsSection;
