import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatWindowProps {
  messages: Message[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-900 rounded-lg shadow-inner">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message.text}
          isUser={message.isUser}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
