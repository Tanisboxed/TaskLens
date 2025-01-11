'use client';

import { useState } from 'react';
import ChatWindow from '@/components/Chat/ChatWindow';
import ChatInput from '@/components/Chat/ChatInput';
import { api } from '@/lib/api';

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: message, isUser: true }]);

    try {
      const { response } = await api.chatWithAssistant(message);
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
      {/* Decorative Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-purple-500 rounded-full opacity-30 blur-3xl top-10 left-16 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl bottom-20 right-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-700 to-indigo-600 shadow-md rounded-b-lg">
        <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
          Chat with Assistant
        </h1>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-lg">
          💬
        </div>
      </header>

      {/* Chat Window */}
      <div className="flex-grow z-10 p-6 flex flex-col gap-4">
        <ChatWindow messages={messages} />
      </div>

      {/* Chat Input */}
      <div className="z-10 px-6 py-4 bg-gray-800 shadow-lg rounded-t-lg">
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
