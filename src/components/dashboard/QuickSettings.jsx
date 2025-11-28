
import React from 'react';
import CardCristal from '@/components/ui/CardCristal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Globe, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const QuickSettings = () => {
    const { t, language, setLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();

    const languages = [ { code: 'es', flag: '🇪🇸' }, { code: 'en', flag: '🇺🇸' }];

    return (
        <CardCristal>
            <div className="p-5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">{t('config.title')}</h3>
                <div className="space-y-3">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2">
                            {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-sky-400" />}
                            <span className="text-sm font-medium">{t('config.theme')}</span>
                        </div>
                        <button
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-white/20"
                        >
                            <span className={cn(
                                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                theme === 'dark' ? "translate-x-6 bg-emerald-400" : "translate-x-1"
                            )} />
                        </button>
                    </div>

                    {/* Language Toggle */}
                    <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-black/30 rounded-lg">
                         <div className="flex items-center gap-2">
                           <Globe className="w-4 h-4 text-blue-500"/>
                           <span className="text-sm font-medium">{t('config.language')}</span>
                        </div>
                        <div className="flex gap-1">
                            {languages.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    className={cn(
                                        "w-8 h-8 rounded-md flex items-center justify-center text-lg border-2",
                                        language === lang.code ? "border-emerald-500" : "border-transparent"
                                    )}
                                >
                                    {lang.flag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </CardCristal>
    );
};

export default QuickSettings;
