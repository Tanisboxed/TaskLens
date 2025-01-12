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
    status: initialData?.status || 'Not Started',
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
      className="max-w-4xl w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-lg space-y-6 relative"
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Title */}
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

          {/* Priority */}
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

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Type
            </label>
            <select
              value={task.type}
              onChange={(e) =>
                setTask({ ...task, type: e.target.value as Task['type'] })
              }
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              {['Planned', 'ADHOC', 'On-going'].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <select
              value={task.status}
              onChange={(e) =>
                setTask({ ...task, status: e.target.value as Task['status'] })
              }
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              {['Not Started', 'In Progress', 'Completed'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Assigned Story Points */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Assigned Story Points
            </label>
            <input
              type="number"
              min="0"
              value={task.assigned_sp}
              onChange={(e) =>
                setTask({ ...task, assigned_sp: parseInt(e.target.value) || 0 })
              }
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Actual Story Points */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Actual Story Points
            </label>
            <input
              type="number"
              min="0"
              value={task.actual_sp}
              onChange={(e) =>
                setTask({ ...task, actual_sp: parseInt(e.target.value) || 0 })
              }
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* JIRA Ticket */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              JIRA Ticket
            </label>
            <input
              type="text"
              value={task.jira_ticket}
              onChange={(e) => setTask({ ...task, jira_ticket: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={new Date(task.due_date).toISOString().split('T')[0]}
              onChange={(e) =>
                setTask({ ...task, due_date: new Date(e.target.value) })
              }
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Comment
            </label>
            <textarea
              value={task.comment}
              onChange={(e) => setTask({ ...task, comment: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
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
  