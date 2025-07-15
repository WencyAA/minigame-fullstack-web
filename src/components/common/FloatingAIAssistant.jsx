import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRobot,
  faPaperPlane,
  faTimes,
  faMicrophone,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import ModelSelector from './ModelSelector';
import { generatePlan } from '../../api/api';

const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('qwen');
  const [error, setError] = useState('');
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // 初始欢迎消息
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: '你好！我是你的AI助手。有什么我可以帮你的吗？',
          isAI: true,
          timestamp: Date.now(),
        },
      ]);
    }
  }, []);

  // 自动滚动到最新消息
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 常用问题建议
  const suggestions = [
    {
      id: 'game-idea',
      text: '给我一个创新的游戏点子',
    },
    {
      id: 'mechanic',
      text: '推荐一个有趣的游戏机制',
    },
    {
      id: 'optimization',
      text: '如何优化游戏性能',
    },
  ];

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputText,
      isAI: false,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setError('');

    try {
      const response = await generatePlan(inputText, selectedModel);
      console.log('Received response from backend:', response);
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: response?.plan?.text || response?.output?.text || '无法获取响应内容',
        isAI: true,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError(error.message || '获取回答时出现了错误');
      
      // 添加错误提示消息
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: '抱歉，获取回答时出现了错误。请稍后再试。',
        isAI: true,
        isError: true,
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion.text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 right-6 z-50
          flex items-center justify-center
          w-16 h-16 rounded-full
          bg-gradient-to-r from-blue-500 to-indigo-600
          text-white shadow-lg
          transform transition-all duration-300
          hover:scale-110 hover:shadow-xl
          ${isOpen ? 'rotate-180' : ''}
        `}
      >
        <FontAwesomeIcon icon={faRobot} className="text-2xl" />
      </button>

      {/* 对话框 */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] bg-white rounded-2xl shadow-2xl">
          {/* 标题栏 */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faRobot} />
              <span className="font-medium">AI助手</span>
            </div>
            <ModelSelector
              onModelSelect={setSelectedModel}
              defaultModel={selectedModel}
            />
          </div>

          {/* 聊天记录 */}
          <div
            ref={chatContainerRef}
            className="h-[350px] overflow-y-auto p-4 space-y-4"
          >
            {/* 建议问题 */}
            {messages.length === 1 && (
              <div className="grid grid-cols-1 gap-2 mb-4">
                {suggestions.map(suggestion => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    {suggestion.text}
                  </button>
                ))}
              </div>
            )}

            {/* 消息列表 */}
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-2
                    ${message.isAI
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-500 text-white'
                    }
                    ${message.isError ? 'bg-red-100 text-red-600' : ''}
                  `}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {/* 加载指示器 */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 text-gray-500">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  <span className="ml-2">AI正在思考...</span>
                </div>
              </div>
            )}
          </div>

          {/* 输入区域 */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-end space-x-2">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入你的问题..."
                className="flex-1 max-h-[120px] min-h-[40px] p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="flex-shrink-0 p-2 rounded-xl bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIAssistant; 