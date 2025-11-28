import { useState, useCallback } from 'react';
import { 
  getAppointments, 
  createAppointment, 
  deleteAppointment 
} from '@/lib/asistente/appointments';

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAppointments(filters);
      setAppointments(data || []);
      return data;
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addAppointment = useCallback(async (appointmentData) => {
    try {
      setLoading(true);
      setError(null);
      const newAppt = await createAppointment(appointmentData);
      setAppointments(prev => [...prev, newAppt]);
      return newAppt;
    } catch (err) {
      console.error('Error creating appointment:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAppointment = useCallback(async (appointmentId) => {
    try {
      setLoading(true);
      setError(null);
      await deleteAppointment(appointmentId);
      setAppointments(prev => prev.filter(a => a.id !== appointmentId));
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    addAppointment,
    removeAppointment,
    setAppointments
  };
}
