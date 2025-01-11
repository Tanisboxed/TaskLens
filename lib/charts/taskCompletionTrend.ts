import { Task } from '@/interfaces/Task';
import { format, startOfWeek, addWeeks, isWithinInterval } from 'date-fns';

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
  // Sort tasks by due date
  const sortedTasks = [...tasks].sort((a, b) => 
    new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  );

  // Get start and end dates
  const firstDate = new Date(sortedTasks[0]?.due_date || new Date());
  const lastDate = new Date(sortedTasks[sortedTasks.length - 1]?.due_date || new Date());
  
  // Create weekly intervals
  const weeks: Date[] = [];
  let currentWeek = startOfWeek(firstDate);
  
  while (currentWeek <= lastDate) {
    weeks.push(currentWeek);
    currentWeek = addWeeks(currentWeek, 1);
  }

  // Count completed tasks per week
  const completedTasksPerWeek = weeks.map((weekStart, index) => {
    const weekEnd = addWeeks(weekStart, 1);
    return tasks.filter(task => 
      task.status === 'Completed' && 
      isWithinInterval(new Date(task.due_date), { start: weekStart, end: weekEnd })
    ).length;
  });

  return {
    labels: weeks.map(date => format(date, 'MMM dd')),
    datasets: [
      {
        label: 'Completed Tasks',
        data: completedTasksPerWeek,
        borderColor: '#8b5cf6', // purple
        tension: 0.4, // Adds curve to the line
      },
    ],
  };
} 