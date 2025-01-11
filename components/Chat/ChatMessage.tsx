interface ChatMessageProps {
    message: string;
    isUser: boolean;
  }
  
  export default function ChatMessage({ message, isUser }: ChatMessageProps) {
    return (
      <div
        className={`flex ${
          isUser ? 'justify-end' : 'justify-start'
        } mb-4`}
      >
        <div
          className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-lg ${
            isUser
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
              : 'bg-gray-800 text-white'
          }`}
        >
          {message}
        </div>
      </div>
    );
  }
  