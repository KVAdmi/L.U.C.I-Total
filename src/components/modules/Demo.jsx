
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Mic, Moon, Sun, Smartphone, Laptop, Tablet, 
  Database, CheckCircle2, Activity, Terminal, Command
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatusRow = ({ icon: Icon, label, value, status = "active", subtext }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all">
    <div className="flex items-center gap-4">
      <div className={cn(
        "p-2.5 rounded-full",
        status === "active" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" : 
        status === "listening" ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 animate-pulse" :
        "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-white/40"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-medium text-slate-900 dark:text-white">{label}</p>
        {subtext && <p className="text-xs text-slate-500 dark:text-white/40">{subtext}</p>}
      </div>
    </div>
    <div className="text-right">
      {value}
    </div>
  </div>
);

const Demo = ({ assistantName, voiceState }) => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [storageStatus, setStorageStatus] = useState({ lang: null, theme: null });
  
  // Responsive detector
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // LocalStorage poller
  useEffect(() => {
    const updateStorage = () => {
      setStorageStatus({
        lang: localStorage.getItem('ale_language'),
        theme: localStorage.getItem('ale_theme')
      });
    };
    updateStorage();
    const interval = setInterval(updateStorage, 2000);
    return () => clearInterval(interval);
  }, [language, theme]);

  const getDeviceIcon = () => {
    if (windowWidth < 640) return Smartphone;
    if (windowWidth < 1024) return Tablet;
    return Laptop;
  };

  const getDeviceName = () => {
    if (windowWidth < 640) return "Mobile";
    if (windowWidth < 1024) return "Tablet";
    return "Desktop";
  };

  const languages = [
    { code: 'es', flag: '🇪🇸', name: 'ES' },
    { code: 'en', flag: '🇺🇸', name: 'EN' },
    { code: 'it', flag: '🇮🇹', name: 'IT' },
    { code: 'pt', flag: '🇵🇹', name: 'PT' },
    { code: 'fr', flag: '🇫🇷', name: 'FR' }
  ];

  const DeviceIcon = getDeviceIcon();

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto h-full overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t('demo.title')}
        </h1>
        <p className="text-slate-500 dark:text-white/60">
          {t('demo.subtitle')}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Main System Status Card */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-emerald-500" />
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">System Diagnostics</h2>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
          </div>

          <div className="p-6 grid gap-4 md:grid-cols-2">
            
            {/* 1. Multi-language Status */}
            <StatusRow 
              icon={Globe}
              label={t('demo.multiLanguage')}
              subtext={`${languages.length} Languages Loaded`}
              value={
                <div className="flex gap-1">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code)}
                      className={cn(
                        "w-8 h-8 rounded-md flex items-center justify-center text-sm border transition-all",
                        language === l.code 
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-md scale-110" 
                          : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:bg-slate-50"
                      )}
                      title={l.name}
                    >
                      {l.flag}
                    </button>
                  ))}
                </div>
              }
            />

            {/* 2. Voice Assistant Status */}
            <StatusRow 
              icon={Mic}
              status={voiceState?.isListening ? "listening" : "active"}
              label={t('demo.voiceAssistant')}
              subtext={voiceState?.isListening ? t('demo.listening') : t('demo.idle')}
              value={
                <div className="text-right">
                  <div className="text-xs font-mono text-slate-400 mb-1">{t('demo.lastCommand')}</div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-white">
                    <Command className="w-3 h-3" />
                    {voiceState?.lastCommand?.payload || "None"}
                  </div>
                </div>
              }
            />

            {/* 3. Theme Mode */}
            <StatusRow 
              icon={theme === 'dark' ? Moon : Sun}
              label={t('demo.themeMode')}
              subtext={theme === 'dark' ? "Dark Mode Active" : "Light Mode Active"}
              value={
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
                      theme === 'dark' ? "translate-x-6 bg-emerald-400" : "translate-x-1"
                    )}
                  />
                </button>
              }
            />

            {/* 4. Responsive Status */}
            <StatusRow 
              icon={DeviceIcon}
              label={t('demo.responsive')}
              subtext={`${windowWidth}px Width`}
              value={
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase">
                  {getDeviceName()}
                </span>
              }
            />

            {/* 5. Persistence */}
            <div className="md:col-span-2 mt-2">
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 shadow-inner">
                <div className="flex items-center gap-2 mb-3 text-emerald-400 border-b border-slate-700 pb-2">
                  <Database className="w-4 h-4" />
                  <span className="uppercase tracking-wider font-bold">{t('demo.persistence')} ({t('demo.storageSaved')})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">ale_language:</span>
                    <span className="text-white">"{storageStatus.lang}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">ale_theme:</span>
                    <span className="text-white">"{storageStatus.theme}"</span>
                  </div>
                  <div className="flex justify-between sm:col-span-2">
                     <span className="text-slate-500">ale_user_profile:</span>
                     <span className="text-emerald-400 truncate max-w-[200px] sm:max-w-md">
                       {localStorage.getItem('ale_user_profile') ? "Object {...}" : "null"}
                     </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Actions Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={voiceState?.start}
            className="p-4 rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col items-center gap-2 group"
          >
            <Mic className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            <span className="text-xs font-medium text-slate-600 dark:text-white group-hover:text-emerald-500">
              {t('demo.simulateVoice')}
            </span>
          </button>
          
           <button 
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="p-4 rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 hover:border-red-500 dark:hover:border-red-500 transition-all flex flex-col items-center gap-2 group"
          >
            <Terminal className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors" />
            <span className="text-xs font-medium text-slate-600 dark:text-white group-hover:text-red-500">
              {t('demo.resetData')}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Demo;
