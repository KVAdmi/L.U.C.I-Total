import { useState, useCallback } from 'react';
import { 
  getTasks, 
  createTask, 
  updateTask 
} from '@/lib/asistente/organization';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks(filters);
      setTasks(data || []);
      return data;
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (taskData) => {
    try {
      setLoading(true);
      setError(null);
      const newTask = await createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleTask = useCallback(async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, status: newStatus } : t
      ));

      await updateTask(taskId, { status: newStatus });
    } catch (err) {
      console.error('Error toggling task:', err);
      setError(err.message);
      // Revertir en caso de error
      fetchTasks();
    }
  }, [tasks, fetchTasks]);

  const updateTaskData = useCallback(async (taskId, updates) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await updateTask(taskId, updates);
      setTasks(prev => prev.map(t => t.id === taskId ? updated : t));
      return updated;
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    toggleTask,
    updateTaskData,
    setTasks
  };
}
