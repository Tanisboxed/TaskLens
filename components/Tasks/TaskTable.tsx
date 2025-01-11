import { Task } from '@/interfaces/Task';
import { format } from 'date-fns';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
    return (
      <div className="overflow-x-auto rounded-lg shadow-lg bg-gradient-to-br from-gray-800 to-gray-900">
        <table className="min-w-full table-auto text-sm text-white">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-left text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Assigned SP</th>
              <th className="px-6 py-3">Actual SP</th>
              <th className="px-6 py-3">Jira Ticket</th>
              <th className="px-6 py-3">Due Date</th>
              <th className="px-6 py-3">Comment</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr
                key={task._id}
                className={`border-b ${
                  idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                } hover:bg-gray-600`}
              >
                <td className="px-6 py-4">{task.title}</td>
                <td className="px-6 py-4">{task.priority}</td>
                <td className="px-6 py-4">{task.type}</td>
                <td className="px-6 py-4">{task.status}</td>
                <td className="px-6 py-4">{task.assigned_sp}</td>
                <td className="px-6 py-4">{task.actual_sp}</td>
                <td className="px-6 py-4">{task.jira_ticket}</td>
                <td className="px-6 py-4">
                  {format(new Date(task.due_date), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4">{task.comment}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onEdit(task)}
                    className="px-3 py-1 bg-indigo-500 rounded-md text-white hover:bg-indigo-400 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task._id!)}
                    className="px-3 py-1 bg-red-500 rounded-md text-white hover:bg-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  