'use client';

import { Task } from '@/interfaces/Task';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { 
  getTaskPriorityDistribution,
  getStoryPointsComparison,
  getTaskCompletionTrend 
} from '@/lib/charts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface TaskChartsProps {
  tasks: Task[];
}

export default function TaskCharts({ tasks }: TaskChartsProps) {
  const priorityData = getTaskPriorityDistribution(tasks);
  const storyPointsData = getStoryPointsComparison(tasks);
  const completionTrendData = getTaskCompletionTrend(tasks);

  return (
    <div className="flex flex-col gap-8">
      {/* Priority Distribution Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Task Priority Distribution</h3>
        <div className="h-[400px]">
          <Pie data={priorityData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Story Points Comparison Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Story Points Comparison</h3>
        <div className="h-[400px]">
          <Bar data={storyPointsData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Completion Trend Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Task Completion Trend</h3>
        <div className="h-[400px]">
          <Line data={completionTrendData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
} 