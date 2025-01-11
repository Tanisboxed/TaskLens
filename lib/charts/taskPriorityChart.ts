import { Task } from '@/interfaces/Task';

interface PriorityDistribution {
  labels: string[];
  data: number[];
  backgroundColor: string[];
}

export function getTaskPriorityDistribution(tasks: Task[]): PriorityDistribution {
  const priorityCount: { [key: string]: number } = {};
  
  // Count tasks by priority
  tasks.forEach(task => {
    if (task.priority) {
      priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
    }
  });

  // Define colors for different priorities
  const colorMap: { [key: string]: string } = {
    High: '#ef4444',    // red
    Medium: '#f59e0b',  // amber
    Low: '#10b981',     // green
  };

  return {
    labels: Object.keys(priorityCount),
    data: Object.values(priorityCount),
    backgroundColor: Object.keys(priorityCount).map(priority => colorMap[priority] || '#6366f1'),
  };
} 