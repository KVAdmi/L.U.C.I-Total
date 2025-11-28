
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

const PatientForm = ({ isOpen, onClose, onSave, patient }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'M',
    bloodType: '',
    allergies: '',
    diagnosis: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        age: patient.age || '',
        gender: patient.gender || 'M',
        bloodType: patient.bloodType || '',
        allergies: Array.isArray(patient.allergies) ? patient.allergies.join(', ') : '',
        diagnosis: patient.diagnosis || '',
      });
    } else {
      setFormData({
        name: '', age: '', gender: 'M', bloodType: '', allergies: '', diagnosis: '',
      });
    }
  }, [patient, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      age: parseInt(formData.age, 10),
      allergies: formData.allergies.split(',').map(s => s.trim()).filter(Boolean),
    };
    onSave(dataToSave);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-semibold">{patient ? 'Editar Paciente' : 'Nuevo Paciente'}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Edad</Label>
              <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Género</Label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded-md bg-transparent dark:bg-slate-800">
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bloodType">Tipo de Sangre</Label>
            <Input id="bloodType" name="bloodType" value={formData.bloodType} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="allergies">Alergias (separadas por coma)</Label>
            <Input id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnóstico Principal</Label>
            <Input id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} />
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

export default PatientForm;
