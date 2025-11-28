
export const speak = (text, lang) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.pitch = 1;
    utterance.rate = 1.1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    console.error('Text-to-speech not supported in this browser.');
  }
};

export const getSpeechRecognitionLang = (appLanguage) => {
  const langMap = {
    es: 'es-ES',
    en: 'en-US',
    it: 'it-IT',
    pt: 'pt-BR',
    fr: 'fr-FR'
  };
  return langMap[appLanguage] || 'es-ES';
};

const COMMAND_DEFINITIONS = {
  // SYSTEM
  SYSTEM_STOP: { type: 'SYSTEM', payload: 'STOP', modules: ['all'], description: { es: 'Deteniendo escucha.', en: 'Stopping listening.' } },
  // NAVIGATION
  NAV_DASHBOARD: { type: 'NAVIGATE', payload: 'dashboard', modules: ['all'], description: { es: 'Navegando al panel principal.', en: 'Navigating to dashboard.' } },
  NAV_AGENDA: { type: 'NAVIGATE', payload: 'agenda', modules: ['all'], description: { es: 'Abriendo la agenda.', en: 'Opening agenda.' } },
  NAV_TAREAS: { type: 'NAVIGATE', payload: 'tareas', modules: ['all'], description: { es: 'Mostrando tus tareas.', en: 'Showing your tasks.' } },
  NAV_MEDICO: { type: 'NAVIGATE', payload: 'medico', modules: ['all'], description: { es: 'Abriendo módulo Médico.', en: 'Opening Medical module.' } },
  NAV_LEGAL: { type: 'NAVIGATE', payload: 'legal', modules: ['all'], description: { es: 'Abriendo módulo Legal.', en: 'Opening Legal module.' } },
  NAV_SEGUROS: { type: 'NAVIGATE', payload: 'seguros', modules: ['all'], description: { es: 'Abriendo módulo de Seguros.', en: 'Opening Insurance module.' } },
  NAV_CONTADORES: { type: 'NAVIGATE', payload: 'contadores', modules: ['all'], description: { es: 'Abriendo módulo Contable.', en: 'Opening Accounting module.' } },
  NAV_HOSPITAL: { type: 'NAVIGATE', payload: 'hospital', modules: ['all'], description: { es: 'Abriendo módulo de Hospital.', en: 'Opening Hospital module.' } },
  NAV_TURISMO: { type: 'NAVIGATE', payload: 'turismo', modules: ['all'], description: { es: 'Abriendo módulo de Turismo Médico.', en: 'Opening Medical Tourism module.' } },
};

const TRIGGERS = {
  es: {
    SYSTEM_STOP: ['para', 'detente', 'cállate', 'silencio', 'cancela'],
    NAV_DASHBOARD: ['panel principal', 'dashboard', 'inicio'],
    NAV_AGENDA: ['agenda', 'calendario', 'citas'],
    NAV_TAREAS: ['tareas', 'pendientes'],
    NAV_MEDICO: ['médico', 'medicina'],
    NAV_LEGAL: ['legal', 'abogados'],
    NAV_SEGUROS: ['seguros', 'pólizas'],
    NAV_CONTADORES: ['contadores', 'contabilidad', 'impuestos'],
    NAV_HOSPITAL: ['hospital', 'clínica'],
    NAV_TURISMO: ['turismo', 'viajes médicos'],
  },
  en: {
    SYSTEM_STOP: ['stop', 'shut up', 'silence', 'cancel'],
    NAV_DASHBOARD: ['dashboard', 'home', 'main panel'],
    NAV_AGENDA: ['agenda', 'calendar', 'appointments'],
    NAV_TAREAS: ['tasks', 'to-do'],
    NAV_MEDICO: ['medical', 'medicine'],
    NAV_LEGAL: ['legal', 'lawyers'],
    NAV_SEGUROS: ['insurance', 'policies'],
    NAV_CONTADORES: ['accounting', 'taxes'],
    NAV_HOSPITAL: ['hospital', 'clinic'],
    NAV_TURISMO: ['tourism', 'medical travel'],
  },
  it: {
    SYSTEM_STOP: ['ferma', 'basta', 'silenzio', 'annulla'],
    NAV_DASHBOARD: ['dashboard', 'principale', 'inizio'],
    NAV_AGENDA: ['agenda', 'calendario', 'appuntamenti'],
    NAV_TAREAS: ['compiti', 'da fare'],
    NAV_MEDICO: ['medico', 'sanità'],
    NAV_LEGAL: ['legale', 'avvocati'],
    NAV_SEGUROS: ['assicurazioni', 'polizze'],
    NAV_CONTADORES: ['contabilità', 'tasse'],
    NAV_HOSPITAL: ['ospedale', 'clinica'],
    NAV_TURISMO: ['turismo', 'viaggi medici'],
  },
  pt: {
    SYSTEM_STOP: ['para', 'pare', 'silêncio', 'cancela'],
    NAV_DASHBOARD: ['painel', 'principal', 'início'],
    NAV_AGENDA: ['agenda', 'calendário', 'compromissos'],
    NAV_TAREAS: ['tarefas', 'pendentes'],
    NAV_MEDICO: ['médico', 'medicina'],
    NAV_LEGAL: ['jurídico', 'advogados'],
    NAV_SEGUROS: ['seguros', 'apólices'],
    NAV_CONTADORES: ['contábil', 'impostos'],
    NAV_HOSPITAL: ['hospital', 'clínica'],
    NAV_TURISMO: ['turismo', 'viagens médicas'],
  },
  fr: {
    SYSTEM_STOP: ['arrête', 'stop', 'silence', 'annule'],
    NAV_DASHBOARD: ['tableau de bord', 'accueil', 'principal'],
    NAV_AGENDA: ['agenda', 'calendrier', 'rendez-vous'],
    NAV_TAREAS: ['tâches', 'à faire'],
    NAV_MEDICO: ['médical', 'santé'],
    NAV_LEGAL: ['juridique', 'avocats'],
    NAV_SEGUROS: ['assurance', 'polices'],
    NAV_CONTADORES: ['comptabilité', 'impôts'],
    NAV_HOSPITAL: ['hôpital', 'clinique'],
    NAV_TURISMO: ['tourisme', 'voyages médicaux'],
  }
};

export const parseVoiceCommand = (transcript, language) => {
  const lowerTranscript = transcript.toLowerCase().trim();
  const langTriggers = TRIGGERS[language] || TRIGGERS.es;

  for (const commandKey in langTriggers) {
    if (langTriggers[commandKey].some(trigger => lowerTranscript.includes(trigger))) {
      const commandInfo = COMMAND_DEFINITIONS[commandKey];
      return {
        id: commandKey,
        ...commandInfo,
        description: commandInfo.description[language] || commandInfo.description.es,
      };
    }
  }
  return null;
};

export const getCommandSuggestions = (moduleId, language) => {
  const generalCommands = Object.entries(COMMAND_DEFINITIONS)
    .filter(([key, cmd]) => cmd.modules.includes('all') && cmd.type === 'NAVIGATE' && cmd.payload !== moduleId)
    .map(([key, cmd]) => ({ ...cmd, id: key }));

  const moduleSpecificCommands = Object.entries(COMMAND_DEFINITIONS)
    .filter(([key, cmd]) => cmd.modules.includes(moduleId) && cmd.type === 'ACTION')
    .map(([key, cmd]) => ({ ...cmd, id: key }));

  const suggestions = [...moduleSpecificCommands, ...generalCommands];
  
  return suggestions
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 4) // Take 4
    .map(cmd => ({
      ...cmd,
      description: cmd.description[language] || cmd.description.es
  }));
};
