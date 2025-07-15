import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faMicrophone,
  faSpinner,
  faPlus,
  faImage,
  faFileAlt,
  faTimes,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import ModelSelector from './ModelSelector';
import MessageBubble from './MessageBubble';

const AIChatWindow = ({
  messages = [],
  onSendMessage,
  placeholder = 'Ask AI Assistant...',
  className = '',
  isLoading = false,
  defaultModel = 'qwen',
  onModelSelect,
  pageType = 'general',
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [localMessages, setLocalMessages] = useState(messages);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const messageEndRef = useRef(null);
  const textareaRef = useRef(null);
  const uploadMenuRef = useRef(null);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputText]);

  // 点击外部关闭上传菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (uploadMenuRef.current && !uploadMenuRef.current.contains(event.target)) {
        setShowUploadMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSend = () => {
    if (inputText.trim() || uploadedFiles.length > 0) {
      const messageData = {
        content: inputText.trim(),
        files: uploadedFiles,
        models: [selectedModel],
      };

      onSendMessage(messageData);
      setInputText('');
      setUploadedFiles([]);
    }
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    if (onModelSelect) {
      onModelSelect(model);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // TODO: 实现语音输入功能
  };

  // 处理文件上传
  const handleFileUpload = async (files, type) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const newFiles = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // 模拟上传进度
        for (let progress = 0; progress <= 100; progress += 20) {
          setUploadProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // 创建文件对象
        const fileObj = {
          id: Date.now() + i,
          name: file.name,
          size: file.size,
          type: file.type,
          fileType: type, // 'image' 或 'document'
          file: file,
          url: type === 'image' ? URL.createObjectURL(file) : null
        };

        newFiles.push(fileObj);
      }

      setUploadedFiles(prev => [...prev, ...newFiles]);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);

    } catch (error) {
      console.error('File upload error:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // 处理图片上传
  const handleImageUpload = () => {
    setShowUploadMenu(false);
    imageInputRef.current?.click();
  };

  // 处理文档上传
  const handleDocumentUpload = () => {
    setShowUploadMenu(false);
    documentInputRef.current?.click();
  };

  // 删除已上传的文件
  const removeFile = (fileId) => {
    setUploadedFiles(prev => {
      const updatedFiles = prev.filter(file => file.id !== fileId);
      // 清理URL对象
      const fileToRemove = prev.find(file => file.id === fileId);
      if (fileToRemove && fileToRemove.url) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return updatedFiles;
    });
  };

  // 预览文件
  const previewFileHandler = (file) => {
    setPreviewFile(file);
  };

  // 关闭预览
  const closePreview = () => {
    setPreviewFile(null);
  };

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[600px]">
        {localMessages.map((message, index) => (
          <MessageBubble
            key={message.id || index}
            message={message.content}
            isAI={message.isAI}
            timestamp={message.timestamp}
            status={message.status}
            hasImage={message.hasImage}
            imageUrl={message.imageUrl}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="border-t border-gray-100 p-4">
        {/* 已上传文件显示区域 */}
        {uploadedFiles.length > 0 && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="relative group bg-white rounded-lg border border-gray-200 p-2 flex items-center space-x-2 hover:shadow-md transition-shadow"
                >
                  {file.fileType === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="w-8 h-8 text-blue-500"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    {file.fileType === 'image' && (
                      <button
                        onClick={() => previewFileHandler(file)}
                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                        title="预览"
                      >
                        <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="删除"
                    >
                      <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 上传进度指示 */}
        {isUploading && (
          <div className="mb-3 p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-blue-500" />
              <span className="text-sm text-blue-700">上传中... {uploadProgress}%</span>
            </div>
            <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-end space-x-2">
          <div className="min-w-[120px]">
            <ModelSelector
              onModelSelect={handleModelSelect}
              defaultModel={selectedModel}
              pageType={pageType}
            />
          </div>

          {/* 文件上传按钮 */}
          <div className="relative" ref={uploadMenuRef}>
            <button
              onClick={() => setShowUploadMenu(!showUploadMenu)}
              className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              title="上传文件"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>

            {/* 上传菜单 */}
            {showUploadMenu && (
              <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[140px]">
                <button
                  onClick={handleImageUpload}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
                >
                  <FontAwesomeIcon icon={faImage} className="text-green-500" />
                  <span>上传图片</span>
                </button>
                <button
                  onClick={handleDocumentUpload}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
                >
                  <FontAwesomeIcon icon={faFileAlt} className="text-blue-500" />
                  <span>上传文档</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="1"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>

          <Button
            onClick={handleVoiceInput}
            variant="secondary"
            size="sm"
            className={`p-2 rounded-xl ${
              isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
            } hover:bg-gray-200 transition-colors`}
            title="Voice input"
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </Button>

          <Button
            onClick={handleSend}
            disabled={!inputText.trim() && uploadedFiles.length === 0}
            className="p-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            title="Send message"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>

        {/* 隐藏的文件输入 */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files, 'image')}
        />
        <input
          ref={documentInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files, 'document')}
        />
      </div>

      {/* 文件预览模态框 */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-3xl max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{previewFile.name}</h3>
              <button
                onClick={closePreview}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            {previewFile.fileType === 'image' && (
              <img
                src={previewFile.url}
                alt={previewFile.name}
                className="max-w-full max-h-[60vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatWindow;
