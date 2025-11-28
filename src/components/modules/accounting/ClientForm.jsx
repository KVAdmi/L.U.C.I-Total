
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

const ClientForm = ({ isOpen, onClose, onSave, client }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '', rfc: '', regime: 'General de Ley', status: 'active', contact: ''
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        rfc: client.rfc || '',
        regime: client.regime || 'General de Ley',
        status: client.status || 'active',
        contact: client.contact || '',
      });
    } else {
      setFormData({
        name: '', rfc: '', regime: 'General de Ley', status: 'active', contact: ''
      });
    }
  }, [client, isOpen]);

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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-semibold">{client ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full"><X className="w-5 h-5" /></Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Razón Social</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rfc">RFC</Label>
            <Input id="rfc" name="rfc" value={formData.rfc} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="regime">Régimen Fiscal</Label>
              <select id="regime" name="regime" value={formData.regime} onChange={handleChange} className="w-full p-2 border rounded-md bg-transparent dark:bg-slate-800">
                <option>General de Ley</option><option>Personas Físicas</option><option>RESICO</option><option>Otro</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded-md bg-transparent dark:bg-slate-800">
                <option value="active">Activo</option><option value="review">En Revisión</option><option value="inactive">Inactivo</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Persona de Contacto</Label>
            <Input id="contact" name="contact" value={formData.contact} onChange={handleChange} />
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

export default ClientForm;
