import { useState, useEffect } from 'react';
import { getAppointments } from '@/lib/asistente/appointments';
import { getTasks } from '@/lib/asistente/organization';
import { getReminders } from '@/lib/asistente/reminders';

export function useDashboardData() {
  const [appointments, setAppointments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Obtener datos en paralelo
      const [appointmentsData, tasksData, remindersData] = await Promise.all([
        getAppointments({ 
          startDate: today.toISOString(),
          endDate: tomorrow.toISOString()
        }),
        getTasks({ status: ['pending', 'in_progress'], limit: 20 }),
        getReminders({ active: true, limit: 10 })
      ]);

      setAppointments(appointmentsData || []);
      setTasks(tasksData || []);
      setReminders(remindersData || []);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshData = () => {
    loadData();
  };

  return {
    appointments,
    tasks,
    reminders,
    loading,
    error,
    refreshData,
    setTasks,
    setAppointments,
    setReminders
  };
}
