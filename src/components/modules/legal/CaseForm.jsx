
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

const CaseForm = ({ isOpen, onClose, onSave, legalCase }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '', client: '', caseType: 'Laboral', status: 'pending', priority: 'medium', assignedTo: '', nextHearing: ''
  });

  useEffect(() => {
    if (legalCase) {
      setFormData({
        title: legalCase.title || '',
        client: legalCase.client || '',
        caseType: legalCase.caseType || 'Laboral',
        status: legalCase.status || 'pending',
        priority: legalCase.priority || 'medium',
        assignedTo: legalCase.assignedTo || '',
        nextHearing: legalCase.nextHearing ? legalCase.nextHearing.split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '', client: '', caseType: 'Laboral', status: 'pending', priority: 'medium', assignedTo: '', nextHearing: ''
      });
    }
  }, [legalCase, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 font-['Questrial']"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-[#0A0A0A] rounded-2xl shadow-xl w-full max-w-lg border border-[rgba(0,30,33,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-[rgba(0,30,33,0.35)]">
          <h2 className="text-xl font-semibold text-white">{legalCase ? t('common.edit') + ' ' + t('legal.cases') : t('common.create') + ' ' + t('legal.cases')}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-[#BFC8CF] hover:bg-[#1F1F1F] hover:text-white"><X className="w-5 h-5" /></Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#BFC8CF]">Título del Caso</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required className="bg-[#1F1F1F] border-[rgba(0,30,33,0.35)] text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client" className="text-[#BFC8CF]">Cliente</Label>
            <Input id="client" name="client" value={formData.client} onChange={handleChange} required className="bg-[#1F1F1F] border-[rgba(0,30,33,0.35)] text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="caseType" className="text-[#BFC8CF]">Tipo de Caso</Label>
              <select id="caseType" name="caseType" value={formData.caseType} onChange={handleChange} className="w-full p-2 border rounded-md bg-[#1F1F1F] border-[rgba(0,30,33,0.35)] text-white focus:ring-0 focus:border-[#003336]">
                <option>Laboral</option><option>Familiar</option><option>Mercantil</option><option>Civil</option><option>Penal</option>
              </select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="status" className="text-[#BFC8CF]">Estado</Label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded-md bg-[#1F1F1F] border-[rgba(0,30,33,0.35)] text-white focus:ring-0 focus:border-[#003336]">
                <option value="pending">Pendiente</option><option value="active">Activo</option><option value="review">En Revisión</option><option value="closed">Cerrado</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedTo" className="text-[#BFC8CF]">Asignado a</Label>
            <Input id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="bg-[#1F1F1F] border-[rgba(0,30,33,0.35)] text-white" />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={onClose} className="text-[#BFC8CF] hover:bg-[#1F1F1F] hover:text-white">{t('common.cancel')}</Button>
            <Button type="submit" className="bg-[#003336] text-white hover:bg-[#001E21]">{t('common.save')}</Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CaseForm;
