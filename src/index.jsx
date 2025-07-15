// src/index.jsx
import React from 'react'; // 使用 import 导入 React
import ReactDOM from 'react-dom/client'; // 使用 import 导入 ReactDOM
import App from './App.jsx'; // 使用 import 导入 App 组件


import './styles/index.css'; // 引入全局样式
import './styles/dashboard.css'; // 引入 Dashboard 页面特有样式
import './styles/assetsModule.css'; // 引入
import './styles/settings.css'; // 引入 Setting 页面特有样式
import './styles/planninMmodule.css'; 
import './styles/globalNavigation.css';
import './styles/developmentModule.css';


const root = ReactDOM.createRoot(document.getElementById('root')); // 获取根节点
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
