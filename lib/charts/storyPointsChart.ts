import { Task } from '@/interfaces/Task';

interface StoryPointsComparison {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export function getStoryPointsComparison(tasks: Task[]): StoryPointsComparison {
  // Filter out tasks without story points and sort by title
  const tasksWithPoints = tasks
    .filter(task => task.assigned_sp || task.actual_sp)
    .sort((a, b) => a.title.localeCompare(b.title));

  return {
    labels: tasksWithPoints.map(task => task.title),
    datasets: [
      {
        label: 'Assigned SP',
        data: tasksWithPoints.map(task => task.assigned_sp || 0),
        backgroundColor: '#8b5cf6', // purple
      },
      {
        label: 'Actual SP',
        data: tasksWithPoints.map(task => task.actual_sp || 0),
        backgroundColor: '#6366f1', // indigo
      },
    ],
  };
} 