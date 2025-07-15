// src/components/AssetsModule.jsx

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faCube,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';

import '../styles/assetsModule.css';
import AIChatWindow from './common/AIChatWindow';
import { generateAssets } from '../api/api';

const AssetsModule = () => {
  const [selectedModel, setSelectedModel] = useState('qwen');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('2d');

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
        modelData: message.content,
        selectedModel: selectedModel
      });

      const response = await generateAssets(message.content, selectedModel);
      console.log('Received response from backend:', response);

      // 处理包含图片的响应数据
      const aiMessage = {
        id: Date.now() + 1,
        content: response?.assets?.text || response?.output?.text || response?.text || '无法获取响应内容',
        isAI: true,
        imageUrl: response?.assets?.imageUrl || response?.imageUrl || null,
        hasImage: response?.assets?.hasImage || response?.hasImage || false
      };

      console.log('AI message with image data:', {
        hasImage: aiMessage.hasImage,
        imageUrl: aiMessage.imageUrl ? 'Image URL present' : 'No image URL'
      });

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

  // 资源分类标签
  const resourceTabs = [
    { id: '2d', label: '2D图像资源', active: true },
    { id: '3d', label: '3D模型资源', active: false },
    { id: 'audio', label: '音频资源', active: false }
  ];

  // 功能卡片数据
  const functionCards = [
    {
      id: 'character',
      title: '角色设计',
      description: '生成游戏角色、NPC、怪物等',
      icon: faImage,
      color: 'bg-pink-500'
    },
    {
      id: 'scene',
      title: '场景设计',
      description: '生成游戏场景、地图、草图等',
      icon: faImage,
      color: 'bg-pink-500'
    },
    {
      id: 'ui',
      title: 'UI设计',
      description: '生成游戏界面、图标、按钮等',
      icon: faImage,
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
        {/* 顶部资源分类标签区域 */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
            {resourceTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 功能入口区域（卡片模块） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {functionCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className={`w-16 h-16 mx-auto mb-4 ${card.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <FontAwesomeIcon icon={card.icon} size="lg" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          ))}
        </div>

        {/* 聊天生成区域 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <AIChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            defaultModel={selectedModel}
            onModelSelect={handleModelSelect}
            placeholder="描述你想要生成的图像资产..."
            className="h-[700px]"
            pageType="assets"
          />
        </div>
      </div>
    </div>
  );
};

export default AssetsModule;
