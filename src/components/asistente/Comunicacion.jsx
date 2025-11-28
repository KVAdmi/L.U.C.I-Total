
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Send, Link, FileText, MapPin, Mail, Calendar, Check, Loader2 } from 'lucide-react';
import SubmoduleHeader from './SubmoduleHeader';
import { useToast } from '@/components/ui/use-toast';
import { sendEmail, sendSMS, sendWhatsApp } from '@/lib/asistente/communications';

const Comunicacion = ({ onBack }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSend = async (platform) => {
    if (!message.trim()) {
      toast({ title: 'Error', description: 'Escribe un mensaje', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      if (platform === 'Email') {
        await sendEmail({ 
          to: 'cliente@ejemplo.com', 
          subject: 'Mensaje desde L.U.C.I', 
          body: message 
        });
      } else if (platform === 'WhatsApp') {
        await sendWhatsApp({ 
          to: '+5215512345678', 
          message 
        });
      } else {
        await sendSMS({ 
          to: '+5215512345678', 
          message 
        });
      }
      toast({ title: 'Éxito', description: `Mensaje enviado vía ${platform}` });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({ title: 'Error', description: 'No se pudo enviar', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const actions = [
    { label: t('asistente.comunicacion.confirm'), icon: Check },
    { label: t('asistente.comunicacion.reschedule'), icon: Calendar },
    { label: t('asistente.comunicacion.shareLocation'), icon: MapPin },
    { label: t('asistente.comunicacion.shareLink'), icon: Link },
    { label: t('asistente.comunicacion.shareDoc'), icon: FileText },
  ];

  // Dummy icons for platforms that would use react-icons
  const FaWhatsapp = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.849 6.069l-1.254 4.585 4.704-1.239zm-4.505-6.182h2.25c.198 0 .385.046.554.133.17.088.318.21.431.365.112.155.192.334.238.528.046.193.063.393.047.592-.059 1.1-.335 2.158-.78 3.138-.285.61-.413.922-.309 1.01.106.09.282.164.509.223.228.058.381.023.502-.045.121-.068.682-.339 1.152-.647s.896-.552 1.819-1.221c.178-.129.387-.202.603-.202.215 0 .423.072.595.2.172.13.298.313.364.524.066.212.072.438.019.66-.283 1.179-1.328 2.2-1.942 2.655-.49.359-1.015.547-1.548.56-1.383.033-2.613-.42-3.447-1.208-.527-.514-1.018-1.226-1.428-2.031-.41-.805-.7-1.67-.856-2.583-.016-.182-.002-.368.045-.547.047-.179.13-.346.244-.492.115-.147.258-.266.42-.35.163-.084.343-.127.525-.125z"/></svg>;
  const FaSlack = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.521-2.522c0-1.393 1.129-2.522 2.521-2.522h2.521v2.522a2.528 2.528 0 0 1-2.521 2.522zm1.261-5.043h5.042a2.528 2.528 0 0 1 2.521 2.521c0 1.393-1.129 2.522-2.521 2.522h-5.042a2.528 2.528 0 0 1-2.521-2.522c0-1.392 1.129-2.521 2.521-2.521zm-1.261-5.043h2.521v5.043h-2.521a2.528 2.528 0 0 1-2.521-2.521c0-1.393 1.129-2.522 2.521-2.522zm7.563 0h2.521a2.528 2.528 0 0 1 2.521 2.522c0 1.393-1.129 2.521-2.521 2.521h-2.521v-5.043zm6.302 1.261v5.043h-5.042a2.528 2.528 0 0 1-2.521-2.521c0-1.393 1.129-2.522 2.521-2.522h5.042zm1.261 6.305v2.521h-2.521a2.528 2.528 0 0 1-2.521-2.521c0-1.393 1.129-2.522 2.521-2.522h2.521zm-7.563 0v2.521h-2.521a2.528 2.528 0 0 1-2.521-2.521c0-1.393 1.129-2.522 2.521-2.522h2.521zm-1.261 7.563v-5.043h5.042a2.528 2.528 0 0 1 2.521 2.521c0 1.393-1.129 2.522-2.521 2.522h-5.042z"/></svg>;


  const platforms = [
    { name: 'WhatsApp', icon: FaWhatsapp, color: 'text-green-500' },
    { name: 'Email', icon: Mail, color: 'text-blue-500' },
    { name: 'Slack', icon: FaSlack, color: 'text-purple-500' },
  ];

  return (
    <div className="p-8">
      <SubmoduleHeader onBack={onBack} title={t('asistente.comunicacion')} subtitle={t('asistente.comunicacionDesc')} icon={MessageCircle} />
      
      <div className="bg-[#1F1F1F] p-6 rounded-lg">
        <h3 className="text-lg text-white mb-4">{t('asistente.comunicacion.composeMessage')}</h3>
        <textarea placeholder={t('asistente.comunicacion.messagePlaceholder')} rows="4" className="w-full p-2 bg-[#0A0A0A] rounded mb-4"></textarea>
        
        <div className="mb-6">
            <h4 className="text-sm text-[#BFC8CF] mb-2">{t('asistente.comunicacion.quickActions')}</h4>
            <div className="flex flex-wrap gap-2">
                {actions.map(action => {
                    const Icon = action.icon;
                    return <button key={action.label} className="flex items-center gap-2 px-3 py-1 text-sm bg-[rgba(0,30,33,0.35)] rounded-full hover:bg-[#003336] transition-colors"><Icon className="w-3 h-3"/> {action.label}</button>
                })}
            </div>
        </div>

        <div>
            <h4 className="text-sm text-[#BFC8CF] mb-2">{t('asistente.comunicacion.sendVia')}</h4>
            <div className="flex flex-wrap gap-4">
                {platforms.map(p => {
                    const Icon = p.icon;
                    return <button key={p.name} onClick={() => handleSend(p.name)} className={`flex items-center gap-2 px-4 py-2 text-white bg-[#0A0A0A] border border-[rgba(0,30,33,0.35)] rounded-lg hover:border-[#003336]`}>
                        <Icon className={`w-5 h-5 ${p.color}`} /> {p.name} <Send className="w-3 h-3 ml-2 text-[#BFC8CF]" />
                    </button>
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Comunicacion;
