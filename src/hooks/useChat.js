import {useState} from 'react';
import {API_BASE_URL, API_ENDPOINTS, DEFAULT_MODEL} from '@/config/api';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content) => {
    // 添加用户消息
    const userMessage = {
      role: 'user',
      content: content
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 使用配置中的 API 地址和端点
      const url = `${API_BASE_URL}${API_ENDPOINTS.GENERATE}?model=${DEFAULT_MODEL}&message=${encodeURIComponent(content)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('网络请求失败');
      }

      const data = await response.json();

      // 根据 Spring AI ChatResponse 格式解析响应
      const botMessage = {
        role: 'assistant',
        content: data.result?.output?.content || data.choices?.[0]?.message?.content || '抱歉，无法获取回复'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('发送消息失败:', error);

      // 添加错误提示给用户
      const errorMessage = {
        role: 'assistant',
        content: '抱歉，发送消息失败，请稍后重试。'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
};

export default useChat;
