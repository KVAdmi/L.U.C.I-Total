
import React from 'react';
import ConfigCard from './ConfigCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemePreview = ({ themeName, active, onClick }) => {
  return (
    <button onClick={onClick} className={cn(
      "relative border-2 rounded-lg p-2 w-full",
      active ? "border-emerald-500" : "border-slate-300 dark:border-white/20 hover:border-emerald-400"
    )}>
      {active && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      <div className={cn(
        "h-20 rounded-md p-2 flex items-start gap-1",
        themeName === 'light' ? 'bg-slate-100' : 'bg-slate-900'
      )}>
        <div className={cn("w-4 h-full rounded", themeName === 'light' ? 'bg-white' : 'bg-black')} />
        <div className="flex-1 space-y-1">
          <div className={cn("h-2 w-8 rounded-sm", themeName === 'light' ? 'bg-emerald-500' : 'bg-emerald-400')} />
          <div className={cn("h-1.5 w-full rounded-sm", themeName === 'light' ? 'bg-slate-300' : 'bg-slate-700')} />
          <div className={cn("h-1.5 w-2/3 rounded-sm", themeName === 'light' ? 'bg-slate-300' : 'bg-slate-700')} />
        </div>
      </div>
      <p className="text-sm font-medium text-center mt-2">{themeName === 'light' ? 'Light' : 'Dark'}</p>
    </button>
  );
};

const AppearanceSection = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  
  const languages = [
    { code: 'es', label: 'Español' }, { code: 'en', label: 'English' }, { code: 'it', label: 'Italiano' }, { code: 'pt', label: 'Português' }, { code: 'fr', label: 'Français' }
  ];

  return (
    <div className="space-y-8">
      <ConfigCard
        title={t('config.theme') || 'Theme'}
        description={t('config.themeDesc') || 'Customize the look and feel of the application.'}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ThemePreview themeName="light" active={theme === 'light'} onClick={() => setTheme('light')} />
          <ThemePreview themeName="dark" active={theme === 'dark'} onClick={() => setTheme('dark')} />
        </div>
      </ConfigCard>

      <ConfigCard
        title={t('config.language') || 'Language'}
        description={t('config.langDesc') || 'Choose the language for the user interface.'}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {languages.map(lang => (
            <button 
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={cn(
                "p-3 rounded-lg border-2 transition-colors",
                language === lang.code ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "border-slate-200 dark:border-white/10 hover:border-emerald-400"
              )}
            >
              <p className="font-semibold">{lang.label}</p>
              <p className="text-xs text-slate-500 dark:text-white/60">{lang.code.toUpperCase()}</p>
            </button>
          ))}
        </div>
      </ConfigCard>
    </div>
  );
};

export default AppearanceSection;
