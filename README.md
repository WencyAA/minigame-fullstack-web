# **MiniGame - AI 辅助游戏创作平台**

**MiniGame** 是一款 **AI辅助游戏创作平台**，旨在帮助游戏设计师和开发者高效地创建游戏策划文档、生成素材、开发程序等。通过智能化的 **AI** 系统，用户可以快速输入创意和需求，生成相应的游戏策划、3D模型、音效、程序代码等内容，从而提升游戏开发的效率和创作体验。

## **功能概述**

- **首页 (Dashboard)**：展示欢迎语并提供全局导航，允许用户快速跳转到其他功能模块。
- **策划编辑**：用户可以在这个模块输入灵感和设想，由 AI 工具辅助生成核心玩法、总策划案文档、功能拆解文档。
- **素材生成**：包含两个独立的对话聊天窗口区域：
  - **角色设计**：用户输入角色设计相关的创意内容，AI 辅助生成角色设计方案。
  - **音乐音效**：用户输入关于音乐音效的创意内容，AI 辅助生成音效设计方案。
- **程序草案**：用户提供策划案和功能拆解文档，AI 分析后生成程序开发所需的各个模块（如角色系统、交互对象、UI系统等）。
- **设置页面**：用户可以修改平台的常规设置，如主题、语言、通知设置等。

## **技术栈**

- **前端**：
  - **React.js**：构建用户界面，使用组件化设计进行开发。
  - **React Router**：管理页面路由，实现不同页面间的跳转。
  - **Axios**：用于与后端 API 的通信，处理 HTTP 请求。
  - **CSS**：使用标准的 CSS 样式以及响应式设计。

- **后端**：
  - **Express.js**：用于构建 RESTful API，处理用户请求。
  - **Cors**：处理跨域请求问题，确保前后端能够顺利交互。
  - **Node.js**：运行 Express 服务器，提供后端服务支持。

- **工具**：
  - **Git**：版本控制，管理项目开发进程。
  - **Webpack**：前端资源打包工具，支持模块化开发。

## **安装和运行**

### **React项目文件结构（供你参考）**

miniGameCursor1/
├── public/
│   └── index.html                 # 应用的入口 HTML 文件，包含基本的网页结构和根节点
├── src/
│   ├── api/
│   │   └── api.js                 # 用于处理 API 请求，封装与后端的交互
│   ├── components/
│   │   ├── GlobalNavigation.jsx   # 全局导航栏组件，包含主页和各模块的导航按钮
│   │   ├── Dashboard.jsx          # 首页组件，展示欢迎信息和聊天窗口
│   │   ├── PlanningModule.jsx     # 策划编辑模块页面
│   │   ├── AssetsModule.jsx       # 素材生成模块页面，包含角色设计和音乐音效的聊天窗口
│   │   ├── DevelopmentModule.jsx  # 程序草案模块页面，允许用户输入策划案和获取开发模块内容
│   │   ├── Settings.jsx           # 设置模块页面，允许用户更改平台的常规设置
│   │   ├── AIChatWindow.jsx       # 当前项目无，可考虑增加作为通用 AI 聊天窗口组件 (可复用于 Dashboard, AssetsModule)
│   │   ├── SuggestionCard.jsx     # 当前项目无，可考虑增加作为预定义建议卡片组件
│   │   ├── ModelSelector.jsx      # 当前项目无，可考虑增加作为AI 模型选择下拉框组件
│   │   ├── FileUploader.jsx       # 当前项目无，可考虑增加作为文件上传组件 (用于“+”号按钮逻辑)
│   │   ├── InputField.jsx         # 当前项目无，可考虑增加作为通用输入框组件
│   │   ├── Button.jsx             # 当前项目无，可考虑增加作为通用按钮组件
│   │   ├── LoadingSpinner.jsx     # 当前项目无，可考虑增加作为加载动画组件
│   │   └── MessageBubble.jsx      # 当前项目无，可考虑增加作为聊天消息气泡组件
│   ├── styles/
│   │   ├── index.css              # 全局样式文件，包含整个应用的基础样式
│   │   ├── dashboard.css          # 首页（Dashboard）的特定样式
│   │   ├── assets.css             # 素材生成页面的特定样式
│   │   ├── planninMmodule.css      # 策划编辑模块页的样式文件
│   │   ├── developmentModule.css    # 程序草案模块页面的样式文件
│   │   ├── settings.css            # 设置模块页面的样式文件
│   ├── App.jsx                    # 应用的主组件，包含路由设置，链接所有页面和组件
│   ├── index.jsx                  # 入口文件，挂载根组件并渲染应用
├── server/
│   ├── controllers/
│   │   ├── planningController.js  # 处理策划模块的后端逻辑
│   │   ├── assetsController.js    # 处理素材生成模块的后端逻辑
│   │   └── developmentController.js # 处理程序开发模块的后端逻辑
│   ├── services/
│   │   └── aiService.js           # 与AI模型交互的后端服务，生成相关内容
│   ├── index.js                   # 启动 Express 服务器，设置 API 路由
├── package.json                   # 项目配置文件，包含依赖、脚本等
├── .gitignore                     # 用于忽略不需要纳入版本控制的文件和目录
├── README.md                      # 项目说明文件，包含基本的项目描述和运行说明
└── node_modules/                  # Node.js的依赖包目录


页面功能与组件构成
