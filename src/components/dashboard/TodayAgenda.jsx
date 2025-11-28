
import React from 'react';
import { Clock, MapPin, Users, Route, FileText } from 'lucide-react';

const TodayAgenda = () => {
  const nextMeeting = {
    time: '11:30',
    title: 'Junta con Mauricio',
    location: 'Oficina Reforma',
    departureTime: '10:52',
    travelTime: '22 min',
    attendees: ['Mauricio', 'Ana', '+2'],
  };

  return (
    <div className="bg-white dark:bg-white/[.07] backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:border-[#00BFA5]/30 transition-all duration-300 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-[#00BFA5]" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Agenda del día</h3>
      </div>

      <div className="space-y-4">
        {/* Next Meeting */}
        <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{nextMeeting.time}</div>
              <div className="text-base font-semibold text-slate-800 dark:text-white/90">{nextMeeting.title}</div>
            </div>
            <div className="px-3 py-1 bg-[#00BFA5]/20 border border-[#00BFA5]/30 rounded-full">
              <span className="text-xs font-bold text-[#00BFA5]">PRÓXIMO</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-slate-600 dark:text-white/60" />
            <span className="text-sm text-slate-700 dark:text-white/70">{nextMeeting.location}</span>
          </div>

          <div className="bg-[#003336]/10 dark:bg-[#003336]/50 rounded-lg p-3 mb-3 border border-[#00BFA5]/10 dark:border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-600 dark:text-white/50">Salida sugerida</span>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{nextMeeting.departureTime}</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-600 dark:text-white/50">Traslado</span>
                <div className="text-base font-semibold text-[#00BFA5]">{nextMeeting.travelTime}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-slate-600 dark:text-white/60" />
            <div className="flex items-center gap-2">
              {nextMeeting.attendees.map((attendee, idx) => (
                <span key={idx} className="text-sm text-slate-700 dark:text-white/70">{attendee}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="px-4 py-2 bg-[#00BFA5] hover:bg-[#00BFA5]/90 rounded-lg text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2">
              <Route className="w-4 h-4" />
              Ver ruta
            </button>
            <button className="px-4 py-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 rounded-lg text-sm font-semibold text-slate-900 dark:text-white transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10">
              <FileText className="w-4 h-4" />
              Notas
            </button>
          </div>
        </div>

        {/* Additional meetings */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5 hover:border-[#00BFA5]/30 dark:hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-900 dark:text-white/90">15:00</span>
              <span className="text-sm text-slate-700 dark:text-white/70">Revisión financiera Q4</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-white/50">Teams</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5 hover:border-[#00BFA5]/30 dark:hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-900 dark:text-white/90">17:30</span>
              <span className="text-sm text-slate-700 dark:text-white/70">Llamada con proveedor</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-white/50">Telefónica</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayAgenda;

