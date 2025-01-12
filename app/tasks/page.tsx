'use client';

import { useState, useEffect } from 'react';
import TaskTable from '@/components/Tasks/TaskTable';
import TaskForm from '@/components/Tasks/TaskForm';
import TaskCharts from '@/components/Tasks/TaskCharts';
import { Task } from '@/interfaces/Task';
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/data/tasks';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (task: Omit<Task, '_id'>) => {
    try {
      await createTask(task);
      await fetchTasks();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (id: string, task: Omit<Task, '_id'>) => {
    try {
      await updateTask(id, task);
      await fetchTasks();
      setShowForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center p-8">
      {/* Decorative Elements - Modified for subtlety */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full opacity-10 blur-3xl top-10 left-16 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full opacity-10 blur-3xl bottom-20 right-20 animate-pulse"></div>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-8">
        Task Manager
      </h1>

      {/* Create Task Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 px-6 py-3 rounded-full bg-purple-600 text-white font-bold shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
        >
          Create Task
        </button>
      )}

      {/* Task Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <TaskForm
            onSubmit={async (task) => {
              if (editingTask) {
                await handleUpdateTask(editingTask._id!, task);
              } else {
                await handleCreateTask(task);
              }
            }}
            initialData={editingTask}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        </div>
      )}

      {/* Task Table */}
      <div className="w-full mt-8">
        <TaskTable
          key={tasks.length}
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>

      {/* Charts Stack */}
      <div className="w-full mt-8 space-y-8">
        <TaskCharts 
          key={tasks.length}
          tasks={tasks} 
        />
      </div>
    </div>
  );
}