import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

const assetsModels = [
  {
    id: 'qwen',
    name: 'Qwen'
  },
  {
    id: 'lightai',
    name: 'lightai'
  },
  {
    id: 'gemini',
    name: 'Gemini'
  },
];

const generalModels = [
  {
    id: 'qwen',
    name: 'Qwen'
  },
  {
    id: 'hunyuan',
    name: 'Hunyuan'
  },
  {
    id: 'deepseek',
    name: 'Deepseek'
  },
];

const ModelSelector = ({ onModelSelect, defaultModel = 'qwen', className = '', pageType = 'general' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const models = pageType === 'assets' ? assetsModels : generalModels;
  const currentModel = models.find(model => model.id === selectedModel);

  const handleModelSelect = (modelId) => {
    setSelectedModel(modelId);
    setIsOpen(false);
    onModelSelect?.(modelId);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-700 text-sm">{currentModel.name}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-gray-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-1 z-50 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => handleModelSelect(model.id)}
              className={`w-full px-3 py-1.5 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                selectedModel === model.id ? 'bg-blue-50' : ''
              }`}
            >
              <span className={`text-sm ${
                selectedModel === model.id ? 'text-blue-600' : 'text-gray-700'
              }`}>
                {model.name}
              </span>
              {selectedModel === model.id && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-blue-500 text-sm"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector; 