import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/dashboard.css'; 

import {
  faLightbulb,
  faPencilAlt,
  faQuestion,
  faGamepad,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';

import AIChatWindow from './common/AIChatWindow';
import SuggestionCard from './common/SuggestionCard';
import { generatePlan } from '../api/api';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState('qwen');
  const [error, setError] = useState('');

  useEffect(() => {
    // 初始化欢迎消息
    setMessages([
      {
        id: '1',
        content: '你好！我是你的AI创作助手。我可以帮助你：\n\n1. 激发游戏创意灵感\n2. 编写游戏策划文档\n3. 生成游戏素材\n4. 提供程序开发建议\n\n让我们开始创作吧！',
        isAI: true,
        timestamp: Date.now(),
        status: 'sent',
      },
    ]);
    setIsLoading(false);
  }, []);

  const suggestions = [
    {
      id: 'inspiration',
      title: '灵感激发',
      description: '探索创新游戏概念',
      icon: faLightbulb,
      prompt: '请给我一个有创意的游戏点子，包含游戏类型、核心玩法和目标受众。',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: 'writing',
      title: '快速写作',
      description: '生成专业策划文档',
      icon: faPencilAlt,
      prompt: '请帮我起草一份游戏策划案，包含游戏概述、玩法机制和关卡设计。',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      id: 'qa',
      title: '知识问答',
      description: '解答开发疑问',
      icon: faQuestion,
      prompt: '请解释一下游戏开发中的一些重要概念，比如游戏循环、状态管理等。',
      color: 'from-green-400 to-emerald-500',
    },
  ];

  const handleSendMessage = async ({ content, models, files }) => {
    // 添加用户消息
    const userMessage = {
      id: Date.now().toString(),
      content,
      isAI: false,
      timestamp: Date.now(),
      status: 'sent',
      files,
    };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);
    setError('');

    try {
      // 使用 generatePlan 作为通用聊天接口，传递正确的参数
      const response = await generatePlan(content, selectedModel);
      console.log('Received response from backend:', response);

      // 处理不同的响应格式
      let responseContent = '';
      if (response?.plan?.text) {
        responseContent = response.plan.text;
      } else if (response?.output?.text) {
        responseContent = response.output.text;
      } else if (response?.text) {
        responseContent = response.text;
      } else if (response?.content) {
        responseContent = response.content;
      } else if (typeof response === 'string') {
        responseContent = response;
      } else {
        responseContent = '无法获取响应内容';
      }

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        isAI: true,
        timestamp: Date.now(),
        status: 'sent',
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      setError(error.message || '获取回答时出现了错误');

      // 添加错误消息
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: '抱歉，获取回答时出现了错误。请稍后再试。',
        isAI: true,
        isError: true,
        timestamp: Date.now(),
        status: 'error',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage({ 
      content: suggestion.prompt, 
      models: [selectedModel],
      files: [] 
    });
  };

  const handleModelSelect = (model) => {
    console.log('Model selected:', model);
    setSelectedModel(model);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI游戏创作助手
          </h1>
          <p className="text-xl text-gray-600">
            让AI助你打造下一个精彩游戏
          </p>
        </div>

        {/* 建议卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {suggestions.map(suggestion => (
            <SuggestionCard
              key={suggestion.id}
              title={suggestion.title}
              description={suggestion.description}
              icon={suggestion.icon}
              onClick={() => handleSuggestionClick(suggestion)}
              color={suggestion.color}
            />
          ))}
        </div>

        {/* AI聊天窗口 */}
        <div className="max-w-5xl mx-auto">
          <AIChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            defaultModel={selectedModel}
            onModelSelect={handleModelSelect}
            className="min-h-[700px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
