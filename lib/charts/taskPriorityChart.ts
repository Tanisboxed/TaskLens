import { Task } from '@/interfaces/Task';

interface PriorityDistribution {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

export function getTaskPriorityDistribution(tasks: Task[]): PriorityDistribution {
  const priorityCount: { [key: string]: number } = {
    P0: 0,
    P1: 0,
    P2: 0,
    P3: 0,
    P4: 0
  };
  
  // Count tasks by priority
  tasks.forEach(task => {
    if (task.priority) {
      priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
    }
  });

  return {
    labels: Object.keys(priorityCount),
    datasets: [{
      label: 'Tasks by Priority',
      data: Object.values(priorityCount),
      backgroundColor: [
        '#ef4444', // red for P0
        '#f97316', // orange for P1
        '#f59e0b', // amber for P2
        '#84cc16', // lime for P3
        '#22c55e', // green for P4
      ],
    }]
  };
} 