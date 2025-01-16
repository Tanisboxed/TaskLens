import { useState, KeyboardEvent, useEffect, useRef } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 150); // Max height of 150px
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      }
      
      e.preventDefault();
      if (message.trim() && !isLoading) {
        onSend(message.trim());
        setMessage('');
      }
    }
  };

  return (
    <div className="relative flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message... (Shift + Enter for new line)"
        className="flex-1 bg-gray-800/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 resize-none min-h-[50px] overflow-y-auto"
        style={{ maxHeight: '150px' }}
      />
      <button
        onClick={() => {
          if (message.trim() && !isLoading) {
            onSend(message.trim());
            setMessage('');
          }
        }}
        disabled={!message.trim() || isLoading}
        className="px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-indigo-600 transition-colors"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          'Send'
        )}
      </button>
    </div>
  );
}
