
import { useState, useCallback, useMemo, useRef } from 'react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { speak, parseVoiceCommand } from '@/lib/voice-utils';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * @deprecated This hook is no longer used directly by App.jsx as of the last refactor.
 * Its logic has been moved into App.jsx to centralize state management and fix initialization errors.
 * This file is kept for reference but can be safely removed in a future cleanup.
 */
export const useVoiceAssistant = ({ onNavigate, onAction, onShowUI, onHideUI }) => {
  const { language } = useLanguage();
  const [lastCommand, setLastCommand] = useState(null);
  const [responseText, setResponseText] = useState('');
  
  // Create a ref to hold the stop function so it can be accessed before initialization
  const stopRef = useRef(null);
  
  const processCommand = useCallback((transcript) => {
    if (!transcript) {
        console.log('Empty transcript received.');
        if (stopRef.current) {
          stopRef.current(); // Use the ref instead of direct call
        }
        return;
    }

    const matchedCommand = parseVoiceCommand(transcript, language);
    setLastCommand(matchedCommand);

    if (matchedCommand) {
      const response = matchedCommand.description || 'Executing command.';
      speak(response, language);
      setResponseText(response);
      
      if (matchedCommand.type === 'NAVIGATE') {
        onNavigate(matchedCommand.payload);
      } else if (matchedCommand.type === 'ACTION') {
        onAction({ type: matchedCommand.payload, module: matchedCommand.modules[0] });
      }
    } else {
      const noMatchResponse = {
        es: 'No entendí el comando. ¿Puedes repetirlo?',
        en: "I didn't understand the command. Can you repeat?",
        it: "Non ho capito il comando. Puoi ripetere?",
        pt: "Não entendi o comando. Pode repetir?",
        fr: "Je n'ai pas compris la commande. Pouvez-vous répéter?",
      }[language] || "I didn't understand the command.";
      
      speak(noMatchResponse, language);
      setResponseText(noMatchResponse);
    }
    
    // Always hide the UI after processing
    setTimeout(() => onHideUI(), 1000);
    if (stopRef.current) {
      stopRef.current();
    }

  }, [language, onNavigate, onAction, onHideUI]);

  const {
    transcript,
    isListening,
    start,
    stop,
    error,
  } = useSpeechRecognition({
    onResult: processCommand,
    lang: language,
  });

  // Update the ref whenever stop function changes
  stopRef.current = stop;

  const assistantState = useMemo(() => ({
    isListening,
    start: () => {
      setResponseText('');
      setLastCommand(null);
      onShowUI();
      start();
    },
    stop: () => {
      stop();
      onHideUI();
    },
    transcript,
    lastCommand,
    responseText,
    error,
  }), [isListening, start, stop, transcript, lastCommand, responseText, error, onShowUI, onHideUI]);

  return assistantState;
};
