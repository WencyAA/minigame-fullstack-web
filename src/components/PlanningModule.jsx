import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faLightbulb,
  faGamepad,
  faUsers,
  faChartLine,
  faExclamationCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import ModelSelector from './common/ModelSelector';
import Button from './common/Button';
import AIChatWindow from './common/AIChatWindow';
import { generatePlan } from '../api/api';

const PlanningModule = () => {
  const [selectedModel, setSelectedModel] = useState('qwen');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessage = async (message) => {
    try {
      setIsLoading(true);
      setError('');

      // 添加用户消息到消息列表
      const userMessage = {
        id: Date.now(),
        content: message.content,
        isAI: false
      };
      setMessages(prev => [...prev, userMessage]);

      // 调用 API
      console.log('Sending request to backend:', {
        taskDescription: message.content,
        selectedModel: selectedModel
      });

      const response = await generatePlan(message.content, selectedModel);
      console.log('Received response from backend:', response);

      // 确保从后端响应中获取到正确的数据
      const aiMessage = {
        id: Date.now() + 1,
        content: response?.plan?.text || response?.output?.text || '无法获取响应内容',
        isAI: true
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setError(error.message || '发送消息时出错');
      
      // 添加错误消息到消息列表
      const errorMessage = {
        id: Date.now() + 1,
        content: '抱歉，发生了错误。请稍后重试。',
        isAI: true,
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelSelect = (model) => {
    console.log('Model selected:', model);
    setSelectedModel(model);
  };

  const suggestions = [
    {
      icon: faGamepad,
      title: '游戏类型',
      text: '动作、冒险、策略、角色扮演等',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: faUsers,
      title: '目标受众',
      text: '年龄段、兴趣爱好、游戏习惯',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: faLightbulb,
      title: '核心玩法',
      text: '主要游戏机制、玩家体验目标',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: faChartLine,
      title: '变现方式',
      text: '商业模式、收入来源设计',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 游戏策划助手
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            通过 AI 技术，快速生成专业的游戏策划方案，助你将创意转化为现实
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Chat Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-soft-lg p-6 animate-slideIn">
            <AIChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              defaultModel={selectedModel}
              onModelSelect={handleModelSelect}
              placeholder="描述你的游戏创意..."
              className="h-[700px]"
            />
          </div>

          {/* Suggestions Section */}
          <div className="bg-white rounded-2xl shadow-soft-lg p-6 animate-slideIn">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">创意参考</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white border border-gray-100 shadow-soft-sm hover:shadow-soft transition-all duration-200"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${suggestion.color} flex items-center justify-center text-white shadow-sm mb-3`}>
                    <FontAwesomeIcon icon={suggestion.icon} />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{suggestion.title}</h3>
                  <p className="text-sm text-gray-500">{suggestion.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningModule;
