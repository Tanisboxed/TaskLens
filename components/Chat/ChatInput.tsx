import { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-800 shadow-md rounded-t-lg flex justify-center"
    >
      <div className="relative w-full max-w-2xl flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about your tasks..."
          className="w-full px-6 py-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-0 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full text-white shadow-md hover:from-purple-700 hover:to-indigo-600 focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:opacity-50"
        >
          {isLoading ? '...' : '➤'}
        </button>
      </div>
    </form>
  );
}
