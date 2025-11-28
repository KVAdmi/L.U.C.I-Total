
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

const PolicyForm = ({ isOpen, onClose, onSave, policy }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    client: '', type: 'Automóvil', coverage: 'Amplia', premium: '', status: 'active', expiryDate: ''
  });

  useEffect(() => {
    if (policy) {
      setFormData({
        client: policy.client || '',
        type: policy.type || 'Automóvil',
        coverage: policy.coverage || 'Amplia',
        premium: policy.premium || '',
        status: policy.status || 'active',
        expiryDate: policy.expiryDate ? policy.expiryDate.split('T')[0] : '',
      });
    } else {
      setFormData({
        client: '', type: 'Automóvil', coverage: 'Amplia', premium: '', status: 'active', expiryDate: ''
      });
    }
  }, [policy, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({...formData, premium: parseFloat(formData.premium)});
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-semibold">{policy ? 'Editar Póliza' : 'Nueva Póliza'}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full"><X className="w-5 h-5" /></Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client">Nombre del Cliente</Label>
            <Input id="client" name="client" value={formData.client} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="type">Tipo de Póliza</Label>
              <select id="type" name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded-md bg-transparent dark:bg-slate-800">
                <option>Automóvil</option><option>Vida</option><option>Hogar</option><option>Gastos Médicos</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverage">Cobertura</Label>               <select id="coverage" name="coverage" value={formData.coverage} onChange={handleChange} className="w-full p-2 border rounded-md bg-transparent dark:bg-slate-800">
                <option>Básica</option><option>Limitada</option><option>Amplia</option><option>Total</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="premium">Prima (Anual)</Label>
              <Input id="premium" name="premium" type="number" value={formData.premium} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
              <Input id="expiryDate" name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} required />
            </div>
          </div>
           <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
               <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded-md bg-transparent dark:bg-slate-800">
                <option value="active">Activa</option><option value="pending">Pendiente</option><option value="expired">Vencida</option><option value="cancelled">Cancelada</option>
              </select>
            </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
            <Button type="submit">{t('common.save')}</Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PolicyForm;
