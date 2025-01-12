import ReactMarkdown from 'react-markdown';

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
        {isUser ? (
          message
        ) : (
          <ReactMarkdown
            className="prose prose-invert prose-sm max-w-none"
            components={{
              // Style markdown elements
              p: ({ children }) => <p className="mb-2">{children}</p>,
              ul: ({ children }) => <ul className="mb-2 list-disc pl-4">{children}</ul>,
              ol: ({ children }) => <ol className="mb-2 list-decimal pl-4">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              strong: ({ children }) => <strong className="text-purple-300">{children}</strong>,
              h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-bold mb-2">{children}</h3>,
            }}
          >
            {message}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
  