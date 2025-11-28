
import React from 'react';
import ConfigCard from './ConfigCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { BookOpen, LifeBuoy, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const HelpSection = () => {
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
      title={t('config.help') || 'Help & Support'}
      description={t('config.helpDesc') || 'Find resources and get in touch with our support team.'}
    >
      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleAction('Documentation')}>
          <BookOpen className="w-4 h-4" />
          {t('config.readDocs') || 'Read Documentation'}
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleAction('Contact Support')}>
          <LifeBuoy className="w-4 h-4" />
          {t('config.contactSupport') || 'Contact Support'}
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleAction('Community Forum')}>
          <MessageSquare className="w-4 h-4" />
          {t('config.communityForum') || 'Visit Community Forum'}
        </Button>
      </div>
    </ConfigCard>
  );
};

export default HelpSection;
