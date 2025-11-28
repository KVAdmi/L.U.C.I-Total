
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarCompact = () => {
  const [currentDate] = useState(new Date());
  
  const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const days = getDaysInMonth();
  const today = new Date().getDate();

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white text-sm font-medium">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <ChevronLeft className="w-4 h-4 text-white/60" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <ChevronRight className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-white/40 text-xs font-medium">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`
              aspect-square flex items-center justify-center text-xs rounded-lg
              ${day ? 'text-white/80 hover:bg-white/10 cursor-pointer transition-colors' : ''}
              ${day === today ? 'bg-[#001E21] text-white font-semibold' : ''}
            `}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarCompact;
