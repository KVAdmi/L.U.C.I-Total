
import React from 'react';
import ConfigCard from './ConfigCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const apiList = [
  { name: 'Supabase', status: 'pending', desc: 'Authentication, Database & Storage' },
  { name: 'Google Calendar API', status: 'connected', desc: 'Bidirectional calendar sync' },
  { name: 'Outlook Calendar API', status: 'connected', desc: 'Calendar sync' },
  { name: 'Zoom API', status: 'disconnected', desc: 'Create meeting rooms' },
  { name: 'Google Meet API', status: 'connected', desc: 'Create meeting rooms' },
  { name: 'Twilio API', status: 'pending', desc: 'SMS reminders' },
  { name: 'WhatsApp Cloud API', status: 'disconnected', desc: 'Send messages' },
  { name: 'Google Maps API', status: 'connected', desc: 'Route calculation' },
  { name: 'OpenAI API', status: 'connected', desc: 'Contextual AI features' },
  { name: 'Text-to-Speech API', status: 'connected', desc: 'Browser-native voice output' },
  { name: 'Speech-to-Text API', status: 'connected', desc: 'Browser-native voice input' },
];

const StatusIcon = ({ status }) => {
  if (status === 'connected') {
    return <CheckCircle className="w-5 h-5 text-emerald-500" />;
  }
  if (status === 'pending') {
    return <AlertTriangle className="w-5 h-5 text-amber-500" />;
  }
  return <XCircle className="w-5 h-5 text-red-500" />;
};

const statusText = {
  connected: { es: 'Conectado', en: 'Connected' },
  pending: { es: 'Pendiente', en: 'Pending' },
  disconnected: { es: 'Desconectado', en: 'Disconnected' },
};

const APIConfigSection = () => {
  const { t, language } = useLanguage();
  return (
    <ConfigCard
      title={t('config.apiConfig') || 'API Configuration'}
      description={t('config.apiDesc') || 'Monitor the status of all third-party integrations.'}
    >
      <div className="space-y-3">
        {apiList.map((api, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-lg">
            <div>
              <p className="font-semibold">{api.name}</p>
              <p className="text-xs text-slate-500 dark:text-white/60">{api.desc}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusIcon status={api.status} />
              <span className={cn(
                "text-sm font-medium",
                api.status === 'connected' && 'text-emerald-500',
                api.status === 'pending' && 'text-amber-500',
                api.status === 'disconnected' && 'text-red-500'
              )}>
                {statusText[api.status][language] || statusText[api.status]['en']}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ConfigCard>
  );
};

export default APIConfigSection;
