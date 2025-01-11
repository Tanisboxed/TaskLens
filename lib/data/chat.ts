import { API_BASE_URL } from './config';

export async function chatWithAssistant(message: string) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to get chat response');
  }

  return data;
} 