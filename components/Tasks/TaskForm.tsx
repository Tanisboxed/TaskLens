import { Task } from '@/interfaces/Task';
import { useState } from 'react';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, '_id'>) => void;
  initialData?: Task;
  onCancel: () => void;
}

export default function TaskForm({ onSubmit, initialData, onCancel }: TaskFormProps) {
    const [task, setTask] = useState<Omit<Task, '_id'>>({
      title: initialData?.title || '',
      priority: initialData?.priority || 'P0',
      type: initialData?.type || 'Planned',
      assigned_sp: initialData?.assigned_sp || 0,
      actual_sp: initialData?.actual_sp || 0,
      jira_ticket: initialData?.jira_ticket || '',
      due_date: initialData?.due_date || new Date(),
      comment: initialData?.comment || ''
    });
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(task);
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-lg space-y-6"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Priority
            </label>
            <select
              value={task.priority}
              onChange={(e) =>
                setTask({ ...task, priority: e.target.value as Task['priority'] })
              }
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              {['P0', 'P1', 'P2', 'P3', 'P4'].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600"
          >
            {initialData ? 'Update' : 'Create'} Task
          </button>
        </div>
      </form>
    );
  }
  