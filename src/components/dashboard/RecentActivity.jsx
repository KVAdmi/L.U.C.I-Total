
import React from 'react';
import CardCristal from '@/components/ui/CardCristal';
import { FilePlus, UserPlus, CheckCircle, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const activity = [
    { icon: FilePlus, text: 'New file "Contract_v3.pdf" uploaded', time: '5 min ago' },
    { icon: UserPlus, text: 'Contact "John Doe" was added', time: '28 min ago' },
    { icon: CheckCircle, text: 'Task "Prepare quarterly report" completed', time: '1h ago' },
    { icon: MessageSquare, text: 'New message from "Ana García"', time: '3h ago' },
];

const ActivityItem = ({ icon: Icon, text, time }) => (
    <div className="flex items-start gap-3 py-2 border-b border-slate-100 dark:border-white/5 last:border-b-0">
        <Icon className="w-4 h-4 text-slate-400 dark:text-white/40 mt-1" />
        <div>
            <p className="text-sm text-slate-700 dark:text-white/80">{text}</p>
            <p className="text-xs text-slate-400 dark:text-white/50">{time}</p>
        </div>
    </div>
);

const RecentActivity = () => {
    const { t } = useLanguage();
    return (
        <CardCristal>
            <div className="p-5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{t('dashboard.activity.title') || 'Recent Activity'}</h3>
                <div className="space-y-1">
                    {activity.map((item, index) => (
                        <ActivityItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </CardCristal>
    );
};

export default RecentActivity;
