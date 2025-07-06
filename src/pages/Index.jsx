import { useState } from 'react';
import { SendIcon, BotIcon, UserIcon, LoaderIcon, UploadIcon } from 'lucide-react';
import ChatMessage from '@/components/ChatMessage';
import useChat from '@/hooks/useChat';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UploadForm from './UploadPage';

const Index = () => {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useChat();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 标题区域 - 调整为更高级的配色 */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-gray-700 p-2 rounded-full mr-3">
            <BotIcon className="h-8 w-8 text-gray-200" />
          </div>
          <h1 className="text-2xl font-bold text-gray-100">AI对话助手</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all">
              <UploadIcon className="h-5 w-5 mr-2" />上传知识库
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>上传知识库文件</DialogTitle>
            </DialogHeader>
            <UploadForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </header>

      {/* 消息区域 - 替换为简约纹理背景 */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          backgroundImage: "url('https://nocode.meituan.com/photo/search?keyword=minimalist%20texture,abstract%20pattern&width=1200&height=800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(245, 245, 245, 0.9)"
        }}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-4 rounded-2xl shadow-lg mb-6">
              <BotIcon className="h-16 w-16 text-gray-200 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              欢迎使用AI对话助手
            </h2>
            <p className="text-gray-700 max-w-md bg-white/90 p-4 rounded-xl shadow-sm">
              输入您的问题，我将尽力为您解答。支持多轮对话，点击下方输入框开始交流。
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message} 
            isLast={index === messages.length - 1 && isLoading}
          />
        ))}
      </div>

      {/* 输入区域 - 调整为更高级的配色 */}
      <form 
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-gray-100 to-gray-200 border-t border-gray-300 p-4 flex items-center shadow-inner"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入您的问题..."
            className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white shadow-sm"
            disabled={isLoading}
          />
          {isLoading && (
            <LoaderIcon className="absolute right-3 top-3.5 h-5 w-5 text-gray-500 animate-spin" />
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || input.trim() === ''}
          className="ml-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-gray-100 rounded-xl p-3 disabled:opacity-50 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default Index;
