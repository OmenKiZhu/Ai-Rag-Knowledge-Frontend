import { BotIcon, UserIcon } from 'lucide-react';

const ChatMessage = ({ message, isLast }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="flex items-start max-w-[85%]">
        {!isUser && (
          <div className="mr-2 mt-1 flex-shrink-0">
            <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-2 rounded-full shadow-md">
              <BotIcon className="h-5 w-5 text-gray-200" />
            </div>
          </div>
        )}
        
        <div 
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser 
              ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-br-none' 
              : 'bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-bl-none shadow'
          }`}
        >
          <div className="flex items-center mb-1">
            <span className={`font-medium text-sm ${isUser ? 'text-gray-300' : 'text-gray-700'}`}>
              {isUser ? '您' : 'AI助手'}
            </span>
          </div>
          
          <div className={`${isLast && !isUser ? 'text-gray-600' : isUser ? 'text-gray-200' : 'text-gray-700'}`}>
            {message.content || (isLast ? '思考中...' : '')}
          </div>
        </div>
        
        {isUser && (
          <div className="ml-2 mt-1 flex-shrink-0">
            <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-2 rounded-full shadow-md">
              <UserIcon className="h-5 w-5 text-gray-200" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
