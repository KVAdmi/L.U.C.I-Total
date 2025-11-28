import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import IAActionPanel from '@/components/ui/IAActionPanel';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { speak, parseVoiceCommand, getSpeechRecognitionLang } from '@/lib/voice-utils';
import FloatingVoiceButton from '@/components/ui/FloatingVoiceButton';
import VoiceAssistantUI from '@/components/ui/VoiceAssistantUI';
import Dashboard from '@/components/modules/Dashboard';
import Agenda from '@/components/modules/Agenda';
import Comunicaciones from '@/components/modules/Comunicaciones';
import Documentos from '@/components/modules/Documentos';
import Contactos from '@/components/modules/Contactos';
import Tareas from '@/components/modules/Tareas';
import Finanzas from '@/components/modules/Finanzas';
import CentroIA from '@/components/modules/CentroIA';
import Configuracion from '@/components/modules/Configuracion';
import News from '@/components/modules/News';
import MedixiaModule from '@/components/modules/medixia/MedixiaModule';
import LexiaModule from '@/components/modules/lexia/LexiaModule';
import SegurosiaModule from '@/components/modules/segurosia/SegurosiaModule';
import ContaiaModule from '@/components/modules/contaia/ContaiaModule';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';


const moduleMap = {
  dashboard: { component: Dashboard, path: '/' },
  agenda: { component: Agenda, path: 'agenda' },
  comunicaciones: { component: Comunicaciones, path: 'comunicaciones' },
  documentos: { component: Documentos, path: 'documentos' },
  contactos: { component: Contactos, path: 'contactos' },
  tareas: { component: Tareas, path: 'tareas' },
  finanzas: { component: Finanzas, path: 'finanzas' },
  news: { component: News, path: 'news' },
  'centro-ia': { component: CentroIA, path: 'centro-ia' },
  configuracion: { component: Configuracion, path: 'configuracion' },
  medixia: { component: MedixiaModule, path: 'medixia' },
  lexia: { component: LexiaModule, path: 'lexia' },
  segurosia: { component: SegurosiaModule, path: 'segurosia' },
  contaia: { component: ContaiaModule, path: 'contaia' },
};

const CrmLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isVoiceUIVisible, setVoiceUIVisible] = useState(false);
  const [voiceResponseText, setVoiceResponseText] = useState('');
  const [lastCommand, setLastCommand] = useState(null);

  useEffect(() => {
    const currentPath = location.pathname.substring(1).split('/')[0] || 'dashboard';
    const moduleKey = Object.keys(moduleMap).find(key => moduleMap[key].path === currentPath || (currentPath === '' && moduleMap[key].path === '/')) || 'dashboard';
    setActiveModule(moduleKey);
  }, [location]);

  const handleNavigate = (module) => {
    const path = moduleMap[module]?.path || '/';
    navigate(path);
    setVoiceUIVisible(false);
  };

  const handleAction = (action) => {
    console.log("Voice Action:", action);
    setVoiceUIVisible(false);
  };
  
  const processCommand = useCallback((transcript) => {
    if (!transcript) return;
    
    const matchedCommand = parseVoiceCommand(transcript, language);
    setLastCommand(matchedCommand);

    if (matchedCommand) {
      const response = matchedCommand.description[language] || matchedCommand.description.es;
      speak(response, getSpeechRecognitionLang(language));
      setVoiceResponseText(response);
      
      if (matchedCommand.type === 'NAVIGATE') {
        setTimeout(() => handleNavigate(matchedCommand.payload), 500);
      } else if (matchedCommand.type === 'ACTION') {
        setTimeout(() => handleAction({ type: matchedCommand.payload, module: matchedCommand.modules[0] }), 500);
      }
    } else {
      const noMatchResponse = t('voice.noMatch') || "I didn't understand that command.";
      speak(noMatchResponse, getSpeechRecognitionLang(language));
      setVoiceResponseText(noMatchResponse);
    }
  }, [language, t, navigate]);

  const speechLang = useMemo(() => getSpeechRecognitionLang(language), [language]);
  const speech = useSpeechRecognition({ onResult: processCommand, lang: speechLang });
  
  const memoizedStop = useCallback(() => {
    speech.stop();
    setVoiceUIVisible(false);
  }, [speech]);

  const startVoiceAssistant = useCallback(() => {
    setVoiceResponseText('');
    setLastCommand(null);
    setVoiceUIVisible(true);
    speech.start();
  }, [speech]);

  useEffect(() => {
    if (!isVoiceUIVisible && speech.isListening) {
        memoizedStop();
    }
  }, [isVoiceUIVisible, speech.isListening, memoizedStop]);
  
  const onSidebarNavigate = (moduleKey) => {
    setActiveModule(moduleKey);
    // Navigation is handled by Link components in Sidebar
  };

  const voiceState = useMemo(() => ({
    isListening: speech.isListening,
    transcript: speech.transcript,
    error: speech.error,
    responseText: voiceResponseText,
    lastCommand: lastCommand,
    start: startVoiceAssistant,
    stop: memoizedStop
  }), [speech.isListening, speech.transcript, speech.error, voiceResponseText, lastCommand, startVoiceAssistant, memoizedStop]);

  return (
    <div className={cn(
      "flex h-screen overflow-hidden font-['Questrial']",
      theme === 'dark' ? 'bg-ale-black text-ale-white' : 'bg-ale-white-bg text-ale-charcoal'
    )}>
      <Sidebar 
        activeModule={activeModule}
        onNavigate={onSidebarNavigate}
      />
      
      <div className="flex-1 flex flex-col ml-64 overflow-hidden relative">
        <Header userProfile={user} />
        
        <div className="flex-1 flex overflow-hidden">
          <main className={cn(
            "flex-1 overflow-y-auto custom-scrollbar",
            theme === 'dark' ? 'bg-ale-black' : 'bg-ale-white-bg'
          )}>
             <div className="w-full h-full">
                <Routes>
                    {Object.entries(moduleMap).map(([key, { component: Component, path }]) => (
                        <Route key={key} path={path} element={
                          <Component
                            userProfile={user}
                            voiceState={voiceState}
                            onNavigate={handleNavigate}
                            assistantName="AL-E"
                          />
                        } />
                    ))}
                </Routes>
              </div>
          </main>
        </div>
      </div>
      
      <IAActionPanel 
        assistantName="AL-E" 
        context={activeModule}
        className="hidden xl:block"
      />

      <FloatingVoiceButton 
        isListening={speech.isListening}
        onClick={isVoiceUIVisible ? memoizedStop : startVoiceAssistant}
      />
      
      <VoiceAssistantUI
        isVisible={isVoiceUIVisible}
        onClose={memoizedStop}
        voiceState={voiceState}
        activeModule={activeModule}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default CrmLayout;
