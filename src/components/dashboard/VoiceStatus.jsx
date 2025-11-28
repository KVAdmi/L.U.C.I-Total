
import React from 'react';
import CardCristal from '@/components/ui/CardCristal';
import { Mic, Activity, Terminal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const VoiceStatus = ({ voiceState }) => {
    const { t } = useLanguage();

    const status = voiceState.isListening
    ? { text: t('demo.listening'), icon: Mic, color: 'text-red-500' }
    : { text: t('demo.idle'), icon: Activity, color: 'text-emerald-500' };

    return (
        <CardCristal>
            <div className="p-5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">{t('demo.voiceAssistant')}</h3>
                <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-black/30 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                        <status.icon className={cn("w-4 h-4", status.color, voiceState.isListening && "animate-pulse")} />
                        <span className="text-sm font-medium">{status.text}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-xs text-slate-500 dark:text-white/50 font-semibold">{t('demo.lastCommand')}</p>
                    <div className="p-3 bg-slate-900 dark:bg-black rounded-lg text-xs font-mono text-emerald-400 min-h-[40px] flex items-center gap-2">
                        <Terminal className="w-4 h-4 shrink-0" />
                        <span className="truncate">
                            {voiceState.lastCommand ? (voiceState.lastCommand.description.es || 'N/A') : 'ninguno'}
                        </span>
                    </div>
                </div>
            </div>
        </CardCristal>
    );
};

export default VoiceStatus;
