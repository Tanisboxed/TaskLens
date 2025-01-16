'use client';

import { useState, useEffect } from 'react';
import ChatWindow from '@/components/Chat/ChatWindow';
import ChatInput from '@/components/Chat/ChatInput';
import TaskForm from '@/components/Tasks/TaskForm';
import { Message } from '@/interfaces/Message';
import { Task } from '@/interfaces/Task';
import * as api from '@/lib/data';
import { createTask, updateTask, deleteTask } from '@/lib/data/tasks';
import Link from 'next/link';

const SUGGESTED_QUERIES = [
  "Which tasks are due today?",
  "Show tasks with priority P0",
  "How many tasks are completed?",
  "List all ongoing tasks",
  "Show tasks due this week"
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hello! I'm your task assistant. How can I help you today?",
    isUser: false
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    task: Task;
    pending: boolean;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleCreateTask = async (task: Omit<Task, '_id'>) => {
    try {
      await createTask(task);
      setShowForm(false);
      setMessages(prev => [...prev, {
        text: 'Task created successfully!',
        isUser: false
      }]);
    } catch (error) {
      console.error('Error creating task:', error);
      setMessages(prev => [...prev, {
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        isUser: false
      }]);
    }
  };

  const handleUpdateTask = async (id: string, task: Omit<Task, '_id'>) => {
    try {
      await updateTask(id, task);
      setShowForm(false);
      setEditingTask(null);
      setMessages(prev => [...prev, {
        text: 'Task updated successfully!',
        isUser: false
      }]);
    } catch (error) {
      console.error('Error updating task:', error);
      setMessages(prev => [...prev, {
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        isUser: false
      }]);
    }
  };

  const handleDeleteTask = async (task: Task) => {
    try {
      setDeleteConfirmation({ task, pending: true });
      await deleteTask(task._id!);
      setMessages(prev => [...prev, {
        text: 'Task deleted successfully!',
        isUser: false
      }]);
    } catch (error) {
      console.error('Error deleting task:', error);
      setMessages(prev => [...prev, {
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        isUser: false
      }]);
    } finally {
      setDeleteConfirmation(null);
    }
  };

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text: message, isUser: true }]);

    try {
      const { response } = await api.chatWithAssistant(message);
      
      if (response?.type === 'show_form') {
        if (response.action === 'create') {
          setShowForm(true);
          setEditingTask(null);
        } else if (response.action === 'edit') {
          if (response.data) {
            setShowForm(true);
            setEditingTask(response.data);
          } else {
            setMessages(prev => [...prev, {
              text: 'Task not found with the specified JIRA ticket.',
              isUser: false
            }]);
            return;
          }
        }
        setMessages(prev => [...prev, {
          text: 'Please fill in the task details in the form.',
          isUser: false
        }]);
      } else if (response?.type === 'confirm_delete') {
        setDeleteConfirmation({ task: response.data, pending: false });
      } else {
        setMessages(prev => [...prev, { 
          text: typeof response === 'string' ? response : JSON.stringify(response), 
          isUser: false 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
      {/* Decorative Elements - Modified for subtlety */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full opacity-10 blur-3xl top-10 left-16 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full opacity-10 blur-3xl bottom-20 right-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-700 to-indigo-600 shadow-md rounded-b-lg">
        <div className="flex items-center">
          <Link href="/" className="mr-2 text-white">
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
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
            Task Assistant
          </h1>
        </div>
        <Link href="/tasks" className="flex items-center bg-white rounded-full px-4 py-2 text-indigo-600 shadow-lg hover:bg-gray-200 transition">
          <div className="w-10 h-10 flex items-center justify-center">
            📋
          </div>
          <span className="ml-0.5">Go to Tasks</span>
        </Link>
      </header>

      {/* Suggested Queries */}
      <div className="z-10 px-6 py-4 flex flex-wrap gap-2">
        {SUGGESTED_QUERIES.map((query, index) => (
          <button
            key={index}
            onClick={() => handleSendMessage(query)}
            className="px-4 py-2 bg-purple-500/10 rounded-full text-sm text-purple-300 hover:bg-purple-500/20 transition-colors"
          >
            {query}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-grow z-10 p-6 flex flex-col gap-4">
        <ChatWindow messages={messages} />
      </div>

      {/* Chat Input */}
      <div className="sticky bottom-0 z-10 px-6 py-4 bg-gray-800/50 backdrop-blur-md shadow-lg rounded-t-lg border-t border-purple-500/20">
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>

      {/* Task Form Modal */}
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete task with JIRA ticket: {deleteConfirmation.task.jira_ticket}?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
                disabled={deleteConfirmation.pending}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTask(deleteConfirmation.task)}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                disabled={deleteConfirmation.pending}
              >
                {deleteConfirmation.pending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
