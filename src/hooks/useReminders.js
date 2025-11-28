import { useState, useCallback } from 'react';
import { 
  getReminders, 
  createReminder, 
  updateReminder 
} from '@/lib/asistente/reminders';

export function useReminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReminders = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getReminders(filters);
      setReminders(data || []);
      return data;
    } catch (err) {
      console.error('Error fetching reminders:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addReminder = useCallback(async (reminderData) => {
    try {
      setLoading(true);
      setError(null);
      const newReminder = await createReminder(reminderData);
      setReminders(prev => [...prev, newReminder]);
      return newReminder;
    } catch (err) {
      console.error('Error creating reminder:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const dismissReminder = useCallback(async (reminderId) => {
    try {
      setReminders(prev => prev.map(r => 
        r.id === reminderId ? { ...r, dismissed: true } : r
      ));
      await updateReminder(reminderId, { dismissed: true });
    } catch (err) {
      console.error('Error dismissing reminder:', err);
      setError(err.message);
      fetchReminders();
    }
  }, [fetchReminders]);

  return {
    reminders,
    loading,
    error,
    fetchReminders,
    addReminder,
    dismissReminder,
    setReminders
  };
}
