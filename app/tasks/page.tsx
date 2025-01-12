'use client';

import { useState, useEffect } from 'react';
import TaskTable from '@/components/Tasks/TaskTable';
import TaskForm from '@/components/Tasks/TaskForm';
import TaskCharts from '@/components/Tasks/TaskCharts';
import { Task } from '@/interfaces/Task';
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/data/tasks';
import Link from 'next/link';

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
      <header className="relative z-10 flex items-center justify-between w-full mb-8">
        <div className="flex items-center">
          <Link href="/" className="mr-2 text-white flex items-center">
            {/* Back Arrow Icon as SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Task Manager
          </h1>
        </div>
        <Link href="/chat" className="flex items-center bg-white rounded-full px-4 py-2 text-indigo-600 shadow-lg hover:bg-gray-200 transition">
          <div className="w-10 h-10 flex items-center justify-center">
            💬
          </div>
          <span className="ml-0.5">Go to Chat</span>
        </Link>
      </header>

      {/* Decorative Elements - Modified for subtlety */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full opacity-10 blur-3xl top-10 left-16 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full opacity-10 blur-3xl bottom-20 right-20 animate-pulse"></div>
      </div>

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
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
