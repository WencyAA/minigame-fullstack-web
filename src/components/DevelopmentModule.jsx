// 程序开发模块组件
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faGamepad,
  faUser,
  faLayerGroup,
  faDesktop,
  faTools,
  faCogs,
  faDatabase,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';

import AIChatWindow from './common/AIChatWindow';
import { startDevelopment } from '../api/api';

const DevelopmentModule = () => {
  const [selectedModel, setSelectedModel] = useState('qwen');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeModule, setActiveModule] = useState('core');
  const [selectedEngine, setSelectedEngine] = useState('unity');

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
        taskData: message.content,
        selectedModel: selectedModel
      });

      const response = await startDevelopment(message.content, selectedModel);
      console.log('Received response from backend:', response);

      // 确保从后端响应中获取到正确的数据
      const aiMessage = {
        id: Date.now() + 1,
        content: response?.development?.text || response?.output?.text || '无法获取响应内容',
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

  // 引擎选择数据
  const engines = [
    { id: 'unity', label: 'Unity', icon: faGamepad, color: 'from-blue-500 to-blue-700' },
    { id: 'unreal', label: 'Unreal Engine', icon: faCode, color: 'from-purple-500 to-purple-700' }
  ];

  // 系统模块Tab区域
  const systemModules = [
    { id: 'core', label: '核心框架', active: true },
    { id: 'character', label: '角色系统', active: false },
    { id: 'gameplay', label: '游戏玩法', active: false },
    { id: 'ui', label: 'UI系统', active: false },
    { id: 'scene', label: '场景管理', active: false },
    { id: 'tools', label: '工具开发', active: false }
  ];

  // 子功能模块数据 - 根据当前选择的模块动态显示
  const getSubModules = () => {
    switch (activeModule) {
      case 'core':
        return [
          {
            id: 'manager',
            title: '游戏管理器',
            description: '设计游戏主循环和状态管理',
            icon: faCogs,
            color: 'from-blue-500 to-blue-600'
          },
          {
            id: 'data',
            title: '数据系统',
            description: '游戏数据存储结构管理',
            icon: faDatabase,
            color: 'from-green-500 to-green-600'
          },
          {
            id: 'event',
            title: '事件系统',
            description: '游戏事件处理和消息传递',
            icon: faBolt,
            color: 'from-yellow-500 to-yellow-600'
          }
        ];
      case 'character':
        return [
          {
            id: 'controller',
            title: '角色控制器',
            description: '实现角色移动和输入处理',
            icon: faUser,
            color: 'from-purple-500 to-purple-600'
          },
          {
            id: 'stats',
            title: '角色属性',
            description: '角色状态和属性系统',
            icon: faLayerGroup,
            color: 'from-indigo-500 to-indigo-600'
          },
          {
            id: 'animation',
            title: '动画系统',
            description: '角色动画状态管理',
            icon: faGamepad,
            color: 'from-pink-500 to-pink-600'
          }
        ];
      case 'gameplay':
        return [
          {
            id: 'combat',
            title: '战斗系统',
            description: '实现战斗机制和伤害计算',
            icon: faCode,
            color: 'from-red-500 to-red-600'
          },
          {
            id: 'inventory',
            title: '物品系统',
            description: '背包和物品管理',
            icon: faLayerGroup,
            color: 'from-orange-500 to-orange-600'
          },
          {
            id: 'quest',
            title: '任务系统',
            description: '任务逻辑和进度追踪',
            icon: faTools,
            color: 'from-teal-500 to-teal-600'
          }
        ];
      case 'ui':
        return [
          {
            id: 'interface',
            title: 'UI界面',
            description: '用户界面设计和交互',
            icon: faDesktop,
            color: 'from-cyan-500 to-cyan-600'
          },
          {
            id: 'hud',
            title: 'HUD系统',
            description: '游戏内显示界面',
            icon: faLayerGroup,
            color: 'from-blue-500 to-blue-600'
          },
          {
            id: 'menu',
            title: '菜单系统',
            description: '游戏菜单和导航',
            icon: faTools,
            color: 'from-gray-500 to-gray-600'
          }
        ];
      case 'scene':
        return [
          {
            id: 'loader',
            title: '场景加载',
            description: '场景切换和资源管理',
            icon: faLayerGroup,
            color: 'from-emerald-500 to-emerald-600'
          },
          {
            id: 'environment',
            title: '环境系统',
            description: '环境交互和物理',
            icon: faGamepad,
            color: 'from-lime-500 to-lime-600'
          },
          {
            id: 'camera',
            title: '摄像机系统',
            description: '视角控制和跟随',
            icon: faDesktop,
            color: 'from-violet-500 to-violet-600'
          }
        ];
      case 'tools':
        return [
          {
            id: 'editor',
            title: '编辑器工具',
            description: '关卡编辑和调试工具',
            icon: faTools,
            color: 'from-amber-500 to-amber-600'
          },
          {
            id: 'debug',
            title: '调试系统',
            description: '性能监控和错误追踪',
            icon: faCogs,
            color: 'from-rose-500 to-rose-600'
          },
          {
            id: 'build',
            title: '构建系统',
            description: '项目打包和发布',
            icon: faCode,
            color: 'from-slate-500 to-slate-600'
          }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* 页面标题 */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 程序草案助手
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            生成游戏程序架构草案，侧重于游戏主逻辑系统的生成与搭建
          </p>
        </div>

        {/* 引擎选择区域 */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 bg-white rounded-xl p-2 shadow-lg">
            {engines.map((engine) => (
              <button
                key={engine.id}
                onClick={() => setSelectedEngine(engine.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg transition-all duration-200 ${
                  selectedEngine === engine.id
                    ? `bg-gradient-to-r ${engine.color} text-white shadow-lg transform scale-105`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FontAwesomeIcon icon={engine.icon} className="text-lg" />
                <span className="font-medium">{engine.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 系统模块Tab区域 */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-2 bg-white rounded-xl p-2 shadow-lg">
            {systemModules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeModule === module.id
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {module.label}
              </button>
            ))}
          </div>
        </div>

        {/* 子功能模块区域（卡片模块） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {getSubModules().map((module) => (
            <div
              key={module.id}
              className="group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                <FontAwesomeIcon icon={module.icon} size="lg" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{module.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
            </div>
          ))}
        </div>

        {/* 聊天生成区域 */}
        <div className="bg-white rounded-2xl shadow-xl animate-slideIn p-6">
          <AIChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            defaultModel={selectedModel}
            onModelSelect={handleModelSelect}
            placeholder={`描述你需要的${systemModules.find(m => m.id === activeModule)?.label}功能...`}
            className="h-[700px]"
          />
        </div>
      </div>
    </div>
  );
};

export default DevelopmentModule;