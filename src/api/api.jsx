//API 请求封装
// src/api/api.js
import axios from 'axios'; // 使用 import 导入 axios

// 创建 axios 实例，设置基础 URL 和默认配置
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // 添加跨域支持
  withCredentials: false,
});

// 添加请求拦截器，用于调试
api.interceptors.request.use(
  (config) => {
    console.log('Sending request:', {
      url: config.url,
      method: config.method,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器，用于调试和错误处理
api.interceptors.response.use(
  (response) => {
    console.log('Received response:', response.data);
    return response.data;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
);

export const generatePlan = async (taskDescription, selectedModel = 'qwen') => {
  try {
    console.log('Sending plan request:', { taskDescription, selectedModel });
    const response = await api.post('/planning', { taskDescription, selectedModel });
    console.log('Plan response:', response);

    if (!response || (!response.plan && !response.output && !response.text && !response.content)) {
      throw new Error('Invalid response format from server');
    }

    return response;
  } catch (error) {
    console.error('Error generating plan:', error);
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else if (error.response?.status === 500) {
      throw new Error('服务器内部错误，请稍后重试');
    } else if (error.message === 'Network Error') {
      throw new Error('网络连接错误，请检查网络连接');
    } else {
      throw new Error(error.message || '生成计划时发生未知错误');
    }
  }
};

export const generateAssets = async (modelData, selectedModel = 'qwen') => {
  try {
    console.log('Sending assets request:', { modelData, selectedModel });
    const response = await api.post('/assets', { modelData, selectedModel });
    console.log('Assets response:', response);
    return response;
  } catch (error) {
    console.error('Error generating assets:', error);
    throw error;
  }
};

export const startDevelopment = async (taskData, selectedModel = 'qwen') => {
  try {
    console.log('Sending development request:', { taskData, selectedModel });
    const response = await api.post('/development', { taskData, selectedModel });
    console.log('Development response:', response);
    return response;
  } catch (error) {
    console.error('Error starting development:', error);
    throw error;
  }
};
