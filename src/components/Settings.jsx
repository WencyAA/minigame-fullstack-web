// src/components/Settings.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faKey,
  faPalette,
  faLanguage,
  faServer,
  faToggleOn,
  faToggleOff,
  faCheck,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import Button from './common/Button';

const Settings = () => {
  const [settings, setSettings] = useState({
    apiKeys: {
      qwen: '',
      hunyuan: '',
      deepseek: '',
    },
    theme: 'light',
    language: 'zh',
    serverUrl: 'http://localhost:3000',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // TODO: 实现保存设置的逻辑
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟 API 调用
      setSuccess('设置已成功保存');
    } catch (err) {
      setError('保存设置时出错');
    } finally {
      setIsLoading(false);
    }
  };

  const settingSections = [
    {
      id: 'api',
      title: 'API 设置',
      icon: faKey,
      description: '配置各个 AI 模型的 API 密钥',
      fields: [
        {
          id: 'qwen',
          label: '通义千问 API Key',
          type: 'password',
          value: settings.apiKeys.qwen,
          onChange: (value) => setSettings({
            ...settings,
            apiKeys: { ...settings.apiKeys, qwen: value },
          }),
        },
        {
          id: 'hunyuan',
          label: '腾讯混元 API Key',
          type: 'password',
          value: settings.apiKeys.hunyuan,
          onChange: (value) => setSettings({
            ...settings,
            apiKeys: { ...settings.apiKeys, hunyuan: value },
          }),
        },
        {
          id: 'deepseek',
          label: 'DeepSeek API Key',
          type: 'password',
          value: settings.apiKeys.deepseek,
          onChange: (value) => setSettings({
            ...settings,
            apiKeys: { ...settings.apiKeys, deepseek: value },
          }),
        },
      ],
    },
    {
      id: 'appearance',
      title: '外观设置',
      icon: faPalette,
      description: '自定义界面主题和样式',
      fields: [
        {
          id: 'theme',
          label: '主题模式',
          type: 'toggle',
          value: settings.theme === 'dark',
          onChange: (value) => setSettings({
            ...settings,
            theme: value ? 'dark' : 'light',
          }),
        },
      ],
    },
    {
      id: 'language',
      title: '语言设置',
      icon: faLanguage,
      description: '选择界面显示语言',
      fields: [
        {
          id: 'language',
          label: '界面语言',
          type: 'select',
          value: settings.language,
          options: [
            { value: 'zh', label: '简体中文' },
            { value: 'en', label: 'English' },
          ],
          onChange: (value) => setSettings({
            ...settings,
            language: value,
          }),
        },
      ],
    },
    {
      id: 'server',
      title: '服务器设置',
      icon: faServer,
      description: '配置服务器连接参数',
      fields: [
        {
          id: 'serverUrl',
          label: '服务器地址',
          type: 'text',
          value: settings.serverUrl,
          onChange: (value) => setSettings({
            ...settings,
            serverUrl: value,
          }),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            系统设置
          </h1>
          <p className="text-lg text-gray-600">
            配置 AI 游戏开发助手的各项参数，包括 API 密钥、界面和服务器设置
          </p>
        </div>

        <div className="space-y-8">
          {settingSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-soft-lg p-6 animate-slideIn"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`
                  w-12 h-12 rounded-xl
                  bg-gradient-to-br from-blue-500 to-indigo-600
                  flex items-center justify-center
                  text-white shadow-sm
                `}>
                  <FontAwesomeIcon icon={section.icon} className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {section.fields.map((field) => (
                  <div key={field.id} className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    {field.type === 'toggle' ? (
                      <button
                        onClick={() => field.onChange(!field.value)}
                        className={`
                          w-16 h-8 rounded-full p-1
                          transition-colors duration-200
                          ${field.value
                            ? 'bg-blue-500'
                            : 'bg-gray-200'
                          }
                        `}
                      >
                        <div className={`
                          w-6 h-6 rounded-full bg-white shadow-sm
                          transform transition-transform duration-200
                          ${field.value ? 'translate-x-8' : ''}
                        `} />
                      </button>
                    ) : field.type === 'select' ? (
                      <select
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="
                          w-full px-4 py-2 rounded-xl
                          border border-gray-200
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                          transition-all duration-200
                        "
                      >
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="
                          w-full px-4 py-2 rounded-xl
                          border border-gray-200
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                          transition-all duration-200
                        "
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {(error || success) && (
            <div className={`
              p-4 rounded-xl border animate-slideIn
              ${error
                ? 'bg-red-50 border-red-100 text-red-800'
                : 'bg-green-50 border-green-100 text-green-800'
              }
            `}>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={error ? faExclamationCircle : faCheck}
                  className={error ? 'text-red-500' : 'text-green-500'}
                />
                <p className="text-sm font-medium">
                  {error || success}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setSettings({
                  apiKeys: { qwen: '', hunyuan: '', deepseek: '' },
                  theme: 'light',
                  language: 'zh',
                  serverUrl: 'http://localhost:3000',
                });
              }}
            >
              重置设置
            </Button>
            <Button
              variant="primary"
              size="lg"
              loading={isLoading}
              onClick={handleSave}
            >
              保存设置
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
