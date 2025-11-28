
import React from 'react';
import CardCristal from '@/components/ui/CardCristal';
import { AlertTriangle, Info, Bell } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const notifications = [
    { icon: AlertTriangle, text: 'API Key for Zoom will expire in 3 days.', time: '10m ago', type: 'warning' },
    { icon: Info, text: 'System update scheduled for tonight at 2 AM.', time: '1h ago', type: 'info' },
];

const NotificationItem = ({ icon: Icon, text, time, type }) => (
    <div className="flex items-start gap-3 py-2 border-b border-slate-100 dark:border-white/5 last:border-b-0">
        <Icon className={`w-4 h-4 mt-1 ${type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`} />
        <div>
            <p className="text-sm text-slate-700 dark:text-white/80">{text}</p>
            <p className="text-xs text-slate-400 dark:text-white/50">{time}</p>
        </div>
    </div>
);

const NotificationCenter = () => {
    const { t } = useLanguage();
    return (
        <CardCristal>
            <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Bell className="w-5 h-5"/>
                        {t('dashboard.notifications.title') || 'Notifications'}
                    </h3>
                    <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {notifications.length}
                    </span>
                </div>
                <div className="space-y-1">
                    {notifications.map((item, index) => (
                        <NotificationItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </CardCristal>
    );
};

export default NotificationCenter;
