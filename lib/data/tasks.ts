import { Task } from '../../interfaces/Task';
import { API_BASE_URL } from './config';

export async function getTasks(filters?: { priority?: string; type?: string }) {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_BASE_URL}/tasks${queryParams ? `?${queryParams}` : ''}`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
}

export async function createTask(task: Omit<Task, '_id'>) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

export async function updateTask(id: string, task: Partial<Task>) {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
}

export async function deleteTask(id: string) {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return response.status === 204 ? null : response.json();
} 