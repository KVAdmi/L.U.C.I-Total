
import React from 'react';
import Badge from '@/components/ui/Badge';

const TablePremium = ({ data }) => {
  const priorityVariants = {
    high: 'danger',
    medium: 'warning',
    low: 'secondary'
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left text-white/60 text-xs font-medium pb-3">Tarea</th>
            <th className="text-left text-white/60 text-xs font-medium pb-3">Prioridad</th>
            <th className="text-left text-white/60 text-xs font-medium pb-3">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-3 text-white text-sm">{item.title}</td>
              <td className="py-3">
                <Badge variant={priorityVariants[item.priority]}>
                  {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Media' : 'Baja'}
                </Badge>
              </td>
              <td className="py-3 text-white/60 text-sm">{item.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePremium;
