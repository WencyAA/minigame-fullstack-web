import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faFile,
  faImage,
  faTimes,
  faFileAlt,
  faFileCode,
  faFileVideo,
  faFileAudio,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

const FileUploader = ({
  onFileSelect,
  acceptedTypes = '*/*',
  multiple = false,
  maxSize = 5242880, // 5MB
  className = '',
  showPreview = true,
}) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    validateAndAddFiles(selectedFiles);
  };

  const validateAndAddFiles = (selectedFiles) => {
    let validFiles = [];
    let hasError = false;

    selectedFiles.forEach(file => {
      if (file.size > maxSize) {
        setError(`文件 ${file.name} 超过最大限制 ${Math.round(maxSize / 1024 / 1024)}MB`);
        hasError = true;
        return;
      }

      if (acceptedTypes !== '*/*' && !file.type.match(acceptedTypes)) {
        setError(`文件 ${file.name} 类型不支持`);
        hasError = true;
        return;
      }

      validFiles.push(file);
    });

    if (!hasError) {
      setError('');
      setFiles(multiple ? [...files, ...validFiles] : validFiles);
      onFileSelect(multiple ? [...files, ...validFiles] : validFiles[0]);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileSelect(multiple ? newFiles : null);
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return faImage;
    if (file.type.startsWith('video/')) return faFileVideo;
    if (file.type.startsWith('audio/')) return faFileAudio;
    if (file.type.includes('pdf')) return faFileAlt;
    if (file.type.includes('code') || file.name.match(/\.(js|jsx|ts|tsx|html|css|py|java|cpp)$/)) return faFileCode;
    return faFile;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    validateAndAddFiles(droppedFiles);
  };

  return (
    <div className={className}>
      <div
        className={`
          relative overflow-hidden
          border-2 border-dashed rounded-xl p-8
          transition-all duration-200
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'
          }
          cursor-pointer
        `}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
          accept={acceptedTypes}
          multiple={multiple}
        />
        <div className="text-center">
          <div className={`
            w-16 h-16 mx-auto mb-4
            rounded-2xl
            bg-gradient-to-br from-blue-500 to-indigo-600
            text-white
            flex items-center justify-center
            transform transition-transform duration-200
            ${isDragging ? 'scale-110' : 'hover:scale-110'}
          `}>
            <FontAwesomeIcon icon={faUpload} className="h-8 w-8" />
          </div>
          <p className="text-base font-medium text-gray-700">
            {isDragging ? '释放文件以上传' : '点击或拖拽文件到此处上传'}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {acceptedTypes === '*/*'
              ? '支持所有文件类型'
              : `支持的文件类型: ${acceptedTypes}`}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-center space-x-2 text-red-500 animate-fadeIn">
          <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4" />
          <p className="text-sm font-medium">
            {error}
          </p>
        </div>
      )}

      {showPreview && files.length > 0 && (
        <div className="mt-6 space-y-3">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className={`
                flex items-center justify-between
                p-3 rounded-xl
                bg-white border border-gray-100
                shadow-sm
                transform transition-all duration-200
                hover:shadow-md hover:border-blue-200
                animate-slideIn
              `}
            >
              <div className="flex items-center space-x-4">
                <div className={`
                  w-10 h-10 rounded-lg
                  bg-gradient-to-br
                  ${file.type.startsWith('image/')
                    ? 'from-pink-500 to-rose-600'
                    : file.type.startsWith('video/')
                    ? 'from-purple-500 to-indigo-600'
                    : 'from-blue-500 to-indigo-600'
                  }
                  text-white
                  flex items-center justify-center
                  shadow-sm
                `}>
                  <FontAwesomeIcon icon={getFileIcon(file)} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className={`
                  p-2 rounded-lg
                  text-gray-400
                  transition-all duration-200
                  hover:bg-gray-100 hover:text-red-500
                `}
              >
                <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FileUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  acceptedTypes: PropTypes.string,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  className: PropTypes.string,
  showPreview: PropTypes.bool,
};

export default FileUploader; 