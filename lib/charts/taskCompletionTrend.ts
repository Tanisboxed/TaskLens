import { Task } from '@/interfaces/Task';
import { format } from 'date-fns';

interface CompletionTrend {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    tension: number;
  }[];
}

export function getTaskCompletionTrend(tasks: Task[]): CompletionTrend {
  // Filter completed tasks first
  const completedTasks = tasks.filter(task => task.status === 'Completed');
  
  if (completedTasks.length === 0) {
    return {
      labels: [],
      datasets: [{
        label: 'Completed Tasks',
        data: [],
        borderColor: '#8b5cf6',
        tension: 0.4,
      }]
    };
  }

  // Group tasks by due date
  const tasksByDate: { [key: string]: number } = {};
  
  completedTasks.forEach(task => {
    const dateKey = new Date(task.due_date).toISOString().split('T')[0];
    tasksByDate[dateKey] = (tasksByDate[dateKey] || 0) + 1;
  });

  // Sort dates
  const sortedDates = Object.keys(tasksByDate).sort();

  return {
    labels: sortedDates.map(date => format(new Date(date), 'MMM dd')),
    datasets: [
      {
        label: 'Completed Tasks',
        data: sortedDates.map(date => tasksByDate[date]),
        borderColor: '#8b5cf6',
        tension: 0.4,
      },
    ],
  };
} 